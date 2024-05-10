"use client"

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react'

type Props = {
    children: React.ReactNode
}

// Create a client
const queryClient = new QueryClient()

const ReactQueryProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider