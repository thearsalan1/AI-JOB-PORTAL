import mongoose, { Model, Schema } from "mongoose";
import { ISkill } from "../types/types";

const SkillSchema:Schema=new Schema<ISkill>({
  name:{
    type:String,
    required:true,
    unique:true,
  },
  category:{
    type:String,
    required:true,
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Other']
  }
},{timestamps:true})

export const Skill: Model<ISkill>= mongoose.model<ISkill>('Skill',SkillSchema);