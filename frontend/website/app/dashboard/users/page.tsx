
import React from "react";
import UserTable from "./users-table";
import AddUser from "./_components/add-user";

type Props = {};

const UsersPage = (props: Props) => {
  return (
    <div className="w-full h-full container mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Users</h1>
        <AddUser />
      </div>
      <UserTable />
    </div>
  );
};

export default UsersPage;
