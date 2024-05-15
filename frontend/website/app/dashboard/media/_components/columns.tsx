"use client";

import { FileType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const mediaColumns: ColumnDef<FileType>[] = [
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
      const file = row.original;
      return <span className="text-xs">{file.id}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      const file = row.original;
      return (
        <span className="font-medium text-ellipsis overflow-hidden line-clamp-1 text-xs">
          {file.name}
        </span>
      );
    },
  },
  {
    accessorKey: "file",
    header: "Url",
    cell: ({ row }) => {
      const file = row.original;
      return <span className="text-ellipsis line-clamp-1 text-xs">{file.file}</span>;
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      const file = row.original;
      return <span text-xs>{Math.round(file.size / 1024)} KB </span>;
    },
    minSize:300
  },
  {
    accessorKey: "user_id",
    header: "User id",
    cell: ({ row }) => {
      const file = row.original;
      return <span text-xs>{file.user_id}</span>;
    },
    minSize:200,
    size:200
  },
  {
    accessorKey: "uploaded_at",
    header: "Uploaded At",
    cell: ({ row }) => {
      const file = row.original;
      return (
        <p className="line-clamp-1 text-ellipsis text-xs">
          {new Date(file.uploaded_at).toUTCString()}
        </p>
      );
    },
  },
  {
    id:"settings",
    cell:({row})=>{
        const file = row.original
        return (
            <Button variant={"ghost"} size={"icon"}>
                <MoreHorizontalIcon  className="w-4 h-4 text-muted-foreground"/>
            </Button>
        )
    }
  }
];
