"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Button } from "./ui/button";
import { fetchComments } from "@/lib/serverAction";

const CommentInput =  ({ postId }: { postId: string }) => {
  const { user } = useUser();
  
  const controlFormAction = async (formValue: FormData) => {
    try {
        if(!user){
            throw new Error('user not authenticated')
        }
        await fetchComments(postId, formValue);
    } catch (error) {
        
    }
  };

  return (
    <form action={(FormData) => controlFormAction(FormData)}>
      <div className="flex items-center gap-3 my-4">
        <Image
          src={user?.imageUrl!}
          height={30}
          width={30}
          alt="profile photo"
          className="rounded-full cursor-pointer"
        />
        <Input
          type="text"
          name="inputData"
          className="rounded-3xl"
          placeholder="Add a comment"
        />
        <Button className="bg-blue-500 text-zinc-200" >
          send
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
