import { IResume } from './../types/types';
import mongoose, { Model, Schema } from "mongoose";

const ResumeSchema:Schema = new mongoose.Schema<IResume>({
  user_id:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:true,
  },
  file_url:{
    type:String,
    required:true,
  },
  file_name:{
    type:String,
    required:true,
  },
  file_size:{
    type:Number,
  },
  mime_type:{
    type:String,
    required:true,
  },
  is_shared:{
    type:Boolean,
    default:false,
  }
},{timestamps:true});

ResumeSchema.index({user_id:1, createdAt:-1})

export const Resume: Model<IResume>= mongoose.model<IResume>('Resume',ResumeSchema);