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
import { ChevronLeft, ChevronRight } from "lucide-react";
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
          <PaginationPrevious onClick={handlePrevPage} />
        </PaginationItem>

        {pages.map((page, idx) => (
          <PaginationItem
            key={idx}
            className={cn(
              currentPage === page && "bg-neutral-100 rounded-md",
              "cursor-pointer"
            )}
          >
            <PaginationLink onClick={() => navigateToPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ArticlePagination;
