"use client"
import { StorageTldraw } from '@/components/Canvas'
import React from 'react'

const DocumentPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = React.use(params)

    return (
        <div className="flex flex-col flex-1 min-h-screen">
            <StorageTldraw roomId={resolvedParams?.id} />
        </div>
    )
}

export default DocumentPage
