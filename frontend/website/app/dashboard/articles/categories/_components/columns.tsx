"use client";

import { Button } from "@/components/ui/button";
import { ArticleType, CategoryType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, CheckCircle, CheckSquare, MoreHorizontalIcon } from "lucide-react";

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
      <div>
        {" "}
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="w-4 h-4"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      const id = row.original.id;
      return <span>{id}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      const article = row.original;
      return (
        <span className="font-medium text-xs text-ellipsis overflow-hidden line-clamp-1">
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
      return <p className="line-clamp-1 text-ellipsis text-xs overflow-hidden">{category.description}</p>;
    },
  },
  {
    enableHiding:true,
    accessorKey: "parent",
    header: "Parent",
    cell: ({ row }) => {
      const category = row.original;
      return <p>{category.parent}</p>;
    },
  },
  {
    accessorKey: "is_cultural",
    header: "Cultural",
    cell: ({ row }) => {
      const category = row.original;
      return <CheckSquare className={cn("w-4 h-4",category.is_cultural && "text-green-600")}/>;
    },
  },
  {
    id: "more",
    enableResizing:true,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <Button size={"icon"} variant={"ghost"}>
          <MoreHorizontalIcon className="w-4 h-4 text-muted-foreground" />
        </Button>
      );
    },
  },
];
