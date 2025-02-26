import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  documentTitle: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, documentTitle }) => {
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
            {documentTitle}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => window.open(pdfUrl, '_blank')} 
            variant="outline"
            size="sm"
          >
            <FileText className="h-4 w-4 mr-1" /> View PDF
          </Button>
          <Button onClick={downloadPDF} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 w-full">
        <div className="flex flex-col items-center justify-center text-center p-8">
          <FileText className="h-16 w-16 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">PDF Document Available</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The PDF document "{documentTitle}" is available for viewing and download.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => window.open(pdfUrl, '_blank')} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              <FileText className="h-4 w-4 mr-2" /> View PDF
            </Button>
            <Button onClick={downloadPDF} variant="outline">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>
      </div>
      
      {/* Embed PDF using iframe as a fallback method */}
      <div className="mt-8 w-full">
        <h3 className="text-lg font-semibold mb-4">Preview:</h3>
        <iframe 
          src={pdfUrl} 
          className="w-full h-[800px] border border-gray-200 dark:border-gray-800 rounded-lg"
          title={documentTitle}
        />
      </div>
    </div>
  );
};