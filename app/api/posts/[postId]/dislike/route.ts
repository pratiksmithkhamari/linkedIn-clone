import { Post } from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
    req: NextRequest,
    { params }: { params: { postId: string } }
  ) => {
      try {
          const userId =await req.json() 
          const post= await Post.findById({_id:params.postId})
          if(!post){
              return NextResponse.json({msg:"post not found"})
          }
          await post.updateOne({$pull:{likes:userId}})
          return  NextResponse.json({msg:"liked the post successfully"})
      } catch (error) {
          console.log('error in updating the liked',error);
          
      }
  };
  