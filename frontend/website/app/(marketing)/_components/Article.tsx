"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/formatDate";
import { ArticleType } from "@/types";
import DOMPurify from "dompurify";
import React from "react";

type Props = {
  article: ArticleType;
};

const Article = ({ article }: Props) => {
  return (
    <article className="flex max-w-xl flex-col items-start justify-between border p-5 rounded-sm">
      <div className="flex items-center gap-x-4 text-xs w-full">
        <time dateTime={article.created_at} className="text-gray-500">
          {formatDate(article.created_at)}
        </time>

        <div className="flex-1 overflow-hidden">
          <div className="flex items-center space-x-2 overflow-hidden whitespace-nowrap">
            {article.categories.map((cat) => (
              <div className="rounded-full bg-gray-50 px-3 py-1.5 ">
                <a
                href="#"
                className="relative z-10 text-xs font-medium text-gray-600 hover:bg-gray-100 overflow-hidden text-ellipsis whitespace-nowrap"
                key={cat.id} // Ensure each element has a unique key if using map
              >
                <span className="sr-only">{cat.name}</span>
                {cat.name.toUpperCase()}
              </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="group">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href="#">
            <span className=""></span>
            {article.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-4 text-sm leading-6 text-gray-600">
          {DOMPurify.sanitize(article.content, { ALLOWED_TAGS: ["b"] })}
        </p>
      </div>
      <div className="mt-8 flex items-center gap-x-4">
        {/* <img
          src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          className="h-10 w-10 rounded-full bg-gray-50"
        /> */}
        <Avatar className="rounded-full p-0.5 w-10 h-10">
          <AvatarImage
            className="h-10 w-10 rounded-full bg-gray-50"
            src={article.author.image || ""}
          />
          <AvatarFallback className="rounded-full h-10 w-10  shadow-sm uppercase">
            {article.author.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href="#">
              <span className=""></span>
              {article.author.username}
            </a>
          </p>
          <p className="text-gray-600">{article.author.bio || "Writer"}</p>
        </div>
      </div>
    </article>
  );
};

export default Article;
