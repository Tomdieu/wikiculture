"use client";
import { getCulturalAreasByName } from "@/actions/cultural_areas";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import React from "react";
import parseHtml from "html-react-parser";
import { notFound } from "next/navigation";
import { getFilteredArticle } from "@/actions/articles";
import ArticleCardSkeleton from "../../articles/_components/_components/ArticleCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleSkeleton from "./_component/ArticleSkeleton";
import Article from "../../_components/Article";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CaretRightIcon } from "@radix-ui/react-icons";

type Props = {
  params: {
    region: string;
  };
};

const page = ({ params: { region } }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["CulturalArea", region],
    queryFn: () => getCulturalAreasByName(region),
  });
  const { data: articles, isLoading: isArticleLoading } = useQuery({
    queryKey: ["cultural_area", "articles"],
    queryFn: () => {
      const query = new URLSearchParams();
      query.append("cultural_area", data?.name!);
      const filters = query.toString();
      return getFilteredArticle(filters);
    },
    enabled: Boolean(data?.id),
  });
  if (isError) {
    return notFound();
  }
  return (
    <div className="w-full h-full flex">
      <div className="container mx-auto h-full w-full flex flex-1">
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center flex-1">
            <Loader2 className="animate-spin w-10 h-10 text-muted-foreground" />
          </div>
        )}
        {data && (
          <div className="w-full h-full flex-1 grid grid-cols-1 md:grid-cols-12 mb-4">
            <div className="prose w-full max-w-fit col-span-full lg:col-span-8">
              {parseHtml(data.description)}
            </div>
            <div className="space-y-2 w-full col-span-full lg:col-span-4">
              <div className="flex gap-x-2 items-center">
                <h1 className="font-semibold text-xl">Articles</h1>
                {articles && (
                  <span className="text-sm">({articles?.count}) found</span>
                )}
              </div>
              <div className="gap-3 flex flex-col gap-y-3">
                {isArticleLoading && (
                  <div className=" grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-1">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <ArticleSkeleton key={index} />
                    ))}
                  </div>
                )}
                <div className=" grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-1">
                  {articles?.results.slice(0,5).map((article, index) => (
                    <Link href={`/articles/${article.id}/`} key={index}>
                      <Article article={article} />
                    </Link>
                  ))}
                </div>
                  {articles && articles?.count > 5 && (
                    <Button asChild>
                        <Link href={`/articles/?cultural_area=${data.name}`}>More articles </Link>
                    </Button>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
