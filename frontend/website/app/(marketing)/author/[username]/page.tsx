"use client"

import { getFilteredArticle } from '@/actions/articles'
import { getUserByUsername } from '@/actions/users'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import Article from '../../_components/Article'
import ArticleCardSkeleton from '../../articles/_components/_components/ArticleCardSkeleton'
import { getFullName } from '@/lib/getFullName'
import { formatTimeSince } from '@/lib/timeSince'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  params: {
    username: string
  }
}

const UserSkeleton = () => (
  <div className="flex flex-col items-center space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
    <div className="w-36 h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
    <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
    <div className="w-48 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
    <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
    <div className="w-32 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
  </div>
)

const Page = ({ params: { username } }: Props) => {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") || "1"
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUserByUsername(username)
  })
  const { data: articlesPagination, isLoading: isArticlesLoading } = useQuery({
    queryKey: ["articles", username, "page", page],
    queryFn: () => {
      const _searchParams = new URLSearchParams()
      _searchParams.append("username", username)
      return getFilteredArticle(_searchParams.toString(), page)
    },
    enabled: Boolean(user?.id)
  })

  return (
    <div className="h-full w-full flex flex-col space-y-8 container mx-auto py-8">
      <div className="bg-white dark:bg-stone-950 rounded-lg p-6">
        {isUserLoading ? (
          <UserSkeleton />
        ) : user && (
          <div className="flex flex-col items-center space-y-4">
            {user.image && (
              <Image src={user.image} width={100} height={100} alt={username} className="rounded-full shadow-sm" />
            )}
            <h2 className="text-2xl font-bold">{getFullName(user)}</h2>
            <h3 className="text-lg text-gray-500 dark:text-gray-400">@{username}</h3>
            <h4 className="text-gray-700 dark:text-gray-300">Joined: {formatTimeSince(user.date_joined)}</h4>
            <p className="text-center text-gray-600 dark:text-gray-400">{user.bio}</p>
            {articlesPagination && (
              <h4 className="text-gray-700 dark:text-gray-300">Total Articles: {articlesPagination.count}</h4>
            )}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-stone-950 rounded-lg  p-6">
        <h1 className="font-bold text-2xl mb-4">Articles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isArticlesLoading ? (
            Array.from({ length: 6 }).map((_, index) => <ArticleCardSkeleton key={index} />)
          ) : (
            articlesPagination?.results.map((article, index) => (
              <Link href={`/articles/${article.id}`} key={index}>
              <Article article={article} key={index} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
