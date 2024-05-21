"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "@/actions/articles";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/table/article/data-table";
import { categoryColumns } from "./columns";
import { getArticleToModerate } from "@/actions/moderators";
import toast from "react-hot-toast";

type Props = {};

const ArticleTOModerateTable = (props: Props) => {
  const { data, isLoading, isError,error } = useQuery({
    queryKey: ["articles-to-moderate"],
    queryFn: () => getArticleToModerate(),
  });
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 space-y-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton className="w-full h-12" key={i} />
        ))}
      </div>
    );
  }
  if (isError && error) {
    const _error = JSON.parse(error.message)
    toast.error(_error.detail)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-lg md:text-2xl xl:text-4xl font-bold flex-wrap text-red-400">Error : {_error.detail}</h1>
      </div>
    );
  }

  if(!isError && data?.results){
    return (
        <div>
          <DataTable columns={categoryColumns} data={data?.results!} />
        </div>
      );
  }
  return null;
};

export default ArticleTOModerateTable;
