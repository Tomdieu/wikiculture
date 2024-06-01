"use client"
import { Skeleton } from "@/components/ui/skeleton";


const ArticleSkeleton = () => {
  return (
    <div className="w-full h-full min-h-lvh container mx-auto py-8 space-y-4">
      <div className="flex flex-col md:flex-row w-full md:space-x-3">
        <div className="w-full md:w-3/4">
          <article className="space-y-3">
            <div className="flex items-center space-x-3 text-xs">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="space-y-2 py-5">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-[35vh] w-full" />
              <Skeleton className="h-6 w-full" />
              <div className="flex space-x-2 flex-wrap">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-4 w-20" />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between space-x-3">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-6 w-20" />
                <div className="border rounded flex space-x-1">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-6 w-8" />
                <Skeleton className="h-6 w-8" />
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
          </article>
        </div>
        <div className="w-full md:w-1/4 p-0 space-y-3">
          <div className="w-full grid grid-cols-2 md:grid-cols-1 space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
          <Skeleton className="h-1 w-full" />
          <div>
            <Skeleton className="h-6 w-full" />
            <div className="grid grid-cols-1 space-y-2">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Skeleton className="h-1 w-full" />
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-40 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
