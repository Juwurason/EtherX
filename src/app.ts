import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import "./config/passport";

dotenv.config();

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(
  cors({
    origin: "*", // Allow all origins or restrict to specific domains
    credentials: true, // If needed, allow credentials like cookies
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);

export default app;
