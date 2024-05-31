"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./village-columns";
import { useSearchParams } from "next/navigation";
import { VillageType } from "@/types";
import { getCulturalAreas } from "@/actions/cultural_areas";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/table/article/data-table";
import { getVillages } from "../../../../actions/villages";
import VillagePagination from "./Paginations";
import { useRouter } from "next/navigation";

type Props = {};

const VillageTable = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query") || "";
  const [villages, setVillages] = useState<VillageType[]>([]);
  const [search, setSearch] = useState(query);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["villages", page, "query", query],
    queryFn: () => getVillages(page, query),
  });

  useEffect(() => {
    if (data?.results) {
      setVillages(data?.results);
    }
  }, [data?.results]);

  useEffect(() => {
    if (search) {
      // const _villages =
      //     data?.results.filter(
      //         (__villages) =>
      //             __villages.name.toLocaleLowerCase().includes(search) ||
      //             __villages.description.toLocaleLowerCase().includes(search) ||
      //             __villages.region.name.toLocaleLowerCase().includes(search) ||
      //             __villages.region.cultural_area.name.toLocaleLowerCase().includes(search)

      //     )

      // setVillages(_villages!);
    //   router.push(`/dashboard/villages/?query=${search}`);
    } else {
      setVillages(data?.results!);
    }
  }, [search]);

  const handleSearch = () => {
    if(search){
        router.push(`/dashboard/villages/?query=${search}`);
    }
  }

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

  if (data && data.results && villages) {
    return (
      <div className="w-full space-y-3">
        <DataTable
          query={query}
          columns={columns}
          data={villages}
          showInput={true}
          onChange={setSearch}
          inputProps={{
            onKeyDown: (e) => {
              console.log(e)
              if(e.code=="Enter"){
                handleSearch()
              }
            },
          }}
        />
        <VillagePagination
          currentPage={parseInt(page)}
          query={query}
          villagePagination={data}
        />
      </div>
    );
  }

  return null;
};

export default VillageTable;
