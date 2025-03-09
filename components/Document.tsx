"use client";
import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Editor from './Editor';
import useOwner from '@/hooks/useOwner';
import DeleteDocument from './DeleteDocument';
import InviteUser from './InviteUser';
import ManageUsers from './ManageUsers';
import Avatars from './Avatars';

const Document = ({ id }: { id: string }) => {
    const [input, setInput] = useState('')
    const [isUpdating, startTransition] = useTransition();
    const isOwner = useOwner()
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, loading, error] = useDocumentData(doc(db, "documents", id))
    const updateTitle = async (e: FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input,
                })
            });
        }
    }

    useEffect(() => {
        if (data) {
            setInput(data?.title)
        }
    }, [data])
    return (
        <div >
            <div className='flex max-w-6xl mx-auto justify-between pb-5'>
                <form onSubmit={updateTitle} className='flex flex-1 space-x-2'>
                    {/* Update title... */}
                    <Input className='dark:bg-gray-200 dark:border-gray-950 dark:text-gray-950' value={input} onChange={(e) => setInput(e.target.value)} />
                    <Button className='cursor-pointer hover:animate-pulse' type="submit" disabled={isUpdating}>{isUpdating ? "Updating..." : "Update"}</Button>
                    {/* If */}
                    {isOwner && (
                        <>
                            {/* isOwner && InviteUser, DeleteDocument */}
                            <InviteUser />
                            <DeleteDocument />
                        </>
                    )}
                </form>
            </div>
            <div className='flex max-w-6xl mx-auto justify-between items-center mb-5 '>
                {/* ManageUsers */}
                <ManageUsers />
                {/* Avatars */}
                <Avatars />
            </div>
            <hr className={"dark:border-gray-500 pb-8"} />
            <Editor />
            {/* Collaborative Editor */}
        </div>
    )
}

export default Document