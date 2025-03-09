"use client"
import React, { useState, useTransition } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { createNewBoard, createNewDocument } from '@/actions/actions'
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
const NewDocumentButton = () => {
    const [isPendingDocument, startTransitionDocument] = useTransition();
    const [isPendingBoard, startTransitionBoard] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const handleCreateNewDocument = () => {
        // Logic to create a new document goes here
        startTransitionDocument(async () => {
            const { docId } = await createNewDocument();
            if (docId !== undefined) {
                setIsOpen(false);
                router.push(`/doc/${docId}`);
            }
        })
    }

    const handleCreateNewBoard = () => {
        // Logic to create a new document goes here
        startTransitionBoard(async () => {
            const { boardId } = await createNewBoard();
            if (boardId !== undefined) {
                setIsOpen(false);
                router.push(`/board/${boardId}`);
            }
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild>
                <DialogTrigger>
                    Create
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>What do you want to create today?</DialogTitle>
                    <DialogDescription className='flex gap-2  p-10 items-center justify-center'>
                        <Button className='h-50 w-50 text-lg' onClick={handleCreateNewDocument}>
                            {isPendingDocument ? "Creating..." : "New Document"}
                        </Button>
                        <Button className='h-50 w-50 text-lg' onClick={handleCreateNewBoard}>
                            {isPendingBoard ? "Creating..." : "New Board"}
                        </Button>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" className='flex w-100 items-center justify-center mx-auto mt-0' variant={"secondary"}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>



    )
}

export default NewDocumentButton