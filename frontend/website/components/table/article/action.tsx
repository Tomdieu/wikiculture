import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrigin } from "@/hooks/use-origin";
import { ArticleType } from "@/types";
import { Copy, Delete, Loader2, MoreHorizontalIcon, Trash } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
import { useRouter } from "next/navigation";
import { deleteArticle } from "@/actions/articles";
import { revalidatePage } from "@/actions/revalidate";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  article: ArticleType;
};

const ActiclesAction = ({ article }: Props) => {
  const origin = useOrigin();
  const onCopy = () => {
    const url = `${origin}/articles/${article.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Url copied");
  };
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const queryClient = useQueryClient();

  const handleDelete = () => {
    setDeleting(true);
    deleteArticle(article.id)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["articles", "page", "1"] });
        setDeleting(false);
        router.replace("/dashboard/articles/");
        router.refresh();
        revalidatePage("/dashboard/articles/");
      })
      .finally(() => {
        toast.success("Article deleted successfully");
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
              <Loader2
                className={cn("w-4 h-4 animate-spin", {
                  hidden: !deleting,
                })}
              />{" "}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size={"icon"} variant={"ghost"} className="rounded-full">
            <MoreHorizontalIcon className="text-muted-foreground w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-sm">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCopy();
              }}
              className="text-muted-foreground cursor-pointer text-xs"
            >
              <Copy className="w-4 h-5 mr-2" />
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();

              e.stopPropagation();
              setOpen(true);
            }}
            className="text-red-500  cursor-pointer text-xs hover:text-red-300 group"
          >
            <Trash className="w-4 h-4 mr-2 hover:text-red-500" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActiclesAction;
