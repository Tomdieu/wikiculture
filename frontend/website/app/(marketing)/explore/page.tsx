"use client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CatIcon, FilterIcon, Loader, TagIcon } from "lucide-react"
import { getExploreFilteredArticle, getLatestArticles } from "@/actions/articles"
import { cleanHtml } from "@/lib/cleanHtml"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFullName } from "@/lib/getFullName"
import { useFilterStore } from "@/hooks/use-filter"
import { useExploreFilter } from "@/hooks/user-explore-filter"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import ArticleCardSkeleton from "../articles/_components/_components/ArticleCardSkeleton"
import { articleFilter } from "@/constants/articleFilter"

export default function ExplorePages() {
  const filters = useFilterStore()
  const exploreFilter = useExploreFilter()

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => filters.getCategories(),
  });

  const { data: articles, isLoading } = useQuery({
    queryKey: ["article-filter", "filter", exploreFilter.articleFilter, "category", exploreFilter.categoryFilter],
    queryFn: () => getExploreFilteredArticle(exploreFilter.articleFilter, exploreFilter.categoryFilter)
  })


  const getFilter = () => {
    if (exploreFilter.articleFilter === "newest") {
      return "Latest"
    }
    if (exploreFilter.articleFilter === "popular") {
      return "Popular"
    }
    if (exploreFilter.articleFilter === "most_read") {
      return "Most read"
    }
  }

  return (
    <div>
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/50 z-10" />
        <img
          src="/placeholder.svg"
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Explore Our Articles
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl">
            Discover a wealth of insightful articles on culture, art, and lifestyle. Dive into our curated collection
            and expand your horizons.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20 min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex flex-col">
        <div className="container px-4 md:px-6 h-full w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{getFilter()} Articles </h2>
              <span className="font-semibold text-sm">Category : {exploreFilter.categoryFilter ? exploreFilter.categoryFilter : "All"}</span>


            </div>
            <div className="flex items-center gap-4 h-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FilterIcon className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="end">
                  <DropdownMenuRadioGroup value={exploreFilter.articleFilter}>
                    {articleFilter.map((filter) => (

                      <DropdownMenuRadioItem className="text-xs cursor-pointer" value={filter.value} onSelect={() => exploreFilter.setAricleFilter(filter.value)}>{filter.label}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <TagIcon className="w-4 h-4 mr-2" />
                    Category
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="end">
                  <DropdownMenuRadioGroup value={exploreFilter.categoryFilter}>
                    <DropdownMenuRadioItem value="" onSelect={() => exploreFilter.setCategory("")}>All</DropdownMenuRadioItem>
                    {isCategoriesLoading && (<Loader className="w-4 h-4 animate-spin" />)}
                    {categories?.map((cat, index) => (
                      <DropdownMenuRadioItem className="text-xs cursor-pointer" key={index} onSelect={(e) => {
                        exploreFilter.setCategory(cat.name)
                      }} value={cat.name} >{cat.name}</DropdownMenuRadioItem>

                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {isLoading && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {Array.from({ length: 6 }).map((_, index) => (
                <ArticleCardSkeleton key={index} />
              ))}
            </div>
          )}
          {articles?.results.length === 0 && (<div className="w-full h-full flex items-center justify-center">
            <p className="font-bold text-2xl">No articles found</p>
          </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles?.results.map((article, index) => (
              <div key={index} className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Link href={`/articles/${article.id}/`} className="block" prefetch={false}>
                  <img
                    src={article.cover_image}
                    alt="Article Image"
                    width={400}
                    height={225}
                    className="w-full h-[225px] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{article.icon}{article.title}</h3>
                    <p className="text-gray-500 text-sm dark:text-gray-400 mb-4 line-clamp-4">
                      {cleanHtml(article.content)}
                    </p>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Avatar className="rounded-full p-0.5 w-10 h-10">
                        <AvatarImage
                          className="h-10 w-10 rounded-full bg-gray-50"
                          src={article.author.image || ""}
                        />
                        <AvatarFallback className="rounded-full h-10 w-10  shadow-sm uppercase">
                          {article.author.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{getFullName(article.author)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  )
}

