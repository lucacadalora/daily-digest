import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, BarChart3, AlertCircle, Clock, MapPin, ChevronRight } from 'lucide-react';
import BBRIChartDashboard from '@/components/BBRIChartDashboard';
import { Link } from "wouter";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Bank Rakyat Indonesia: Undervalued Dividend Powerhouse",
  slug: "bank-rakyat-indonesia-undervalued-dividend-powerhouse",
  description: "A comprehensive analysis of Bank Rakyat Indonesia (BBRI), revealing why this state-backed lender could deliver 30–40% total returns in 2025 through dividends and growth.",
  author: "Michael Chen",
  date: "January 30, 2025",
  category: "Markets",
  source: "Daily Digest"
};

export default function Article() {
  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Header */}
      <Header simplified showCategories={false} />

      {/* Header spacing */}
      <div className="h-36 sm:h-32"></div>

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletters" className="hover:text-blue-600">Newsletter</Link>
          <ChevronRight className="h-4 w-4" />
          <span>{metadata.title}</span>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-bold uppercase">{metadata.category}</span>
              <span>•</span>
              <span>Analysis</span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {metadata.title}
            </h1>

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{metadata.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>JAKARTA</span>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-semibold dark:text-gray-300">By {metadata.author}</p>
            </div>
          </div>
        </header>

        {/* Rest of the article content remains the same */}
        {/* ... Copy the content from the existing article.tsx ... */}
      </div>
    </div>
  );
}
