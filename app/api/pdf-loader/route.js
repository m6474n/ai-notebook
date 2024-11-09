import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";




 const pdf = "https://rugged-bandicoot-412.convex.cloud/api/storage/76ada82d-ddfc-48e4-9823-81ad32ab9a62"

export  async function GET(req){
    // Fetch pdf Url from searchQuery
    const reqUrl= await req.url;
    const {searchParams} = new URL(reqUrl);
    const pdf = searchParams.get('pdfURL') 
    // Load Pdf Content
    const response = await fetch(pdf);
//  Convert Pdf to Plain Text
    const data = await response.blob();
    const loader= new WebPDFLoader(data);
    const docs = await loader.load();
    let pdfPlainText = '';
    docs.forEach(doc=>{
        pdfPlainText=pdfPlainText+doc.pageContent
    });
// Split Text into Chunks
    const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const output = await splitter.createDocuments([pdfPlainText]);
  let splittedContent = [];
        output.forEach(e=>{
            splittedContent.push(e.pageContent)
        })
    // Embed Text


    return NextResponse.json({result:splittedContent})
}