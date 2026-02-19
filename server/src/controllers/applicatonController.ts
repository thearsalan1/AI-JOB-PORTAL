import { Request, Response } from "express";
import { AuthRequest } from "../types/types";
import { Job } from "../models/Job";
import { Application } from "../models/Application";

const VALID_STATUSES = ["applied", "shortlisted", "rejected", "hired"] as const;
const MAX_LIMIT = 100;

// POST /applications
export const createApplication = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role !== "seeker") {
      return res.status(403).json({ error: "Seeker only" });
    }

    const { job_id, resume_id } = req.body;

    if (!job_id) {
      return res.status(400).json({ error: "job_id is required" });
    }

    const job = await Job.findOne({ _id: job_id, status: "open" });
    if (!job) {
      return res.status(400).json({ error: "Job not found or closed" });
    }

    const existing = await Application.findOne({
      seeker_id: req.user!.userId,
      job_id,
    });
    if (existing) {
      return res.status(400).json({ error: "Already applied" });
    }

    const application = new Application({
      seeker_id: req.user!.userId,
      job_id,
      resume_id,
      status: "applied",
    });

    await application.save();

    await Job.findByIdAndUpdate(job_id, { $inc: { applications_count: 1 } });

    const populated = await Application.findById(application._id)
      .populate("job_id", "title employer_id")
      .populate("resume_id", "file_url file_name");

    return res
      .status(201)
      .json({ message: "Application submitted", application: populated });
  } catch (error) {
    console.error("createApplication error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// GET /applications/me
export const getUserApplications = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const parsedPage = Math.max(1, Number(page));
    const parsedLimit = Math.min(Math.max(1, Number(limit)), MAX_LIMIT);

    if (status && !VALID_STATUSES.includes(status as any)) {
      return res.status(400).json({ error: "Invalid status filter" });
    }

    const query: any = { seeker_id: req.user!.userId };
    if (status) query.status = status;

    const [applications, total] = await Promise.all([
      Application.find(query)
        .populate("job_id", "title employer_id status")
        .populate("resume_id", "file_url file_name")
        .sort({ createdAt: -1 })
        .limit(parsedLimit)
        .skip((parsedPage - 1) * parsedLimit),
      Application.countDocuments(query),
    ]);

    return res.status(200).json({
      applications,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        total,
        pages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    console.error("getUserApplications error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// GET /applications/job/:jobId
export const getJobApplications = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role !== "employer") {
      return res.status(403).json({ error: "Employer only" });
    }

    // Verify the job belongs to this employer
    const job = await Job.findOne({
      _id: req.params.jobId,
      employer_id: req.user!.userId,
    });

    if (!job) {
      return res
        .status(404)
        .json({ error: "Job not found or unauthorized" });
    }

    const { page = 1, limit = 10, status } = req.query;

    const parsedPage = Math.max(1, Number(page));
    const parsedLimit = Math.min(Math.max(1, Number(limit)), MAX_LIMIT);

    if (status && !VALID_STATUSES.includes(status as any)) {
      return res.status(400).json({ error: "Invalid status filter" });
    }

    const query: any = { job_id: req.params.jobId };
    if (status) query.status = status;

    const [applications, total] = await Promise.all([
      Application.find(query)
        .populate("seeker_id", "name email")
        .populate("resume_id", "file_url file_name")
        .sort({ createdAt: -1 })
        .limit(parsedLimit)
        .skip((parsedPage - 1) * parsedLimit),
      Application.countDocuments(query),
    ]);

    return res.status(200).json({
      applications,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        total,
        pages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    console.error("getJobApplications error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// PATCH /applications/:id/status
export const updateApplicationStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (req.user!.role !== "employer") {
      return res.status(403).json({ error: "Employer only" });
    }

    const { status, notes } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Fetch application and verify ownership through the job
    const application = await Application.findById(req.params.id).populate<{
      job_id: { employer_id: { toString: () => string } };
    }>("job_id", "employer_id");

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    if (application.job_id.employer_id.toString() !== req.user!.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    application.status = status;
    if (notes !== undefined) application.notes = notes;
    await application.save();

    const updated = await Application.findById(application._id).populate(
      "seeker_id",
      "name email"
    );

    return res.json(updated);
  } catch (error) {
    console.error("updateApplicationStatus error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// GET /applications/:id/resume
export const getApplicationResume = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("job_id", "employer_id")
      .populate("resume_id");

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    const userId = req.user!.userId;
    const role = req.user!.role;

    const isOwner =
      application.seeker_id.toString() === userId;
    const isEmployer =
      role === "employer" &&
      (application.job_id as any).employer_id.toString() === userId;

    if (!isOwner && !isEmployer) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!application.resume_id) {
      return res.status(404).json({ error: "Resume not found" });
    }

    return res.redirect((application.resume_id as any).file_url);
  } catch (error) {
    console.error("getApplicationResume error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};