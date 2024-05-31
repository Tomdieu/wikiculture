import { CulturalAreaPaginationType } from '@/types';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type PaginationProps = {
    culturalAreaPagination: CulturalAreaPaginationType;
  currentPage?: number;
  itemsPerPage?: number;
}

const CulturalAreaPagination = ({culturalAreaPagination,
    currentPage = 1,
    itemsPerPage = 20,}: PaginationProps) => {
        const router = useRouter();

        let pages = [];
  for (let i = 1; i <= Math.ceil(culturalAreaPagination.count / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < culturalAreaPagination.count) {
      router.push(`/dashboard/cultural-areas/?page=${currentPage + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.push(`/dashboard/cultural-areas/?page=${currentPage - 1}`);
    }
  };

  const navigateToPage = (page: number) => {
    router.push(`/dashboard/cultural-areas/?page=${page}`);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <Button
            aria-label="Go to previous page"
            disabled={!Boolean(culturalAreaPagination.prevoius)} onClick={handlePrevPage} variant={"ghost"} size={"default"} className={cn("gap-1 pl-2.5")}>
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
            disabled={!Boolean(culturalAreaPagination.next)}
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
  )
}

export default CulturalAreaPagination