import mongoose, { Model, Schema } from "mongoose";
import { IJobSkill } from "../types/types";

const JobSkillSchema:Schema = new Schema<IJobSkill>({
  job_id:{
    type:mongoose.Schema.Types.ObjectId,
    requred:true,
  },
  skill_id:{
    type:mongoose.Types.ObjectId,
    ref:'Skill',
    required:true,
  },
  required_level:{
    type:Number,
    required:true,
    max:5,
    min:1,
  }
},{timestamps:true});


JobSkillSchema.index({job_id:1,skill_id:1},{unique:true});

export const JobSkill:Model<IJobSkill>= mongoose.model<IJobSkill>('JobSkill',JobSkillSchema);