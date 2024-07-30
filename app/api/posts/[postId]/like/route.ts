import { dbConnection } from "@/connection/dbConnection";
import { Post } from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    await dbConnection();
    const post = await Post.findById({_id:params.postId});
    if (!post) {
      return NextResponse.json({ msg: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post.likes);
  } catch (error:any) {
    console.log("Error in fetching the likes data", error);
    return NextResponse.json({ msg: "Error in fetching the likes data" }, { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    await dbConnection();
    const { userId } = await req.json();
    const post = await Post.findById({_id:params.postId});
    if (!post) {
      return NextResponse.json({ msg: "Post not found" }, { status: 404 });
    }
    await post.updateOne({ $addToSet: { likes: userId } });
    return NextResponse.json({ msg: "Liked the post successfully" });
  } catch (error) {
    console.error('Error in updating the like', error);
    return NextResponse.json({ msg: "Error in updating the like" }, { status: 500 });
  }
};
