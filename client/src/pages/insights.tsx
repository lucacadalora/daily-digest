import React from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { ChevronRight, Calendar, MapPin, ExternalLink } from "lucide-react";

// Insights data
const insightArticles = [
  {
    id: "bumn-law-comparison",
    title: "Perbandingan UU BUMN: UU No. 19/2003 vs UU No. 1/2025",
    date: "February 26, 2025",
    location: "JAKARTA",
    slug: "bumn-law-comparison",
    excerpt: "Indonesia telah memberlakukan perubahan signifikan terhadap kerangka regulasi BUMN dengan disahkannya UU No. 1/2025 yang mengamendemen UU No. 19/2003. Reformasi ini mengubah paradigma pengelolaan BUMN dari Teori Sumber ke Teori Korporasi dan memperkenalkan Danantara dengan modal awal Rp 1.000 triliun.",
    readTime: 3
  }
];

export default function Insights() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <div className="h-36 sm:h-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-800 dark:text-gray-200">Insights</span>
        </div>

        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Client Alerts</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Regulatory updates, market analysis, and strategic guidance on Indonesian and global market developments.
          </p>
        </header>

        <div className="space-y-8">
          {insightArticles.map((insight) => (
            <div key={insight.id} className="border-b border-gray-200 dark:border-gray-800 pb-8">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">
                      CLIENT ALERT
                    </span>
                  </span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{insight.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{insight.location}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  <Link href={`/insights/${insight.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {insight.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400">
                  {insight.excerpt}
                </p>
                
                <div className="pt-2">
                  <Link href={`/insights/${insight.slug}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    Read full alert
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* More insights coming soon section */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">More insights coming soon</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Stay tuned for more regulatory analysis and market insights from our team of experts.
          </p>
          <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Back to home
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}