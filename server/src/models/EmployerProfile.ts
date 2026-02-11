import {  IEmployerProfile } from './../types/types';
import mongoose, { Model, Schema } from 'mongoose';

const EmployerSchema:Schema = new Schema<IEmployerProfile>({
  user_id:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:true,
    unique:true,
  },
  company_nmae:{
    type:String,
    required:true,
  },
  industry:{
    type:String,
    required:true,
  },
  company_size:{
    type:Number,
    required:true
  },
  verfied:{
    type:Boolean,
    default:false,
  },
  description:{
    type:String, 
  },
  website:String,
})

export const EmployerProfile:Model<IEmployerProfile> =mongoose.model<IEmployerProfile>('EmployeerProfile',EmployerSchema);