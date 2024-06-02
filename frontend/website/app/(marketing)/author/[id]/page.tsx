import React from 'react'

type Props = {
    params:{
        id:string
    }
}

const page = ({params:{ id}}: Props) => {
  return (
    <div>page</div>
  )
}

export default page