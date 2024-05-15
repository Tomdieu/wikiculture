"use client";

import { Button } from "@/components/ui/button";
import { ArticleToModerate } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckSquare, MoreHorizontalIcon } from "lucide-react";
import parse from 'html-react-parser';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const categoryColumns: ColumnDef<ArticleToModerate>[] = [
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
    accessorKey: "title",
    header: "Title",
    cell({ row }) {
      const article = row.original;
      return (
        <span className="font-medium text-ellipsis overflow-hidden line-clamp-1">
          {article.title}
        </span>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const article = row.original;
      return <p>{parse(article.content)}</p>;
    },
  },
  {
    accessorKey: "approved",
    header: "Approved",
    cell: ({ row }) => {
      const article = row.original;
      return <CheckSquare className={cn("w-4 h-4",article.approved && "text-green-600")}/>;
    },
  },
  {
    id: "more",
    enableResizing:true,
    cell: ({ row }) => {
      const article = row.original;
      return (
        <Button size={"icon"} variant={"ghost"}>
          <MoreHorizontalIcon className="w-4 h-4 text-muted-foreground" />
        </Button>
      );
    },
  },
];
