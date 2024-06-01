/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WRKWPXWQ5ap
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CatIcon, FilterIcon } from "lucide-react"

export default function Component() {
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
            <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Article Image"
                  width={400}
                  height={225}
                  className="w-full h-[225px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">The Art of Minimalist Living</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Discover the beauty and freedom in simplifying your life.
                  </p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <img
                      src="/placeholder.svg"
                      alt="Author Avatar"
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span>John Doe</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Article Image"
                  width={400}
                  height={225}
                  className="w-full h-[225px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">The Rise of Sustainable Fashion</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Explore the latest trends in eco-friendly clothing.
                  </p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <img
                      src="/placeholder.svg"
                      alt="Author Avatar"
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span>Jane Smith</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Article Image"
                  width={400}
                  height={225}
                  className="w-full h-[225px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">The Art of Mindful Meditation</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Learn how to find inner peace and balance in your life.
                  </p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <img
                      src="/placeholder.svg"
                      alt="Author Avatar"
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span>Sarah Lee</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Article Image"
                  width={400}
                  height={225}
                  className="w-full h-[225px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">The Fascinating World of Street Art</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Explore the vibrant and ever-changing canvas of urban art.
                  </p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <img
                      src="/placeholder.svg"
                      alt="Author Avatar"
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span>Michael Chen</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Article Image"
                  width={400}
                  height={225}
                  className="w-full h-[225px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">The Art of Culinary Creativity</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Discover the latest trends and techniques in the world of food.
                  </p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <img
                      src="/placeholder.svg"
                      alt="Author Avatar"
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span>Emily Wang</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Article Image"
                  width={400}
                  height={225}
                  className="w-full h-[225px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">The Timeless Beauty of Vintage Fashion</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Explore the enduring appeal of vintage clothing and accessories.
                  </p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <img
                      src="/placeholder.svg"
                      alt="Author Avatar"
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span>David Lee</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Article Image"
                  width={400}
                  height={225}
                  className="w-full h-[225px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">The Art of Storytelling in Film</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Dive into the captivating world of cinematic storytelling.
                  </p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <img
                      src="/placeholder.svg"
                      alt="Author Avatar"
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span>Jessica Huang</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Article Image"
                  width={400}
                  height={225}
                  className="w-full h-[225px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">The Intersection of Art and Technology</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Explore the fascinating ways technology is transforming the art world.
                  </p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <img
                      src="/placeholder.svg"
                      alt="Author Avatar"
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span>Alex Kim</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

