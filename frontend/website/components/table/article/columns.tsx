"use client";

import { Button } from "@/components/ui/button";
import { ArticleType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Globe, MoreHorizontalIcon, VerifiedIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ActiclesAction from "./action";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import MediaHover from "./MediaHover";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ArticleType>[] = [
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
    accessorKey: "cover_image",
    header: "Cover image",
    cell: ({ row }) => {
      const article = row.original;
      return (
        <MediaHover article={article} />
      );
    },
  },
  {
    accessorKey: "author.username",
    header: "Author",
    cell: ({ row }) => {
      const { data } = useSession();
      const article = row.original;
      return (
        <span className="border max-w-fit px-2 rounded-full text-muted-foreground txt-xs flex items-center justify-center">
          {parseInt(data?.user?.id!) == article.author?.id ? "You" : article.author.username}
        </span>
      );
    },
  },
  {
    accessorKey: "is_published",
    header: "Published",
    cell: ({ row }) => {
      const article = row.original;
      return <Globe className={cn("text-muted-foreground w-4 h-4",article.is_published && "text-sky-500 w-4 h-4")} />;
     
    },
  },
  {
    accessorKey: "approved",
    header: "Approved",
    cell:({row})=>{
      const article = row.original;
      return <VerifiedIcon className={cn("text-muted-foreground w-4 h-4",article.approved && "text-sky-500 w-4 h-4")}/>
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const article = row.original;
      return <ActiclesAction article={article} />;
    },
  },
];
