// import React from 'react'

// export default function PDFViewer({fileId}) {
//   return (
//     <div>
//       <iframe src={fileId+"#toolbar=0"} height="90vh" width="100%" className="h-[90vh]" />
//     </div>
//   )
// }

'use client'

import React, { useState } from 'react';

export default function PDFViewer({ fileId }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false); 
  };

  return (
    <div className="relative">
      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white  z-10">
          <div className="spinner-border animate-spin border-t-4 border-slate-900 border-solid rounded-full w-16 h-16"></div>
        </div>
      )}

      {/* PDF Viewer */}
      <iframe
        src={fileId + "#toolbar=0"}
        height="90vh"
        width="100%"
        className="h-[90vh]"
        onLoad={handleIframeLoad} // Event that fires when iframe content is loaded
      />
    </div>
  );
}
