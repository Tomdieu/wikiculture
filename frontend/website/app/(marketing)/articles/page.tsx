import React from 'react'
import Sidebar from './_components/Sidebar'

type Props = {}

const ArticlesPage = (props: Props) => {
  return (
    <div className='flex'>
      <div>
      Articles
      </div>
      <Sidebar/>
    </div>
  )
}

export default ArticlesPage