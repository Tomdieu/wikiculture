"use client"
import React from 'react'
import Sidebar from './_components/Sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useFilterStore } from '@/hooks/use-filter'
import { useSearchParams } from 'next/navigation'
import ArticlesList from './_components/ArticlesList'

type Props = {}

const ArticlesPage = (props: Props) => {
  const filters = useFilterStore()

  return (
    <ResizablePanelGroup direction="horizontal" className='flex h-full'>
      <ResizablePanel defaultSize={25} className='hidden md:flex'>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel defaultSize={75} minSize={25}>

        <div className='w-full h-full p-2'>
          {!filters.getQueryParams() && (
            <div className='flex w-full h-full items-center justify-center'>
              <p className='text-2xl font-bold'>Please select some filters to list some articles</p>
            </div>
          )}
          {filters.getQueryParams() && (<ArticlesList />)}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ArticlesPage