import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { UserPaginationType } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  userPagination: UserPaginationType;
  currentPage?: number;
  itemsPerPage?: number;
};

const UsersPagination = ({
  userPagination,
  currentPage = 1,
  itemsPerPage = 20,
}: Props) => {
  const router = useRouter();

  let pages = [];
  for (let i = 1; i <= Math.ceil(userPagination.count / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < userPagination.count) {
      router.push(`/dashboard/users/?page=${currentPage + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.push(`/dashboard/users/?page=${currentPage - 1}`);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer select-none">
          <PaginationPrevious onClick={handlePrevPage} />
        </PaginationItem>

        {pages.map((page, idx) => (
          <PaginationItem
            key={idx}
            className={cn(
              currentPage === page && "bg-neutral-100 rounded-md",
              ""
            )}
          >
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem className="cursor-pointer select-none">
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default UsersPagination;
