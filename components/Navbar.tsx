import React from "react";
import { Input } from "./ui/input";
import SearchInput from "./SearchInput";
import Image from "next/image";
import NavItems from "./NavItems";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" bg-slate-100 w-full z-40 shadow-md">
      <header className="max-w-[80%] justify-between h-16 px-2 flex items-center mx-auto">
        <div className="flex gap-2">
          <Link href={"/"}>
            <Image
              src={"/logo.webp"}
              height={35}
              width={40}
              alt="logo"
              className="cursor-pointer"
            />
          </Link>
          <SearchInput />
        </div>
        <div className="flex gap-4">
          <NavItems />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
