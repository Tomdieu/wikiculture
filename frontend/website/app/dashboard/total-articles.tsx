"use client";
import { getArticles, getTotalArticles } from "@/actions/articles";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
    className?:string
};

const TotalArticle = ({className}: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getTotalArticles(),
  });

  if (isLoading) {
    return <Skeleton className="w-6 h-4" />;
  }

  return <span className={cn("text-xl",className)}>{data?.total}</span>;
};

export default TotalArticle;
