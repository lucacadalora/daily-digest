import React from 'react';
import { Header } from '@/components/Header';
import { ArticleConfig } from '@/config/articles';
import ArticleSEO from '@/components/SEO/ArticleSEO';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin, Tag } from 'lucide-react';

interface ArticleLayoutProps {
  article: ArticleConfig;
  children?: React.ReactNode;
}

/**
 * A reusable article layout component that provides consistent styling and structure
 * for all article pages. This component handles common elements like headers, publication
 * details, and social sharing, allowing individual article pages to focus on content.
 */
export function ArticleLayout({ article, children }: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* SEO component handles all meta tags */}
      <ArticleSEO article={article} />
      
      <Header showCategories={false} />
      
      <div className="h-36 sm:h-32"></div>
      
      <main className="max-w-[900px] mx-auto px-4 py-8 dark:text-gray-200">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-4 gap-4">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5" />
              {article.publishedDate}
            </span>
            
            {article.category && (
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1.5" />
                {article.category}
              </span>
            )}
            
            <span>
              {article.author}
            </span>
          </div>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {article.description}
          </p>
        </div>
        
        {/* Featured Image */}
        <div className="mb-8">
          <img 
            src={article.image} 
            alt={article.imageAlt || article.title} 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        
        {/* Article tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <Tag className="h-3.5 w-3.5 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Article content */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 sm:p-8 prose dark:prose-invert max-w-none">
            {/* If there's children content, render it, otherwise use the article.content if available */}
            {children || (article.content && <div dangerouslySetInnerHTML={{ __html: article.content }} />)}
          </CardContent>
        </Card>
      </main>
      
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12 bg-white dark:bg-gray-900">
        <div className="max-w-[900px] mx-auto px-4 py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 Market Insights. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}