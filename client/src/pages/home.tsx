import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, Clock, ArrowRight } from "lucide-react";
import { MarketTicker } from "@/components/MarketTicker";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBF7F4]">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Market Ticker */}
          <div className="py-2 overflow-hidden">
            <MarketTicker />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center py-3">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Lucaxyzz Sipaling Saham</h1>
            <nav className="space-x-8 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-orange-500 transition-colors">Markets</Link>
              <Link href="/" className="hover:text-orange-500 transition-colors">Analysis</Link>
              <Link href="/" className="hover:text-orange-500 transition-colors">Watchlist</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Top Spacing for Fixed Header */}
      <div className="h-24"></div>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Newsletter Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Newsletter</h2>
              <Link href="/newsletters" className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Link href="/article">
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3 text-gray-600">
                      <Newspaper className="h-4 w-4" />
                      <span className="text-xs font-medium">Wall Street Journal</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                      Bank Rakyat Indonesia: The Undervalued Dividend Powerhouse
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      Analysis of BBRI's potential 30-40% total return opportunity through dividends and valuation re-rating.
                    </p>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>January 30, 2025</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Card className="opacity-50">
                <CardContent className="p-4 h-[200px] flex items-center justify-center">
                  <p className="text-gray-500">More newsletters coming soon</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Latest Stories Sidebar */}
          <div className="w-96 flex-shrink-0">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Latest Stories</h2>
            <div className="space-y-6">
              <Link href="/article" className="block hover:bg-gray-50">
                <div className="border-b border-gray-100 pb-6">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e" alt="Venice VVV Token" className="object-cover rounded-lg" />
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                    <span className="font-medium">By Luca Cada Lora</span>
                    <span>•</span>
                    <span>Jan 29, 2025</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 hover:text-blue-600">
                    $1B Venice VVV Token Launch
                  </h3>
                  <p className="text-sm text-gray-600">
                    Symbiotic's Restaking Protocol | The Future of Healthcare Data & Hippocrat
                  </p>
                </div>
              </Link>

              <Link href="/article" className="block hover:bg-gray-50">
                <div className="border-b border-gray-100 pb-6">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d" alt="Jupiter Crypto" className="object-cover rounded-lg" />
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                    <span className="font-medium">By Luca Cada Lora</span>
                    <span>•</span>
                    <span>Jan 27, 2025</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 hover:text-blue-600">
                    Jupiter Crypto Conglomerate
                  </h3>
                  <p className="text-sm text-gray-600">
                    Hayes: $70,000 BTC? | JUP Spikes 40%
                  </p>
                </div>
              </Link>

              <Link href="/article" className="block hover:bg-gray-50">
                <div className="border-b border-gray-100 pb-6">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img src="https://images.unsplash.com/photo-1634542984003-e0fb8e200e91" alt="Bond Trading" className="object-cover rounded-lg" />
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                    <span className="font-medium">By Luca Cada Lora</span>
                    <span>•</span>
                    <span>Jan 26, 2025</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 hover:text-blue-600">
                    Bond Traders Are Kept in Limbo After Powell Offers Few Clues
                  </h3>
                  <p className="text-sm text-gray-600">
                    Market uncertainty persists following Federal Reserve commentary
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <p className="text-sm text-gray-500">© 2025 Lucaxyzz Sipaling Saham. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}