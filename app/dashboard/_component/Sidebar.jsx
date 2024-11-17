
'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import {  FaShieldAlt } from "react-icons/fa";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { Progress } from "@/components/ui/progress"
import PdfDialog from './PdfDialog';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';




export default function Sidebar() {
  const user = useUser();
  const files = useQuery(api.file_storage.getUserFiles, {
    createdBy: user.user?.primaryEmailAddress?.emailAddress,
  });
  return (
    <div className="shadow-md h-screen p-7" >
      <Image src="./logo.svg" width={120} height={80} alt="Logo"/>

      <div className=" mt-12 space-y-5" >   
        <PdfDialog isMax={files?.length>=5?true:false}/>
        <Button variant="outline" className="w-full ">
          <BsLayoutTextSidebarReverse className=""/>  Workspace
        </Button>
        <Button variant="outline" className="w-full">
           <FaShieldAlt/> Upgrade 
        </Button>
       
      </div>
    <div className="absolute bottom-20 w-[75%]">
    <div className="flex flex-col items-center justify-center space-y-3">
    <Progress value={files?.length/5*100}/>
    <div className="flex flex-col ">
    <p className="text-sm text-slate-900 text-center">
        {files?.length} out of 5 PDFs are uploaded.
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
