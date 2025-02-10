import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, BarChart3, AlertCircle, Clock, MapPin, ChevronRight, Info } from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import { Article } from "@/types/newsletter";
import BBRIChartDashboard from '@/components/BBRIChartDashboard';

function updateMetaTags(article: Article) {
  const enrichedDescription = article.previewMetrics 
    ? `${article.previewMetrics.map(m => `${m.label}: ${m.value}`).join(" | ")}. ${article.description}`
    : article.description;

  const enrichedTitle = article.previewMetrics 
    ? `${article.title} | ${article.previewMetrics[0].value} ${article.previewMetrics[0].label}`
    : article.title;

  const metaTags = {
    "og:title": enrichedTitle,
    "og:description": enrichedDescription,
    "og:type": "article",
    "og:url": `https://lucaxyzz-digest.replit.app/newsletter/${article.slug}`,
    "og:site_name": "Daily Digest",
    "og:locale": "en_US",
    "twitter:card": "summary",
    "twitter:site": "@dailydigest",
    "twitter:creator": "@dailydigest",
    "twitter:title": enrichedTitle,
    "twitter:description": enrichedDescription,
    "twitter:domain": "lucaxyzz-digest.replit.app",
    "article:published_time": article.date,
    "article:author": article.author,
    "article:section": article.category,
    "article:tag": article.tags ? article.tags.join(",") : article.category,
    "description": enrichedDescription,
    "keywords": article.tags ? article.tags.join(",") : `${article.category},market analysis,financial news`,
    "news_keywords": article.tags ? article.tags.join(",") : article.category
  };

  Object.entries(metaTags).forEach(([name, content]) => {
    let tag;
    if (name.startsWith('og:') || name.startsWith('article:')) {
      tag = document.querySelector(`meta[property="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', name);
        document.head.appendChild(tag);
      }
    } else {
      tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
    }
    tag.setAttribute('content', content);
  });

  document.title = `${enrichedTitle} | Daily Digest`;
}

export default function ArticlePage() {
  const [location] = useLocation();
  const slug = location.split("/").pop();

  const specialArticles = [
    'us-china-trade-war-impact-ihsg',
    'fed-balance-sheet-blueprint',
    'fed-qt-exit-crypto-rally'
  ];

  if (specialArticles.includes(slug || '')) {
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

  const isBBRIArticle = article.slug === 'bank-rakyat-indonesia-undervalued-dividend-powerhouse';

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <Header simplified showCategories={false} />

      <div className="h-36 sm:h-32"></div>

      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletters" className="hover:text-blue-600">Newsletter</Link>
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

        <div className="py-4 space-y-6">
          {article.content}
          {isBBRIArticle && (
            <div className="py-8">
              <BBRIChartDashboard />
            </div>
          )}
        </div>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="mb-2">
            Disclosure: This analysis incorporates data from various sources including Bloomberg, industry reports, and our proprietary research.
          </p>
          <p>© 2025 Daily Digest. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}