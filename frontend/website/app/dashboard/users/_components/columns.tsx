"use client";

import { Button } from "@/components/ui/button";
import { ArticleType, CategoryType, UserType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { formatTimeSince } from "@/lib/timeSince";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const userColumns: ColumnDef<UserType>[] = [
  {
    id: "select",
    header({ table }) {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => (
     <div> <Checkbox
     checked={row.getIsSelected()}
     onCheckedChange={(value) => row.toggleSelected(!!value)}
     aria-label="Select row"
     className="w-4 h-4"
   /></div>

    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Link
          href={`/dashboard/articles/${id}/`}
          className="font-bold text-sky-400 hover:underline"
        >
          {id}
        </Link>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell({ row }) {
      const user = row.original;
      return (
        <span className="font-medium text-ellipsis overflow-hidden line-clamp-1">
          {user.username}
        </span>
      );
    },
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <span>{user.first_name}</span>
      );
    },
  },
  {
    accessorKey: "last_name",
    header: "Last name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <span>{user.last_name}</span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <a href={`mailto:${user.email}`}>{user.email}</a>
      );
    },
  },
  {
    accessorKey: "date_joined",
    header: "Date Joined",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <p className="line-clamp-1 text-ellipsis">{formatTimeSince(user.date_joined)}</p>
      );
    },
  },
];
