import { ArticleType } from "@/types";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Globe, MoreHorizontalIcon, VerifiedIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTimeSince } from "@/lib/timeSince";
import { Separator } from "@/components/ui/separator";
import ActiclesAction from "./action";
import { cleanHtml } from "@/lib/cleanHtml";

type Props = {
  article: ArticleType;
};

const Article = ({ article }: Props) => {
  return (
    <Card className="group flex flex-col relative h-full rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-lg">
      <div className="absolute top-2 right-2 opacity-0 transition group-hover:opacity-100">
        <ActiclesAction article={article} />
      </div>
      <div className="px-5 space-y-2 py-2 flex space-x-2 items-center">
        <Avatar className="rounded-full p-0.5">
          <AvatarImage
            className="rounded-full"
            src={article.author.image || ""}
          />
          <AvatarFallback className="rounded-full shadow-sm uppercase">
            {article.author.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-stone-950 dark:text-stone-50 text-sm font-bold">
            {article.author.username}
          </h1>
          <p className="text-gray-500 text-xs">
            {formatTimeSince(article.created_at)}
          </p>
        </div>
      </div>
      <div className="relative h-60 rounded-none">
        <Image
          src={article.cover_image || "/default-thumb.png"}
          layout="fill"
          objectFit="cover"
          alt=""
          className=""
        />
      </div>
      <CardContent className="flex-grow">
        <CardTitle className="text-lg font-semibold">{article.title}</CardTitle>
        <CardDescription>
          <div className="space-y-2">
            <p className="mb-3 line-clamp-3">{cleanHtml(article.content||"")}</p>
            {article.tags.map((tag) => (
              <span onClick={(e)=>e.preventDefault()} className="mr-2 py-1.5 px-3 text-xs text-slate-700 bg-slate-50 rounded-full">{tag}</span>
            ))}
          </div>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2 w-full">
          <div className="flex space-x-2 items-center">
            <p className="text-xs text-muted-foreground">Published</p>
            <span>
              <Globe
                className={cn(
                  "text-muted-foreground w-4 h-4",
                  article.is_published && "text-sky-500"
                )}
              />
            </span>
          </div>
          <Separator orientation="vertical" className="h-5" />
          <div className="flex space-x-2 items-center">
            <p className="text-xs text-muted-foreground">Approved</p>
            <span>
              <VerifiedIcon
                className={cn(
                  "text-muted-foreground w-4 h-4",
                  article.approved && "text-sky-500"
                )}
              />
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Article;
