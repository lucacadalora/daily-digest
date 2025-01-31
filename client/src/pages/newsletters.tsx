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
  const isViewAll = location === "/newsletters";
  const filteredArticles = category && !isViewAll
    ? sampleArticles.filter(article => article.category === category)
    : sampleArticles;

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 z-50">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Market Ticker */}
          <div className="py-2 overflow-hidden">
            <MarketTicker />
          </div>

          {/* Top Navigation Bar */}
          <div className="flex justify-between items-center py-3">
            <Link href="/">
              <h1 className="text-xl font-['Georgia'] font-bold dark:text-white cursor-pointer hover:opacity-80 transition-opacity">
                <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">Daily</span>
                <span className="font-light mx-1">|</span>
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Digest</span>
              </h1>
            </Link>
            <ThemeToggle />
          </div>

          {/* Category Navigation - Desktop */}
          <nav className="hidden sm:flex items-center justify-center space-x-8 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="/newsletter/category/Markets" className="hover:text-blue-600 transition-colors">Markets</Link>
            <Link href="/newsletter/category/Economics" className="hover:text-blue-600 transition-colors">Economics</Link>
            <Link href="/newsletter/category/Industries" className="hover:text-blue-600 transition-colors">Industries</Link>
            <Link href="/newsletter/category/Tech" className="hover:text-blue-600 transition-colors">Tech</Link>
          </nav>

          {/* Category Navigation - Mobile */}
          <div className="sm:hidden">
            <div className="overflow-x-auto pb-3 -mx-4 px-4">
              <nav className="flex space-x-6 text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
                <Link href="/newsletter/category/Markets" className="hover:text-blue-600 transition-colors">Markets</Link>
                <Link href="/newsletter/category/Economics" className="hover:text-blue-600 transition-colors">Economics</Link>
                <Link href="/newsletter/category/Industries" className="hover:text-blue-600 transition-colors">Industries</Link>
                <Link href="/newsletter/category/Tech" className="hover:text-blue-600 transition-colors">Tech</Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

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
            <Link href="/newsletter/category/Featured"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative
                ${category === 'Featured' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 
                'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400'}`}>
              <span className="flex items-center">
                <span className="relative mr-2">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                </span>
                Featured
              </span>
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