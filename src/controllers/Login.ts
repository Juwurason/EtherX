import { Request, Response } from "express";
import Users from "../models/users";

const login = async (req: Request, res: Response) => {
  const { walletAddress } = req.body;

  try {
    const user = await Users.findOne({ walletAddress });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export default login;
