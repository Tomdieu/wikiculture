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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UploadCloud } from "lucide-react";

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

  if (data && data.results.length > 0) {
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
else{
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <h1 className="font-bold text-2xl">You have no files uploaded</h1>
      <Button>
        <Link href={"/dashboard/media/upload"} className="flex items-center gap-2">
          <UploadCloud className="w-4 h-4" />
          Upload One
        </Link>
      </Button>
    </div>
  );
}
};

export default MediaTable;
