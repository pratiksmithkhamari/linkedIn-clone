import Feed from "@/components/Feed";
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

// export type USER = {
//   id: string;
//   imageUrl: string;
//   firstName: string;
//   lastName: string;
// };

export default async function Home() {
  const user = await currentUser();
  console.log(user);

  

  return (
    <main className="mt-7 ">
      <div className=" flex gap-[2.1%] justify-center items-center ">
        <div className="side bg-violet-200 w-[21%] rounded-t-md">
          <Sidebar userDetails={user} />
        </div>
        <div className="feed  min-h-[400px] w-[50%]">
          <Feed userDetails={user}/>
        </div>
        <div className="right bg-pink-200 w-[25%]">
          <News />
        </div>
      </div>
    </main>
  );
}
