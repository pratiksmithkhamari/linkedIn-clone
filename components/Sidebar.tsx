import UserAvatar from "@/utils/shareable";
import Image from "next/image";
import React from "react";

const Sidebar = ({ userDetails }: { userDetails: any }) => {
  return (
    <div className="w-full  sm:block hidden   left-0 top-0 ">
      <Image
        src={"/banner.png"}
        alt="banner img"
        height={100}
        width={100}
        className="overflow-hidden h-20 rounded-t-md w-full relative"
      />

      {/* user avatar */}
      <div className="absolute top-14 left-[38%] h-14 w-14">
        <UserAvatar srcData={userDetails && userDetails?.imageUrl} />
      </div>

      <div className=" text-center p-4 bg-slate-200  overflow-hidden">
        <h2 className="mt-12 font-semibold text-lg hover:underline cursor-pointer text-zinc-900">
          {`${userDetails?.firstName} ${userDetails?.lastName}`}{" "}
        </h2>
        <h2 className="text-sm border-zinc-600 pb-3 border-b text-zinc-600 cursor-pointer">
          {userDetails?.emailAddresses[0]?.emailAddress}
        </h2>
      </div>


      <div className=" flex flex-col">
        <div className="flex bg-slate-200 pb-3  justify-between px-4  items-center">
          <h2 className="text-zinc-800 text-[0.9rem]">Post Impression</h2>
          <h2 className="text-blue-800 text-[1rem] font-semibold">23</h2>
        </div>
        <div className="flex bg-slate-200 pb-3 rounded-b-md justify-between px-4  items-center">
          <h2 className="text-zinc-800 text-[0.9rem]">Posts</h2>
          <h2 className="text-blue-800 text-[1rem] font-semibold">2</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
