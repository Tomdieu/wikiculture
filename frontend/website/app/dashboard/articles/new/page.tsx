"use client"
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:bg-stone-900">
      <div className="border rounded-sm w-full h-full flex-1 space-y-2 flex flex-col space-x-5 mx-auto container">
      <div>
      <input
          type="text"
          placeholder="Title"
          autoFocus
          className="dark:placeholder-text-600 border-none px-0 font-cal text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
        </div>
      <Editor onChange={()=>{}} />
      </div>
    </main>
  );
}
