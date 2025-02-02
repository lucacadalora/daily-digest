import { useLocation } from "wouter";
import type { ComponentType } from 'react';
import React from 'react';

// Create a more specific type for the dynamic import result
type ArticleModule = {
  default: ComponentType;
  metadata?: {
    title: string;
    slug: string;
    description: string;
    author: string;
    date: string;
    category: string;
    source: string;
  };
};

// Properly type the dynamic imports
const articles: Record<string, () => Promise<ArticleModule>> = 
  import.meta.glob<ArticleModule>('../content/articles/*.tsx');

export default function ArticlePage() {
  const [location] = useLocation();
  const slug = location.split("/").pop();

  // Find the article module based on the slug
  const articlePath = Object.keys(articles).find(path => path.includes(slug || ''));

  if (!articlePath) {
    return <div>Article not found</div>;
  }

  // Dynamic import of the article component
  const ArticleComponent = React.lazy(() => articles[articlePath]());

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ArticleComponent />
    </React.Suspense>
  );
}