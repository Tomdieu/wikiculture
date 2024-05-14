import React from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ArticleType } from "@/types";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  article: ArticleType;
};

const MediaHover = ({ article }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          className="text-blue-500 text-ellipsis overflow-hidden line-clamp-1"
        >
          {article.cover_image}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <Dialog>
          <DialogTrigger asChild>
            <Image
              src={article.cover_image}
              width={320}
              height={320}
              alt={article.title}
            />
          </DialogTrigger>
          <DialogContent forceMount className="sm:max-w-2xl">
            <Image
              src={article.cover_image}
              width={650}
              height={650}
              alt={article.title}
            />
          </DialogContent>
        </Dialog>
      </HoverCardContent>
    </HoverCard>
  );
};

export default MediaHover;
