import { Card, CardContent } from '@/components/ui/card';
import { Banknote, TrendingUp, Clock, MapPin, ChevronRight, Calculator, LineChart, FileCheck } from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import MetaTags from '@/components/SEO/MetaTags';
import type { ArticleMetadata } from '@/lib/meta-tags';

export default function SavingUSD50Billion() {
  const [location] = useLocation();
  const article = sampleArticles.find(a => a.slug === 'saving-usd-50-billion-pp-no-8-2025');

  // Create article metadata for the MetaTags component
  const metadata: ArticleMetadata | null = article ? {
    title: `${article.title} | Daily Digest`,
    description: article.description,
    url: `https://lucaxyzz-digest.replit.app/saving-usd-50-billion-pp-no-8-2025`,
    // Don't include image to avoid using the wrong one in social sharing
    author: article.author,
    publishedTime: article.date,
    section: article.category,
    tags: article.tags || [article.category],
    siteName: 'Daily Digest',
    twitterSite: '@dailydigest',
    twitterCreator: '@dailydigest'
  } : null;

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Add MetaTags component for SEO */}
      {metadata && <MetaTags metadata={metadata} cacheBuster="20250305" />}
      
      <Header simplified showCategories={false} />

      <div className="h-36 sm:h-32"></div>

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletter" className="hover:text-blue-600">Newsletter</Link>
          <ChevronRight className="h-4 w-4" />
          <span>PP No 8 2025 Analysis</span>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-bold uppercase">{article.category}</span>
              <span>•</span>
              <span>Research Report</span>
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
            The Indonesian government's recently issued Regulation PP No 8 2025 on Cash Management has the potential to unlock a staggering USD 50 billion in liquidity, according to research from the Ministry of Finance. The regulation, which aims to reform the way government institutions manage their cash reserves, represents a significant opportunity to optimize national financial resources during a time of global economic uncertainty.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            The cornerstone of this reform is the centralization of previously fragmented cash management across various government ministries, agencies, and regional institutions. Analysis reveals that up to 18% of total government funds remain idle in various accounts, creating an inefficient allocation of resources and unnecessary borrowing costs. By implementing a unified treasury system with real-time cash position monitoring, Indonesia stands to dramatically improve its liquidity management.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Banknote className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Liquidity Potential</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$50B</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cash flow optimization</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Idle Cash</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">18%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Of government funds</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <FileCheck className="h-5 w-5 text-purple-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Implementation</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">2025-2026</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Phased timeline</p>
            </CardContent>
          </Card>
        </div>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Systemic Improvements: The Four Pillars of Reform</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            PP No 8 2025 introduces four key structural changes to Indonesia's cash management ecosystem:
          </p>

          <Card className="bg-blue-50 dark:bg-blue-900/20 mb-4">
            <CardContent className="p-4">
              <blockquote className="text-base italic text-gray-700 dark:text-gray-300 mb-2">
                "By optimizing idle cash and reducing unnecessary borrowing, the implementation of PP No 8 2025 could save Indonesia the equivalent of its entire annual infrastructure budget by 2030."
              </blockquote>
              <p className="text-sm text-gray-600 dark:text-gray-400">— Sri Mulyani Indrawati, Minister of Finance</p>
            </CardContent>
          </Card>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Reform Pillar</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Current State</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Target Improvement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Treasury Single Account</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">17,500+ separate accounts</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Consolidated real-time visibility</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Cash Forecasting</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Manual, retrospective</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">AI-powered predictive analytics</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Payment Systems</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Decentralized, fragmented</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Unified digital platform</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Investment Strategy</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Conservative, sub-optimal</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Tiered liquidity management</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Economic Impacts: Beyond the Numbers</h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none mb-4">
            <p className="mb-3">The implications of this reform extend far beyond administrative efficiency:</p>
            <ul className="list-none space-y-2">
              <li>• Reduced borrowing costs: Potential savings of USD 2.1B annually in interest expenses</li>
              <li>• Enhanced investment returns: Additional USD 1.7B in annual income from optimized cash management</li>
              <li>• Streamlined financial operations: 68% reduction in processing time for government transactions</li>
            </ul>
            <p className="mt-3">
              These improvements carry significant macroeconomic benefits, including enhanced budgetary flexibility, improved fiscal resilience, and potentially lower financing costs for both government and private sector borrowers.
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Implementation Roadmap: A Phased Approach</h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <p className="mb-2">The reform will follow a structured timeline with defined milestones:</p>
            <ul className="list-none pl-0 mb-4">
              {[
                { label: "Phase 1: Consolidation (2025)", text: "Integration of central government accounts and initial cash forecasting capabilities" },
                { label: "Phase 2: Expansion (2025-2026)", text: "Incorporation of regional governments and agencies into the unified system" },
                { label: "Phase 3: Optimization (2026-2027)", text: "Implementation of advanced analytics and investment strategies" }
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-2 mb-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p className="mt-0"><strong>{item.label}:</strong> {item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Market Implications: A New Liquidity Landscape</h2>

          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Potential Market Effects:</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Market Segment</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Primary Impact</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Investment Implications</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Government Bonds</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Reduced issuance needs</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Potential yield compression</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Banking Sector</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Changing deposit dynamics</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Focus on banks with diversified funding</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Corporate Credit</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Potential "crowding in"</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Opportunities in corporate bonds</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Reform Success Factors:</h3>
          <div className="space-y-3 mb-4">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Institutional Coordination:</span> Success hinges on cooperation across government entities
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Technology Investment:</span> Modern systems required for real-time treasury management
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Cultural Change:</span> Shift from departmental autonomy to centralized optimization
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Conclusion: A Transformative Opportunity</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            PP No 8 2025 represents one of Indonesia's most significant yet under-appreciated financial reforms. By addressing inefficiencies in cash management across government institutions, this regulation has the potential to unlock substantial liquidity without requiring new taxation or spending cuts. As implementation progresses through 2025 and beyond, market participants should closely monitor the evolving liquidity landscape and its implications for government financing, banking sector dynamics, and broader capital market conditions.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The estimated USD 50 billion in optimized liquidity—equivalent to 4.2% of Indonesia's GDP—would provide crucial fiscal flexibility as the country navigates global economic uncertainties while pursuing ambitious development goals. With effective implementation, PP No 8 2025 could become a case study in how administrative reforms can deliver substantial economic benefits.
          </p>
        </section>

        <div className="py-6 border-t border-gray-200 dark:border-gray-800 mt-6">
          <div className="flex flex-wrap gap-2">
            {article.tags?.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleArticles
              .filter(a => a.slug !== article.slug && a.category === article.category)
              .slice(0, 3)
              .map((relatedArticle, index) => (
                <Link key={index} href={`/newsletter/${relatedArticle.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">{relatedArticle.category}</div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{relatedArticle.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{relatedArticle.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}