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
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - ChatBox (Hidden on mobile) */}
          <div id="chat" className="hidden md:block md:w-80 flex-shrink-0 scroll-mt-40">
            <ChatBox />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Newsletter Section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Newsletter</h2>
              <Link href="/newsletters" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Featured Articles */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              {sampleArticles.map((article) => (
                <ArticleCard 
                  key={article.slug} 
                  article={article} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Chat Box Section */}
        <div id="mobile-chat" className="md:hidden mt-8 scroll-mt-40">
          <ChatBox />
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