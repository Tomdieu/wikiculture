import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

const ArticleCardSkeleton = (props: Props) => {
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="block">
        <Skeleton className="w-full h-[225px] object-cover" />
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Skeleton className="rounded-full p-0.5 w-10 h-10 bg-gray-50" />
            <Skeleton className="h-4 w-24 ml-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleCardSkeleton