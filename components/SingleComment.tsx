import { CommentDocument, CommentInterface } from "@/models/commentModel";
import UserAvatar from "@/utils/shareable";
import Image from "next/image";
import React from "react";
import ReactTimeago from "react-timeago";

const SingleComment = ({ comment }: { comment: CommentDocument }) => {
  return (
    <div className="ml-3 p-2 rounded-md">
      <div className="flex gap-2 items-center ">
       
        <img src={comment?.user?.profilePhoto!}  alt="profile" className="h-6 rounded-full"/>
        
        
        <h2 className="text-sm text-zinc-800 font-semibold">
          {`${comment.user.firstName} ${comment.user.lastName}`}
        </h2>
      </div>
      <p className="text-sm text-zinc-800 ml-10">{comment.text}</p>
     <ReactTimeago date={new Date(comment.createdAt)}/>
    </div>
  );
};

export default SingleComment;
