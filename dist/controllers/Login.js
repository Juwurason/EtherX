"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
const login = async (req, res) => {
    const { walletAddress } = req.body;
    try {
        const user = await Users_1.default.findOne({ walletAddress });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        res.status(200).json({ message: "Login successful", user });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.default = login;
