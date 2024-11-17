"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const user = useUser();
  
  const files = useQuery(api.file_storage.getUserFiles, {
    createdBy: user.user?.primaryEmailAddress?.emailAddress,
  });

  useEffect(() => {
    if (files) {
      setLoading(false); 
    }
  }, [files]); 



  return (
    <div className="p-10">
      <h2 className="text-3xl font-medium">Workspace</h2>
      <div className="flex flex-wrap gap-3 my-12">
        {
        loading ? ([1, 2, 3, 4].map((item, index) => (
          <Card key={index} className="bg-slate-100 animate-pulse h-[150px] w-[150px]" />
        ))) :
        
        files && files.length > 0 ? (
          files.map((file, index) => (
            <Link key={index} href={`/workspace/${file?.fileId}`}>
              <Card>
                <CardHeader className="flex items-center justify-center">
                  <Image src="/pdf.png" height={70} width={70} alt="pdf" />
                </CardHeader>
                <CardContent>
                  <p>{file?.fileName}</p>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center w-screen h-[60vh]">
            <p>No File Available!</p>
          </div>
        )}
      </div>
    </div>
  );
}
