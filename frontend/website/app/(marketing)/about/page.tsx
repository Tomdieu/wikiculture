
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { BookmarkIcon, SearchIcon, SignalIcon, TrendingUpIcon } from "lucide-react"

export default function Page() {
  return (
    <main className="flex flex-col">
      <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">Discover the Best Articles on Culture</h1>
          <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
            Our app curates the most insightful and thought-provoking articles on art, music, literature, and more. Dive
            into the world of culture with us.
          </p>
          <Link
            href="/articles"
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            prefetch={false}
          >
            Get Started
          </Link>
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Features</h2>
            <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
              Discover the best articles on culture with our powerful features.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <SearchIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold">Powerful Search</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Find the perfect article with our advanced search functionality.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <BookmarkIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold">Bookmark Articles</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Save your favorite articles to read later with our bookmarking feature.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <TrendingUpIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold">Trending Articles</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Stay up-to-date with the latest trending articles in cameroon.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <SignalIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold">Notifications</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get notified when new articles are published in your areas of interest.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Meet the Team</h2>
            <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
              The passionate individuals behind the culture app.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <Avatar>
                <Image src="https://github.com/tomdieu.png" alt="Tomdieu Ivan" height={64} width={64}/>
                <AvatarFallback>TI</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">Tomdieu Ivan</h3>
              <p className="text-gray-500 dark:text-gray-400">CEO</p>
              <p className="text-gray-500 dark:text-gray-400">
                Tomdieu is a passionate culture enthusiast with a background in journalism. He co-founded the app to share
                his love of the arts with the world.
              </p>
            </div>
            
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Get in Touch</h2>
            <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>
          <div className="mx-auto max-w-md">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" rows={5} required />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
