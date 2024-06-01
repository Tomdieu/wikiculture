"use client"
import { notFound, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from 'react'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { searchArticles } from '@/actions/search'
import { Skeleton } from '@/components/ui/skeleton'
import { cleanHtml } from '@/lib/cleanHtml'

type Props = {}

const page = (props: Props) => {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const page = searchParams.get("page") || "1"
  const [search, setSearch] = useState(query)
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", query, "page", page],
    queryFn: () => searchArticles(query, page)
  })

  useEffect(() => {
    // Highlight search term in results
    if (data && query) {
      data.results.forEach(article => {
        const contentElement = document.getElementById(`article-content-${article.id}`)
        if (contentElement) {
          contentElement.innerHTML = highlightText(cleanHtml(article.content), query)
        }
      })
    }
  }, [data, query])

  const highlightText = (text:string, searchTerm:string) => {
    if (!searchTerm) return text
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    return text.replace(regex, '<span class="bg-yellow-500 font-bold select-text">$1</span>')
  }

  if (isLoading) {
    return (
      <div className='flex items-center flex-col w-full h-full space-y-3 py-3 container mx-auto'>
        <div className='w-full'>
          <form className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full py-2 px-4 mb-8">
            <input
              type="search"
              name="query"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles"
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-50 outline-none focus-within:outline-none border-collapse"
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
            >
              <SearchIcon className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          <div className="space-y-6 w-full">
            <div className="flex flex-col gap-2 w-full">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="group" key={index}>
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
     return notFound()
    
  }

  return (
    <div className='flex items-center flex-col w-full h-full space-y-3 py-3 container mx-auto min-h-full'>
      <div>
        <form className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full py-2 px-4 mb-8">
          <input
            type="search"
            name="query"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles"
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-50 outline-none focus-within:outline-none border-collapse"
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
          >
            <SearchIcon className="w-5 h-5" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            {data?.results.map((article) => (
              <Link href={`/articles/${article.id}/`} className="group" prefetch={false} key={article.id}>
                <h3 className="font-medium text-gray-900 dark:text-gray-50 group-hover:underline">
                  {article.title}
                </h3>
                <p
                  id={`article-content-${article.id}`}
                  className="text-gray-600 text-sm dark:text-gray-400 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: cleanHtml(article.content) }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
