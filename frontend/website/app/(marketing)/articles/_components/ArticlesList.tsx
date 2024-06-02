import { getFilteredArticle } from '@/actions/articles';
import { useFilterStore } from '@/hooks/use-filter';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import Article from '../../_components/Article';
import { Skeleton } from '@/components/ui/skeleton';
import ArticlePagination from '@/components/table/article/pagination';

type Props = {}

const ArticlesList = (props: Props) => {
    const { getQueryParams } = useFilterStore()
    const searchParams = useSearchParams()
    const page = searchParams.get("page") || "1";
    const { data, isLoading } = useQuery({
        queryKey: ["filter-articles", getQueryParams(), "page", page],
        queryFn: () => getFilteredArticle(getQueryParams(), page)
    })

    if (isLoading) {
        return (
            <section className='grid grid-cols-4 space-x-2 gap-2 p-2'>
                {Array.from({ length: 10 }).map((_, index) => (
                    <article className="flex h-full max-w-xl flex-col items-start justify-between border p-5 rounded-sm">
                        <div className="flex items-center gap-x-4 text-xs w-full">
                            <Skeleton className="h-4 w-24" />
                            <div className="flex-1 overflow-hidden">
                                <div className="flex items-center space-x-2 overflow-hidden whitespace-nowrap">
                                    {[...Array(3)].map((_, index) => (
                                        <Skeleton key={index} className="h-6 w-20 rounded-full bg-gray-50" />
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
                    </article>
                ))}
            </section>
        )
    }

    return (
        <section className='w-full h-full p-2 space-y-2'>
            {data?.count !== 0 && (

            <h1 className='font-semibold mb-5 text-2xl'>Article Found  {data && <span className='text-md'>({data?.count})</span>} </h1>
            )}
            {data?.count === 0 && (

                <div className='w-full h-full flex items-center justify-center'>
                <p className='lg:text-2xl text-red-400 font-semibold'>No Articles found from the filters</p>
            </div>
            )}
            <section className='grid grid-cols-4 space-x-2 gap-2'>
                {data?.results.map((article, index) => <Article article={article} key={index} />)}
            </section>
            {data && (

                <ArticlePagination articlePagination={data} currentPage={parseInt(page)} />
            )}
        </section>
    )
}

export default ArticlesList