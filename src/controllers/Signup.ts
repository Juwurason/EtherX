import { Request, Response } from "express";
import Users from "../models/users";

const signup = async (req: Request, res: Response) => {
  const { walletAddress } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ walletAddress });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Create new user
    const newUser = new Users({ walletAddress });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User signed up successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default signup;
