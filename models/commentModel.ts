import mongoose, { Model, Document } from "mongoose";
import { UserInterFace } from "./userModel";

export interface CommentInterface {
  text: string;
  user: UserInterFace;
}

export interface PostDocument extends CommentInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema<PostDocument>({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Comment: Model<PostDocument> =
  mongoose.models.Comment ||
  mongoose.model<PostDocument>("Comment", commentSchema);
