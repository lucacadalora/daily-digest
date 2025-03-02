import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LatestNewsCard } from "@/components/LatestNewsCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/types/newsletter";

interface LatestNewsProps {
  articles: Article[];
  maxItems?: number;
}

export const LatestNews = ({ articles, maxItems = 5 }: LatestNewsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter latest articles, sorted by date
  const sortedArticles = [...articles].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Apply category filter if one is selected
  const filteredArticles = selectedCategory 
    ? sortedArticles.filter(article => article.category === selectedCategory)
    : sortedArticles;
  
  // Get only the latest items based on maxItems
  const latestArticles = filteredArticles.slice(0, maxItems);
  
  // Extract unique categories from all articles
  const categories = Array.from(new Set(articles.map(article => article.category)));
  
  return (
    <Card className="bg-white dark:bg-gray-900 shadow-sm">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white">
              Latest
            </h2>
            <Link
              href="/newsletter"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
            >
              All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Articles List */}
        <ScrollArea className="h-[calc(100vh-14rem)] max-h-[600px]">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {latestArticles.map(article => (
              <LatestNewsCard 
                key={article.slug} 
                article={article} 
                compact={false}
              />
            ))}
          </div>
          
          {latestArticles.length === 0 && (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No articles found in this category
            </div>
          )}
        </ScrollArea>
        
        {/* Time Indicator */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 text-center">
          Last updated: {new Date().toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};