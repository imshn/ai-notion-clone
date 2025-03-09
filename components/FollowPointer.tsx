import React from 'react'
import { motion } from "framer-motion"
import stringToColor from '@/lib/stringToColor'
const FollowPointer = ({ info, x, y }: { info: { name: string, email: string, avatar: string }, x: number, y: number }) => {
    const color = stringToColor(info.email || '1')
    return (
        <motion.div className='h-4 w-4 rounded-full absolute z-50'
            style={{
                top: y,
                left: x,
                pointerEvents: 'none',

            }}
            initial={{
                opacity: 1,
                scale: 1
            }} animate={{
                scale: 1,
                opacity: 1
            }}

            exit={{
                opacity: 0,
                scale: 0
            }}>
            <svg
                style={{ stroke: color, fill: color }} // ✅ Applying color dynamically
                strokeWidth="1"
                viewBox="0 0 16 16"
                className="h-6 w-6 transform -rotate-70 -translate-x-[12px] -translate-y-[10px]"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916L12.728 5.657a.5.5 0 0 1 .556.103z"></path>
            </svg>

            {/* motion.div should be outside the SVG */}
            <motion.div
                style={{        
                    background: color, // ✅ Dynamic background color
                    color: "#fff", // Set text color manually if needed
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="px-2 py-2 font-bold whitespace-nowrap min-w-max text-xs rounded-full"
            >
                {info?.name || info?.email}
            </motion.div>
        </motion.div>
    )
}

export default FollowPointer