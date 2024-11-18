'use client'

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'

export default function Hero() {
    const user = useUser()

    return (
        <div className='bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 w-full min-h-screen flex flex-col items-center'>
            <div className='p-6 w-full'>
                <div className='flex items-center justify-between'>
                    <div className="logo">
                        <Link href={"/"}>
                            <Image src="/logo.svg" height={40} width={120} alt='logo'/>
                        </Link>
                    </div>
                    <div>
                        <div className="menu flex items-center justify-end sm:gap-8 gap-2">
                            <Link href={"#"}><h2 className='text-lg text-slate-600 '>Features</h2></Link>
                            <Link href={"#"}><h2 className='text-lg text-slate-600 '>Solution</h2></Link>
                            <Link href={"#"}><h2 className='text-lg text-slate-600 '>Blog</h2></Link>

                            {user?.user?.primaryEmailAddress?.emailAddress ? (
                                <UserButton />
                            ) : (
                                <Link href={"/dashboard"}>
                                    <Button className="rounded-full">Get Started</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center h-[90vh] space-y-10 max-w-7xl px-4 sm:px-6 md:px-8  mt-24'>
                <h1 className='md:text-7xl text-5xl font-extrabold text-center'>
                    <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>
                        AI Powered
                    </span> 
                    - Notes Taking App.
                </h1>

                <p className='text-gray-500 font-light text-center'>
                    Elevate your notes-taking journey with our AI-Powered PDF App. Seamlessly extract key insights, summarize, and annotations from any PDF with just a few clicks.
                </p>

                <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center items-center mb-24'>
                    <Link href={"#"}>
                        <Button className="rounded-full text-lg font-light p-6" variant="outline">Learn More</Button>
                    </Link>
                    <Link href={"/dashboard"}>
                        <Button className="rounded-full text-lg font-light p-6 bg-gradient-to-r from-pink-500 to-violet-500">Get Started</Button>
                    </Link>
                </div>

                <div className="h-12"></div>

                <div className='border-slate-200 border-t-[1px] border-b-[1px] flex flex-wrap justify-center w-full p-4 gap-4 sm:space-y-0 space-y-10'>
                    <div className='w-full sm:w-[370px] text-center'>
                        <h3 className='text-xl font-bold text-slate-900'>Low Price</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, architecto?</p>
                    </div>

                    <div className='w-full sm:w-[370px] text-center'>
                        <h3 className='text-xl font-bold text-slate-900'>Fastest on Market</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, architecto?</p>
                    </div>

                    <div className='w-full sm:w-[370px] text-center'>
                        <h3 className='text-xl font-bold text-slate-900'>The Most Loved</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, architecto?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
