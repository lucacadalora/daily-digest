import { ArticleCard } from "@/components/ArticleCard";
import { sampleArticles } from "@/types/newsletter";
import type { Category } from "@/types/newsletter";
import { useLocation, Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { MarketTicker } from "@/components/MarketTicker";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Newsletters() {
  const [location] = useLocation();
  const category = location.split("/").pop() as Category | undefined;

  const filteredArticles = category 
    ? sampleArticles.filter(article => article.category === category)
    : sampleArticles;

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 z-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Market Ticker */}
          <div className="py-2 overflow-hidden">
            <MarketTicker />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center py-3">
            <h1 className="text-xl font-['Georgia'] font-bold dark:text-white">
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">Daily</span>
              <span className="font-light mx-1">|</span>
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Digest</span>
            </h1>
            <div className="flex items-center space-x-4">
              <nav className="space-x-4 sm:space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
                <Link href="/newsletter/category/Markets" className="hover:text-blue-600 transition-colors">Markets</Link>
                <Link href="/newsletter/category/Economics" className="hover:text-blue-600 transition-colors">Economics</Link>
                <Link href="/newsletter/category/Industries" className="hover:text-blue-600 transition-colors">Industries</Link>
                <Link href="/newsletter/category/Tech" className="hover:text-blue-600 transition-colors">Tech</Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Header spacing for fixed navbar */}
      <div className="h-24"></div>

      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletters" className="hover:text-blue-600">Newsletter</Link>
          {category && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span>{category} Newsletter</span>
            </>
          )}
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {category ? `${category} Newsletter` : 'All Newsletters'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
}