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
  const slug = location.split("/").pop();

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
        {/* Rest of the component remains the same */}
        {/* ... */}
      </div>
    </div>
  );
}
