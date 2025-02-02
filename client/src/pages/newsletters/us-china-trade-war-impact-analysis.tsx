import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, AlertCircle, Shield, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { sampleArticles } from "@/types/newsletter";

const TradeWarAnalysis = () => {
  // Find the article data
  const article = sampleArticles[0]; // It should be the first article now

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
          <Link href="/newsletters" className="hover:text-blue-600">Newsletters</Link>
          <ChevronRight className="h-4 w-4" />
          <span>US-China Trade War Impact</span>
        </div>

        {/* Article content */}
        <div className="py-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">Weekly Special</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
              <span className="font-bold uppercase">Market Strategy</span>
              <span>•</span>
              <span>February 3-7, 2025</span>
            </div>
          </div>

          <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>JAKARTA</span>
            </div>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            {article.description}
          </p>

          <div className="prose dark:prose-invert max-w-none">
            {/* ... rest of the article content ... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeWarAnalysis;