import { AuthRequest } from './../types/types';
import { Request, Response } from 'express';
import { uploadOnCloudinary } from '../utils/cloudinary';
import { Resume } from '../models/Resume';
import { ResumeParsedData } from '../models/ResumeParsedData';
import path from 'path';
import fs from 'fs';
import { cloudinary } from '../utils/cloudinary'
import https from 'https';
import os from 'os';


interface MulterRequest extends AuthRequest{
  file:any;
}


export const uploadResume = async (req: AuthRequest, res: Response) => {
  let tempFilePath: string | null = null;

  try {
    const multerReq = req as MulterRequest;

    if (!multerReq.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    tempFilePath = path.join(os.tmpdir(), `${Date.now()}-${multerReq.file.originalname}`);
    fs.writeFileSync(tempFilePath, multerReq.file.buffer);

    const cloudinaryResult = await uploadOnCloudinary(tempFilePath);

    if (!cloudinaryResult) {
      return res.status(500).json({ error: 'Upload to Cloudinary failed' });
    }

    const resume = new Resume({
      user_id: req.user!.userId,
      file_url: cloudinaryResult.secure_url,
      file_name: multerReq.file.originalname,
      file_size: multerReq.file.size,
      mime_type: multerReq.file.mimetype,
    });

    await resume.save();
    res.status(201).json(resume);

  } catch (error) {
    console.error('uploadResume error:', error);   // add this
    res.status(500).json({ error: 'Upload failed', details: (error as Error).message });  // add this
  } finally {
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
};

export const parseResume = async (req:AuthRequest,res:Response)=>{
  try {
    const {resume_id}= req.body;

    if(!resume_id){
       return res.status(400).json({ error: 'resume_id is required' });
    }

    const resume = await Resume.findOne({
      _id:resume_id,
      user_id:req.user!.userId
    })

    if(!resume){
      return res.status(404).json({ error: 'Resume not found' });
    }

    const existing = await ResumeParsedData.findOne({ resume_id });
    if (existing) {
      return res.status(409).json({ error: 'Resume has already been parsed', data: existing });
    }

    const parsedData = new ResumeParsedData({
      resume_id,
      extracted_name: "Rahul Sharma",
      extracted_email: "rahul@example.com",
      skills: ["React", "Node.js", "TypeScript"],
      experience_years: 3,
      education: ["B.Tech CS"],
      confidence_score: 92
    });

    await parsedData.save();
    res.status(201).json(parsedData);
  } catch (error) {
     res.status(500).json({ error: 'Parsing failed' });
  }
}

export const getResume = async (req: AuthRequest, res: Response) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user_id: req.user!.userId
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const parsedData = await ResumeParsedData.findOne({ resume_id: resume._id });

    res.json({ resume, parsedData: parsedData ?? null });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserResumes = async (req: AuthRequest, res: Response) => {
  try {
    const resumes = await Resume.find({ user_id: req.user!.userId });

    if (!resumes.length) {
      return res.status(404).json({ error: 'No resumes found' });
    }

    res.status(200).json(resumes);

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const downloadResume = async (req: AuthRequest, res: Response) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user_id: req.user!.userId
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${resume.file_name}"`);
    res.setHeader('Content-Type', resume.mime_type);

    https.get(resume.file_url, (stream) => {
      stream.pipe(res);
    });

  } catch (error) {
    res.status(500).json({ error: 'Download failed' });
  }
};


export const deleteResume = async (req: AuthRequest, res: Response) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user_id: req.user!.userId
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const publicId = resume.file_url.split('/').pop()?.split('.')[0];
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
    }

    await ResumeParsedData.deleteMany({ resume_id: resume._id });
    await resume.deleteOne();

    res.json({ message: 'Resume deleted' });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const updateParsedData = async (req: AuthRequest, res: Response) => {
  try {
    // Verify the resume exists and belongs to the user before touching its parsed data
    const resume = await Resume.findOne({
      _id: req.params.id,
      user_id: req.user!.userId
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Sanitize: only allow known fields to be updated, not the whole req.body
    const { extracted_name, extracted_email, skills, experience_years, education } = req.body;

    const parsedData = await ResumeParsedData.findOneAndUpdate(
      { resume_id: req.params.id },
      { extracted_name, extracted_email, skills, experience_years, education },
      { new: true, runValidators: true }
    );

    if (!parsedData) {
      return res.status(404).json({ error: 'Parsed data not found' });
    }

    res.json(parsedData);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// NEW #3: CREATE RESUME (JSON create, no file)
export const createResume = async (req: AuthRequest, res: Response) => {
  try {
    // Sanitize instead of spreading req.body directly
    // spreading lets anyone set user_id, _id, or any other field
    const { file_url, file_name, file_size, mime_type } = req.body;

    if (!file_url || !file_name) {
      return res.status(400).json({ error: 'file_url and file_name are required' });
    }

    const resume = new Resume({
      user_id: req.user!.userId,
      file_url,
      file_name,
      file_size,
      mime_type
    });

    await resume.save();
    res.status(201).json(resume);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// NEW #7: SHARED DOWNLOAD (employer access)
export const shareResume = async (req: Request, res: Response) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    if (!resume.is_shared) {
      return res.status(403).json({ error: 'This resume has not been shared' });
    }

    https.get(resume.file_url, (stream) => {
      res.setHeader('Content-Disposition', `attachment; filename="${resume.file_name}"`);
      res.setHeader('Content-Type', resume.mime_type);
      stream.pipe(res);
    });

  } catch (error) {
    res.status(500).json({ error: 'Access denied' });
  }
};

export const toggleResumeSharing = async (req: AuthRequest, res: Response) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user_id: req.user!.userId
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    resume.is_shared = !resume.is_shared;
    await resume.save();

    res.json({ 
      message: `Resume is now ${resume.is_shared ? 'shared' : 'private'}`,
      is_shared: resume.is_shared
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};