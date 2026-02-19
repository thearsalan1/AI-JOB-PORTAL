import mongoose, { Model, Schema } from 'mongoose';
import { IApplication } from './../types/types';

const ApplicationSchema:Schema = new Schema<IApplication>({
  seeker_id:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:true,
  },
  job_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Job',
    required:true
  },
  resume_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Resume'
  },
  status:{
    type:String,
    enum:['applied','shortlisted','rejected','hired'],
    default:'applied'
  },
  notes:String
},{timestamps:true});


ApplicationSchema.index({job_id:1,status:1});
ApplicationSchema.index({seeker_id:1});

export const Application: Model<IApplication> =mongoose.model<IApplication>('Application',ApplicationSchema);