"use client"
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./regions-columns";
import { useSearchParams } from "next/navigation";
import { RegionType } from "@/types";
import { getCulturalAreas } from "@/actions/cultural_areas";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/table/article/data-table";
import { getRegions } from "../../../../actions/regions";
import RegionPagination from "./Paginations";

type Props = {}

const RegionTable = (props: Props) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const [regions, setRegions] = useState<RegionType[]>([])
    const [search, setSearch] = useState("")
    const { data, isLoading, isError } = useQuery({
        queryKey: ["regions", page],
        queryFn: () => getRegions(page)
    })

    useEffect(() => {
        if (data?.results) {
            setRegions(data?.results)
        }
    }, [data?.results])

    useEffect(() => {
        if (search) {
            const _regions =
                data?.results.filter(
                    (__region) =>
                        __region.name.toLocaleLowerCase().includes(search) ||
                        __region.description.toLocaleLowerCase().includes(search) ||
                        __region.cultural_area.name.toLocaleLowerCase().includes(search)
                )

            setRegions(_regions!);
        } else {
            setRegions(data?.results!);
        }
    }, [search]);

    if (isLoading) {
        return (
            <div className="flex flex-col w-full space-y-2 border rounded-md p-3">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-56"/>
                    <Skeleton className="h-6 w-[100px]"/>

                    </div>
                    {Array.from({length:10}).map((_,index)=><Skeleton key={index} className="h-6 w-full"/>)}

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

    if (data && data.results && regions) {
        return (
            <div className="w-full space-y-3">
                <DataTable columns={columns} data={regions} showInput={true} onChange={setSearch} />
                <RegionPagination currentPage={parseInt(page)}  regionPagination={data}/>
            </div>
        )
    }

    return null;
}

export default RegionTable