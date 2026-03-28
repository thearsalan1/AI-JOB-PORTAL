import mongoose, { Model, Schema } from "mongoose";
import  {IDashboardStats}  from "../types/types";

const DashboardStatsSchema:Schema = new Schema<IDashboardStats>({
  total_users: { type: Number, default: 0 },
  total_jobs: { type: Number, default: 0 },
  total_applications: { type: Number, default: 0 },
  total_matches:{type:Number,default:0},
  avg_match_score:{type:Number,default:0}
},{timestamps:true});

export const DashboardStats: Model<IDashboardStats> = 
  mongoose.model<IDashboardStats>('DashboardStats', DashboardStatsSchema);