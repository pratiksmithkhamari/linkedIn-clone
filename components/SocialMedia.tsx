import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle, Repeat2, Send, ThumbsUp } from "lucide-react";
import { PostDocument } from "@/models/postModel";
import { useUser } from "@clerk/nextjs";

const SocialMedia = ({ post }: { post: PostDocument }) => {
  const { user } = useUser();
  const [likedPost, setLikedPost] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const likeHandler = async () => {
    if (!user) {
      throw new Error("User not authenticated");
    }
    const tempLiked = likedPost;
    const tempLikes = likes;
    const dislike = likes?.filter((userId) => userId !== user.id);
    const like = [...(likes ?? []), user.id];
    const newLikeOfPost = likedPost ? dislike : like;
    setLikedPost(!likedPost);
    setLikes(newLikeOfPost);

    try {
      const response = await fetch(
        `/api/posts/${post?._id}/${likedPost ? "dislike" : "like"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user.id),
        }
      );

      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        setLikedPost(tempLiked);
        
        throw new Error("Error in fetching liked details");
      }

      const fetchAllLikes = await fetch(`api/posts/${post._id}/like`);
      if (!fetchAllLikes.ok) {
        setLikes(tempLikes)
        console.error(`Error: ${fetchAllLikes.statusText}`);
        throw new Error("Error in fetching likes");
      }
      const jsonLikeData = await fetchAllLikes.json();
      setLikes(jsonLikeData);
    } catch (error) {
      console.error("Error:", error);
      setLikedPost(tempLiked);
      setLikes(tempLikes);
    }
  };

  const buttonContent = [
    {
      icon: <ThumbsUp onClick={likeHandler} />,
      text: "Like",
    },
    {
      icon: <MessageCircle />,
      text: "Comment",
    },
    {
      icon: <Repeat2 />,
      text: "Repost",
    },
    {
      icon: <Send />,
      text: "Send",
    },
  ];

  return (
    <div className="w-[95%] justify-between items-center p-2 border-t-2">
      {likes && likes.length > 0 && (<p>{likes.length}likes</p>)}
      <div className="max-w-[100%] sm:max-w-[100%] mx-auto flex gap-4">
        {buttonContent.map((val, index) => (
          <Button
            key={index}
            variant={"ghost"}
            className="flex items-center text-gray-700 justify-center gap-2"
          >
            {val.icon}
            {val.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
