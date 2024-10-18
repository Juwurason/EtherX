import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  _id: string;
  walletAddress: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  walletAddress: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
