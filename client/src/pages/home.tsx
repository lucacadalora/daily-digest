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
                {[
                  {
                    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400",
                    title: "SoftBank in Talks to Invest Up to $25 Billion in OpenAI",
                    subtitle: "Meta Gains After Zuckerberg Predicts 'Really Big Year' in AI",
                    author: "Luca Cada Lora",
                    date: "Jan 30, 2025"
                  },
                  {
                    img: "https://images.unsplash.com/photo-1605146768851-eda79da39897?w=800&h=400",
                    title: "White House Considers Dozens of New Ways to Seize Spending Power",
                    subtitle: "Trump's Transactional Foreign Policy Leads to Flurry of Pledges",
                    author: "Luca Cada Lora",
                    date: "Jan 29, 2025"
                  }
                ].map((story, index) => (
                  <Link key={index} href="/article" className="block group">
                    <div className="flex gap-4">
                      <div className="w-24 h-16 flex-shrink-0">
                        <img src={story.img} alt={story.title} className="w-full h-full object-cover rounded" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {story.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{story.author}</span>
                          <span>•</span>
                          <span>{story.date}</span>
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