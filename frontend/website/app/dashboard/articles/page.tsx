import ArticleTable from "@/components/table/article/ArticleTable";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const AllArticles = (props: Props) => {
  return (
    <div className="container mx-auto h-full w-full space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl lg:text-2xl xl:text-4xl">Articles</h1>
        <Button className="" variant={"ghost"} size={"icon"} asChild>
          <Link href={"/dashboard/articles/new"}>
            <BookPlus className="text-muted-foreground" />
            <span className="sr-only">New article</span>
          </Link>
        </Button>
      </div>
      <ArticleTable />
    </div>
  );
};

export default AllArticles;
