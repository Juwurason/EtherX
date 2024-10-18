import { IUser } from "../../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Extend the Express request interface to include the user
    }
  }
}
