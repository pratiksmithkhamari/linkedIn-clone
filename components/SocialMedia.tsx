import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MessageCircle, Repeat2, Send, ThumbsUp } from "lucide-react";
import { PostDocument } from "@/models/postModel";
import { useUser } from "@clerk/nextjs";
import Comments from "./Comments";
import CommentInput from "./CommentInput";

const SocialMedia = ({ post }: { post: PostDocument }) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [commentOpen, setCommentOpen] = useState(false);

  const handleLike = async () => {
    console.log('clicked');

    if (!user) throw new Error("User not authenticated");
    
    const tempLiked = liked;
    const tempLikes = likes;
    const dislike = likes?.filter((userId) => userId !== user.id);
    const like = [...(likes ?? []), user.id];
    const newLike = liked ? dislike : like;

    try {
      const res = await fetch(
        `/api/posts/${post._id}${liked ? "/dislike" : "/like"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user.id),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to like or dislike");
      }

      const fetchAllLikes = await fetch(`/api/posts/${post._id}/like`);
      if (!fetchAllLikes.ok) {
        throw new Error("Failed to fetch likes");
      }

      const likeData = await fetchAllLikes.json();
      setLikes(likeData);
      setLiked(!liked);
    } catch (error) {
      setLikes(tempLikes);
      setLiked(tempLiked);
    }
  };

  useEffect(() => {
    // Update the UI when the likes state changes
    console.log("Likes updated:", likes?.length);
  }, [likes]);

  const handleComment = () => {
    setCommentOpen(!commentOpen);
  };

  const buttonContent = [
    {
      icon: <ThumbsUp />,
      text: liked ? "Unlike" : "Like",
      onClick: handleLike,
    },
    {
      icon: <MessageCircle />,
      text: "Comment",
      onClick: handleComment,
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
      {(likes && likes.length > 0) && (
        <p className="text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer">
          {likes.length} likes
        </p>
      )}
      {post.comments && post.comments.length > 0 && (
        <p className="text-blue-700 hover:underline hover:cursor-pointer">
          {post.comments.length} comments
        </p>
      )}
      <div className="max-w-[100%] sm:max-w-[100%] mx-auto flex gap-4">
        {buttonContent.map((val, index) => (
          <Button
            key={index}
            variant={"ghost"}
            onClick={val.onClick}
            className="flex items-center text-gray-700 justify-center gap-2"
          >
            {val.icon}
            {val.text}
          </Button>
        ))}
      </div>
      {commentOpen && (
        <div className="text-zinc-800 transition-all ease-in">
          
          <CommentInput postId={post._id.toString()} />
          <Comments post={post} />
        </div>
      )}
    </div>
  );
};

export default SocialMedia;
