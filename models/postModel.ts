import mongoose, { Model, Document, Schema } from "mongoose";
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
      userId: {
        type: String,
        required: true,
      },
      profilePhoto: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },

    imageUrl: {
      type: String,
      default: "",
    },
    likes: {
      type: [String],
    },

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
