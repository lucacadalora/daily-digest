import React, {useEffect} from 'react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import FedBalanceSheetArticle from '../components/articles/FedBalanceSheetArticle';

const FedBalanceSheetPage: React.FC = () => {
  const [location] = useLocation();
  const article = sampleArticles.find(a => a.slug === 'fed-balance-sheet-blueprint');

  useEffect(() => {
    if (article) {
      const metrics = article.previewMetrics || [];
      const metricsText = metrics.length > 0 
        ? metrics.map(m => `${m.label}: ${m.value}`).join(" | ")
        : '';

      const previewTitle = `${article.title} | Daily Digest`;
      const previewDescription = metricsText 
        ? `${metricsText}. ${article.description}`
        : article.description;

      document.title = previewTitle;
    }
  }, [article]);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <Header simplified showCategories={false} />
      <div className="h-36 sm:h-32"></div>
      <FedBalanceSheetArticle />
    </div>
  );
};

export default FedBalanceSheetPage;