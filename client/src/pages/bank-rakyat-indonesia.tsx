import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, BarChart3, AlertCircle, Clock, MapPin, ChevronRight } from 'lucide-react';
import BBRIChartDashboard from '@/components/BBRIChartDashboard';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import { Article } from "@/types/newsletter";

function updateMetaTags(article: Article) {
  // Create a richer description by combining metrics and description
  const enrichedDescription = article.previewMetrics 
    ? `${article.previewMetrics.map(m => `${m.label}: ${m.value}`).join(" | ")}. ${article.description}`
    : article.description;

  // Create a rich title that includes key metrics if available
  const enrichedTitle = article.previewMetrics 
    ? `${article.title} | ${article.previewMetrics[0].value} ${article.previewMetrics[0].label}`
    : article.title;

  const metaTags = {
    // Open Graph
    "og:title": enrichedTitle,
    "og:description": enrichedDescription,
    "og:type": "article",
    "og:url": `https://lucaxyzz-digest.replit.app/newsletter/${article.slug}`,
    "og:site_name": "Daily Digest",
    "og:locale": "en_US",

    // Twitter Card
    "twitter:card": "summary",
    "twitter:site": "@dailydigest",
    "twitter:creator": "@dailydigest",
    "twitter:title": enrichedTitle,
    "twitter:description": enrichedDescription,
    "twitter:domain": "lucaxyzz-digest.replit.app",

    // Article Metadata
    "article:published_time": article.date,
    "article:author": article.author,
    "article:section": article.category,
    "article:tag": article.tags ? article.tags.join(",") : article.category,

    // Basic SEO
    "description": enrichedDescription,
    "keywords": article.tags ? article.tags.join(",") : `${article.category},market analysis,financial news`,
    "news_keywords": article.tags ? article.tags.join(",") : article.category
  };

  // Update meta tags
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

  // Update document title with the enriched title
  document.title = `${enrichedTitle} | Daily Digest`;
}

export default function BBRIArticle() {
  const [location] = useLocation();
  const article = sampleArticles.find(a => a.slug === 'bank-rakyat-indonesia-undervalued-dividend-powerhouse');

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
      {/* Header */}
      <Header simplified showCategories={false} />

      {/* Header spacing */}
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

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            In a market where yield-hungry investors are scrambling for stable returns, Bank Rakyat Indonesia (IDX: BBRI) has emerged as a compelling anomaly: a blue-chip stock trading at a steep discount to intrinsic value while offering one of Asia's highest dividend yields. Our analysis of financial disclosures, analyst models, and macroeconomic trends reveals why this state-backed lender could deliver 30–40% total returns in 2025 through a rare combination of income and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Current Valuation</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">10.3x P/E</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">46% discount to peers</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">2025 Dividend Yield</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">8.4%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">IDR 350/share forecast</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Digital Growth</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">+62% YoY</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Mobile loan disbursements</p>
            </CardContent>
          </Card>
        </div>

        <div className="py-4 space-y-6">
          {/* Article sections remain the same */}
          {/* ... */}
        </div>

        <div className="py-8">
          <BBRIChartDashboard />
        </div>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="mb-2">Disclosure: This analysis incorporates data from BBRI investor relations, Bloomberg, CNBC Indonesia, and RHB/Ciptadana research reports. The author holds no positions in BBRI at publication time.</p>
          <p>© 2025 Daily Digest. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}