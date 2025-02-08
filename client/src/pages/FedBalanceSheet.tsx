import React, {useEffect} from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, AlertCircle, Clock, MapPin, ChevronRight, TrendingUp, Shield } from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";

const FedBalanceSheetPage: React.FC = () => {
  const [location] = useLocation();
  const article = sampleArticles.find(a => a.slug === 'fed-balance-sheet-blueprint');

  useEffect(() => {
    if (article) {
      const metrics = article.previewMetrics || [];
      const metricsText = metrics.length > 0 
        ? metrics.map(m => `${m.label}: ${m.value}`).join(" | ")
        : '';

      const previewTitle = `${article.title} | Daily Digest`;
      const previewDescription = metricsText 
        ? `${metricsText}. ${article.description}`
        : article.description;

      document.title = previewTitle;
    }
  }, [article]);

  if (!article) {
    return <div>Article not found</div>;
  }

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
          <span>Fed's Balance Sheet Blueprint</span>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-bold uppercase">{article.category}</span>
              <span>•</span>
              <span>Analysis</span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>JAKARTA</span>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-semibold dark:text-gray-300">By {article.author}</p>
            </div>
          </div>
        </header>

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            The Federal Reserve has accelerated its quantitative tightening (QT) program, cutting its balance sheet by $2 trillion since 2022—including a rapid $297B reduction since June 2024. This pace exceeds earlier Wall Street estimates (JPMorgan projected $1.7T total by 2024) and signals aggressive liquidity withdrawal.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Critically, the Fed now explicitly plans to halt QT when reserves reach "somewhat above" ample levels—a nuanced shift from prior "just above" guidance. This buffer aims to prevent a replay of 2019's repo market stress while maintaining policy flexibility. Projections align with a mid-2025 endpoint, contingent on reserve balances (currently ~10-11% of GDP).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
          {/* Metric Cards */}
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <TrendingDown className="h-6 w-6 text-blue-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Balance Sheet Cut</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$2T</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Since 2022</p>
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 text-center">
                  Fastest pace of reduction in Fed history
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">S&P Target</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">6,000+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Q3 2025 Target</p>
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 text-center">
                  Tech sector leadership expected
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <Shield className="h-6 w-6 text-yellow-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">BTC Projection</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$120K</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Late 2025</p>
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 text-center">
                  Post-ETF institutional adoption
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Market Implications: The Liquidity Thaw</h2>

          <Card className="bg-blue-50/50 dark:bg-blue-900/20 mb-4">
            <CardContent className="p-4">
              <blockquote className="text-base italic text-gray-700 dark:text-gray-300 mb-2">
                "The Fed's QT exit marks a structural shift from austerity to equilibrium—bullish for risk assets but requiring nimble positioning."
              </blockquote>
              <p className="text-sm text-gray-600 dark:text-gray-400">— Market Analysis Team</p>
            </CardContent>
          </Card>

          <div className="prose text-gray-700 dark:text-gray-300 max-w-none mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Equities: S&P 500 Poised for Breakout</h3>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>Tech/Growth Leadership: Reduced liquidity drag and stable reserves favor rate-sensitive sectors</li>
              <li>Sector Opportunities: AI infrastructure, renewables, and small-caps likely outperform</li>
              <li>Valuation Support: Fed liquidity safeguards mitigate systemic risk</li>
            </ul>
          </div>

          <Card className="bg-orange-50/50 dark:bg-orange-900/20 mb-4">
            <CardContent className="p-4">
              <blockquote className="text-base italic text-gray-700 dark:text-gray-300 mb-2">
                "Bitcoin could target $120K by late 2025 as QT ends. Institutional inflows via ETFs may accelerate post-Fed pivot."
              </blockquote>
              <p className="text-sm text-gray-600 dark:text-gray-400">— Crypto Strategy Team</p>
            </CardContent>
          </Card>

          <div className="prose text-gray-700 dark:text-gray-300 max-w-none mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Crypto: Bitcoin's Macro Catalyst</h3>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>Bitcoin: Historically inverse to real yields, targeting $120K by late 2025</li>
              <li>Ethereum: ETH/BTC ratio likely rebounds with risk appetite</li>
              <li>High-Beta Plays: SOL, DOGE, and AI-linked tokens may surge</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">The Hidden Risk: Faster QT ≠ Tighter Policy</h2>

          <Card className="bg-green-50/50 dark:bg-green-900/20 mb-4">
            <CardContent className="p-4">
              <blockquote className="text-base italic text-gray-700 dark:text-gray-300 mb-2">
                "While the Fed's balance sheet shrinks faster than anticipated, strategic tools soften the blow, supporting a Goldilocks backdrop for corporates."
              </blockquote>
              <p className="text-sm text-gray-600 dark:text-gray-400">— Policy Analysis Team</p>
            </CardContent>
          </Card>

          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <p className="mb-4">While the Fed's balance sheet shrinks faster than anticipated, strategic tools soften the blow:</p>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>ON RRP Usage Collapse: Dropped from $2.55T (2023) to $78B</li>
              <li>Productivity Buffer: Business-sector productivity grew 1.97% in 2024</li>
              <li>Labor Market Stability: Unemployment at 4.1%, wage growth cooled to 3.6% YoY</li>
            </ul>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Actionable Scenarios & Risk Monitor</h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Scenario</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Trigger</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Equity Impact</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Crypto Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Soft Landing (60%)</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Inflation cools to 2.4%</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">S&P +15%, Tech rallies</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">BTC $100K, ETH $6K</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Early Pivot (25%)</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Unemployment &gt; 4.5%</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Small-caps surge 30%</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Altcoins (SOL +50%)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Stagflation (15%)</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Oil spikes &gt; $100/bbl</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Defensives outperform</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">BTC tests $60K</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Risks to Monitor</h3>
            <div className="space-y-6">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-2">Geopolitical Shock</span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Middle East tensions or Taiwan escalation could spike oil prices above $100/barrel, delaying QT exit and forcing the Fed to prioritize inflation control over liquidity stability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-2">Inflation Stickiness</span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Core services inflation (3.5% YoY) and stubborn wage growth risk re-anchoring high inflation expectations. A CPI print &gt;3% could reset rate-cut bets, prolonging restrictive policy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-2">Crypto Regulatory Transition</span>
                    <p className="text-gray-700 dark:text-gray-300">
                      New SEC leadership (Acting Chair Mark Uyeda) aims for clearer rules, but delays in resolving enforcement cases (Ripple, Coinbase) and political gridlock over deregulation inject uncertainty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Card className="bg-blue-50/50 dark:bg-blue-900/20 mt-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">The Bottom Line</h2>
            <p className="text-gray-700 dark:text-gray-300">
              The Fed's QT exit marks a structural shift from austerity to equilibrium—bullish for risk assets but requiring nimble positioning. Investors should:
            </p>
            <ul className="list-disc list-inside pl-4 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Overweight: Tech (NVDA, META), Bitcoin miners (RIOT), AI infrastructure plays</li>
              <li>Avoid: Regional banks, commercial REITs facing refinancing walls</li>
              <li>Watch: March FOMC meeting for updated dot plots; CME FedWatch odds now price 40bps cuts by December</li>
            </ul>
          </CardContent>
        </Card>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 mt-8">
          <div className="space-y-2">
            <p>
              Disclosure: This analysis incorporates data from the Federal Reserve's February 2025 Monetary Policy Report, Bloomberg consensus forecasts, and proprietary analytics.
            </p>
            <p className="space-y-1">
              <div>Sources:</div>
              <div>Board of Governors of the Federal Reserve System. (2025, February 7). Monetary Policy Report. https://www.federalreserve.gov/monetarypolicy/files/20250207_mprfullreport.pdf</div>
              <div>Federal Reserve Economic Data (FRED), Bloomberg Terminal, CME FedWatch</div>
            </p>
            <p>© 2025 Daily | Digest Market Analysis Team. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FedBalanceSheetPage;