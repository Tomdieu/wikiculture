"use client";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import {
  FileStack,
  Loader2,
  MoreHorizontal,
  SaveAllIcon,
  Trash,
} from "lucide-react";
import { ArticleType } from "@/types";
import { useArticleStore } from "@/hooks/use-article-store";
import { deleteArticle } from "@/actions/articles";
import { revalidatePage } from "@/actions/revalidate";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
type Props = {
  article: ArticleType;
};

const ArticleSettings = ({ article }: Props) => {
  const { saveArticle, openVersionModel } = useArticleStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const queryClient = useQueryClient();

  const handleDelete = () => {
    setDeleting(true);
    deleteArticle(article.id)
      .then(() => {
        setDeleting(false);
        queryClient.invalidateQueries({ queryKey: ["articles", "page", "1"] });
        router.replace("/dashboard/articles/");
        router.refresh()
        revalidatePage("/dashboard/articles/");

      })
      .finally(() => {
        toast.success("Article deleted successfully")

        queryClient.invalidateQueries({ queryKey: ["articles", "page", "1"] });
        setDeleting(false);
      });
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confim Delete?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you really want to delete the article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={deleting} onClick={handleDelete}>
              <Loader2 className={cn("w-4 h-4 animate-spin",{
                "hidden":!deleting
              })} /> Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <MoreHorizontal className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          align="end"
          alignOffset={8}
          forceMount
        >
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="w-full space-y-1 space-x-1">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={saveArticle}
                className="cursor-pointer text-sm w-full flex items-center text-green-500 dark:text-green-500"
              >
                <SaveAllIcon className="w-4 h-4 mr-2" />
                Save
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={openVersionModel}
                className="cursor-pointer text-sm w-full flex items-center text-blue-500 dark:text-blue-500"
              >
                <FileStack className="w-4 h-4 mr-2" />
                Versions
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-4" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setOpen(true)}
                className="cursor-pointer text-sm w-full flex items-center text-red-400 dark:text-red-300"
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete Article
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ArticleSettings;
