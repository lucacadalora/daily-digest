import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { ChatBox } from "@/components/ChatBox";
import { SubscribeModal } from "@/components/SubscribeModal";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";

export default function Home() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Header */}
      <Header onSubscribe={() => setIsSubscribeOpen(true)} />

      {/* Subscription Modal */}
      <SubscribeModal 
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />

      {/* Top Spacing for Fixed Header */}
      <div className="h-36 sm:h-32"></div>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 py-6 sm:py-8 dark:text-gray-200">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - ChatBox */}
          <div className="lg:w-80 flex-shrink-0">
            <ChatBox />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Newsletter</h2>
              <Link href="/newsletters" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Featured Articles */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              {sampleArticles.slice(0, 1).map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </div>

            {/* Latest Stories - Compact Version */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Latest Stories</h3>
              <div className="space-y-4">
                {sampleArticles.slice(1).map((article, index) => (
                  <Link key={index} href={`/newsletter/${article.slug}`} className="block group">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{article.author}</span>
                          <span>•</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12 bg-white dark:bg-gray-900">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 Daily Digest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}