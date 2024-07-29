import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, Repeat2, Send, ThumbsUp } from "lucide-react";

const SocialMedia = () => {
  const buttonContent = [
    {
      icon: <ThumbsUp />,
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
      <div className="max-w-[100%] sm:max-w-[100%]  mx-auto flex gap-4">
        {buttonContent?.map((val) => {
          return (
            <>
              <Button
                variant={"ghost"}
                className="flex items-center text-gray-700 justify-center gap-2"
              >
                {val?.icon}
                {val?.text}
              </Button>
            </>
          );
        })}

        
      </div>
    </div>
  );
};

export default SocialMedia;
