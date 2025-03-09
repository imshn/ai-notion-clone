import RoomProvider from '@/components/RoomProvider'

import React from 'react'
const BoardLayout = ({ children, params: { id } }: { children: React.ReactNode, params: { id: string } }) => {
    return (
        <RoomProvider roomId={id} >{children}</RoomProvider>
    )
}

export default BoardLayout