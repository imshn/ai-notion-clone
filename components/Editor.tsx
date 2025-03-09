"use client"
import { useRoom, useSelf } from "@liveblocks/react/suspense"
import { useEffect, useState } from "react"
import LoadingSpinner from "./LoadingSpinner"
import * as Y from "yjs"
import { LiveblocksYjsProvider } from "@liveblocks/yjs"
import { Button } from "./ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { BlockNoteView } from "@blocknote/mantine"
import { useCreateBlockNote } from "@blocknote/react"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"
import stringToColor from "@/lib/stringToColor"
import { BlockNoteEditor } from "@blocknote/core"

type EditorProps = {
    doc: Y.Doc
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider: any
    darkMode: boolean
}

function BlockNote(editorProps: EditorProps) {
    const { doc, provider, darkMode } = editorProps

    const userInfo = useSelf((me) => me.info)

    const editor: BlockNoteEditor = useCreateBlockNote({
        // Make sure we're using all the default block specs
        
        collaboration: {
            provider,
            fragment: doc.getXmlFragment("document-store"),
            showCursorLabels: "activity",
            user: {
                name: userInfo?.name,
                color: stringToColor(userInfo?.email),
            },
        },
        domAttributes: {
            editor: {
                class: "min-h-screen p-5",
            },
        },
    })

    return (
        <div className="relative max-w-6xl mx-auto">
            <BlockNoteView
                editor={editor}
                theme={darkMode ? "dark" : "light"}
                formattingToolbar={true}
                linkToolbar={true}
                sideMenu={true}
                slashMenu={true}
                emojiPicker={true}
                filePanel={true}
                tableHandles={true}
                onSelectionChange={() => console.log("Selection")}
                className="min-h-screen"
            />
        </div>
    )
}

const Editor = () => {
    const room = useRoom()
    const [doc, setDoc] = useState<Y.Doc>()
    const [provider, setProvider] = useState<LiveblocksYjsProvider>()
    const [darkMode, setDarkMode] = useState(true)

    const style = `hover:text-white ${darkMode
        ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
        : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
        }`

    useEffect(() => {
        const yDoc = new Y.Doc()
        const yProvider = new LiveblocksYjsProvider(room, yDoc)
        setDoc(yDoc)
        setProvider(yProvider)

        return () => {
            yDoc?.destroy()
            yProvider?.destroy()
        }
    }, [room])

    if (!room) {
        return <LoadingSpinner />
    }
    if (!doc || !provider) {
        return null
    }
    return (
        <div className="max-w-6xl mx-auto">
            <div className={"flex items-center gap-2 justify-end mb-6"}>
                {/*
                Translate Document Ai
            */}
                {/*
                Chat Document Ai
            */}

                <Button className={style} onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </Button>
            </div>

            <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
        </div>
    )
}

export default Editor

