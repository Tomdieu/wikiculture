"use client"
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticles } from "@/actions/articles";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const ArticleTable = (props: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(),
  });
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 space-x-2 gap-2 p-3">
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-[80%] h-14" />
        <Skeleton className="w-[60%] h-12" />
        <Skeleton className="w-[40%] h-10" />
        <Skeleton className="w-[20%] h-18" />
      </div>
    );
  }
  if(isError){
    return (
      <div className="w-full h-full ">
        <h1 className="text-4xl">Error</h1>
      </div>
    )
  }
  return <DataTable columns={columns} data={data!} />;
};

export default ArticleTable;
