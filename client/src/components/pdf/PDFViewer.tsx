import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Download, Loader2 } from 'lucide-react';

// Set a simple worker source to avoid loading from CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
  documentTitle: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, documentTitle }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setLoading(false);
  }

  function onDocumentLoadError(error: Error): void {
    console.error('Error while loading document:', error);
    setLoading(false);
  }

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const downloadPDF = () => {
    // Create a temporary anchor element and trigger the download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${documentTitle.replace(/\s+/g, '_')}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <div>
          <span className="text-sm text-gray-500">
            Page {pageNumber} of {numPages || '-'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1 || loading}
            variant="outline"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button
            onClick={goToNextPage}
            disabled={!numPages || pageNumber >= numPages || loading}
            variant="outline"
            size="sm"
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
          <Button onClick={downloadPDF} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full">
        {loading && (
          <div className="h-[600px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <span className="ml-2">Loading document...</span>
          </div>
        )}
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="h-[600px] flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              <span className="ml-2">Loading document...</span>
            </div>
          }
          className="flex justify-center"
        >
          <Page 
            pageNumber={pageNumber} 
            width={Math.min(window.innerWidth * 0.8, 800)}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
};