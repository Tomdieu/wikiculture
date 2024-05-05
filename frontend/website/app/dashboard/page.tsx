import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className='container mx-auto flex-1 flex flex-col'>
      <div>
        <h1 className='text-2xl font-bold text-muted-foreground'>Welcome Back! 👋</h1>
        <p className='text-sm text-muted-foreground'>Good evening!</p>
      </div>

      <div className='shadow-lg p-5 rounded-md flex space-y-4 flex-col'>
        <div>
          <h2 className="text-xl text-muted-foreground">Tomdieu Ivan</h2>
          <p className='text-muted-foreground text-xs'>Writer/Author</p>
          </div>
          <div>
            <span className="text-xl">35</span> <span className="text-xs text-muted-foreground">Total Articles</span>
          </div>
      </div>

    </div>
  )
}

export default Dashboard