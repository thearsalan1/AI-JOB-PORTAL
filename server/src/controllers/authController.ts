import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/emailService';
import { AuthRequest } from '../types/types';
import { welcomeEmailTemplate, passwordResetEmailTemplate } from '../template/emailTemplates';

export const register = async(req: Request, res: Response) => {
  try {
    const { name, email, role, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already registered" });

    // Create User
    const user = new User({ name, email, role, password });
    await user.save();

    // Generate JWT
    const token = jwt.sign({
      userId: user._id,
      role: user.role
    },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
    );

    try {
      await sendEmail(
        email,
        'Welcome to Our Job Portal',
        welcomeEmailTemplate(name)
      );
      console.log('Welcome email sent successfully');
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user._id, name, email, role }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export const login = async(req: Request, res: Response) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign(
      {userId: user._id, role: user.role},
      process.env.JWT_SECRET!,
      {expiresIn: '7d'}
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 2 * 60 * 1000;
    
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    
    // Send OTP email
    try {
      await sendEmail(
        email,
        'Password Reset Request - AI Job Portal 🔐',
        passwordResetEmailTemplate(user.name, otp)
      );
      console.log('OTP email sent successfully');
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError);
      return res.status(500).json({ error: 'Failed to send OTP email. Please try again.' });
    }
    
    res.json({ 
      message: 'OTP sent successfully',
      expiresIn: 2 * 60 * 1000 
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const resetPassword = async(req: Request, res: Response) => {
  try {
    const {email, otp, newPassword} = req.body;
    const user = await User.findOne({email});
    
    if(!user) {
      return res.status(400).json({error: "User not found"});
    }
    
    if (user.otp !== otp || Date.now() > (user.otpExpiry as number)) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    } 

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Password reset successful',
      token,
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const verify = async (req: AuthRequest, res: Response) => {
  try {
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    if(user.isVerified){
      return res.status(400).json({success:false,message:"User already verified"})
    }

    user.isVerified = true;
    await user.save(); 

    res.json({ success: true, user, message: "Token valid" });
  } catch (error) {
    console.error("Verification error:", error); 
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};