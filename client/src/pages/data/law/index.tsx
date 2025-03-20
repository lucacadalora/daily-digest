import React from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LawDocument {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  effectiveDate: string;
  slug: string;
}

// Sample data for laws
const lawDocuments: LawDocument[] = [
  {
    id: "1",
    title: "Undang-Undang Nomor 1 Tahun 2025",
    subtitle: "Perubahan Ketiga Atas Undang-undang Nomor 19 Tahun 2003 Tentang Badan Usaha Milik Negara",
    date: "24 Februari 2025",
    effectiveDate: "24 Februari 2025",
    slug: "undang-undang-nomor-1-tahun-2025"
  },
  {
    id: "2",
    title: "PP No. 10 Tahun 2025",
    subtitle: "Peraturan Pemerintah Nomor 10 Tahun 2025 tentang Organisasi dan Tata Kelola Badan Pengelola Investasi Daya Anagata Nusantara (Danantara)",
    date: "28 Februari 2025",
    effectiveDate: "28 Februari 2025",
    slug: "peraturan-pemerintah-nomor-10-tahun-2025"
  },
  {
    id: "3",
    title: "Permen ESDM No. 5 Tahun 2025",
    subtitle: "Analisis Permen ESDM No. 5 Tahun 2025: Komparasi dan Analisis Perubahan antara Permen ESDM No. 5/2025 (yang Mencabut Permen ESDM No. 10/2017) dan Perpres 112/2022",
    date: "5 Maret 2025",
    effectiveDate: "15 Maret 2025",
    slug: "permen-esdm-no-5-tahun-2025"
  },
  {
    id: "4",
    title: "Proposed Amendments in the RUU with UU 34 Tahun 2004",
    subtitle: "Proposed Amendments in the RUU with UU 34 Tahun 2004 on the Indonesian National Armed Forces (TNI)",
    date: "20 Maret 2025",
    effectiveDate: "Pending Approval",
    slug: "proposed-amendments-ruu-tni"
  }
];

export default function LawPage() {
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
            <span className="text-gray-800 dark:text-gray-200">Law</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Law Database</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mb-8">
            Access our comprehensive collection of Indonesian laws and regulations, with detailed analysis and contextual information.
          </p>
          
          <div className="grid gap-6">
            {lawDocuments.map((doc) => (
              <div 
                key={doc.id} 
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <Link href={`/data/law/${doc.slug}`}>
                  <h2 className="text-xl font-bold text-blue-600 hover:underline mb-2">{doc.title}</h2>
                </Link>
                <p className="text-gray-800 dark:text-gray-200 mb-4">{doc.subtitle}</p>
                <div className="flex flex-wrap gap-x-8 gap-y-2 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Ditetapkan:</span>{" "}
                    <span className="font-medium">{doc.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Berlaku:</span>{" "}
                    <span className="font-medium">{doc.effectiveDate}</span>
                  </div>
                </div>
                <Link href={`/data/law/${doc.slug}`}>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Document
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