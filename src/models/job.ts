// src/models/job.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  company: string;
  salary?: number;
  location: string;
  createdBy: string; // wallet address of the user who created the job
  createdAt: Date;
}

const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  salary: { type: Number },
  location: { type: String, required: true },
  createdBy: { type: String, required: true }, // wallet address
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IJob>("Job", JobSchema);
