"use client"

import { Ghost, InfoIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchNews } from "@/utils/shareable";
import ReactTimeago from "react-timeago";

const News = () => {

  const [newsData, setNewsData] = useState([]);
  useEffect(()=>{
    const getData = async ()=>{
      const data = await fetchNews()
      setNewsData(data)
      console.log(data,'hruahdghavjv');
    }
    getData()
  },[])
  
  return (
    <div className="sm:block  right-0 top-0 bg-white hidden border-2 p-3 rounded-lg shadow-sm ">
      <div className="">
        <div className="flex  justify-between">
          <h2 className="text-zinc-800 font-semibold">LinkedIn News</h2>
          <Button variant='ghost' size='icon' >
            <Link href={'/news'}><InfoIcon /></Link>
           
          </Button>
        </div>

        <div className="ml-1">
          <h2 className="text-zinc-500">Top Stories</h2>
        </div>
        <div className="ml-1">
          {newsData ? (
            newsData?.map((article, index) => (
              <>
              <div className="ml-2 my-1 hover:bg-slate-200 cursor-pointer w-full p-2 rounded-lg line-clamp-4" key={index}>- {article.title}
              <p className="my-1 ml-3 text-zinc-600"><ReactTimeago date={article?.publishedAt}/></p>
              </div>
              
              </>
              

            ))
          ) : (
            <h2>Loading...</h2> 
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
