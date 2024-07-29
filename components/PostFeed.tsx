import React from "react";
import Singlepost from "./singlepost";
import { PostDocument } from "@/models/postModel";

const PostFeed = ({allposts}:{allposts:PostDocument[]}) => {
  console.log("helll yaa",allposts);
  
  return (
    <div className=" mx-2 sm:mx-0 ">
      <div className="bottom bg-white flex justify-center items-center flex-col overflow-y-scroll shadow-lg border-2 rounded-lg p-2 min-h-80">
        {allposts?.map((post)=>{
          
          
          return(
            <Singlepost key={post?._id} post={post}/>
          )
        })}
        
      </div>
    </div>
  );
};

export default PostFeed;
