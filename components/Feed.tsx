import React from "react";
import PostInput from "./PostInput";
import PostFeed from "./PostFeed";
import { fetchAllPost } from "@/lib/serverAction";
import SocialMedia from "./SocialMedia";

const Feed = async ({ userDetails }: { userDetails: any }) => {
  const allposts = await fetchAllPost();
  const userJson = JSON.parse(JSON.stringify(userDetails));
  return (
    <div className="flex-1 flex flex-col gap-4 ">
      <PostInput user={userJson} />

      <PostFeed allposts={allposts!} />
      
    </div>
  );
};

export default Feed;
