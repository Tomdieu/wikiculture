"use client";
import { getCulturalAreas } from "@/actions/cultural_areas";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { data: cultural_areas, isLoading: isCulturalAreaLoading } = useQuery({
    queryKey: ["cultural-areas-regions"],
    queryFn: () => getCulturalAreas(),
  });
  console.log(cultural_areas?.results);
  return (
    <div className="w-full h-full py-2">
      <div className="container mx-auto h-full py-10">
        <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-lg font-bold">Cultural Areas</h1>
          <ul className="grid gap-6 space-y-2">
            {isCulturalAreaLoading && (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <li key={index} className="w-full space-y-2">
                    <div className="grid gap-1 w-full">
                      <Skeleton className="w-[60%] h-[20px]" />
                      <div className="space-y-1">
                        <Skeleton className="w-full h-[15px]" />
                        <Skeleton className="w-[90%] h-[15px]" />
                        <Skeleton className="w-[60%] h-[15px]" />
                      </div>
                    </div>
                  </li>
                ))}
              </>
            )}
            {cultural_areas?.results.map((culturalArea, index) => (
              <li key={index}>
                <div className="grid gap-1">
                  <Link href={`/cultural-regions/${culturalArea.name}`} className="hover:underline">
                    <h3 className="text-xl font-bold">{culturalArea.name}</h3>
                  </Link>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-5">
                    {DOMPurify.sanitize(culturalArea.description, {
                      ALLOWED_TAGS: ["b"],
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
