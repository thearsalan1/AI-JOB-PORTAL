import { Document } from "mongoose";
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: any;
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