'use client'
import { ArrowLeftCircle } from 'lucide-react';

export default function Page() {
  return (
    <div className='flex space-x-2 items-center animate-pulse'>
      <ArrowLeftCircle className='w-12 h-12' />
      <h1 className='font-bold'>Get Started with creating a New Document</h1>
    </div>
  )
}