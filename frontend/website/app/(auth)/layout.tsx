import { ModeToggle } from "@/components/theme-toggle"
import {Separator} from  "@/components/ui/separator"
import Logo from "@/components/logo";
import Footer from "@/components/footer";
import React from "react"

type AuthLayoutProps = {
  children: React.ReactNode
}


export default function AuthLayout({ children }: AuthLayoutProps) {

  return (
      <React.Fragment>
        <div className="flex gap-8 px-4 mx-auto py-4 h-screen w-screen">
          <div className="hidden lg:flex flex-col w-0/12 lg:w-8/12 lg:block space-y-4 lg:space-y-6 xl:space-y-8">
            <div className="flex w-full items-center justify-between">
              <Logo/>
              <ModeToggle/>
            </div>
            <div className="container mx-auto space-y-8 flex flex-col justify-center items-center h-full flex-1">
              <div className="space-y-2 w-full">
                <h1 className="text-3xl font-bold tracking-tight">Welcome to WikiCulture</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  WikiCulture is the best place to discover and share knowledge about the world's cultures and
                  traditions.
                  Connect with like-minded individuals, explore diverse perspectives, and contribute to a global
                  community of
                  learning.
                </p>
              </div>
              <div className="space-y-2 w-full">
                <h2 className="text-2xl font-semibold tracking-tight">Features & Benefits</h2>
                <ul className="grid gap-2 list-disc list-inside sm:grid-cols-2">
                  <li>Explore rich cultural heritage</li>
                  <li>Discover unique traditions</li>
                  <li>Connect with experts and enthusiasts</li>
                  <li>Contribute your knowledge</li>
                  <li>Join discussions and events</li>
                </ul>
              </div>
            </div>
          </div>
          <Separator orientation="vertical" className="hidden lg:block"/>
          <div className="space-y-6 w-full lg:w-4/12 flex items-center justify-center">
            {children}
          </div>
        </div>
        {/*<Footer/>*/}
      </React.Fragment>
  );

}
