import { ArticleHistoryType, ArticleType } from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Cover from "./Cover";
import Toolbar from "./Toolbar";
import parse from "html-react-parser";
import { cleanHtml } from "@/lib/cleanHtml";
import Image from "next/image";

type VersionProps = {
  version: ArticleHistoryType;
};

const Version = ({ version }: VersionProps) => {
  return (
    <Card className="shadow-lg rounded-md p-0">
      {version.cover_image ? (
        <div className="relative">
          <Image
            src={version.cover_image || "/default-thumb.png"}
            alt="Cover"
            className="object-cover w-full"
            width={300}
            height={200}
          />
        </div>
      ) : (
        <div className="relative">
          <Image
            src={"/default-thumb.png"}
            alt="Cover"
            className="object-cover h-[200px] w-full"
            width={300}
            height={200}
          />
        </div>
      )}
      <div className="p-2">
        <article className="">
          <h1 className=" font-bold text-lg">{version.title}</h1>
          <p className="line-clamp-4">{cleanHtml(version.content! || "")}</p>
          <time dateTime={version.updated_at} className="text-gray-500">
            {new Date(version.updated_at).toLocaleString()}
          </time>
        </article>
      </div>
    </Card>
  );
};

export default Version;
