import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, ArrowUpRight, RefreshCcw } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  documentTitle: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, documentTitle }) => {
  const [viewMethod, setViewMethod] = useState<'object' | 'iframe' | 'google'>('object');
  
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

  const openInGoogleViewer = () => {
    const googleViewerUrl = `https://docs.google.com/viewer?url=${window.location.origin}${pdfUrl}`;
    window.open(googleViewerUrl, '_blank');
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
        <div className="flex flex-col items-center justify-center text-center p-4">
          <FileText className="h-16 w-16 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">PDF Document Available</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            The document "{documentTitle}" is available for viewing and download. You can either open it in a new tab or download it to your device.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => window.open(pdfUrl, '_blank')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <FileText className="h-4 w-4 mr-2" /> View Document
            </Button>
            <Button onClick={downloadPDF} variant="outline">
              <Download className="h-4 w-4 mr-2" /> Download Document
            </Button>
            <Button 
              variant="ghost"
              onClick={openInGoogleViewer}
            >
              <ArrowUpRight className="h-4 w-4 mr-2" /> Open in Google Viewer
            </Button>
          </div>
        </div>
      </div>
      
      {/* PDF Preview Options */}
      <div className="mt-8 w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Document Preview:</h3>
          <div className="flex gap-2">
            <Button 
              variant={viewMethod === 'object' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setViewMethod('object')}
            >
              HTML Object
            </Button>
            <Button 
              variant={viewMethod === 'iframe' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setViewMethod('iframe')}
            >
              IFrame
            </Button>
            <Button 
              variant={viewMethod === 'google' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setViewMethod('google')}
            >
              Google Viewer
            </Button>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          {viewMethod === 'object' && (
            <object
              data={pdfUrl}
              type="application/pdf"
              className="w-full h-[800px] rounded border border-gray-300 dark:border-gray-700"
            >
              <p className="text-center py-10">
                Your browser doesn't support embedded PDF viewing. 
                <br />
                <Button 
                  onClick={() => window.open(pdfUrl, '_blank')}
                  className="mt-4"
                >
                  Open PDF
                </Button>
              </p>
            </object>
          )}
          
          {viewMethod === 'iframe' && (
            <iframe 
              src={pdfUrl} 
              className="w-full h-[800px] rounded border border-gray-300 dark:border-gray-700"
              title={documentTitle}
            />
          )}
          
          {viewMethod === 'google' && (
            <iframe 
              src={`https://docs.google.com/viewer?url=${window.location.origin}${pdfUrl}&embedded=true`} 
              className="w-full h-[800px] rounded border border-gray-300 dark:border-gray-700"
              title={`${documentTitle} - Google Viewer`}
            />
          )}
        </div>
        
        <p className="text-sm text-gray-500 mt-2 text-center">
          If you're having trouble viewing the document, try a different viewing method above or use the alternative viewing options.
        </p>
      </div>
    </div>
  );
};