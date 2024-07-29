"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=edabfdb904954497bd3dd543d4106160"
      );
      const data = await response.json();
      console.log(data);

      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div className="">
      <h1 className="my-5 text-2xl font-bold text-zinc-800 capitalize">
        See the lastest tech news
      </h1>
      <div className="flex  justify-center  gap-11 flex-wrap ">
        {articles.map((article, index) => (
          <div className="min-h-[200px] cursor-pointer rounded-sm w-[300px] border-2 shadow-md p-2 ">
            <Image
              src={article.urlToImage}
              height={300}
              width={300}
              alt="News Image"
              className="min-w-full max-h-[100px] hover:scale-95 ease-in overflow-hidden transition-all"
            />
            <h2 className="line-clamp-1 my-4  text-xl font-semibold text-zinc-700">
              {article?.title}
            </h2>
            <p className="line-clamp-4">{article?.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
