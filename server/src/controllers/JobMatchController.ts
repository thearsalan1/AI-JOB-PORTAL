import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { JobMatch } from '../models/JobMatch';
import { Job } from '../models/Job';
import { calculateMatchScore } from '../utils/matchCalculator';
import { AuthRequest } from '../types/types'; // ← use shared type

export const getUserMatches = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role !== 'seeker') {
      return res.status(403).json({ error: 'Seekers only' });
    }

    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
    const min_score = Math.min(100, Math.max(0, parseInt(req.query.min_score as string) || 70));

    const filter = {
      seeker_id: req.user!.userId,
      match_score: { $gte: min_score }
    };

    const [matches, total] = await Promise.all([
      JobMatch.find(filter)
        .populate('job_id', 'title salary_min location employer_id status')
        .sort({ match_score: -1, createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit),
      JobMatch.countDocuments(filter)
    ]);

    res.json({
      matches,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getJobMatches = async (req: AuthRequest, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId  as string)) {
      return res.status(400).json({ error: 'Invalid job ID' });
    }

    const job = await Job.findOne({
      _id: req.params.jobId,
      employer_id: req.user!.userId
    });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const matches = await JobMatch.find({ job_id: req.params.jobId })
      .populate('seeker_id', 'name')
      .sort({ match_score: -1 })
      .limit(50);

    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const recalculateMatches = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role !== 'seeker') {
      return res.status(403).json({ error: 'Seekers only' });
    }

    const jobs = await Job.find({ status: 'open' }).limit(100);

    const results: any[] = [];
    const batchSize = 10;

    for (let i = 0; i < jobs.length; i += batchSize) {
      const batch = jobs.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (job) => {
          const { score, skill_matches } = await calculateMatchScore(
            req.user!.userId,
            job._id.toString()
          );

          // Save to JobMatch collection
          await JobMatch.findOneAndUpdate(
            { seeker_id: req.user!.userId, job_id: job._id },
            {
              seeker_id: req.user!.userId,
              job_id: job._id,
              match_score: score,
              reasons: [`${score}% skill match`],
              skill_matches
            },
            { upsert: true }
          );

          // Collect result for response
          results.push({
            job_id: job._id,
            title: job.title,
            score,
            skill_matches
          });
        })
      );
    }

    res.json({
      message: 'Matches recalculated successfully',
      jobs_processed: jobs.length,
      results
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getRecommendations = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role !== 'seeker') {
      return res.status(403).json({ error: 'Seekers only' });
    }

    const matches = await JobMatch.find({
      seeker_id: req.user!.userId,
      match_score: { $gte: 80 }
    })
      .populate('job_id', 'title salary_min location employer_id')
      .sort({ match_score: -1 })
      .limit(5);

    res.json({ recommendations: matches });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMatchDetails = async (req: AuthRequest, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.matchId as string)) {
      return res.status(400).json({ error: 'Invalid match ID' });
    }

    const match = await JobMatch.findById(req.params.matchId)
      .populate('job_id', 'title')
      .populate('seeker_id', 'name');

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    if (match.seeker_id.toString() !== req.user!.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};