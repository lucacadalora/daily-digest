import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import { MarketTicker } from "@/components/MarketTicker";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Market Ticker */}
          <div className="py-2 border-b border-gray-100 overflow-hidden">
            <MarketTicker />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">Lucaxyzz Sipaling Saham</h1>
            <nav className="space-x-6 text-sm font-medium text-gray-600">
              <Link href="/">Markets</Link>
              <Link href="/">Analysis</Link>
              <Link href="/">Watchlist</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <section>
          <h2 className="text-xl font-bold mb-6">Featured Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/article">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-3 text-gray-600">
                    <Newspaper className="h-4 w-4" />
                    <span className="text-xs font-medium">Wall Street Journal</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold mb-2 line-clamp-2">
                    Bank Rakyat Indonesia: The Undervalued Dividend Powerhouse
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    Analysis of BBRI's potential 30-40% total return opportunity through dividends and valuation re-rating.
                  </p>
                  <div className="mt-4 text-xs text-gray-500 flex items-center justify-between">
                    <span>January 30, 2025</span>
                    <span>5 min read</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Placeholder cards for future articles */}
            <Card className="opacity-50">
              <CardContent className="p-4 h-[200px] flex items-center justify-center">
                <p className="text-gray-500">More articles coming soon</p>
              </CardContent>
            </Card>

            <Card className="opacity-50">
              <CardContent className="p-4 h-[200px] flex items-center justify-center">
                <p className="text-gray-500">More articles coming soon</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <p className="text-sm text-gray-500">© 2025 Lucaxyzz Sipaling Saham. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}