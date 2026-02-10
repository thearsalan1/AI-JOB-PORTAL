import { IUser } from './../types/types';
import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['seeker', 'employer', 'admin'], default: 'seeker' },
  phone: String,
  location: String,
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Number     
}, { timestamps: true });

// Hash password before save
UserSchema.pre('save', async function(this: IUser) {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);