import { dbConnection } from "@/connection/dbConnection";
import { Post } from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  await dbConnection();
  try {
    const post = await Post.findById({ _id: params.postId });
    if (!post) {
      return NextResponse.json({ err: "post not found" });
    }
    const comment = await post.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ err: "error in fetching the comments" });
  }
};
