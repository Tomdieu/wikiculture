import { Button } from "@/components/ui/button";
import { ArticlePagination } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type Props = {
  articlePagination: ArticlePagination;
  page?:number;
};

const Pagination = ({ articlePagination,page=1 }: Props) => {
  return (
    <div className="flex items-center justify-center space-x-5">
      <Button
        size={"sm"}
        variant={"ghost"}
        disabled={Boolean(!articlePagination.prevoius)}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>
      <Button variant={"outline"} size={"icon"}>
        {page}
      </Button>
      <Button
        size={"sm"}
        variant={"ghost"}
        disabled={Boolean(!articlePagination.prevoius)}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Pagination;
