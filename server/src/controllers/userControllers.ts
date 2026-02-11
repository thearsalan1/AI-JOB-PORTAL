import { User } from '../models/User';
import { AuthRequest } from './../types/types';
import { Request, Response } from "express"

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,  
      user
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) { 
      return res.status(404).json({ error: "User not found" });
    }
    
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const getAllSeekers = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 10);

    const [seekers, total] = await Promise.all([
      User.find({ role: 'seeker' })
        .limit(limit)
        .skip((page - 1) * limit),
      User.countDocuments({ role: 'seeker' })
    ]);
    
    res.status(200).json({
      success: true,
      seekers,
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
}

export const getAllEmployers = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

    const [employers, total] = await Promise.all([
      User.find({ role: 'employer' })
        .limit(limit)
        .skip((page - 1) * limit),
      User.countDocuments({ role: 'employer' })
    ]);
      
    res.status(200).json({
      success: true,
      employers,
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
}

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { role, ...updates } = req.body; 
    
    // Update only the authenticated user's profile
    const user = await User.findByIdAndUpdate(
      req.user!.userId,  
      updates,
      { new: true, runValidators: true }  
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      user
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