import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Search, ExternalLink } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  documentTitle: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, documentTitle }) => {
  // Extract document category and ID from the URL
  const getApiUrl = (): string => {
    // Extract the document ID from the URL path
    const pathParts = pdfUrl.split('/');
    const filename = pathParts[pathParts.length - 1];
    
    // Expecting format like: /documents/law/UU_NO_1_2025.pdf
    if (pathParts.includes('documents') && pathParts.includes('law')) {
      // For our law document, we know the ID
      return '/api/documents/law/undang-undang-nomor-1-tahun-2025';
    }
    
    // Fallback to the original URL
    return pdfUrl;
  };

  const downloadPDF = () => {
    // Use our secure API endpoint for downloads
    window.open(getApiUrl(), '_blank');
  };

  const viewPDF = () => {
    // You can either use a new tab or a dedicated viewer page
    window.open(getApiUrl(), '_blank');
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
            onClick={viewPDF} 
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
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={viewPDF} 
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
      
      <div className="mt-8 w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Document Features:</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
            <Search className="h-10 w-10 text-blue-600 mb-3" />
            <h4 className="text-lg font-medium mb-2">Searchable Content</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Download the PDF to search for specific terms and regulations within the document.
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
            <ExternalLink className="h-10 w-10 text-blue-600 mb-3" />
            <h4 className="text-lg font-medium mb-2">Direct Access</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Open the document directly in your PDF viewer for the best reading experience.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button onClick={downloadPDF} className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-5 w-5 mr-2" /> Download Full Document
          </Button>
        </div>
      </div>
    </div>
  );
};