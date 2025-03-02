import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ExternalNewsCard } from "@/components/ExternalNewsCard";
import { SubscribeModal } from "@/components/SubscribeModal";
import { sampleExternalNews } from "@/types/external-news";

export default function Latest() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter articles based on search query
  const filteredArticles = sampleExternalNews.filter(article => {
    if (!searchQuery.trim()) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(searchLower) ||
      article.source.toLowerCase().includes(searchLower) ||
      article.author.toLowerCase().includes(searchLower) ||
      (article.category && article.category.toLowerCase().includes(searchLower))
    );
  });

  // Sort by timestamp (most recent first)
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    const timestampA = a.timestamp || new Date(a.publishedDate).getTime();
    const timestampB = b.timestamp || new Date(b.publishedDate).getTime();
    return timestampB - timestampA;
  });

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <Header onSubscribe={() => setIsSubscribeOpen(true)} showCategories={false} />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />

      <div className="h-36 sm:h-32"></div>

      <main className="max-w-[1200px] mx-auto px-4 py-6 sm:py-8 dark:text-gray-200">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            Latest Stories
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Breaking news and analysis from Bloomberg, The Economist, and other trusted sources
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Input 
            type="text"
            placeholder="Search latest stories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedArticles.map(article => (
            <Card key={article.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <ExternalNewsCard 
                  article={article} 
                  showSource={false}
                />
              </CardContent>
            </Card>
          ))}
        </div>
        
        {sortedArticles.length === 0 && (
          <div className="text-center p-12 text-gray-500 dark:text-gray-400">
            No articles found matching your search
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12 bg-white dark:bg-gray-900">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 Daily Digest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}