"use client"
import RoomProvider from '@/components/RoomProvider'

import React, { useEffect, useState } from 'react'
const BoardLayout = ({ children, params: { id } }: { children: React.ReactNode, params: { id: Promise<string> } }) => {
    const [roomId, setRoomId] = useState<string>()
    const returnId = async () => {
        const resolvedId = await id
        setRoomId(resolvedId)
    }
    useEffect(() => {
        returnId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <RoomProvider roomId={roomId as string} >{children}</RoomProvider>
    )
}

export default BoardLayout