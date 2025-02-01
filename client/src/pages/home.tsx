import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, Clock, ArrowRight } from "lucide-react";
import { MarketTicker } from "@/components/MarketTicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArticleCard } from "@/components/ArticleCard";
import { ChatBox } from "@/components/ChatBox";
import { sampleArticles } from "@/types/newsletter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 z-50">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Market Ticker */}
          <div className="py-2 overflow-hidden border-b border-gray-100 dark:border-gray-800">
            <MarketTicker />
          </div>

          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-['Georgia'] font-bold dark:text-white">
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">Daily</span>
              <span className="font-light mx-1">|</span>
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Digest</span>
            </h1>
            <nav className="hidden sm:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
              <Link href="/newsletter/category/Markets" className="hover:text-blue-600 transition-colors">Markets</Link>
              <Link href="/newsletter/category/Economics" className="hover:text-blue-600 transition-colors">Economics</Link>
              <Link href="/newsletter/category/Industries" className="hover:text-blue-600 transition-colors">Industries</Link>
              <Link href="/newsletter/category/Tech" className="hover:text-blue-600 transition-colors">Tech</Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Top Spacing for Fixed Header */}
      <div className="h-36 sm:h-32"></div>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 py-6 sm:py-8 dark:text-gray-200">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Newsletter Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Newsletter</h2>
              <Link href="/newsletters" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
              {sampleArticles.slice(0, 1).map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}

              <Card className="opacity-50 dark:opacity-75">
                <CardContent className="p-4 h-[200px] flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">More newsletters coming soon</p>
                </CardContent>
              </Card>
            </div>

            {/* Add ChatBox component */}
            <div className="mt-8">
              <ChatBox />
            </div>
          </div>

          {/* Latest Stories Sidebar */}
          <div className="w-full lg:w-96 flex-shrink-0 lg:w-64 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Latest Stories</h2>
            <div className="space-y-6">
              <Link href="/article" className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="border-b border-gray-100 dark:border-gray-700 pb-6">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400" alt="SoftBank Masayoshi Son" className="object-cover rounded-lg" />
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span className="font-medium">By Luca Cada Lora</span>
                    <span>•</span>
                    <span>Jan 30, 2025</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-500">
                    SoftBank in Talks to Invest Up to $25 Billion in OpenAI
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Meta Gains After Zuckerberg Predicts 'Really Big Year' in AI
                  </p>
                </div>
              </Link>

              <Link href="/article" className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="border-b border-gray-100 dark:border-gray-700 pb-6">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img src="https://images.unsplash.com/photo-1605146768851-eda79da39897?w=800&h=400" alt="White House" className="object-cover rounded-lg" />
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span className="font-medium">By Luca Cada Lora</span>
                    <span>•</span>
                    <span>Jan 29, 2025</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-500">
                    White House Considers Dozens of New Ways to Seize Spending Power
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Trump's Transactional Foreign Policy Leads to Flurry of Pledges
                  </p>
                </div>
              </Link>

              <Link href="/article" className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="border-b border-gray-100 dark:border-gray-700 pb-6">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=400" alt="India AI Models" className="object-cover rounded-lg" />
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span className="font-medium">By Luca Cada Lora</span>
                    <span>•</span>
                    <span>Jan 28, 2025</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-500">
                    India Races to Build Own AI Models as DeepSeek Leaps Ahead
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Adani Flagship's Net Slumps 97% on Poor Coal Trading, Forex Loss
                  </p>
                </div>
              </Link>
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