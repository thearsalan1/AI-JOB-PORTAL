import { Request, Response } from "express"
import { jobSeekerProfile } from "../models/JobSeekerProfile"
import { AuthRequest } from "../types/types";
import { EmployerProfile } from "../models/EmployerProfile";

// ===== JOB SEEKER PROFILE =====

export const createSeekerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const existingProfile = await jobSeekerProfile.findOne({ 
      user_id: req.user!.userId 
    });
    
    if (existingProfile) {
      return res.status(400).json({ 
        error: 'Profile already exists for this user' 
      });
    }

    const profile = new jobSeekerProfile({
      user_id: req.user!.userId,
      ...req.body,
    });
    
    await profile.save();
    
    res.status(201).json({
      success: true,
      profile
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.message 
      });
    }
    res.status(500).json({ error: 'Server error' });
  }
}

export const getSeekerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await jobSeekerProfile.findOne({ 
      user_id: req.user!.userId 
    });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json({
      success: true,
      profile
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const updateSeekerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { user_id, ...updates } = req.body;
    
    const profile = await jobSeekerProfile.findOneAndUpdate(
      { user_id: req.user!.userId },
      updates,
      { new: true, runValidators: true }
    );
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json({
      success: true,
      profile
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.message 
      });
    }
    res.status(500).json({ error: 'Server error' });
  }
}

// ===== EMPLOYER PROFILE =====

export const createEmployerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const existingProfile = await EmployerProfile.findOne({ 
      user_id: req.user!.userId
    });
    
    if (existingProfile) {
      return res.status(400).json({
        error: "Profile already exists for this user"
      });
    }
  
    const profile = new EmployerProfile({
      user_id: req.user!.userId,
      ...req.body
    });
    
    await profile.save();
    
    res.status(201).json({
      success: true,
      profile
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.message 
      });
    }
    res.status(500).json({ error: 'Server error' });
  }
}

export const getEmployerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await EmployerProfile.findOne({ 
      user_id: req.user!.userId 
    });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json({
      success: true,
      profile
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const updateEmployerProfile = async (req: Request, res: Response) => {
  try {
    const { updates } = req.body;
    const id = req.params.id
    
    const profile = await EmployerProfile.findOneAndUpdate(
      { id},
      updates,
      { new: true, runValidators: true }  
    );
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json({
      success: true,
      profile
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.message 
      });
    }
    res.status(500).json({ error: 'Server error' });
  }
}