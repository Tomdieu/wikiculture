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
import { NotificationPaginationType } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  notificationPagination: NotificationPaginationType;
  currentPage?: number;
  itemsPerPage?: number;
};

const NotificationPagination = ({
  notificationPagination,
  currentPage = 1,
  itemsPerPage = 20,
}: Props) => {
  const router = useRouter();

  let pages = [];
  for (let i = 1; i <= Math.ceil(notificationPagination.count / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < notificationPagination.count) {
      router.push(`/dashboard/notifications/?page=${currentPage + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.push(`/dashboard/notifications/?page=${currentPage - 1}`);
    }
  };

  const goToPage = (page:number) =>{
    router.push(`/dashboard/notifications/?page=${page}`);

  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className={cn("cursor-pointer select-none",)}>
          <Button
            aria-label="Go to previous page"
            disabled={!Boolean(notificationPagination.prevoius)} onClick={handlePrevPage} variant={"ghost"} size={"default"} className={cn("gap-1 pl-2.5")}>
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
            <PaginationLink onClick={()=>goToPage(page)}>{page}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem className="cursor-pointer select-none">
          <Button
            aria-label="Go to next page"
            size="default"
            onClick={handleNextPage}
            disabled={!Boolean(notificationPagination.next)}
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

export default NotificationPagination;
