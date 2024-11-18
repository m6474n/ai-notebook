import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'

export default function MainHeader() {
    const user = useUser()
  return (
    <div className='p-10 w-full'>
      <div className='flex  flex-rowitems-center justify-between'>
<div className="logo">
    <Link href={"/"}>
    <Image src="/logo.svg" height={40} width={120} alt='logo'/>
    </Link>

      </div>
    <div>
        <div className="menu flex flex-row items-center justify-end gap-8">
            <Link href={"#"}><h2 className='text-lg text-slate-600 '>Features</h2></Link>
            <Link href={"#"}><h2 className='text-lg text-slate-600 '>Solution</h2></Link>
            <Link href={"#"}><h2 className='text-lg text-slate-600 '>Blog</h2></Link>
          
           {user?.user?.primaryEmailAddress?.emailAddress !=null? (<UserButton/>):(
            
            
            // <SignInButton><Button >Get Started</Button></SignInButton>
            <Link href={"/dashboard"}><Button className="rounded-full" >Get Started</Button></Link>
            )}
            
        </div>
    </div>
</div>
    </div>
  )
}
