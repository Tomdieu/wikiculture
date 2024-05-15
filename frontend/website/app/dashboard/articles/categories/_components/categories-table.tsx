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
      <div className="grid grid-cols-1 space-y-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton className="w-full h-12" key={i} />
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

  return (
    <div>
      <DataTable columns={categoryColumns} data={data?.results!} />
    </div>
  );
};

export default CategoryTable;
