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
import { Copy, Delete, MoreHorizontalIcon, Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

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
  return (
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
            onClick={(e)=>{
              e.preventDefault()
              onCopy()
            }}
            className="text-muted-foreground cursor-pointer text-xs"
          >
            <Copy className="w-4 h-5 mr-2" />
            Copy Link
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500  cursor-pointer text-xs hover:text-red-300 group">
          <Trash className="w-4 h-4 mr-2 hover:text-red-500" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActiclesAction;
