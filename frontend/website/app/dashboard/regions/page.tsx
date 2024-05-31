import React from 'react'
import RegionTable from './_components/RegionTable'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="w-full h-full container mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Regions</h1>
        
      </div>
      <RegionTable />
    </div>
  )
}

export default page