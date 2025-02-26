import React from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResearchDocument {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  location: string;
  slug: string;
}

// Sample data for research papers
const researchDocuments: ResearchDocument[] = [
  {
    id: "1",
    title: "Supply-Chain Disruptions from Revoking Section 232 Steel Tariff Exemptions",
    subtitle: "Analysis of global trade impacts with focus on Indonesian steel industry resilience",
    date: "27 February 2025",
    author: "Luca Cada Lora",
    location: "Jakarta, Indonesia",
    slug: "steel-tariff-exemptions-global-trade-impact"
  }
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/data">Data</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-800 dark:text-gray-200">Research</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Research Database</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mb-8">
            Access our collection of academic papers, proprietary research, and in-depth analysis on global trade, economic policies, and market impacts.
          </p>
          
          <div className="grid gap-6">
            {researchDocuments.map((doc) => (
              <div 
                key={doc.id} 
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <Link href={`/data/research-detail/${doc.slug}`}>
                  <h2 className="text-xl font-bold text-blue-600 hover:underline mb-2">{doc.title}</h2>
                </Link>
                <p className="text-gray-800 dark:text-gray-200 mb-4">{doc.subtitle}</p>
                <div className="flex flex-wrap gap-x-8 gap-y-2 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Published:</span>{" "}
                    <span className="font-medium">{doc.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Author:</span>{" "}
                    <span className="font-medium">{doc.author}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>{" "}
                    <span className="font-medium">{doc.location}</span>
                  </div>
                </div>
                <Link href={`/data/research-detail/${doc.slug}`}>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Paper
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}