'use client'
import { useParams } from "next/navigation"
import WorkspaceHeader from "../_components/WorkspaceHeader";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import PDFViewer from "../_components/PDFViewer";
import TextEditor from "../_components/TextEditor";

export default function page() {
const {fileId} = useParams();
const fileInfo = useQuery(api.file_storage.GetFileRecord,{fileId})
useEffect(()=>{
   console.log(fileInfo?.fileURL);
},[fileInfo])

return (
    
    <div>
        <WorkspaceHeader/>
       <div className="grid grid-cols-2">
        <div>
            {/* Text Editor */}
           <TextEditor fileId={fileInfo?.fileId}/>
        </div>
        <div>
            {/* Preview PDF */}
            <PDFViewer fileId={fileInfo?.fileURL}/>
        </div>
       </div>
    </div>
  )
}
