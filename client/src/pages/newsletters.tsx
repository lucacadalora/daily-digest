import { ArticleCard } from "@/components/ArticleCard";
import { sampleArticles } from "@/types/newsletter";
import type { Category } from "@/types/newsletter";
import { useLocation, Link } from "wouter";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ARTICLES_PER_PAGE = 4;

export default function Newsletters() {
  const [location] = useLocation();
  const category = location.split("/").pop() as Category | undefined;
  const isViewAll = location === "/newsletters";
  const [currentPage, setCurrentPage] = useState(1);

  // Filter articles based on category
  const filteredArticles = category && !isViewAll
    ? sampleArticles.filter(article => article.category === category)
    : sampleArticles;

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  // Generate empty cards to fill the grid
  const emptyCards = Array(ARTICLES_PER_PAGE - currentArticles.length)
    .fill(null)
    .map((_, index) => ({
      slug: `empty-${index}`,
      title: "",
      description: "",
      category: "Markets" as Category,
      source: "",
      author: "",
      date: "",
      content: "",
    }));

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Header */}
      <Header simplified />

      {/* Header spacing */}
      <div className="h-36 sm:h-32"></div>

      <main className="max-w-[1200px] mx-auto px-4 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span>Newsletters</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white">Newsletter</h1>

        {/* Filter by tag */}
        <div className="mb-6 sm:mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">FILTER BY TAG</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/newsletters" 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${isViewAll ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 
                'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400'}`}>
              View All
            </Link>
            {['Markets', 'Economics', 'Industries', 'Tech'].map((tag) => (
              <Link key={tag} href={`/newsletter/category/${tag}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                  ${category === tag ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 
                  'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {currentArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
          {emptyCards.map((emptyArticle) => (
            <Card key={emptyArticle.slug} className="h-full opacity-50 dark:opacity-30 cursor-not-allowed">
              <div className="p-4 h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                Coming Soon
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No articles found in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
}