"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PageNotFound() {
  const router = useRouter()
  const goBack = () => {
    
    router.back()
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="text-gray-500 text-lg">Oops, the page you were looking for could not be found.</p>
      </div>
      <Link
      onClick={goBack}
        href="#"
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        prefetch={false}
      >
        Go Back Home
      </Link>
    </div>
  )
}