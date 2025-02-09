import { ArticleCard } from "@/components/ArticleCard";
import { sampleArticles } from "@/types/newsletter";
import type { Category } from "@/types/newsletter";
import { useLocation, Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";

export default function Newsletters() {
  const [location] = useLocation();
  const category = location.split("/").pop() as Category | undefined;
  const isViewAll = location === "/newsletter";
  const isFeatured = category === "Featured";
  const filteredArticles = category && !isViewAll
    ? sampleArticles.filter(article => 
        category === "Featured" 
          ? article.featured 
          : article.category === category
      )
    : sampleArticles;

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
          <span>Newsletter</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white">Newsletter</h1>

        {/* Filter by tag */}
        <div className="mb-6 sm:mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">FILTER BY TAG</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/newsletter" 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${isViewAll ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 
                'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400'}`}>
              View All
            </Link>
            <Link href="/newsletter/category/Featured"
              className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                ${isFeatured ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 
                'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400'}`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isFeatured ? 'bg-white/75' : 'bg-blue-400/75'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isFeatured ? 'bg-white' : 'bg-blue-500'}`}></span>
              </span>
              Featured
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>

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