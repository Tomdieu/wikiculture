"use client";

import JoditEditor from "@/components/editor/JoditEditor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CulturalAreaType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import DOMPurify from "dompurify";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<CulturalAreaType>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Link
          aria-disabled
          href={`#`}
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
      const culturalArea = row.original;
      return (
        <span className="font-medium text-ellipsis overflow-hidden line-clamp-1">
          {culturalArea.name}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell({ row }) {
      const culturalArea = row.original;
      return (
        <p className="font-medium text-ellipsis overflow-hidden line-clamp-1">
          {DOMPurify.sanitize(culturalArea.description, {
            ALLOWED_TAGS: ["b"],
          })}
        </p>
      );
    },
  },
  {
    id: "options",
    cell: ({ row }) => {
      const culturalArea = row.original;
      return (
        <Dialog onOpenChange={() => {}}>
          <DialogTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MoreHorizontalIcon className="text-muted-foreground w-4 h-4" />
              <span className="sr-only">More</span>
            </Button>
          </DialogTrigger>
          <DialogContent
            className={cn("w-full lg:max-w-5xl p-0 overflow-y-auto prose max-w-fit",{"h-full":culturalArea.description.length > 200})}
            forceMount
          >
            {culturalArea.description.length === 0 ? (
              <div className="w-full h-full items-center justify-center flex">
                <h1>No Descriptions for this cultural area</h1>
              </div>
            ):(
              <JoditEditor
              toolbar={false}
              disable
              readonly
              safeMode
              statusbar={false}
              value={culturalArea.description}
              onChange={() => {}}
              className={"prose prose-blue"}
            />
            )}
            
          </DialogContent>
        </Dialog>
      );
    },
  },
];
