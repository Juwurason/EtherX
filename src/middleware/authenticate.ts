import { Request, Response, NextFunction } from "express";
import users from "../models/users";

interface AuthenticatedRequest extends Request {
  user?: {
    walletAddress: string;
    id: string;
  };
}

const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get the wallet address from the header
    const walletAddress = req.header("x-wallet-address");

    if (!walletAddress) {
      res
        .status(401)
        .json({ message: "Unauthorized: Wallet address is missing" });
      return;
    }

    // Check if the wallet address exists in the database
    const user = await users.findOne({ walletAddress });

    if (!user) {
      res
        .status(401)
        .json({ message: "Unauthorized: Wallet address not registered" });
      return;
    }

    // Attach user data to request object
    req.user = {
      walletAddress: user.walletAddress,
      id: user._id.toString(),
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res
      .status(500)
      .json({ message: "Internal server error during authentication" });
    return;
  }
};

export default authenticate;
