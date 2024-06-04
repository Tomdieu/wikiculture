import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ArticleSkeleton = () => {
  return (
    <div className="flex h-full max-w-xl flex-col items-start justify-between border p-5 rounded-sm">
      <div className="flex items-center gap-x-4 text-xs w-full">
        <Skeleton className="h-4 w-24" />
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center space-x-2 overflow-hidden whitespace-nowrap">
            {[...Array(3)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-6 w-20 rounded-full bg-gray-50"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="group flex-1">
        <Skeleton className="h-6 w-3/4 mt-3" />
        <Skeleton className="h-4 w-full mt-5" />
        <Skeleton className="h-4 w-full mt-1" />
        <Skeleton className="h-4 w-full mt-1" />
        <Skeleton className="h-4 w-2/3 mt-1" />
      </div>
      <div className="mt-8 flex items-center gap-x-4">
        <Skeleton className="rounded-full p-0.5 w-10 h-10 bg-gray-50" />
        <div className="text-sm leading-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24 mt-1" />
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
