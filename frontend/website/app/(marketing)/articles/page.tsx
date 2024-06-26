"use client";
import React from "react";
import Sidebar from "./_components/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useFilterStore } from "@/hooks/use-filter";
import { useSearchParams } from "next/navigation";
import ArticlesList from "./_components/ArticlesList";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

type Props = {};

const ArticlesPage = (props: Props) => {
  const filters = useFilterStore();

  return (
    <ResizablePanelGroup direction="horizontal" className="flex h-full">
      <ResizablePanel defaultSize={25} className="hidden md:flex">
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={75} minSize={25}>
        <div className="w-full h-full p-2 min-h-screen relative">
          <div className="md:hidden absolute top-2 right-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <FilterIcon className="w-4 h-4 text-muted-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"}>
                <SheetClose asChild>
                  <Sidebar />
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
          {!filters.getQueryParams() && (
            <div className="flex w-full h-full items-center justify-center">
              <p className="text-sm lg:text-2xl font-medium">
                Please select some filters to list some articles!
              </p>
            </div>
          )}
          {filters.getQueryParams() && <ArticlesList />}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ArticlesPage;
