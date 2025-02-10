import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, AlertCircle, Clock, MapPin, ChevronRight, Shield, BarChart3, LineChart, Info } from 'lucide-react';
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { useEffect } from "react";

export default function FedQTExitCryptoRally() {
  useEffect(() => {
    document.title = "Fed's QT Exit: Liquidity Lifeline Ignites Crypto & Equity Rally | Daily Digest";
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <Header simplified showCategories={false} />
      <div className="h-36 sm:h-32"></div>

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletter" className="hover:text-blue-600">Newsletter</Link>
          <ChevronRight className="h-4 w-4" />
          <span>Fed's QT Exit Impact</span>
        </div>

        {/* Weekly Market Alert Warning */}
        <div className="my-6">
          <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Info className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h2 className="font-bold text-lg text-gray-900 dark:text-white">Weekly Market Alert</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    This special report outlines key market scenarios and potential impacts for the week of February 10-14, 2025.
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Any views expressed here are the personal views of the author and should not form the basis for making investment decisions, 
                    nor be construed as a recommendation or advice to engage in investment transactions.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-bold uppercase">Markets</span>
              <span>•</span>
              <span>Analysis</span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              Fed's QT Exit: Liquidity Lifeline Ignites Crypto & Equity Rally - Strategic Plays for BTC, ETH & SOL
            </h1>

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>February 10, 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>GLOBAL MARKETS</span>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-semibold dark:text-gray-300">By Daily | Digest Market Analysis Team</p>
            </div>
          </div>
        </header>

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            The Federal Reserve's accelerated balance sheet reduction and imminent QT exit strategy has created a 
            compelling setup for risk assets, particularly in the crypto sector where Bitcoin's technical structure 
            suggests an imminent breakout. This report analyzes the liquidity dynamics, charts key support/resistance 
            levels, and outlines strategic positioning across major crypto assets as monetary conditions normalize.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">BTC Target Level</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$120,000</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Late 2025 projection</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">QT Reduction</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$2T</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Since June 2022</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">ON RRP Drop</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$78B</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">From $2.55T peak</p>
            </CardContent>
          </Card>
        </div>

        <div className="py-4 space-y-6">
          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              Technical Setup: Bitcoin's Symmetrical Triangle
            </h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <p className="mb-4">
                [Insert BTC chart: Symmetrical triangle breakout]
              </p>
              <ul className="list-none space-y-3 pl-0">
                <li className="flex space-x-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p className="mt-0">
                    <strong>Pattern Formation:</strong> Bitcoin has formed a textbook symmetrical triangle since 
                    December 2024, with converging trendlines suggesting imminent volatility expansion.
                  </p>
                </li>
                <li className="flex space-x-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p className="mt-0">
                    <strong>Volume Profile:</strong> Declining volume into the pattern apex (typical for continuation 
                    setups) while maintaining strong bid support at $42,000-$43,500.
                  </p>
                </li>
                <li className="flex space-x-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p className="mt-0">
                    <strong>Macro Alignment:</strong> Pattern completion coincides with Fed's QT endpoint timeline, 
                    suggesting favorable conditions for upside resolution.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              Liquidity Dynamics: The Fed's Pivot Timeline
            </h2>
            
            <Card className="bg-blue-50/50 dark:bg-blue-900/20 mb-4">
              <CardContent className="p-4">
                <blockquote className="text-base italic text-gray-700 dark:text-gray-300 mb-2">
                  "The Fed's QT exit marks a structural shift from austerity to equilibrium—bullish for risk assets but requiring nimble positioning."
                </blockquote>
                <p className="text-sm text-gray-600 dark:text-gray-400">— Daily | Digest Market Analysis Team</p>
              </CardContent>
            </Card>

            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <ul className="list-none space-y-3 pl-0">
                <li className="flex space-x-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                  <p className="mt-0">
                    <strong>Reserve Management:</strong> Bank reserves remain robust at $3.2T despite aggressive QT, 
                    deemed "abundant" but nearing pre-2019 stress thresholds.
                  </p>
                </li>
                <li className="flex space-x-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                  <p className="mt-0">
                    <strong>Standing Repo Facility:</strong> Instant liquidity provision mechanism reduces systemic 
                    risks, allowing for more aggressive balance sheet normalization.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              Strategic Positioning: Token-Specific Outlook
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <LineChart className="w-5 h-5 text-blue-500" />
                    <div className="space-y-3 flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Bitcoin ($BTC)</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="w-4 h-4 text-blue-500" />
                          <span>Primary target: $120,000 (late 2025)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="w-4 h-4 text-blue-500" />
                          <span>Key support: $42,000-$43,500</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="w-4 h-4 text-blue-500" />
                          <span>Catalyst: ETF inflows + QT end</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <div className="space-y-3 flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Ethereum ($ETH)</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="w-4 h-4 text-blue-500" />
                          <span>Target: $6,000 (Q4 2025)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="w-4 h-4 text-blue-500" />
                          <span>ETH/BTC ratio rebound likely</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="w-4 h-4 text-blue-500" />
                          <span>Dencun upgrade catalyst</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-orange-50/50 dark:bg-orange-900/20 mb-6">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">High-Beta Plays</h3>
                <ul className="list-none space-y-3 pl-0">
                  <li className="flex space-x-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Solana ($SOL):</strong> Layer-1 momentum play targeting $180-220 range on improved 
                      network metrics and DeFi revival.
                    </p>
                  </li>
                  <li className="flex space-x-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Dogecoin ($DOGE):</strong> Speculative sentiment indicator; $0.25-0.30 possible on 
                      broad market rally.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              Risk Monitor: Key Warning Signs
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-2">Regulatory Headwinds</span>
                    <p className="text-gray-700 dark:text-gray-300">
                      New SEC leadership under Acting Chair Mark Uyeda maintains enforcement focus. Ripple/Coinbase 
                      cases remain unresolved amid political gridlock over deregulation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-2">ETF Flow Reversal</span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Initial ETF enthusiasm could wane if macro conditions deteriorate. Net outflows could 
                      trigger cascading liquidations given concentrated institutional positioning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Card className="bg-blue-50/50 dark:bg-blue-900/20">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">The Bottom Line</h2>
              <p className="text-gray-700 dark:text-gray-300">
                The convergence of Fed liquidity normalization, improving technical setups, and institutional adoption 
                via ETFs creates a compelling backdrop for crypto assets in 2025. While volatility is inevitable, 
                maintaining core positions in quality assets (BTC, ETH) while tactically trading high-beta names 
                (SOL, DOGE) on momentum surges offers the optimal risk/reward setup.
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Core Holdings: Bitcoin (65%), Ethereum (25%)</li>
                <li>Tactical Trades: Solana, DOGE (10% combined)</li>
                <li>Key Levels: BTC $42,000 support, ETH $2,800 resistance</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 mt-8">
          <div className="space-y-2">
            <p>
              Sources: Federal Reserve Economic Data (FRED), CoinGlass, Glassnode, Bloomberg Terminal
            </p>
            <p>
              © 2025 Daily | Digest Market Analysis Team. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}