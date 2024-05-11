import ArticleTable from '@/components/table/article/ArticleTable'
import React from 'react'

type Props = {}

const AllArticles = (props: Props) => {
  return (
    <div className='container mx-auto h-full w-full space-y-2'>
      <h1 className='font-bold text-xl lg:text-2xl xl:text-4xl'>Articles</h1>
      <ArticleTable/>
    </div>
  )
}

export default AllArticles