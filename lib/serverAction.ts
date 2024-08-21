"use server";

import { dbConnection } from "@/connection/dbConnection";
import { Comment } from "@/models/commentModel";
import { Post } from "@/models/postModel";
import { UserInterFace } from "@/models/userModel";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// creating post using server actions
export const createPost = async (inputText: string, ImgDataUrl: string) => {
  await dbConnection();
  const user = await currentUser();
  if (!user) throw new Error("User not athenticated");
  if (!inputText) throw new Error("Input field is required");

  const image = ImgDataUrl;

  const userDatabase: UserInterFace = {
    firstName: user.firstName || "Pratik",
    lastName: user.lastName || "Khamari",
    userId: user.id,
    profilePhoto: user.imageUrl,
  };
  let uploadResponse;
  try {
    if (image) {
      //1. create post with image
      uploadResponse = await cloudinary.uploader.upload(image);
      await Post.create({
        description: inputText,
        user: userDatabase,
        imageUrl: uploadResponse?.secure_url, // yha pr image url ayega from cloudinary
      });
    } else {
      //2. create post with text only
      await Post.create({
        description: inputText,
        user: userDatabase,
      });
    }
    revalidatePath("/");
  } catch (error: any) {
    // throw new Error(error);
    console.log("error", error);
  }
};
//fetching all post
export const fetchAllPost = async () => {
  await dbConnection();
  try {
    const post = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "comments", options: { sort: { createdAt: -1 } } });
    console.log("server action fetching all post", post);
    if (!post) return [];
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.log(error);
  }
};

//delete a post

export const deletePost = async (postId: string) => {
  await dbConnection();
  const user = await currentUser();
  if (!user) {
    return { error: "You are not logged in" };
  }
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return { error: "Invalid post ID" };
  }
  const post = await Post.findById(postId);
  if (!post) {
    return { error: "Post not found" };
  }
  if (post?.user?.userId !== user.id) {
    return { error: "You are not authorized to delete this post" };
  }
  try {
    await Post.deleteOne({ _id: postId });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error in deleting the post:", error);
    return { error: "Error in deleting the post" };
  }
};

// code for creating a comments

export const fetchComments = async (postId: string, formValue: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");
    const inputText = formValue.get("inputData") as string;
    if (!inputText) {
      return { error: "Please enter a comment" };
    }
    const userData: UserInterFace = {
      firstName: user.firstName || "pratiksmith",
      lastName: user.lastName || "Khamari",
      userId: user.id,
      profilePhoto: user.imageUrl,
    };

    const post = await Post.findById({ _id: postId });
    if (!post) throw new Error("Post not found");

    const comment = await Comment.create({
      text: inputText,
      user: userData,
    });

    post?.comments?.push(comment._id);
    await post.save();
    revalidatePath("/");
  } catch (error) {
    console.error("Error in creating the comment:", error);
  }
};

