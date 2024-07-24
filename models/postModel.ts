import mongoose, { Model, Document } from "mongoose";
import { UserInterFace } from "./userModel";

export interface PostInterface {
  description: string;
  user: UserInterFace;
  imageUrl?: string;
  likes?: string[];
  comments?: any;
}

export interface PostDocument extends PostInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<PostDocument>(
  {
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Post: Model<PostDocument> =
  mongoose.models.Post || mongoose.model<PostDocument>("Post", postSchema);
