import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ArticlePaginationType } from "@/types";
import { ChevronLeft, ChevronLeftIcon, ChevronRight, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  articlePagination: ArticlePaginationType;
  currentPage?: number;
  itemsPerPage?: number;
};

const ArticlePagination = ({
  articlePagination,
  currentPage = 1,
  itemsPerPage = 20,
}: Props) => {
  const router = useRouter();

  let pages = [];
  for (let i = 1; i <= Math.ceil(articlePagination.count / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < articlePagination.count) {
      router.push(`/dashboard/articles/?page=${currentPage + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.push(`/dashboard/articles/?page=${currentPage - 1}`);
    }
  };

  const navigateToPage = (page: number) => {
    router.push(`/dashboard/articles/?page=${page}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <Button
            aria-label="Go to previous page"
            disabled={!Boolean(articlePagination.prevoius)} onClick={handlePrevPage} variant={"ghost"} size={"default"} className={cn("gap-1 pl-2.5")}>
            <ChevronLeftIcon className="h-4 w-4" />
            <span>Previous</span>
          </Button>
        </PaginationItem>

        {pages.map((page, idx) => (
          <PaginationItem
            key={idx}
            className={cn(
              currentPage === page && "bg-neutral-100 rounded-md dark:bg-primary-foreground",
              "cursor-pointer"
            )}
          >
            <PaginationLink onClick={() => navigateToPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem className="cursor-pointer">
        <Button
            aria-label="Go to next page"
            size="default"
            disabled={!Boolean(articlePagination.next)}
            className={cn("gap-1 pr-2.5")}
            onClick={handleNextPage}
            variant={"ghost"}
          >
            <span>Next</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ArticlePagination;
