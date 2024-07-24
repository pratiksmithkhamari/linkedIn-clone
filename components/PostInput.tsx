"use client";
import UserAvatar from "@/utils/shareable";
import React, { useState } from "react";
import { Input } from "./ui/input";
import DialogeBox from "@/components/DialogeBox";
const PostInput = ({ user }: { user: any }) => {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => {
    console.log('clicked');   
    setShow(true);
  };
// converting to object fromat cause from server to client only object fromet data can be passed


  return (
    <div>
      <div className="top bg-white flex items-center gap-2 p-4 md:m-0 m-2 rounded-lg shadow-sm border-2 ">
        <UserAvatar srcData={user?.imageUrl} />
        <Input
          onClick={ handleShow}
          placeholder="Start a post"
          className="rounded-3xl h-14 outline-none focus:outline-none cursor-pointer hover:bg-slate-100"
        />
        <DialogeBox setShow={setShow} show={show} src={user}/>
      </div>
    </div>
  );
};

export default PostInput;
