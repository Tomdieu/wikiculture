"use client";
import React from "react";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useArticleStore } from "@/hooks/use-article-store";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Version from "../verison";
import { cn } from "@/lib/utils";

type Props = {};

const ArticleVersionModel = (props: Props) => {
  const { onCloseVersionModel, isOpenVersion, article } = useArticleStore();
  return (
    <Dialog open={isOpenVersion} onOpenChange={onCloseVersionModel}>
      <DialogContent className="w-full max-w-xl lg:max-w-5xl max-h-[620px] overflow-auto">
        <DialogHeader className="text-2xl font-bold">Versions</DialogHeader>
        <div className="p-2 w-full flex items-center justify-center overflow-y-auto">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full max-w-4xl"
          >
            <CarouselContent>
              {article?.history?.map((history, index) => (
                <CarouselItem
                  key={index}
                  className={cn(
                    history.history_change_reason !== "" && "2xl:basis-1/2"
                  )}
                >
                  <Version version={history} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleVersionModel;
