"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "@/actions/articles";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/table/article/data-table";
import { categoryColumns } from "./columns";

type Props = {};

const CategoryTable = (props: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
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
  if (isError) {
    return (
      <div className="w-full h-full ">
        <h1 className="text-4xl">Error</h1>
      </div>
    );
  }

  console.log(data);
  return (
    <div>
      <DataTable columns={categoryColumns} data={data?.results!} />
    </div>
  );
};

export default CategoryTable;
