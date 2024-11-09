import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { IoMdAdd } from "react-icons/io";
import {  FaShieldAlt } from "react-icons/fa";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { Progress } from "@/components/ui/progress"



export default function Sidebar() {
  return (
    <div className="shadow-md h-screen p-7" >
      <Image src="./logo.svg" width={120} height={80} alt="Logo"/>

      <div className=" mt-12 space-y-5" >   
        <Button className="w-full flex gap-1">
        <IoMdAdd className="" />
        Upload PDF
        </Button>
        <Button variant="outline" className="w-full ">
          <BsLayoutTextSidebarReverse className=""/>  Workspace
        </Button>
        <Button variant="outline" className="w-full">
           <FaShieldAlt/> Upgrade 
        </Button>
       
      </div>
    <div className="absolute bottom-20 w-[75%]">
    <div className="flex flex-col items-center justify-center space-y-3">
    <Progress value={33}/>
    <div className="flex flex-col ">
    <p className="text-sm text-slate-900 text-center">
        2 out of 5 PDFs are uploaded.
    </p>
    <p className="text-xs text-gray-400 text-center tracking-wider">
        Upgrade to add more files.
    </p>
    </div>
    </div>
    </div>
    </div>
  )
}
