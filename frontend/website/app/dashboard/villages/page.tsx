import React, { Suspense } from 'react'
import VillageTable from './_components/VillageTable'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="w-full h-full container mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Regions</h1>

      </div>
      <Suspense fallback={null}>
        <VillageTable />
      </Suspense>
    </div>
  )
}

export default page