import { AvatarImage,Avatar } from "@/components/ui/avatar";

import React from "react";

const UserAvatar = ({ srcData }: { srcData: string }) => {
  return (
    <div className="">
      {/* <Image src={userDetails && userDetails?.imageUrl} alt='useravatar' height={200} width={200} className='rounded-full w-[4.3rem] h-16'/> */}
      <Avatar className=" cursor-pointer h-14 w-14">
        <AvatarImage src={srcData} alt="UserProfile" className=""/>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
