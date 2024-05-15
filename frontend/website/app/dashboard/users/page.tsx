import React from 'react'
import UserTable from './users-table'

type Props = {}

const UsersPage = (props: Props) => {
  return (
    <div className='w-full h-full container mx-auto space-y-3'>
        <h1 className='font-bold text-2xl'>Users</h1>
    <UserTable/>
    </div>
  )
}

export default UsersPage