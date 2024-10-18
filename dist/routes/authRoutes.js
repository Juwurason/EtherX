"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Signup_1 = __importDefault(require("../controllers/Signup"));
// import { protectRoute } from "../middleware/authMiddleware";
// import { formSubmissionLimiter } from "../middleware/rateLimit";
const router = (0, express_1.Router)();
router.post("/register", Signup_1.default);
exports.default = router;
