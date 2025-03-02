import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalNewsCard } from "@/components/ExternalNewsCard";
import type { ExternalNews } from "@/types/external-news";

interface LatestExternalNewsProps {
  articles: ExternalNews[];
  maxItems?: number;
}

export const LatestExternalNews = ({ articles, maxItems = 7 }: LatestExternalNewsProps) => {
  // Sort articles by timestamp (most recent first)
  const sortedArticles = [...articles].sort((a, b) => {
    const timestampA = a.timestamp || new Date(a.publishedDate).getTime();
    const timestampB = b.timestamp || new Date(b.publishedDate).getTime();
    return timestampB - timestampA;
  });
  
  // Get only the latest items based on maxItems
  const latestArticles = sortedArticles.slice(0, maxItems);
  
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
              href="/latest"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
            >
              More Stories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Delivering must-read stories about markets, economics and finance
          </p>
        </div>
        
        {/* Articles List - Grid layout for card-style design */}
        <ScrollArea className="h-[calc(100vh-14rem)] max-h-[660px]">
          <div className="p-3 grid grid-cols-1 gap-4">
            {latestArticles.map(article => (
              <ExternalNewsCard 
                key={article.id} 
                article={article} 
                showSource={false}
              />
            ))}
          </div>
          
          {latestArticles.length === 0 && (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No articles found
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