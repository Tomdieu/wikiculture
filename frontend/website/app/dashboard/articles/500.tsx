import React from 'react'

type Props = {
    params: {
        statusCode: number
    }
}

const ServerErrorPage = ({ params: { statusCode } }: Props) => {
    return (
        <div className='text-3xl font-bold '>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </div>
    )
}

export default ServerErrorPage