"use client";

import { Button } from "@/components/ui/button";
import { ArticleType, CategoryType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const categoryColumns: ColumnDef<CategoryType>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      const article = row.original;
      return (
        <span className="font-medium text-ellipsis overflow-hidden line-clamp-1">
          {article.name}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <p>{category.description}</p>
      );
    },
  },
  // {
  //   accessorKey: "is_cultural",
  //   header: "Is Cultural",
  //   cell: ({ row }) => {
  //     const category = row.original;
  //     return (
  //       <Checkbox value={category.is_cultural ? 1 :0} disabled/>
  //     );
  //   },
  // }
];
