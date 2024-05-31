"use client";
import { getUsers } from "@/actions/users";
import { DataTable } from "@/components/table/article/data-table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { userColumns } from "./_components/columns";
import UsersPagination from "./_components/users-pagination";
import { UserType } from "@/types";

type Props = {};

const UserTable = (props: Props) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", "page", page],
    queryFn: () => getUsers(page),
  });

  
  const [users, setUsers] = useState<UserType[]>([]);
  
  useEffect(() => {
    if (data?.results) {
      setUsers(data.results);
    }
  }, [data?.results]);
  console.log(data)
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }
  
  const handleFilter = (value: string) => {
    if (value) {
      const _usersToDisplay = data?.results.filter(
        (user) =>
          user.username.toLocaleLowerCase().includes(value) ||
          user.first_name?.toLocaleLowerCase().includes(value) ||
          user.last_name?.toLocaleLowerCase().includes(value) ||
          user.email?.toLocaleLowerCase().includes(value) ||
          user.user_type?.toLocaleLowerCase().includes(value)
      );
      setUsers(_usersToDisplay!);
    } else {
      setUsers(data?.results!);
    }
  };

  if (data && data.results) {
    return (
      <div className="space-y-4">
        <DataTable onChange={handleFilter} columns={userColumns} data={users} />
        {data.count > 1 && (
          <UsersPagination currentPage={parseInt(page)} userPagination={data} />
        )}
      </div>
    );
  }
  return null;
};

export default UserTable;
