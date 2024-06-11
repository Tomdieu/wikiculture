"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticles } from "@/actions/articles";
import { Skeleton } from "@/components/ui/skeleton";
import Article from "./Article";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Pagination from "./pagination";
import { Input } from "@/components/ui/input";
import { ArticleType } from "@/types";
import { Button } from "@/components/ui/button";
import { BookPlusIcon } from "lucide-react";

type Props = {};

const ArticleTable = (props: Props) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [articlesToDisplay, setArticleToDisplay] = useState<ArticleType[]>([]);
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles", "page", page],
    queryFn: () => getArticles(parseInt(page.toString())),
  });

  useEffect(() => {
    if (data?.results) {
      setArticleToDisplay(data.results);
    }
  }, [data?.results]);

  useEffect(() => {
    if (search) {
      const _articleToDisplay =
        data?.results.filter(
          (article) =>
            article.title.toLocaleLowerCase().includes(search) ||
            article.content.toLocaleLowerCase().includes(search) ||
            article.tags.includes(search)
        ) ||
        data?.results.filter((article) =>
          article.categories.filter((c) =>
            c.name.toLocaleLowerCase().includes(search)
          )
        );

      setArticleToDisplay(_articleToDisplay!);
    } else {
      setArticleToDisplay(data?.results!);
    }
  }, [search]);

  if (isLoading) {
    return (
      <div className="grid  grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4 mb-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-1">
            <Skeleton className="w-full h-52" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-5" />
          </div>
        ))}
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-full ">
        <h1 className="text-4xl">Error</h1>
      </div>
    );
  }

  // return <DataTable columns={columns} data={data!} />;

  if (data && data.results.length > 0) {
    return (
      <div className="w-full space-y-3">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          placeholder="Search article..."
        />
        {articlesToDisplay && (
          <React.Fragment>
            <div className="grid  grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4 mb-5">
              {articlesToDisplay?.map((article) => (
                <Link href={`/dashboard/articles/${article.id}/`}>
                  <Article article={article} key={article.id} />
                </Link>
              ))}
            </div>
            {articlesToDisplay.length >= 1 && (
              <Pagination
                currentPage={parseInt(page)}
                articlePagination={data!}
              />
            )}
          </React.Fragment>
        )}

        {search && articlesToDisplay.length == 0 && (
          <div>
            <h1>No Articles found</h1>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col">
        <h1 className="font-bold text-2xl">You have no articles</h1>
        <Button>
          <Link href={"/dashboard/articles/new"} className="flex items-center gap-2">
            <BookPlusIcon className="w-4 h-4" />
            Create One
          </Link>
        </Button>
      </div>
    );
  }
};

export default ArticleTable;
