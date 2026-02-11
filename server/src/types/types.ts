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