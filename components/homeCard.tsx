"use client"
import { useCollection } from "react-firebase-hooks/firestore"

import { useUser } from "@clerk/nextjs"
import { collectionGroup, DocumentData, query, where } from "firebase/firestore"
import { db } from "@/firebase"
import { useEffect, useState } from "react"
import SidebarOption from "./SidebarOption"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface RoomDocument extends DocumentData {
    createdAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string
}

const DocCards = () => {
    const { user } = useUser()
    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[],
        editor: RoomDocument[]
    }>({
        owner: [],
        editor: []
    })
    const [data, loading, error] = useCollection(
        user && (
            query(collectionGroup(db, 'rooms'), where("userId", "==", user.emailAddresses[0].toString()))
        )
    )

    useEffect(() => {
        if (!data) return;

        const grouped = data.docs.reduce<{
            owner: RoomDocument[],
            editor: RoomDocument[]
        }>((acc, curr) => {
            const roomData = curr.data() as RoomDocument;
            if (roomData.role === "owner") {
                acc.owner.push({
                    id: curr.id,
                    ...roomData
                });
            } else {
                acc.editor.push({
                    id: curr.id,
                    ...roomData
                });
            }

            return acc
        }, {
            owner: [],
            editor: []
        })

        setGroupedData(grouped)
    }, [data])
    const menuOptions = (
        <>
            {
                error &&
                <div className="text-red-500 text-sm border my-2 mb-0 border-red-500 p-2 rounded-md">Error While fetching docs!</div>
            }
            {
                !loading ?
                    <>
                        <Card className="flex py-4 flex-col space-y-4 ">
                            {
                                groupedData?.owner.length === 0 ? (
                                    <h2 className="text-gray-500 font-semibold text-sm">No documents found</h2>
                                ) :
                                    <>
                                        <CardHeader className="flex justify-between items-center">
                                            <CardTitle className="text-gray-500 font-semibold text-sm">My Documents</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex justify-between items-center">
                                            {
                                                groupedData?.owner.map((doc) => {
                                                    return <SidebarOption key={doc.id} id={doc.id} />
                                                })
                                            }
                                        </CardContent>
                                    </>
                            }
                        </Card>
                        {/* Shared With Me */}
                        {/* My Documents*/}
                        {
                            groupedData?.editor.length > 0 &&
                            <Card className="flex py-4 flex-col space-y-4">
                                <CardHeader className="flex justify-between items-center">
                                    <CardTitle className="text-gray-500 font-semibold text-sm">My Documents</CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-between items-center">
                                    {
                                        groupedData?.editor.map((doc) => {
                                            return <SidebarOption key={doc.id} id={doc.id} />
                                        })
                                    }
                                </CardContent>
                            </Card>
                        }
                    </> :
                    <div className="flex py-4 flex-col space-y-4 md:max-w-36">
                        <h2 className="text-gray-500 font-semibold text-sm">Loading...</h2>
                    </div>
            }


            {/* Lists*/}
        </>
    )
    return (
        <div className="grid grid-cols-4 w-full p-2 md:p-5 dark:bg-gray-900 bg-gray-200 relative">
            {menuOptions}
        </div>
    )
}

export default DocCards