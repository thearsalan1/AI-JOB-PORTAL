import mongoose, { Model, Schema } from "mongoose";
import { IUserActivity } from "../types/types";

const UserActivitySchema: Schema = new Schema<IUserActivity>({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  action: {
    type: String,
    enum: ['view_job', 'save_job', 'apply_job'],
    required: true
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  read: { type: Boolean, default: false }
}, { timestamps: true });

export const UserActivity: Model<IUserActivity> = 
  mongoose.model<IUserActivity>('UserActivity', UserActivitySchema);