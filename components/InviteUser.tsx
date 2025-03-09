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
import { usePathname } from 'next/navigation'
// import { toast } from './ui/to'
import { toast } from 'sonner'
import { Input } from './ui/input'
import { inviteUserToRoom } from '@/actions/actions'
const InviteUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition()
    const [email, setEmail] = useState<string>()
    const pathname = usePathname()
    const roomId = pathname.split('/').pop();
    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const { success } = await inviteUserToRoom(roomId as string, email as string)
            if (success) {
                toast.success("User invited successfully!")
                setEmail(" ")
                setIsOpen(false)
            } else {
                toast.error("Failed to invite user. Please try again.")
            }
            setEmail('')
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={"outline"}>
                <DialogTrigger>
                    Invite
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite a User to collaborate!</DialogTitle>
                    <DialogDescription>
                        Enter the email of the user you want to invite.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleInvite} className='space-y-2 space-x-2'>
                    <Input type="email" placeholder='Email' className="w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button className='w-full dark:bg-white bg-secondary text-white dark:text-black cursor-pointer' disabled={!email || isPending} type="submit">
                        {!isPending ? "Invite" : "Inviting..."}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default InviteUser