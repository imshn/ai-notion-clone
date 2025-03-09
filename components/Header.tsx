"use client"
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
} from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from 'react'
const Header = () => {
    const { user } = useUser()
    const path = usePathname();
    const segments = path.split('/');

    return (
        <header suppressHydrationWarning className="flex dark:text-white justify-between items-center p-5 gap-4 h-16">
            <h1 className="md:text-2xl font-bold">AI Notion Clone</h1>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={'/'}>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {
                        segments.map((segment, index) => {
                            if (!segment) return null;
                            const isLast = index === segments.length - 1
                            return (
                                <Fragment key={index}>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        {
                                            isLast && (
                                                <BreadcrumbPage>{segment}</BreadcrumbPage>
                                            ) || (
                                                <BreadcrumbLink href={`${segments.slice(0, index + 1).join('/')}`}>
                                                    {segment}
                                                </BreadcrumbLink>
                                            )
                                        }
                                    </BreadcrumbItem>
                                </Fragment>
                            )
                        })
                    }
                </BreadcrumbList>
            </Breadcrumb>
            <div className='flex gap-4 items-center justify-center'>
                <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                </SignedOut>
                <SignedIn>
                    {user && (
                        <h2> {user?.lastName}</h2>
                    )}
                    <UserButton />
                </SignedIn>
            </div>
        </header>
    )
}

export default Header