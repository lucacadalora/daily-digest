import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Eye } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  documentTitle: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, documentTitle }) => {
  // Generate API URLs for download and view
  const getDownloadUrl = (): string => {
    // Convert document path to API endpoint format
    if (pdfUrl.startsWith('/documents/')) {
      // Extract category and filename
      const parts = pdfUrl.split('/');
      if (parts.length >= 3) {
        const category = parts[2]; // 'law' or 'research'
        const slug = parts[3].split('.')[0]; // Remove file extension
        
        // For research, we know the slug from the route params
        if (category === 'research') {
          return `/api/documents/research/steel-tariff-exemptions-global-trade-impact?download=true`;
        } else if (category === 'law') {
          return `/api/documents/law/undang-undang-nomor-1-tahun-2025?download=true`;
        }
      }
    }
    
    // Fallback to the original URL
    return `${pdfUrl}?download=true`;
  };
  
  const getViewUrl = (): string => {
    if (pdfUrl.startsWith('/documents/')) {
      // Extract category and filename
      const parts = pdfUrl.split('/');
      if (parts.length >= 3) {
        const category = parts[2]; // 'law' or 'research'
        
        // For research, we know the slug from the route params
        if (category === 'research') {
          return `/api/documents/research/steel-tariff-exemptions-global-trade-impact`;
        } else if (category === 'law') {
          return `/api/documents/law/undang-undang-nomor-1-tahun-2025`;
        }
      }
    }
    
    return pdfUrl;
  };

  const downloadPDF = () => {
    window.open(getDownloadUrl(), '_blank');
  };
  
  const viewPDF = () => {
    window.open(getViewUrl(), '_blank');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <div>
          <span className="text-sm text-gray-500">
            {documentTitle}
          </span>
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
            <Button onClick={viewPDF} className="bg-blue-600 hover:bg-blue-700">
              <Eye className="h-4 w-4 mr-2" /> View PDF
            </Button>
            <Button onClick={downloadPDF} variant="outline">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};