"use client";

import "tldraw/tldraw.css";
import { Tldraw, DefaultStylePanel, } from "tldraw";
import { useStorageStore } from "@/lib/useStorageStore";
import { useSelf } from "@liveblocks/react/suspense";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import ManageUsers from "./ManageUsers";
import InviteUser from "./InviteUser";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import useOwner from "@/hooks/useOwner";
import DeleteDocument from "./DeleteDocument";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function StorageTldraw({ roomId }: { roomId: string }) {
    // Getting authenticated user info. Doing this using selectors instead
    // of just `useSelf()` to prevent re-renders on Presence changes
    const id = useSelf((me) => me.id);
    const info = useSelf((me) => me.info);

    const store = useStorageStore({
        user: { id, color: info.email, name: info.name },
    });
    const [input, setInput] = useState('')
    const [isUpdating, startTransition] = useTransition();
    const isOwner = useOwner()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, loading, error] = useDocumentData(doc(db, "documents", roomId))
    const updateTitle = async (e: FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "boards", roomId), {
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
        <div className="max-w-full ">
            <div className='flex  mx-auto justify-between pb-5'>
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
                    <ManageUsers />

                </form>
            </div>
            <div style={{ height: "80vh", width: "85.5vw", borderRadius: 10 }} className="rounded-md">
                <Tldraw
                    store={store}
                    className="rounded-md"
                    inferDarkMode={false}
                    components={{
                        // Render a live avatar stack at the top-right
                        StylePanel: () => (
                            <div
                                style={{
                                    display: "flex-column",
                                }}
                            >
                                <Avatar />
                                <DefaultStylePanel />
                                <Badge />
                            </div>
                        ),
                    }}
                    autoFocus
                />
            </div>
        </div>
    );
}
