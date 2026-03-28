import { JobSkill } from './../models/JobSkill';
import { UserSkill } from './../models/UserSkill';
import { UserActivity } from './../models/UserActivitiy';
import { User } from './../models/User';
import { Application } from './../models/Application';
import { JobMatch } from './../models/JobMatch';
import mongoose from 'mongoose';
import { Response } from 'express';
import { AuthRequest } from '../types/types';  
import { Job } from '../models/Job';
import { Skill } from '../models/Skill';

// ─── Constants ────────────────────────────────────────────────────────────────
const VALID_ACTIONS = ['view_job', 'save_job', 'apply_job'] as const;
type ValidAction = typeof VALID_ACTIONS[number];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const toId = (id: string) => new mongoose.Types.ObjectId(id);
const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// ─── Seeker Dashboard ─────────────────────────────────────────────────────────
export const getSeekerDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = toId(req.user!.userId);

    const [matches, applications, shortlisted, topSkills, avgScoreResult] =
      await Promise.all([
        JobMatch.countDocuments({ seeker_id: userId, match_score: { $gte: 80 } }),
        Application.countDocuments({ seeker_id: userId }),
        Application.countDocuments({ seeker_id: userId, status: 'shortlisted' }),

        // IUserSkill uses `userId` (not `user_id`) — matches your types file
        UserSkill.aggregate([
          { $match: { userId: userId } },
          {
            $lookup: {
              from: 'skills',
              localField: 'skill_id',
              foreignField: '_id',
              as: 'skill'
            }
          },
          { $unwind: { path: '$skill', preserveNullAndEmptyArrays: false } },
          { $sort: { level: -1 } },
          { $limit: 5 },
          { $project: { _id: 0, skill_name: '$skill.name', level: 1 } }
        ]),

        JobMatch.aggregate([
          { $match: { seeker_id: userId } },
          { $group: { _id: null, avg: { $avg: '$match_score' } } }
        ])
      ]);

    res.json({
      total_matches: matches,
      total_applications: applications,
      shortlisted,
      top_skills: topSkills,
      avg_match_score: Math.round(((avgScoreResult[0]?.avg as number) || 0) * 10) / 10
    });
  } catch (error) {
    console.error('Seeker dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─── Employer Dashboard ───────────────────────────────────────────────────────
export const getEmployerDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = toId(req.user!.userId);

    // applications_count confirmed on IJob interface
    const userJobs = await Job.find({ employer_id: userId })
      .select('title applications_count createdAt')
      .sort({ createdAt: -1 })
      .lean();

    const jobIds = userJobs.map((j) => j._id);

    const [total_applications, hired] = await Promise.all([
      Application.countDocuments({ job_id: { $in: jobIds } }),
      Application.countDocuments({ job_id: { $in: jobIds }, status: 'hired' })
    ]);

    const hire_rate =
      total_applications > 0
        ? `${Math.round((hired / total_applications) * 1000) / 10}%`
        : '0%';

    res.json({
      total_jobs: userJobs.length,
      total_applications,
      hired,
      hire_rate,
      recent_jobs: userJobs.slice(0, 5)
    });
  } catch (error) {
    console.error('Employer dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
export const getAdminDashboard = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Admin only' });
    }

    const [
      total_users,
      total_jobs,
      total_applications,
      total_matches,
      active_employers,
      avgScoreResult,
      top_skills
    ] = await Promise.all([
      User.countDocuments(),
      Job.countDocuments(),
      Application.countDocuments(),
      JobMatch.countDocuments(),
      User.countDocuments({ role: 'employer' }),
      JobMatch.aggregate([
        { $group: { _id: null, avg: { $avg: '$match_score' } } }
      ]),
      // Resolves skill names — no raw ObjectIds in response
      JobSkill.aggregate([
        { $group: { _id: '$skill_id', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: 'skills',
            localField: '_id',
            foreignField: '_id',
            as: 'skill'
          }
        },
        { $unwind: { path: '$skill', preserveNullAndEmptyArrays: false } },
        { $project: { _id: 0, skill_name: '$skill.name', count: 1 } }
      ])
    ]);

    res.json({
      total_users,
      total_jobs,
      total_applications,
      total_matches,
      avg_match_score: Math.round(((avgScoreResult[0]?.avg as number) || 0) * 10) / 10,
      active_employers,
      top_skills
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─── Track Activity ───────────────────────────────────────────────────────────
export const trackActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { action, job_id } = req.body;

    if (!VALID_ACTIONS.includes(action as ValidAction)) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    let validatedJobId: mongoose.Types.ObjectId | undefined;
    if (job_id !== undefined) {
      if (!isValidId(job_id)) {
        return res.status(400).json({ error: 'Invalid job_id' });
      }
      validatedJobId = toId(job_id);
    }

    await new UserActivity({
      user_id: toId(req.user!.userId),
      action: action as ValidAction,
      job_id: validatedJobId
    }).save();

    res.json({ message: 'Activity tracked' });
  } catch (error) {
    console.error('Activity tracking error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─── Get Notifications ────────────────────────────────────────────────────────
export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = toId(req.user!.userId);

    // Filter read: false — field exists on IUserActivity in your types file
    const activities = await UserActivity.find({ user_id: userId, read: false })
      .populate<{ job_id: { _id: mongoose.Types.ObjectId; title: string } | null }>(
        'job_id',
        'title'
      )
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const notifications = activities.map((a) => ({
      id: (a._id as mongoose.Types.ObjectId).toString(),
      message: `You ${a.action.replace('_', ' ')} "${a.job_id?.title ?? 'a job'}"`,
      read: false,
      createdAt: a.createdAt
    }));

    res.json({ notifications });
  } catch (error) {
    console.error('Notifications error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─── Mark Notification Read ───────────────────────────────────────────────────
// UserActivity has `read: boolean` on IUserActivity — no separate model needed
export const markNotificationRead = async (req: AuthRequest, res: Response) => {
  try {
    const  id  = req.params.id as string;

    if (!isValidId(id)) {
      return res.status(400).json({ error: 'Invalid notification ID' });
    }

    const result = await UserActivity.updateOne(
      {
        _id: toId(id),
        user_id: toId(req.user!.userId)   // ownership check
      },
      { $set: { read: true } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─── Platform Stats (admin only) ──────────────────────────────────────────────
export const getPlatformStats = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Admin only' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const [dauResult, activities_last_30d, matches_today] = await Promise.all([
      UserActivity.aggregate([
        { $match: { createdAt: { $gte: today } } },
        { $group: { _id: '$user_id' } },
        { $count: 'distinct_users' }
      ]),
      UserActivity.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      JobMatch.countDocuments({ createdAt: { $gte: today } })
    ]);

    res.json({
      daily_active_users: dauResult[0]?.distinct_users ?? 0,
      activities_last_30d,
      matches_today
    });
  } catch (error) {
    console.error('Platform stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const createSkill = async (req: AuthRequest, res: Response) => {
  try {
    const { name, category, description } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        error: "Name and category are required",
      });
    }

    const existingSkill = await Skill.findOne({ name });
    if (existingSkill) {
      return res.status(409).json({
        success: false,
        error: "Skill with this name already exists",
      });
    }

    const skill = new Skill({
      name,
      category,
      description,
    });

    await skill.save();

    res.status(201).json({
      success: true,
      skill,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};