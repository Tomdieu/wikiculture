import { getSession } from '@/lib/getSession'
import React from 'react'
import ChangeUserInfo from './_components/ChangeUserInfo'
import { getCurrentUser } from '@/actions/users'
import { Separator } from '@/components/ui/separator'
import ChangePassword from './_components/ChangePassword'

type Props = {}

const page = async (props: Props) => {
  const user = await getCurrentUser()
  return (
    <section className='flex-1 w-full h-full flex flex-col container mx-auto gap-y-4'>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Profile</h1>
      </div>
      {user && (<div className='space-y-3'>
        <Separator />
        <ChangeUserInfo user={user} />
      </div>)}
      <div className='space-y-3'>
        <div className='h-10'></div>

        <Separator />
        <ChangePassword />
      </div>
      <div className='h-20'></div>
    </section>
  )
}

export default page