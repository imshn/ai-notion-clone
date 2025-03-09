"use client"
import React, { useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { useUser } from '@clerk/nextjs'
import useOwner from '@/hooks/useOwner'
import { useRoom } from '@liveblocks/react/suspense'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collectionGroup, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { toast } from 'sonner'
import { removeUserFromDocument } from '@/actions/actions'

const ManageUsers = () => {
    const { user } = useUser()
    const [isOpen, setIsOpen] = useState(false);
    const isOwner = useOwner();
    const room = useRoom()
    const [isPending, startTransition] = useTransition()


    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db, 'rooms'), where('roomId', '==', room.id))
    )

    const handleDelete = async (userId: string) => {
        startTransition(async () => {
            if (!user) return;

            const { success } = await removeUserFromDocument(room.id, userId)

            if (success) {
                setIsOpen(false);
                toast.success("User removed successfully")
            } else {
                toast.error("Failed to remove user")
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={"outline"}>
                <DialogTrigger>
                    Users ({usersInRoom?.docs.length})
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Users with Access</DialogTitle>
                    <DialogDescription>
                        Below is a list of users who have access to this document.
                    </DialogDescription>
                </DialogHeader>
                <hr className='my-2' />

                <div className='flex flex-col space-y-2'>
                    {/* Users in Room */}
                    {
                        usersInRoom?.docs.map(doc => (
                            <div key={doc.data().userId} className="space-y-5 flex items-center justify-between ">
                                <p className='font-light'>{
                                    doc.data().userId === user?.emailAddresses[0].toString() ? `You (${doc.data().userId})` : doc.data().userId}</p>
                                <div className="flex items-center gap-2">
                                    <Button variant={"outline"}>{doc.data().role}</Button>

                                    {
                                        isOwner && doc.data().userId !== user?.emailAddresses[0].toString() && (
                                            <Button size="sm" disabled={isPending} variant={"destructive"} onClick={() => handleDelete(doc.data().userId)}>
                                                {isPending ? "Removing..." : "X"}
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ManageUsers