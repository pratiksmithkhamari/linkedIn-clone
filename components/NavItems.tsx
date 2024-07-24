import React from "react";
import {
  Home,
  Users,
  BriefcaseBusiness,
  MessageCircleMore,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { SignedOut, SignedIn, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NavItems = () => {
  type ITEMS = {
    src: string;
    icon: JSX.Element;
    path: string;
  };
  const items: ITEMS[] = [
    {
      src: "Home",
      icon: <Home />,
      path: "/",
    },
    {
      src: "My Network",
      icon: <Users />,
      path: "/mynetwork",
    },
    {
      src: "Jobs",
      icon: <BriefcaseBusiness />,
      path: "/jobs",
    },
    {
      src: "Messaging",
      icon: <MessageCircleMore />,
      path: "/messages",
    },
    {
      src: "Notification",
      icon: <Bell />,
      path: "notifications",
    },
  ];
  return (
    <div className="flex gap-6 justify-start ">
      {items.map((item, i) => {
        return (
          <div key={i} className="md:flex hidden flex-col justify-center items-center">
            <Link
              href={item.path}
              className="flex items-center justify-center flex-col"
            >
              <h3 className="text-center text-zinc-600 text-lg cursor-pointer">
                {item.icon}
              </h3>
              <h2 className="text-[0.8rem] text-zinc-600 cursor-pointer">
                {item.src}
              </h2>
            </Link>
          </div>
        );
      })}
      <div>
        <SignedOut>
          <Button variant='outline' className="bg-slate-200">
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default NavItems;
