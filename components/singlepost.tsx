"use client";
import { Plus } from "lucide-react";
import React, { Suspense } from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import SocialMedia from "./SocialMedia";
import ReactTimeAgo from "react-timeago";
import { useUser } from "@clerk/nextjs";
import { deletePost } from "@/lib/serverAction";
import { Button } from "./ui/button";

const Singlepost = ({ post }: { post: any }) => {
  // console.log("singlepost console", post);
  const { user } = useUser();
  const findUser = user?.id == post?.user?.userId;

  return (
    <div className="w-full my-3 m-0 sm:m-2 border-2 rounded-md shadow-md ">
      <div className="flex gap-7 m-2 ml-2">
        <div className="h-16 w-16 rounded-full">
          <Image
            src={post?.user?.profilePhoto}
            height={200}
            width={200}
            alt="profile photo"
          />
        </div>

        <div className="flex items-center  w-full justify-between">
          <div>
            <h1 className=" font-semibold text-zinc-800 mr-2">
              {post?.user?.firstName} {post?.user?.lastName}•
              <Badge className="ml-3" variant="secondary">
                You
              </Badge>
            </h1>
            <h2 className="text-xs text-zinc-600 my-1">
              @{user ? user?.username : "username"}
            </h2>
            <p className="text-xs text-zinc-600 flex gap-1">
              <ReactTimeAgo date={new Date(post?.createdAt)} />•
            </p>
          </div>
          {findUser && (
            <Button
              variant={"ghost"}
              size={"icon"}
              className="rotate-45 active:bg-slate-200 rounded-full"
              onClick={() => {
                deletePost(post._id);
              }}
            >
              {<Plus />}
            </Button>
          )}
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-zinc-800 text-sm p-2 ">{post?.description}</h2>
        <div className="flex items-center justify-center my-2">
          {post?.imageUrl && (
            <Image
              height={400}
              width={400}
              src={post?.imageUrl}
              alt="content"
              blurDataURL="blur"
              placeholder="blur"
              className="w-full max-h-[600px] mx-auto object-contain"
            />
          )}
        </div>
      </div>
      <div className="flex w-full justify-center items-center p-3 ">
        <SocialMedia post={post} />
      </div>
    </div>
  );
};

export default Singlepost;
