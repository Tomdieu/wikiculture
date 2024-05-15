"use client";
import { getUsers } from "@/actions/users";
import { DataTable } from "@/components/table/article/data-table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import { userColumns } from "./_components/columns";
import UsersPagination from "./_components/users-pagination";

type Props = {};

const UserTable = (props: Props) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", "page", page],
    queryFn: () => getUsers(page),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }
  if (data) {
    return (
      <div className="space-y-4">
        <DataTable columns={userColumns} data={data.results!} />
        {data.count > 1 && <UsersPagination userPagination={data} />}
      </div>
    );
  }
  return null;
};

export default UserTable;
