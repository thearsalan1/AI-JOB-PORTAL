import mongoose, { Model, Schema } from "mongoose";
import { IUserSkill } from "../types/types";

const UserSkillSchema:Schema= new Schema<IUserSkill>({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:true,
  },
  skill_id:{
    type:mongoose.Types.ObjectId,
    ref:'Skill',
    required:true,
  },
  level:{
    type:Number,
    required:true,
    min:1,
    max:5,
  },
  years_experience:{
    type:Number
  }
},{timestamps:true})

UserSkillSchema.index({user_id:1,skill_id:1},{unique:true})

export const UserSkill : Model<IUserSkill> = mongoose.model<IUserSkill>('UserSkill',UserSkillSchema);