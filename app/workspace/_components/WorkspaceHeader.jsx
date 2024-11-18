import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function WorkspaceHeader({fileName}) {
  return (
    <div className="flex items-center justify-between p-7 shadow-md">
           <Link href="/dashboard"><Image src="/logo.svg" width={120} height={80} alt="Logo"/></Link>
           <h1 className='text-2xl font-bold'>{fileName}</h1>
            <UserButton/>
    </div>
  )
}
