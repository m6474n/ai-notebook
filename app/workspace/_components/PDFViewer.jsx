import React from 'react'

export default function PDFViewer({fileId}) {
  return (
    <div>
      <iframe src={fileId+"#toolbar=0"} height="90vh" width="100%" className="h-[90vh]" />
    </div>
  )
}
