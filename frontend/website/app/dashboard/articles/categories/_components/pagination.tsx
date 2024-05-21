import { CategoryPaginationType } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  categoryPaginator: CategoryPaginationType;
  currentPage?: number;
  itemsPerPage?: number;
};

const CategoryPaginator = ({
  categoryPaginator,
  currentPage = 1,
  itemsPerPage = 20,
}: Props) => {

    const router = useRouter();

  let pages = [];
  for (let i = 1; i <= Math.ceil(categoryPaginator.count / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < categoryPaginator.count) {
      router.push(`/dashboard/articles/categories/?page=${currentPage + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.push(`/dashboard/articles/categories/?page=${currentPage - 1}`);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className={cn("cursor-pointer select-none",)}>
          <Button
            aria-label="Go to previous page"
            disabled={!Boolean(categoryPaginator.prevoius)} onClick={handlePrevPage} variant={"ghost"} size={"default"} className={cn("gap-1 pl-2.5")}>
            <ChevronLeftIcon className="h-4 w-4" />
            <span>Previous</span>
          </Button>
        </PaginationItem>

        {pages.map((page, idx) => (
          <PaginationItem
            key={idx}
            className={cn(
              currentPage === page && "bg-neutral-100 rounded-md dark:bg-primary-foreground",
              ""
            )}
          >
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem className="cursor-pointer select-none">
          <Button
            aria-label="Go to next page"
            size="default"
            onClick={handleNextPage}
            disabled={!Boolean(categoryPaginator.next)}
            className={cn("gap-1 pr-2.5")}
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

export default CategoryPaginator;
