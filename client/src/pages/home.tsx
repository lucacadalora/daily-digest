import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { ExternalNewsCard } from "@/components/ExternalNewsCard";
import { LatestExternalNews } from "@/components/LatestExternalNews";
import { ChatBox } from "@/components/ChatBox";
import { SubscribeModal } from "@/components/SubscribeModal";
import { sampleArticles } from "@/types/newsletter";
import { sampleExternalNews } from "@/types/external-news";
import { Header } from "@/components/Header";

export default function Home() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  // Sort articles by date (most recent first)
  const sortedArticles = [...sampleArticles].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get featured articles - REE and Mineral Criticality Matrix
  const featuredArticles = sampleArticles.filter(
    (article) => article.featured
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate the articles for the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <Header onSubscribe={() => setIsSubscribeOpen(true)} />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />

      <div className="h-36 sm:h-32"></div>

      <main className="max-w-[1200px] mx-auto px-4 py-6 sm:py-8 dark:text-gray-200">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Latest News Section - 1.5/6 width */}
          <div className="hidden lg:block lg:w-[25%] flex-shrink-0">
            <LatestExternalNews articles={sampleExternalNews} maxItems={8} />
          </div>

          {/* Main Newsletter Content - 3/6 width */}
          <div className="flex-1 lg:w-[50%]">
            {/* Newsletter Section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                Newsletter
              </h2>
              <Link
                href="/newsletter"
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              {currentArticles.map((article, index) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 
                      ${currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
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
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Featured
              </h2>
              {featuredArticles.map((article, index) => (
                <div key={article.slug} className={index > 0 ? "mt-4" : ""}>
                  <Link href={`/newsletter/${article.slug}`}>
                    <Card className="group relative hover:shadow-lg transition-shadow duration-200">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={`${article.previewImage || (
                              article.slug === "indonesia-mineral-criticality-matrix" 
                                ? "/Figure_1.png" 
                                : "/test-image.png"
                            )}?v=${Date.now()}`}
                            alt={article.title}
                            className="w-full aspect-video object-cover rounded-lg"
                            onError={(e) => {
                              console.error(`Failed to load image: ${e.currentTarget.src}`);
                              e.currentTarget.src = "/test-image.png"; // Fallback image
                            }}
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-sm group-hover:scale-110 transition-transform">
                            <ArrowRight className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                            {article.category}
                          </div>
                          <h3 className="font-serif text-base text-gray-900 dark:text-white line-clamp-2">
                            {article.title}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
              
              {/* ChatBox below Featured Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                  Daily | Digest AI
                </h2>
                <ChatBox />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sections */}
        <div className="lg:hidden mt-8">
          {/* Mobile Latest News Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                Latest
              </h2>
              <Link
                href="/latest"
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
              >
                More Stories <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {sampleExternalNews.slice(0, 5).map(article => (
                <ExternalNewsCard 
                  key={article.id} 
                  article={article} 
                  compact={true}
                  showSource={false}
                />
              ))}
            </div>
          </div>
          
          {/* Mobile ChatBox Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Daily | Digest AI
            </h2>
            <ChatBox />
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12 bg-white dark:bg-gray-900">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 Daily Digest. All rights reserved.
            </p>
            <p className="text-xs italic text-gray-500 dark:text-gray-400">
              Disclaimer: The content provided on this website is for informational purposes only. It is not intended to be financial advice. 
              Consult a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
