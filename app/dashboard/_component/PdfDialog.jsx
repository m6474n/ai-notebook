"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

import { AiOutlineLoading } from "react-icons/ai";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";

export default function PdfDialog({isMax}) {
  const [open, setOpen] = useState(false);
  const fileURL = useMutation(api.file_storage.getFileUrl);

  const generateUploadUrl = useMutation(api.file_storage.generateUploadUrl);
  const insertFileToDB = useMutation(api.file_storage.AddFileToDB);
  const [fileName, setFileName] = useState();
  const embedDocument = useAction(api.myActions.ingest);
  const [file, setFile] = useState(null);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const onFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    setLoading(true);
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    console.log(fileName);
    const { storageId } = await result.json();
    const url = await fileURL({ storageId: storageId });
    const fileId = uuid4();
    const res = await insertFileToDB({
      fileId: fileId,
      fileName: fileName ?? "Untitled File",
      storageId: storageId,
      fileURL: url,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    // Split Pdf Text
    const ApiResponse = await axios.get("/api/pdf-loader?pdfURL=" + url);
    console.log(ApiResponse.data.result);

    // Embed Document Data using Google Generative AI and Store in database
    embedDocument({
      splittedText: ApiResponse.data.result,
      fileId: fileId,
    });

    setLoading(false);
    setOpen(false);
    toast("File is ready!")
  };

  return (
    <Dialog open={open} >
      <DialogTrigger asChild disabled={isMax}>
        <Button
          className="w-full flex gap-1"
        
          onClick={() => {
            setOpen(true);
          }}
        >
          <IoCloudUploadOutline />
          Upload PDF
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Your PDF</DialogTitle>
          <DialogDescription>
            Choose a PDF file from your device to upload.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-5">
          <div className=" w-full grid items-center gap-1.5">
            <Label htmlFor="doc">Document</Label>
            <Input
              id="doc"
              type="file"
              accept="application/pdf"
              className=""
              onChange={(event) => onFileSelect(event)}
            />
          </div>

          <div className=" w-full grid items-center gap-1.5">
            <Label htmlFor="title">File Name</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter File Name"
              className=""
              onChange={(event) => setFileName(event.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={()=>setOpen(false)}>
              Close
            </Button>
          </DialogClose>
          {/* Add a submit button */}
          <Button className="ml-2" onClick={onFileUpload}>
            {loading ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <IoCloudUploadOutline />
                Upload
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
