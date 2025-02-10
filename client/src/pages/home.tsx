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
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  // Sort articles by date (most recent first) and take the most recent ones
  const sortedArticles = [...sampleArticles].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get featured article - Mineral Criticality Matrix
  const featuredArticle = sampleArticles.find(article => article.slug === 'indonesia-mineral-criticality-matrix');

  // Calculate the articles for the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArticles
    .filter(article => article.slug !== 'indonesia-mineral-criticality-matrix') // Exclude featured from main list
    .slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Header */}
      <Header onSubscribe={() => setIsSubscribeOpen(true)} />

      {/* Subscription Modal */}
      <SubscribeModal 
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />

      {/* Header spacing */}
      <div className="h-36 sm:h-32"></div>

      <main className="max-w-[1200px] mx-auto px-4 py-6 sm:py-8 dark:text-gray-200">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ChatBox - 1/6 width */}
          <div className="hidden lg:block lg:w-[16.67%] flex-shrink-0">
            <ChatBox />
          </div>

          {/* Main Newsletter Content - 4/6 width */}
          <div className="flex-1 lg:w-[66.66%]">
            {/* Newsletter Section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Newsletter</h2>
              <Link href="/newsletter" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Featured Articles */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              {currentArticles.map((article, index) => (
                <ArticleCard key={article.slug} article={article} />
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

          {/* Featured Section - 1/6 width */}
          <div className="hidden lg:block lg:w-[16.67%] flex-shrink-0">
            <div className="sticky top-40">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">MOST READ</h2>
              {featuredArticle && (
                <Link href={`/newsletter/${featuredArticle.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          FIRST OPINION
                        </div>
                        <h3 className="font-medium text-gray-900 dark:text-white text-base">
                          {featuredArticle.title}
                        </h3>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          1 of 5 most read today
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Chat Box Section */}
        <div className="lg:hidden mt-8">
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