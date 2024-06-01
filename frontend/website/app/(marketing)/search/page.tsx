"use client"
import { useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {}

const page = (props: Props) => {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || "";
  const [search,setSearch] = useState(query)
 
  if (!query) {
    return (
      <Input placeholder='Search articles' type='search' />
    )
  }

  return (
    <div className='flex items-center flex-col w-full h-full space-y-3 py-3 container mx-auto'>
      <div>
        <form className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full py-2 px-4 mb-8">
          <input
            type="search"
            name="query"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
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
            <Link href="#" className="group" prefetch={false}>
              <h3 className="font-medium text-gray-900 dark:text-gray-50 group-hover:underline">
                Artificial Intelligence
              </h3>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                Artificial intelligence (AI) is the broad concept of using computer systems to perform tasks that
                typically require human intelligence and decision-making, such as visual perception, speech recognition,
                decision-making, and language translation.
              </p>
            </Link>
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default page