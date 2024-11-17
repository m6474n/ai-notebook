'use client'

import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'

export default function Page() {
  const user = useUser()
  const files = useQuery(api.file_storage.getUserFiles, {
    createdBy: user.user?.primaryEmailAddress?.emailAddress
  })
  console.log(files);

  return (
    <div className="p-10">
      <h2 className='text-3xl font-medium'>Workspace</h2>
      <div>
        {files?.map((file, index) => (
          <div key={index}>
            <h1>Hello</h1>
          </div>
        ))}
      </div>
    </div>
  )
}
