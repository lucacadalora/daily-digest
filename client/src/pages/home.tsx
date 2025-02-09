import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { ChatBox } from "@/components/ChatBox";
import { SubscribeModal } from "@/components/SubscribeModal";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";

// Category-specific thumbnail images
const categoryThumbnails = {
  Markets: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=400",
  Economics: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&h=400",
  Industries: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=800&h=400",
  Tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400"
};

export default function Home() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  // Calculate the articles for the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sampleArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(sampleArticles.length / articlesPerPage);

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
              <Link href="/newsletter" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Featured Articles */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              {currentArticles.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 
                      ${currentPage === i + 1 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
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