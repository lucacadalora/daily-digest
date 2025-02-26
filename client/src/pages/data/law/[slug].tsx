import React from "react";
import { useRoute, Link } from "wouter";
import { Header } from "@/components/Header";
import { ChevronRight, Calendar, Clock } from "lucide-react";
import { PDFViewer } from "@/components/pdf/PDFViewer";
import { Button } from "@/components/ui/button";

interface LawDocument {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  effectiveDate: string;
  slug: string;
  pdfUrl: string;
}

// Sample data for laws - in a real app this would come from an API or database
const lawDocuments: LawDocument[] = [
  {
    id: "1",
    title: "Undang-Undang Nomor 1 Tahun 2025",
    subtitle: "Perubahan Ketiga Atas Undang-undang Nomor 19 Tahun 2003 Tentang Badan Usaha Milik Negara",
    date: "24 Februari 2025",
    effectiveDate: "24 Februari 2025",
    slug: "undang-undang-nomor-1-tahun-2025",
    pdfUrl: "/documents/UU_NO_1_2025.pdf"
  }
];

export default function LawDetailPage() {
  const [, params] = useRoute("/data/law/:slug");
  const slug = params?.slug;
  
  // Find the law document based on the slug
  const document = lawDocuments.find(doc => doc.slug === slug);
  
  if (!document) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-32 pb-16 px-4 md:px-8 max-w-[1200px] mx-auto">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
            <p className="mb-8">The document you're looking for doesn't exist or has been moved.</p>
            <Link href="/data/law">
              <Button>Return to Law Database</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4 flex-wrap">
            <Link href="/">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/data">Data</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/data/law">Law</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-800 dark:text-gray-200">{document.title}</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{document.title}</h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">{document.subtitle}</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8 flex flex-wrap gap-x-8 gap-y-2">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <span className="text-gray-500 text-sm">Ditetapkan:</span>{" "}
                <span className="font-medium">{document.date}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <span className="text-gray-500 text-sm">Berlaku:</span>{" "}
                <span className="font-medium">{document.effectiveDate}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <PDFViewer pdfUrl={document.pdfUrl} documentTitle={document.title} />
          </div>
        </div>
      </main>
    </div>
  );
}