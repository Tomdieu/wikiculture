"use client";
import { getTotalArticles } from "@/actions/articles";
import CountUp from 'react-countup';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
    className?:string
};

const TotalArticle = ({className}: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getTotalArticles(),
  });

  if (isLoading) {
    return <Skeleton className="w-6 h-4" />;
  }

  return <span className={cn("text-xl",className)}><CountUp end={data?.total!} /> </span>;
};

export default TotalArticle;
