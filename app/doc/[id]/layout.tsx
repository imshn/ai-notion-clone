import RoomProvider from '@/components/RoomProvider'

import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DocLayout = ({ children, params: { id } }: { children: React.ReactNode, params: { id: string } }) => {
    return (
        <RoomProvider roomId={id} >{children}</RoomProvider>
    )
}

export default DocLayout