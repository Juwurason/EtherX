import express from "express";
import {
  applyForJob,
  createJob,
  getAllJobs,
  getJobApplicants,
} from "../controllers/JobController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

router.post("/jobs", authenticate, createJob);
router.get("/get-jobs", getAllJobs);
router.post("/apply-job", authenticate, applyForJob);
router.get("/job/:jobId/applicants", authenticate, getJobApplicants);

export default router;
