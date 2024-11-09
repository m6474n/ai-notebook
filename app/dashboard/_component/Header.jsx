'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'

export default function Header() {
 const {user} = useUser();
 
    return (
    <div className="flex justify-end p-5 shadow-sm gap-3">
    {user.primaryEmailAddress.emailAddress}
    <UserButton/>
    </div>
  )
}
