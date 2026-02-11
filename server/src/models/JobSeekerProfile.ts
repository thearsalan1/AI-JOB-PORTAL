import mongoose, { Model, Schema } from 'mongoose';
import { IjobSeekerProfile } from './../types/types';


const JobSeekerSchema: Schema = new Schema<IjobSeekerProfile>({
  user_id:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:true,
  },
  experience_years:{
    type:Number,
    required:true,
  },
  education:[{
    degree:String,
    year:Number,
  }],
  current_role:{
    type:String,
    required:true,
  },
  preferred_salary:{
    type:Number,
    required:true,
  },
  preferred_location:{
    type:String,
    required:true,
  },
  bio:{
    type:String,
  }
},{timestamps:true});


export const jobSeekerProfile: Model<IjobSeekerProfile>=mongoose.model<IjobSeekerProfile>('jobSeekerProfile',JobSeekerSchema);