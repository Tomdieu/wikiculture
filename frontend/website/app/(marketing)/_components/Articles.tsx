import { getLatestArticles } from "@/actions/articles";
import { formatDate } from "@/lib/formatDate";
import React from "react";
import DOMPurify from 'dompurify';
import Article from "./Article";
import Link from "next/link";
type Props = {};

const Articles = async (props: Props) => {
  const latestArticles = await getLatestArticles()
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
           <Link href={`/articles/${article.id}`}>
            <Article  article={article}/>
           </Link>
          )
        })}
      </div>
    </section>
  );
};

export default Articles;
