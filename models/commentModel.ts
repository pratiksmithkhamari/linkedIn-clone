import mongoose, { Model, Document } from "mongoose";
import { UserInterFace } from "./userModel";

export interface CommentInterface {
  text: string;
  user: UserInterFace;
}

export interface CommentDocument extends CommentInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema<CommentDocument>({
  text: {
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
});

export const Comment: Model<CommentDocument> =
  mongoose.models.Comment ||
  mongoose.model<CommentDocument>("Comment", commentSchema);
