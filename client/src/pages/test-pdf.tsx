import React from 'react';
import { Header } from '@/components/Header';

export default function TestPDF() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-6">PDF Test Page</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Direct PDF Links</h2>
          <div className="space-y-2">
            <div>
              <a href="/documents/law/UU_NO_1_2025.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                /documents/law/UU_NO_1_2025.pdf
              </a>
            </div>
            <div>
              <a href="/documents/UU_NO_1_2025.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                /documents/UU_NO_1_2025.pdf
              </a>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Iframe Test - /documents/law/UU_NO_1_2025.pdf</h2>
          <iframe 
            src="/documents/law/UU_NO_1_2025.pdf" 
            className="w-full h-[400px] border border-gray-200 dark:border-gray-800 rounded-lg"
            title="PDF Test"
          />
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Iframe Test - /documents/UU_NO_1_2025.pdf</h2>
          <iframe 
            src="/documents/UU_NO_1_2025.pdf" 
            className="w-full h-[400px] border border-gray-200 dark:border-gray-800 rounded-lg"
            title="PDF Test 2"
          />
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Object Tag Test</h2>
          <object
            data="/documents/law/UU_NO_1_2025.pdf"
            type="application/pdf"
            width="100%"
            height="400px"
            className="border border-gray-200 dark:border-gray-800 rounded-lg"
          >
            <p>Your browser does not support PDFs. <a href="/documents/law/UU_NO_1_2025.pdf">Download the PDF</a>.</p>
          </object>
        </div>
      </main>
    </div>
  );
}