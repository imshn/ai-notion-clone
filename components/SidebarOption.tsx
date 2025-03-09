'use client';
import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';

const SidebarOption = ({ id, }: {
    id: string,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, loading, error] = useDocumentData(doc(db, "documents", id))
    const pathname = usePathname().split('/').pop()
    const isActive = (`/doc/${id}` || `/board/${id}`).includes(pathname as string) && (!!pathname);
    console.log(data)
    if (!data) return;

    if (data?.type === "document") {
        return (
            <Link href={`/doc/${id}`} className={`border dark:hover:text-black dark:hover:border-black hover:bg-gray-300 p-2 rounded-md ${isActive ? "bg-gray-300 text-black font-semibold border-black" : 'border-gray-400'}`}>
                <p>{data?.title}</p>
            </Link>)
    } else {
        return (
            <Link href={`/board/${id}`} className={`border dark:hover:text-black dark:hover:border-black hover:bg-gray-300 p-2 rounded-md ${isActive ? "bg-gray-300 text-black font-semibold border-black" : 'border-gray-400'}`}>
                <p>{data?.title}</p>
            </Link>)
    }

}

export default SidebarOption