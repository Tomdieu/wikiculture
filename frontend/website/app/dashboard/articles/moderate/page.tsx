import React from 'react'
import ArticleTOModerateTable from './_components/article-to-moderate-table'

type Props = {}

const ModerateArticlesPage = (props: Props) => {
  return (
    <div className="w-full h-full container mx-auto">
      <h1 className="font-bold text-2xl">Moderate Articles</h1>
      <ArticleTOModerateTable/>
    </div>
  )
}

export default ModerateArticlesPage