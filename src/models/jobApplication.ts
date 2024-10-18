import mongoose, { Document, Schema } from "mongoose";

export interface JobApplication extends Document {
  jobId: mongoose.Schema.Types.ObjectId; // Reference to the Job
  applicant: string; // Wallet address of the applicant
  resume: string; // Optional: URL or path to the resume
  coverLetter?: string; // Optional: Cover letter text
  appliedAt: Date;
}

const JobApplicationSchema: Schema = new Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: String, required: true },
  resume: { type: String, required: true },
  coverLetter: { type: String },
  appliedAt: { type: Date, default: Date.now },
});

const JobApplication = mongoose.model<JobApplication>(
  "JobApplication",
  JobApplicationSchema
);

export default JobApplication;
