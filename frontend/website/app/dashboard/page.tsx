import { getSession } from '@/lib/getSession'
import React from 'react'
import Image from "next/image"
import { Newspaper } from 'lucide-react'
import TotalArticle from './total-articles'

type Props = {}

const Dashboard = async (props: Props) => {
  const session = await getSession()

  console.log(session)

  return (
    <div className='container mx-auto flex-1 flex flex-col space-y-5'>
      <div>
        <h1 className='text-2xl font-bold text-muted-foreground'>Welcome Back! 👋</h1>
        <p className='text-sm text-muted-foreground'>Good evening!</p>
      </div>
      <div className="grid grid-cols-3 items-center gap-3 space-x-20 space-y-3">
        <div className="w-full p-5 max-w-sm flex  shadow-lg select-none">
          <div className=' rounded-md flex flex-1 space-y-10 flex-col'>
            <div>
              <h2 className="text-3xl text-muted-foreground">{session?.user?.username}</h2>
              <p className='text-muted-foreground text-xs'>{session?.user?.bio}</p>
            </div>
            <div className="flex items-center space-x-0.5">
              <TotalArticle/> <span className="text-xs text-muted-foreground">Total Articles</span>
            </div>
          </div>
          <Newspaper />
        </div>

      </div>


    </div>
  )
}

export default Dashboard