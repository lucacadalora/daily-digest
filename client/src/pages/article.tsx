import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, AlertCircle, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import { Article as ArticleType } from "@/types/newsletter";
import { updateMetaTags } from "@/lib/metaTags";

export default function ArticleView() {
  const [location] = useLocation();
  const slug = location.split("/").pop();

  // Early return for special routes to ensure they use their dedicated pages
  const specialSlugs = [
    'us-china-trade-war-impact-ihsg',
    'trade-war-tsunami-feb-10-14',
    'indonesia-mineral-criticality-matrix',
    'indonesia-economic-inventory-crisis',
    'fed-balance-sheet-blueprint'
  ];

  if (specialSlugs.includes(slug || '')) {
    return null;
  }

  const article = sampleArticles.find(a => a.slug === slug);

  useEffect(() => {
    if (article) {
      updateMetaTags(article);
    }
  }, [article]);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <Header simplified showCategories={false} />

      <div className="h-36 sm:h-32"></div>

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletter" className="hover:text-blue-600">Newsletter</Link>
          <ChevronRight className="h-4 w-4" />
          <span>{article.title}</span>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-bold uppercase">{article.category}</span>
              <span>•</span>
              <span>Analysis</span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>JAKARTA</span>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-semibold dark:text-gray-300">By {article.author}</p>
            </div>
          </div>
        </header>

        <div className="py-4">
          <div className="prose dark:prose-invert max-w-none">
            {article.content}
          </div>
        </div>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 mt-8">
          <p className="mb-2">
            Disclosure: This analysis incorporates data from various market sources and public information. The views expressed here are based on available data and market analysis.
          </p>
          <p>© 2025 Daily Digest. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}