import { Link } from "wouter";
import { Header } from "@/components/Header";
import { sampleArticles } from "@/types/newsletter";
import { TradeWarContent } from "@/components/TradeWarContent";
import { ChevronRight } from 'lucide-react';

export default function TradeWarAnalysisArticle() {
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
          <Link href="/newsletters" className="hover:text-blue-600">Newsletter</Link>
          <ChevronRight className="h-4 w-4" />
          <span>{article.title}</span>
        </div>

        {/* Article content */}
        <TradeWarContent article={article} />
      </div>
    </div>
  );
}