import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, AlertCircle, Clock, MapPin, ChevronRight, Shield, BarChart3, LineChart, Info } from 'lucide-react';
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { WIFChart } from "@/components/ui/WIFChart";
import { CryptoChart } from "@/components/ui/CryptoChart";
import { useEffect } from "react";

export default function FedQTExitCryptoRally() {
  useEffect(() => {
    document.title = "Crypto at Critical Junctures: Technical Analysis for BTC, ETH, SOL, and WIF's Next Moves | Daily Digest";
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <Header simplified showCategories={false} />
      <div className="h-36 sm:h-32"></div>

      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletter" className="hover:text-blue-600">Newsletter</Link>
          <ChevronRight className="h-4 w-4" />
          <span>Fed's QT Exit Impact</span>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-bold uppercase">Markets</span>
              <span>•</span>
              <span>Analysis</span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              Crypto at Critical Junctures: Technical Analysis for BTC, ETH, SOL, and WIF's Next Moves
            </h1>

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>February 10, 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>JAKARTA</span>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-semibold dark:text-gray-300">By Luca Cada Lora</p>
            </div>
          </div>
        </header>

        <div className="my-6">
          <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Info className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Any views expressed here are the personal views of the author and should not form the basis for making investment decisions, 
                    nor be construed as a recommendation or advice to engage in investment transactions.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="py-4 space-y-6">
          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Bitcoin (BTC): Nearing $100K Amid ETF Frenzy – Resistance Battle Ahead</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Bitcoin trades at $97,600, inching closer to the psychological $100K milestone as institutional ETF inflows surge. However, overhead resistance and profit-taking risks loom. Here's a detailed breakdown:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">ETF Inflows: The $48B Daily Catalyst</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>BlackRock Dominance:</strong> iShares Bitcoin Trust (IBIT) leads with 150,000+ BTC ($14.7B AUM), absorbing ~3% of Bitcoin's circulating supply.</li>
                  <li><strong>Daily Volume Surge:</strong> Combined ETF trading volume hit $48B (Feb 9), dwarfing gold ETFs ($12B) and signaling mainstream adoption.</li>
                  <li><strong>Net Inflows:</strong> $1.2B flowed into BTC ETFs last week, reversing January's $450M outflow as macro fears eased.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Key ETF Metrics</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="border-b dark:border-gray-700">
                        <th className="text-left py-2">ETF Provider</th>
                        <th className="text-left py-2">Ticker</th>
                        <th className="text-left py-2">BTC Held</th>
                        <th className="text-left py-2">7-Day Inflow</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-gray-700">
                        <td className="py-2">BlackRock</td>
                        <td className="py-2">IBIT</td>
                        <td className="py-2">152,000</td>
                        <td className="py-2">+$420M</td>
                      </tr>
                      <tr className="border-b dark:border-gray-700">
                        <td className="py-2">Fidelity</td>
                        <td className="py-2">FBTC</td>
                        <td className="py-2">89,500</td>
                        <td className="py-2">+$310M</td>
                      </tr>
                      <tr>
                        <td className="py-2">Ark/21Shares</td>
                        <td className="py-2">ARKB</td>
                        <td className="py-2">42,300</td>
                        <td className="py-2">+$180M</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Resistance at $100K: The Psychological Hurdle</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Historic Precedent:</strong> BTC stalled at $64K (2021) and $84K (2024) due to profit-taking; $100K faces similar sentiment-driven friction.</li>
                  <li><strong>Options Market:</strong> Over $2.5B in open interest clusters at $100K–$105K call options (March expiry), creating a "gamma squeeze" magnet.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">On-Chain Signals</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Exchange Reserves:</strong> Hit 5-year lows (2.1M BTC), signaling long-term holder accumulation.</li>
                  <li><strong>Whale Activity:</strong> Addresses holding 1K+ BTC grew by 4.2% in February.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Token Analysis</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Bitcoin (BTC): $97,600</h3>
                <p className="mb-2"><strong>Catalyst:</strong> Fed liquidity tailwind + ETF inflows ($48B daily volume).</p>
                <p><strong>Strategic Takeaway:</strong> Daily close above $100K confirms path to $105K; hold $94.7K as invalidation.</p>
                <div className="mt-4">
                  <CryptoChart 
                    src="/btc-chart.png"
                    alt="BTC Chart: Technical Analysis"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Ethereum (ETH): $2,646</h3>
                <p className="mb-2"><strong>Catalyst:</strong> Pectra upgrade (March 2025) + spot ETF dominance ($505M inflows). Whale accumulation ($883M inflows) and oversold RSI (29) signal rebound potential.</p>
                <p><strong>Strategic Takeaway:</strong> Break above $2.75K targets $3K; ETH/BTC ratio recovery critical for altseason.</p>
                <div className="mt-4">
                  <CryptoChart 
                    src="/eth-chart.png"
                    alt="ETH Chart: Technical Analysis"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Solana (SOL): $204</h3>
                <p className="mb-2"><strong>Catalyst:</strong> Golden cross (50D {'>'} 200D MA) + spot inflows ($16M). Fed-driven liquidity rotation favors high-beta SOL; exchange outflows ($100M) signal accumulation.</p>
                <p><strong>Strategic Takeaway:</strong> Close above $210 opens path to $220; defend $200 support.</p>
                <div className="mt-4">
                  <CryptoChart 
                    src="/sol-chart.png"
                    alt="SOL Chart: Technical Analysis"
                  />
                </div>
              </div>

              <section className="py-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-lg mb-2">Dogwifhat (WIF): $0.66</h3>
                <p className="mb-2"><strong>Catalyst:</strong> Retail FOMO + whale accumulation ($7.17M Binance buy). Oversold RSI (22.28) and expanding triangle pattern hint at volatility squeeze.</p>
                <p className="mb-4"><strong>Strategic Takeaway:</strong> Hold $0.60 for $0.75 target; breakdown below $0.53 invalidates setup.</p>
                <WIFChart />
              </section>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Strategic Summary</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-2">Token</th>
                    <th className="text-left py-2">Key Catalyst</th>
                    <th className="text-left py-2">Bullish Target</th>
                    <th className="text-left py-2">Invalidation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="py-2">BTC</td>
                    <td className="py-2">Fed QT exit + ETF dominance</td>
                    <td className="py-2">$105K</td>
                    <td className="py-2">$94.7K</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="py-2">ETH</td>
                    <td className="py-2">Pectra upgrade + ETF inflows</td>
                    <td className="py-2">$3K</td>
                    <td className="py-2">$2.44K</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="py-2">SOL</td>
                    <td className="py-2">Golden cross + liquidity rotation</td>
                    <td className="py-2">$220</td>
                    <td className="py-2">$190</td>
                  </tr>
                  <tr>
                    <td className="py-2">WIF</td>
                    <td className="py-2">Retail FOMO + whale buys</td>
                    <td className="py-2">$0.75</td>
                    <td className="py-2">$0.53</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Related Articles</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <Link href="/newsletter/fed-balance-sheet-blueprint" className="text-blue-600 hover:underline">
                  Fed Balance Sheet Blueprint
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Visualization Notes: Charts should emphasize breakout levels, RSI/MACD divergences, and volume trends aligned with Fed liquidity shifts.
            </p>
          </section>
        </div>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 mt-8">
          <div className="space-y-2">
            <p>© 2025 Daily | Digest Market Analysis Team. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}