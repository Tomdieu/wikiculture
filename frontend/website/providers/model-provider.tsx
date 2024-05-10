"use client"

import { CoverImageModel } from '@/components/models/cover-image-model'
import React, { useEffect, useState } from 'react'

type Props = {}

const ModelProvider = (props: Props) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }
    return (
        <React.Fragment>
            <CoverImageModel />
        </React.Fragment>
    )
}

ModelProvider.prototype = {
    name: "ModelProvider"
}

export default ModelProvider