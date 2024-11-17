import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

export default function WorkspaceHeader({fileName}) {
  return (
    <div className="flex items-center justify-between p-7 shadow-md">
           <Image src="/logo.svg" width={120} height={80} alt="Logo"/>
           <h1 className='text-2xl font-bold'>{fileName}</h1>
            <UserButton/>
    </div>
  )
}
