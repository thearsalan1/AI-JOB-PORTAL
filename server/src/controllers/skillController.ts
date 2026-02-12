import { Request,Response } from "express"
import { Skill } from "../models/Skill";
import { AuthRequest } from "../types/types";
import { UserSkill } from "../models/UserSkill";

export const getAllSkills = async (req:Request,res:Response)=>{
  try {
    const page = Math.max(1,Number(req.query.page)|| 1);
    const limit = Math.min(100,Number(req.query.limit)|| 10);

    const [skills,total] = await Promise.all([
      Skill.find().
      limit(limit)
      .skip((page-1)*limit)
      .sort({createdAt:-1}),
      Skill.countDocuments()
    ]);

    res.status(200).json({
      success:true,
      skills,
      pagination:{
        page,
        limit,
        total,
        totalPages:Math.ceil(total/limit)
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}


export const getSkillsByCategory = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 10);
    const category = req.params.category;

    const filter = { category };
    

    const total = await Skill.countDocuments(filter);
    const skills = await Skill.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      skills,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

export const searchSkills = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const skills = await Skill.find({
      name: { $regex: q, $options: 'i' }
    })
      .limit(10)
      .lean();

    res.status(200).json({
      success: true,
      skills,
      count: skills.length,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

export const getUserSkills = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }
    

    const userSkills = await UserSkill.find({userId })
      .populate("skill_id", "name category")
      .lean();

    if (!userSkills || userSkills.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User skills not found",
      });
    }

    res.status(200).json({
      success: true,
      userSkills,
      count: userSkills.length,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

export const addUserSkill = async (req: AuthRequest, res: Response) => {
  try {
    const { skill_id, level, years_experience } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    const existingSkill = await UserSkill.findOne({ userId, skill_id });
    if (existingSkill) {
      return res.status(409).json({
        success: false,
        error: "Skill already added for this user",
      });
    }

    const userSkill = new UserSkill({
      userId,
      skill_id,
      level,
      years_experience,
    });

    await userSkill.save();

    const populated = await UserSkill.findById(userSkill._id)
      .populate("skill_id", "name category")
      .lean();

    res.status(201).json({
      success: true,
      userSkill: populated,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

export const removeUserSkill = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const skillId = req.params.skillId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    const deletedSkill = await UserSkill.findOneAndDelete({
      userId,        
      _id: skillId, 
    });
    

    if (!deletedSkill) {
      return res.status(404).json({
        success: false,
        error: "Skill not found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill removed",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

export const createSkill = async (req: Request, res: Response) => {
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