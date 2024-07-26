import mongoose, { Document, Model } from "mongoose";

export interface UserInterFace {
  firstName: string;
  lastName: string;
  userId: string;
  bio?: string;
  profilePhoto: string;
}

export interface UserDocument extends UserInterFace, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      unique:true,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePhoto: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User: Model<UserDocument> =
  mongoose.models?.User || mongoose.model<UserDocument>("User", userSchema);
