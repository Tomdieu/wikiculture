import { getLatestArticles } from "@/actions/articles";
import { formatDate } from "@/lib/formatDate";
import React from "react";
import DOMPurify from 'dompurify';
import Article from "./Article";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {};

const Articles = async (props: Props) => {
  const latestArticles = await getLatestArticles()
  if(!latestArticles){
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {Array.from({ length: 10 }).map((_, index) => (
              <div className="flex h-full max-w-xl flex-col items-start justify-between border p-5 rounded-sm">
                  <div className="flex items-center gap-x-4 text-xs w-full">
                      <Skeleton className="h-4 w-24" />
                      <div className="flex-1 overflow-hidden">
                          <div className="flex items-center space-x-2 overflow-hidden whitespace-nowrap">
                              {[...Array(3)].map((_, index) => (
                                  <Skeleton key={index} className="h-6 w-20 rounded-full bg-gray-50" />
                              ))}
                          </div>
                      </div>
                  </div>
                  <div className="group flex-1">
                      <Skeleton className="h-6 w-3/4 mt-3" />
                      <Skeleton className="h-4 w-full mt-5" />
                      <Skeleton className="h-4 w-full mt-1" />
                      <Skeleton className="h-4 w-full mt-1" />
                      <Skeleton className="h-4 w-2/3 mt-1" />
                  </div>
                  <div className="mt-8 flex items-center gap-x-4">
                      <Skeleton className="rounded-full p-0.5 w-10 h-10 bg-gray-50" />
                      <div className="text-sm leading-6">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-24 mt-1" />
                      </div>
                  </div>
              </div>
          ))}
      </div>
  )
  }
  return (
    <section className="w-full px-10 py-12 space-y-2">
      <div className="text-center space-y-2">
        <h1 className="inline-block rounded-lg px-3 py-1 text-sm">Articles</h1>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Latest Articles
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {latestArticles.map((article)=>{
          return (
           <Link key={article.id} href={`/articles/${article.id}`}>
            <Article key={article.id}  article={article}/>
           </Link>
          )
        })}
      </div>
    </section>
  );
};

export default Articles;
