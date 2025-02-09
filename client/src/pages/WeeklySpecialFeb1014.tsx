import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, AlertCircle, Clock, MapPin, ChevronRight, BarChart } from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";

const WeeklySpecialFeb1014: React.FC = () => {
  const [location] = useLocation();
  const article = sampleArticles.find(a => a.slug === 'weekly-special-feb-10-14');

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
          <span>Weekly Market Alert Feb 10-14, 2025</span>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-bold uppercase">{article.category}</span>
              <span>•</span>
              <span>Weekly Special</span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          {article.previewMetrics?.map((metric, index) => (
            <Card key={index} className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                  <h3 className="font-bold text-gray-900 dark:text-white">{metric.label}</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">Backward Analysis: Validated Risks</h2>
              <p className="mb-4">Our February 3–7 analysis accurately flagged:</p>
              <ul className="list-none space-y-2">
                <li>• IHSG Collapse: Index plunged to 6,752.57 (-5.16% WoW), breaching 6,900 as projected.</li>
                <li>• Commodity Carnage: ADRO (-12%), PTBA (-9%), and AALI (-8%) collapsed amid China's coal/LNG tariffs and CPO risks.</li>
                <li>• Currency Pressures: USDIDR hit 16,450, nearing BI's intervention threshold.</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">Key Triggers</h2>
              <ul className="list-none space-y-2">
                <li>• China's 15% tariff on US coal/LNG (effective Feb 10) disrupted Indonesia's $2.1B nickel supply chain15.</li>
                <li>• Trump's 10% China tariffs triggered Rp 3.8T foreign equity outflows611.</li>
                <li>• MSCI exclusion of BREN/CUAN/PTRO erased $10.5B market cap, amplifying IHSG volatility625.</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">Key Narratives for February 10–14</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">1. GDP Growth Reality Check</h3>
                  <p className="mb-2">Indonesia's 2024 GDP growth of 5.03% YoY masked structural risks:</p>
                  <ul className="list-none space-y-2">
                    <li>• Inventory-Driven: 1.2pp growth came from stockpiling, not organic demand25.</li>
                    <li>• Consumption Slump: Private consumption grew 4.83% (vs 5.1% in 2023), signaling weakening purchasing power25.</li>
                    <li>• Outlook: 2025 growth may stall at 5.0–5.1% unless exports rebound25.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">2. Trade War Escalation</h3>
                  <p className="mb-2">New Fronts Opening:</p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Risk</th>
                          <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Impact on Indonesia</th>
                          <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">China's rare earth export curbs (effective Feb 12)</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Disrupts $2.1B nickel exports to China, hitting smelters like ANTM, INCO</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">527</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">US 15% ASEAN auto tariffs (proposed)</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">ASII (-14% WoW) faces margin compression; 30% of revenue at risk</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">314</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">Sectoral Outlook</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">High-Risk Zones</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Sector</th>
                          <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Vulnerability</th>
                          <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Key Stocks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Energy</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">China's coal import quotas (-40% MoM)</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">ADRO, PTBA</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Automotive</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">US tariff retaliation risk</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">ASII, AIMS</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Tech</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Rare earth supply chain disruption</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">INCO, ANTM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Defensive Pivot</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Sector</th>
                          <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Catalyst</th>
                          <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Key Stocks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Healthcare</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Pandemic restocking demand</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">KLBF, SIDO</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Gold</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Safe-haven demand at $2,885/oz</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">MDKA, ANTM</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Telcos</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">5G rollout shields earnings</td>
                          <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">TLKM, EXCL</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">Critical Thresholds</h2>
              <ul className="list-none space-y-2">
                <li>• IHSG Support: 6,600–6,700 (Fibonacci 78.6% retracement).</li>
                <li>• Resistance: 6,900–7,000 (previous support now ceiling).</li>
                <li>• Black Swan: Breach below 6,600 triggers algo sell programs targeting 6,4003135.</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">Investor Action Plan</h2>
              <ul className="list-none space-y-2">
                <li>• Rotate to Domestic Demand: Increase exposure to BBCA (loan growth +24% YoY) and HMSP (8.2% yield).</li>
                <li>• Hedge USDIDR: Use BI's FX Swap Facility (7.1% yield) or gold proxies.</li>
                <li>• Avoid Value Traps: Exit BREN/CUAN/PTRO until MSCI liquidity stabilizes.</li>
              </ul>
            </section>

            <section className="mt-8">
              <Card className="bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Bottom Line</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    The IHSG's 6,600 level is this week's litmus test. While systemic risks dominate, three factors could spark rebounds:
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• BI Rate Hike (Feb 11): 25bps increase to stabilize USDIDR.</li>
                    <li>• China's Policy Easing: Potential RRR cuts to offset trade war impacts.</li>
                    <li>• Ramadan Prep: Consumer stocks (ICBP, UNVR) may rally on pre-holiday demand.</li>
                    <li>• Trade War Playbook: Short ASII/Long TLKM (1:2 beta) for sectoral hedge.</li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 mt-8">
          <p className="mb-2">
            © 2025 Daily Digest Market Analysis Team. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WeeklySpecialFeb1014;