import mongoose, { Model, Schema } from 'mongoose';
import { IResumeParsedData } from './../types/types';

const ResumeParsedDataSchema: Schema= new Schema<IResumeParsedData>({
  resume_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Resume', 
    required: true,
    unique: true 
  },
  extracted_name: String,
  extracted_email: String,
  phone: String,
  skills: [String],
  experience_years: Number,
  education: [String],
  current_role: String,
  confidence_score: Number
}, { timestamps: true });

export const ResumeParsedData: Model<IResumeParsedData> = 
  mongoose.model<IResumeParsedData>('ResumeParsedData', ResumeParsedDataSchema);