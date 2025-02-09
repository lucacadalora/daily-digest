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
          <span>Weekly Special Feb 10-14, 2025</span>
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

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">Previously on Weekly Special February 3–7, 2025</h2>
            <p className="mb-4">Our February 3–7 Market Alert proved prescient across three critical dimensions:</p>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">1. IHSG Support Breach</h3>
                <ul className="list-none space-y-2">
                  <li><strong>Predicted:</strong> 6,721–6,900 range under "Full Trade War" scenario.</li>
                  <li><strong>Actual:</strong> Index collapsed to 6,752.57 (-5.16% WoW), breaching 6,900 in 3 sessions.</li>
                  <li className="font-semibold mt-2">Key Drivers:</li>
                  <li>• Trump's 25% tariffs on Canada/Mexico triggered risk-off sentiment.</li>
                  <li>• CNY devaluation pressured USDIDR to 16,450.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">2. Sectoral Divergence</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Sector</th>
                        <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Prediction</th>
                        <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Outcome</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Commodities</td>
                        <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">"Bloodbath" expected</td>
                        <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Energy -7.6%, ADRO -12%</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Defensives (KLBF)</td>
                        <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Resilient initially</td>
                        <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">+7.44% intraweek, then -1.7%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">3. Currency & Macro</h3>
                <ul className="list-none space-y-2">
                  <li>• USDIDR: Reached 16,450 (vs projected 16,300–16,500).</li>
                  <li>• Reserves: Dropped $1.4B to $138.6B, limiting BI's response.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">Intermezzo: Last Week's Market Reality Check</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">What Our Analysis Nailed</h3>
                  <ul className="list-none space-y-2">
                    <li>• 6,900 Breach: Occurred exactly as modeled, with foreign outflows surging to Rp 3.8T.</li>
                    <li>• Commodity Collapse: Coal prices fell to $73/ton, crushing ADRO (-12%) and PTBA (-9%).</li>
                    <li>• Defensive Flaw: KLBF's intraweek rally (+7.44%) validated its defensive role, but systemic panic later erased gains.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Where We Underestimated</h3>
                  <ul className="list-none space-y-2">
                    <li>• Speed of Collapse: 6,900 breached in 3 days vs projected 5-day timeline.</li>
                    <li>• KLBF's Limits: Sector-wide healthcare decline (-1.7% WoW) exposed defensive vulnerabilities.</li>
                  </ul>
                </div>
              </div>

              <Card className="bg-blue-50 dark:bg-blue-900/20 mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Conclusion: Precision Amid Chaos</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">Our original analysis:</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>✅ Correctly flagged 6,900 as the critical threshold.</li>
                    <li>✅ Accurately predicted commodity sector vulnerabilities (ADRO, AALI).</li>
                    <li>⚠️ Underestimated KLBF's sensitivity to systemic panic despite strong fundamentals.</li>
                  </ul>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    Lesson: While macro forecasts proved reliable, liquidity crunches amplified sell-offs beyond technical projections.
                  </p>
                </CardContent>
              </Card>
            </div>
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