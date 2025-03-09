"use client"
import { useOthers, useUpdateMyPresence } from '@liveblocks/react/suspense'
import React from 'react'
import FollowPointer from './FollowPointer'

const LiveCursorProvider = ({ children }: { children: React.ReactNode }) => {
    const updateMyPresence = useUpdateMyPresence()
    const others = useOthers()

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        updateMyPresence({
            cursor: {
                x: Math.round(e.clientX),
                y: Math.round(e.clientY),
            },
        });
    }

    const handlePointerLeave = () => {
        updateMyPresence({
            cursor: null,
        })
    }

    return (
        <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
            {others.map(({ connectionId, presence, info }) => {
                if (presence.cursor === null) {
                    return null;
                }
                return <FollowPointer key={connectionId} info={info} x={presence.cursor?.x as number} y={presence.cursor?.y as number} />
            })}

            {children}
        </div>
    )
}

export default LiveCursorProvider