import { type Metadata } from 'next'
import {
  ClerkProvider,

} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { dark} from '@clerk/themes'
import { Toaster } from '@/components/ui/sonner'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AI - Notion Clone',
  description: 'an Nextjs ai based notion clone project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en" className='dark'>
        <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header />
          <main className="flex min-h-screen">
            <Sidebar />
            <div className='flex-1 p-4 dark:bg-gray-800 bg-gray-100 overflow-y-auto scrollbar-hide'>{children}</div>
          </main>

          <Toaster position='top-center' />
        </body>
      </html>
    </ClerkProvider>
  )
}