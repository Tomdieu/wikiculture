import React from 'react'

type Props = {
    children:React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <div className='w-full h-full flex flex-col mb-10 flex-1'>
        {children}
        <div className='h-32'></div>
    </div>
  )
}

export default layout