import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { JobMatch } from '../models/JobMatch';
import { Job } from '../models/Job';
import { calculateMatchScore } from '../utils/matchCalculator';

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

export const getUserMatches = async (req: AuthRequest, res: Response) => {
  try {
    // Fix 5: sanitize and clamp query params without libraries
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
    const min_score = Math.min(100, Math.max(0, parseInt(req.query.min_score as string) || 70));

    const filter = {
      seeker_id: req.user!.userId,
      match_score: { $gte: min_score }
    };

    // Fix 3: return total count for proper pagination
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
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getJobMatches = async (req: Request, res: Response) => {
  try {
    // Fix 5: validate jobId
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId as string)) {
      return res.status(400).json({ error: 'Invalid job ID' });
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
    // Fix 8: simple cooldown check using existing updatedAt field
    const recent = await JobMatch.findOne({ seeker_id: req.user!.userId })
      .sort({ updatedAt: -1 });

    if (recent && (Date.now() - new Date(recent.updatedAt).getTime()) < 60 * 60 * 1000) {
      return res.status(429).json({ error: 'Please wait at least 1 hour before recalculating' });
    }

    const jobs = await Job.find({ status: 'open' }).limit(100);

    // Fix 4: use actual skill_matches from calculateMatchScore
    await Promise.all(
      jobs.map(async (job) => {
        const { score, skill_matches } = await calculateMatchScore(
          req.user!.userId,
          job._id.toString()
        );

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
      })
    );

    res.json({ message: `${jobs.length} matches recalculated` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getRecommendations = async (req: AuthRequest, res: Response) => {
  try {
    const matches = await JobMatch.find({
      seeker_id: req.user!.userId,
      match_score: { $gte: 80 }
    })
      .populate('job_id', 'title company salary_min')
      // Fix 2: sort by match_score not createdAt
      .sort({ match_score: -1 })
      .limit(5);

    res.json({ recommendations: matches });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMatchDetails = async (req: Request, res: Response) => {
  try {
    // Fix 5: validate matchId
    if (!mongoose.Types.ObjectId.isValid(req.params.matchId as string)) {
      return res.status(400).json({ error: 'Invalid match ID' });
    }

    const match = await JobMatch.findById(req.params.matchId)
      .populate('job_id', 'title')
      .populate('seeker_id', 'name');

    // Fix 6: handle null result
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};