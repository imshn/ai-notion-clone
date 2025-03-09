"use client"
import { Trash2Icon } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'
// import { toast } from './ui/to'
import { deleteDocument } from '@/actions/actions'
import { toast } from 'sonner'
const DeleteDocument = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const pathname = usePathname()

    const handleDelete = async () => {
        const roomId = pathname.split('/').pop();

        if (!roomId) return;

        startTransition(async () => {
            const { success } = await deleteDocument(roomId)

            if (success) {
                setIsOpen(false);
                router.replace('/');
                toast.success("Room Deleted successfully")
            } else {
                toast.error("Failed to delete room")
                setIsOpen(false);
            }
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={"destructive"}>
                <DialogTrigger>
                    <Trash2Icon className='w-4 h-4' />
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to Delete?</DialogTitle>
                    <DialogDescription>
                        This will delete the document and all its contents, removing
                        all
                        users from the document
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant={"destructive"} onClick={handleDelete} disabled={isPending}>
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant={"secondary"}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDocument