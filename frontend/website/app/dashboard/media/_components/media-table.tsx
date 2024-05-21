"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/table/article/data-table";
import { mediaColumns } from "./columns";
import { getMedia } from "@/actions/media";
import { useSearchParams } from "next/navigation";
import { FileType } from "@/types";
import MediaPagination from "./pagination";

type Props = {};

const MediaTable = (props: Props) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || undefined;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["medias"],
    queryFn: () => getMedia(page),
  });

  const [files, setFiles] = useState<FileType[]>([]);

  useEffect(() => {
    if (data?.results) {
      setFiles(data.results);
    }
  }, [data?.results]);

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
      <div className="w-full h-full space-y-2">
        <DataTable
          columns={mediaColumns}
          data={data?.results!}
          showInput={false}
        />
        <MediaPagination filePagination={data} />
      </div>
    );
  }

  return null;
};

export default MediaTable;
