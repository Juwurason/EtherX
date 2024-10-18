"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
const signup = async (req, res) => {
    const { walletAddress } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await Users_1.default.findOne({ walletAddress });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        const newUser = new Users_1.default({ walletAddress });
        await newUser.save();
        res
            .status(201)
            .json({ message: "User signed up successfully", user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.default = signup;
