"use client";
import { getArticles } from "@/actions/articles";
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
    queryFn: () => getArticles(),
  });

  if (isLoading) {
    return <Skeleton className="w-6 h-4" />;
  }

  return <span className={cn("text-xl",className)}>{data?.length}</span>;
};

export default TotalArticle;
