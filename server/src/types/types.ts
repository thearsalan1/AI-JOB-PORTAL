import mongoose, { Document } from "mongoose";
import { Request } from 'express';

export interface JwtPayload {
  userId: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'seeker' | 'employer' | 'admin';
  phone?: string;
  location?: string;
  isVerified: boolean;
  createdAt: Date;
  otp?: string;   
  otpExpiry?: number;    
}

export interface IjobSeekerProfile extends Document{
  user_id:mongoose.Types.ObjectId;
  experience_years:number;
  education:{degree:string;year:number}[];
  current_role: string;
  preferred_salary:number;
  preferred_location:string;
  bio?:string;
}


export interface IEmployerProfile extends Document{
  user_id:mongoose.Types.ObjectId;
  company_nmae:string;
  industry:string;
  company_size:number;
  verfied:boolean;
  description?:string;
  website?:string;
}


export interface ISkill extends Document{
  name:string;
  category:string;
}


export interface IUserSkill extends Document{
  userId:mongoose.Types.ObjectId;
  skill_id:mongoose.Types.ObjectId;
  level:1|2|3|4|5;
  years_experience?:number;
}


export interface IJobSkill extends Document{
  job_id:mongoose.Types.ObjectId;
  skill_id:mongoose.Types.ObjectId;
  required_level:1|2|3|4|5;
}

export interface IResume extends Document{
  user_id:mongoose.Types.ObjectId;
  file_url:string;
  file_name:string,
  file_size:number,
  mime_type:string,
  uploadAt:Date;
  is_shared: boolean;  
}

export interface IResumeParsedData extends Document{
  resume_id:mongoose.Types.ObjectId;
  extracted_name: string;
  extracted_email: string;
  phone?: string;
  skills: string[];
  experience_years: number;
  education: string[];
  current_role?: string;
  parsedAt: Date;
  confidence_score?: number;
}