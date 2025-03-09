import React from 'react'
import stringToColor from '@/lib/stringToColor'
const FollowPointer = ({ info, x, y }: { info: { name: string, email: string, avatar: string }, x: number, y: number }) => {
    const color = stringToColor(info.email || '1')
    return (
        <div className='relative'>
            <svg
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    zIndex: 1111,
                    transform: `translateX(${x}px) translateY(${y}px)`,
                }}
                width="24"
                height="36"
                viewBox="0 0 24 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                    fill={color}
                />
            </svg>
            {/* motion.div should be outside the SVG */}
            <div
                style={{
                    background: color, // ✅ Dynamic background color
                    color: "#fff", // Set text color manually if needed
                    position: "absolute",
                    left: 15,
                    top: 2,
                    zIndex: 1111,
                    transform: `translateX(${x}px) translateY(${y}px)`,
                }}
                className="px-2 py-2 font-bold whitespace-nowrap min-w-max text-xs rounded-full"
            >
                {info?.name || info?.email}
            </div>
        </div>
    )
}

export default FollowPointer