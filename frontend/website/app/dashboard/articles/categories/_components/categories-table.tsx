"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "@/actions/articles";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/table/article/data-table";
import { categoryColumns } from "./columns";
import { CategoryType } from "@/types";
import CategoryPaginator from "./pagination";
import { useSearchParams } from "next/navigation";

type Props = {};

const CategoryTable = (props: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || 1;
  const [categories,setCategories] = useState<CategoryType[]>([])

  useEffect(()=>{
    if(data?.results){
      setCategories(data.results)
    }
  },[data?.results])

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

  const handleFilter = (value:string) =>{
    if(value){

      const _categoriesToDisplay = data?.results.filter(cat=>cat.name.toLocaleLowerCase().includes(value) || cat.description?.toLocaleLowerCase().includes(value))
      setCategories(_categoriesToDisplay!)
    }else{
      setCategories(data?.results!)
    }
  }

  if(data){
    return (
      <div className="space-y-2">
        <DataTable  onChange={handleFilter} columns={categoryColumns} data={categories} />
        <CategoryPaginator categoryPaginator={data} />
      </div>
    );
  }

  return null;

  
};

export default CategoryTable;
