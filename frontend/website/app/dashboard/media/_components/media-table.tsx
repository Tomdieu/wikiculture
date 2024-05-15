"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/table/article/data-table";
import { mediaColumns } from "./columns";
import { getMedia } from "@/actions/media";
import { useSearchParams } from "next/navigation";

type Props = {};

const MediaTable = (props: Props) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || undefined;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["medias"],
    queryFn: () => getMedia(page),
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


  if (data) {
    return (
      <div>
        <DataTable columns={mediaColumns} data={data?.results!} />

      </div>
    );
  }

  return null;
};

export default MediaTable;
