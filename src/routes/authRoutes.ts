import { Router } from "express";
import login from "../controllers/Login";
import signup from "../controllers/Signup";
// import { protectRoute } from "../middleware/authMiddleware";
// import { formSubmissionLimiter } from "../middleware/rateLimit";

const router = Router();

router.post("/register", signup);
router.post("/login", login);
export default router;
