import React from "react";
import { useRoute, Link } from "wouter";
import { Header } from "@/components/Header";
import { ChevronRight, Calendar, User, MapPin } from "lucide-react";
import { PDFViewer } from "@/components/pdf/PDFViewer";
import { Button } from "@/components/ui/button";

interface ResearchDocument {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  location: string;
  slug: string;
  pdfUrl: string;
}

// Sample data for research papers - in a real app this would come from an API or database
const researchDocuments: ResearchDocument[] = [
  {
    id: "1",
    title: "Supply-Chain Disruptions from Revoking Section 232 Steel Tariff Exemptions",
    subtitle: "Analysis of global trade impacts with focus on Indonesian steel industry resilience",
    date: "27 February 2025",
    author: "Luca Cada Lora",
    location: "Jakarta, Indonesia",
    slug: "steel-tariff-exemptions-global-trade-impact",
    pdfUrl: "/documents/research/Paper.pdf"
  }
];

export default function ResearchDetailPage() {
  const [, params] = useRoute("/data/research-detail/:slug");
  const slug = params?.slug;
  
  // Find the research document based on the slug
  const document = researchDocuments.find(doc => doc.slug === slug);
  
  if (!document) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-32 pb-16 px-4 md:px-8 max-w-[1200px] mx-auto">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Research Paper Not Found</h1>
            <p className="mb-8">The research paper you're looking for doesn't exist or has been moved.</p>
            <Link href="/data/research-index">
              <Button>Return to Research Database</Button>
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
            <Link href="/data/research-index">Research</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-800 dark:text-gray-200">{document.title}</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{document.title}</h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">{document.subtitle}</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8 flex flex-wrap gap-x-8 gap-y-2">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <span className="text-gray-500 text-sm">Published:</span>{" "}
                <span className="font-medium">{document.date}</span>
              </div>
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <span className="text-gray-500 text-sm">Author:</span>{" "}
                <span className="font-medium">{document.author}</span>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <span className="text-gray-500 text-sm">Location:</span>{" "}
                <span className="font-medium">{document.location}</span>
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