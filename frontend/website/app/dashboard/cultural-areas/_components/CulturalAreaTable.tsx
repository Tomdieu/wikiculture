"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./cultural-area-columns";
import { useSearchParams } from "next/navigation";
import { CulturalAreaType } from "@/types";
import { getCulturalAreas } from "@/actions/cultural_areas";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/table/article/data-table";
import CulturalAreaPagination from "./Pagination";

type Props = {};

const CulturalAreaTable = (props: Props) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [culturalAreas, setCulturalAreas] = useState<CulturalAreaType[]>([]);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cultural-areas", page],
    queryFn: () => getCulturalAreas(page),
  });

  useEffect(() => {
    if (data?.results) {
      setCulturalAreas(data?.results);
    }
  }, [data?.results]);

  useEffect(() => {
    if (search) {
      const _culturalAreas = data?.results.filter(
        (__culturalArea) =>
          __culturalArea.name.toLocaleLowerCase().includes(search) ||
          __culturalArea.description.toLocaleLowerCase().includes(search)
      );

      setCulturalAreas(_culturalAreas!);
    } else {
      setCulturalAreas(data?.results!);
    }
  }, [search]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full space-y-2 border rounded-md p-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-6 w-[100px]" />
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-6 w-full" />
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

  if (data && culturalAreas) {
    return (
      <div className="w-full space-y-3">
        <DataTable
          columns={columns}
          data={culturalAreas}
          showInput={true}
          onChange={setSearch}
        />
        <CulturalAreaPagination
          currentPage={parseInt(page)}
          culturalAreaPagination={data}
        />
      </div>
    );
  }

  return <div></div>;
};

export default CulturalAreaTable;
