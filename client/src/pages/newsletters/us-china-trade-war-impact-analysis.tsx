import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, AlertCircle, Shield, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { sampleArticles } from "@/types/newsletter";

const TradeWarAnalysis = () => {
  const article = sampleArticles.find(a => a.slug === 'us-china-trade-war-impact-analysis');

  if (!article) {
    return <div>Article not found</div>;
  }

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
          <Link href="/newsletters" className="hover:text-blue-600">Market Analysis</Link>
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

          <div className="prose dark:prose-invert max-w-none">
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-6">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-amber-600 mr-2" />
                <span className="font-bold text-amber-800 dark:text-amber-200">Weekly Market Alert</span>
              </div>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                This special report outlines critical market scenarios and action plans for the week of February 3-7, 2025. 
                This special report outlines key market scenarios and potential impacts for the week ahead.
              </p>
            </div>

            {/* Rest of the article content */}
            <div className="space-y-6">
              {/* Add the rest of your article sections here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeWarAnalysis;