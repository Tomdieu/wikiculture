"use client";
import { getModerators, getUsers } from "@/actions/users";
import { DataTable } from "@/components/table/article/data-table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import { userColumns } from "../_components/columns";

type Props = {};

const ModeratorTable = (props: Props) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["moderators", "page", page],
    queryFn: () => getModerators(page),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }
  if (data) {
    return (
      <div>
        <DataTable columns={userColumns} data={data.results!} />
      </div>
    );
  }
  return null;
};

export default ModeratorTable;
