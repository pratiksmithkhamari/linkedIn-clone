import { dbConnection } from "@/connection/dbConnection";
import { Post } from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    await dbConnection();
    const { userId } = await req.json();
    const post = await Post.findById(params.postId);

    if (!post) {
      return NextResponse.json({ msg: "Post not found" }, { status: 404 });
    }

    await post.updateOne({ $pull: { likes: userId } });
    return NextResponse.json({ msg: "Disliked the post successfully" });
  } catch (error) {
    return NextResponse.json({ err: "An error occurred" }, { status: 500 });
  }
};
