import { Request, Response } from "express";
import Job from "../models/job";
import JobApplication from "../models/jobApplication";

export const createJob = async (req: Request, res: Response) => {
  const { title, description, company, salary, location } = req.body;
  const createdBy = req.user.walletAddress;

  try {
    const newJob = new Job({
      title,
      description,
      company,
      salary,
      location,
      createdBy,
    });

    const savedJob = await newJob.save();
    res.status(201).json({ message: "Job created successfully", savedJob });
  } catch (error) {
    res.status(500).json({ error: "Failed to create job" });
  }
};
// headers: {
//   'Content-Type': 'application/json',
//   'x-wallet-address': walletAddress, // Pass wallet address in the header
// }

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    // Extract page and limit from query parameters (with default values)
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch jobs with pagination (skip and limit)
    const jobs = await Job.find().skip(skip).limit(limit);

    // Get total number of jobs for pagination
    const totalJobs = await Job.countDocuments();

    // If no jobs found, return a message
    if (jobs.length === 0) {
      res.status(404).json({ message: "No jobs found" });
      return;
    }

    // Return the paginated list of jobs along with pagination info
    res.status(200).json({
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
      pageSize: jobs.length,
      jobs,
    });
  } catch (error) {
    // Handle any errors during fetching
    res.status(500).json({ error: "Failed to retrieve jobs" });
  }
};
// const apiUrl = `https://your-backend-url.com/get-jobs?page=${page}&limit=${limit}`;

export const applyForJob = async (req: Request, res: Response) => {
  const { jobId, resume, coverLetter } = req.body;
  const applicant = req.user.walletAddress; // Get the wallet address from the request

  try {
    const application = new JobApplication({
      jobId,
      applicant,
      resume,
      coverLetter,
    });

    const savedApplication = await application.save();
    res.status(201).json({
      message: "Application submitted successfully",
      savedApplication,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to apply for job" });
  }
};

export const getJobApplicants = async (req: Request, res: Response) => {
  const { jobId } = req.params; // Get the jobId from the request parameters

  try {
    // Fetch all applications for the specified job
    const applications = await JobApplication.find({ jobId }).populate(
      "applicant",
      "walletAddress resume coverLetter"
    );

    // Check if there are no applications
    if (applications.length === 0) {
      res.status(404).json({ message: "No applicants found for this job" });
      return;
    }

    // Return the list of applications
    res.status(200).json(applications);
  } catch (error) {
    // Handle any errors during fetching
    res.status(500).json({ error: "Failed to retrieve applicants" });
  }
};
