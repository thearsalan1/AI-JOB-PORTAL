import mongoose, { Schema, Document, Model } from 'mongoose';
import { IJobMatch } from '../types/types';


const JobMatchSchema: Schema = new Schema<IJobMatch>({
  seeker_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  job_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job', 
    required: true 
  },
  match_score: { 
    type: Number, 
    required: true,
    min: 0, max: 100 
  },
  reasons: [String],
  skill_matches: [{
    skill: String,
    user_level: Number,
    job_level: Number
  }]
}, { timestamps: true });

// Indexes for fast lookup
JobMatchSchema.index({ seeker_id: 1, match_score: -1 });
JobMatchSchema.index({ job_id: 1, match_score: -1 });
JobMatchSchema.index({ seeker_id: 1, job_id: 1 }, { unique: true });

export const JobMatch: Model<IJobMatch> = mongoose.model<IJobMatch>('JobMatch', JobMatchSchema);
