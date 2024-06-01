import { Separator } from '@/components/ui/separator'
import React from 'react'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className='min-h-full h-full flex flex-col space-y-2 p-3 overflow-y-auto'>
      <h1 className='text-lg font-bold'>Filter</h1>
      <Separator/>
      <div>
        <h1 className='font-bold'>Category</h1>
        <div>
          Categories
        </div>
      </div>
      <Separator/>
      <div>
        <h1 className='font-bold'>Cultural Areas</h1>
        <div>
          Categories
        </div>
      </div>
      <Separator/>
      <div>
        <h1 className='font-bold'>Regions</h1>
        <div>
          Categories
        </div>
      </div>
      <Separator/>
      <div>
        <h1 className='font-bold'>Villages</h1>
        <div>
          Categories
        </div>
      </div>
    </div>
  )
}

export default Sidebar