/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WRKWPXWQ5ap
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CatIcon, FilterIcon } from "lucide-react"
import { getLatestArticles } from "@/actions/articles"
import { cleanHtml } from "@/lib/cleanHtml"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFullName } from "@/lib/getFullName"

export default async function ExplorePages() {
  const latestArticles = await getLatestArticles()
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
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Latest Articles</h2>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FilterIcon className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="end">
                  <DropdownMenuRadioGroup value="featured">
                    <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="popular">Popular</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="category">Category</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CatIcon className="w-4 h-4 mr-2" />
                    Category
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="end">
                  <DropdownMenuRadioGroup value="all">
                    <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="arts">Arts</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="culture">Culture</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="lifestyle">Lifestyle</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latestArticles.map((article,index)=>(
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

