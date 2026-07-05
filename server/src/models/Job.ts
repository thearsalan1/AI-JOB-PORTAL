import mongoose, { Model, Schema } from "mongoose";
import { IJob } from "../types/types";

const JobSchema:Schema = new Schema<IJob>({
  employer_id:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:true,
  },
  company_name:{
    type:String,
    default:""
  },
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  salary_min:{
    type:Number,
    required:true,
  },
  salary_max:{
    type:Number,
    required:true
  },
  location:{
    type:String,
    required:true,
  },
  remote:{
    type:Boolean,
    default:false,
  },
  job_type:{
    type:String,
    enum:['part-time','full-time','contract'],
    required:true,
  },
  experience_level:{
    type:String,
    enum: ['junior', 'mid', 'senior'],
    required:true,
  },
  skills:[{
    type:mongoose.Types.ObjectId,
    ref:'Skill',
  }],
  status:{ type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  applications_count:{
    type:Number,
    default:0,
  },
  views:{
    type:Number,
    default:0,
  }
},{ timestamps:true }
)

JobSchema.index({ title: 'text', description: 'text' });
JobSchema.index({location:1,remote:1});
JobSchema.index({status:1,createdAt:-1});

export const Job:Model<IJob> = mongoose.model<IJob>('Job', JobSchema);