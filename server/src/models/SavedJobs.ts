import mongoose,{ Model, Schema } from "mongoose";
import { ISavedJobs } from "../types/types";

const SavedJobSchema:Schema = new Schema<ISavedJobs>({
  user_id:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:true,
  },
  job_id:{
    type:mongoose.Types.ObjectId,
    ref:'Job',
    required:true,
  }
},{timestamps:true})

SavedJobSchema.index({ user_id: 1, job_id: 1 }, { unique: true });


export const SavedJobs:Model<ISavedJobs> = mongoose.model<ISavedJobs>('SavedJobs',SavedJobSchema)