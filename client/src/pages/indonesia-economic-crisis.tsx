import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, AlertCircle, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import { useEffect } from "react";

export default function IndonesiaEconomicCrisis() {
  const [location] = useLocation();
  const article = sampleArticles.find(a => a.slug === 'indonesia-economic-inventory-crisis');

  useEffect(() => {
    if (article) {
      // Update meta tags for SEO
      const metaTags = {
        "og:title": `${article.title} | Daily Digest`,
        "og:description": article.description,
        "og:type": "article",
        "og:url": `https://lucaxyzz-digest.replit.app/newsletter/${article.slug}`,
        "twitter:card": "summary",
        "twitter:title": `${article.title} | Daily Digest`,
        "twitter:description": article.description,
        "article:published_time": article.date,
        "article:author": article.author,
        "article:section": article.category,
        "article:tag": article.tags ? article.tags.join(",") : article.category
      };

      Object.entries(metaTags).forEach(([name, content]) => {
        let tag = document.querySelector(`meta[property="${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      });

      document.title = `${article.title} | Daily Digest`;
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
          <span>Indonesia's Growth Paradox</span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Market Impact</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">-2.1%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">IHSG Single-day Drop</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">GDP Growth</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">5.03%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">19% from Inventory</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Manufacturing NPL</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">4.1%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Up from 2.8% YoY</p>
            </CardContent>
          </Card>
        </div>

        <div className="py-4 space-y-6">
          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">The House of Cards: How Inventory Artifice Boosted Growth</h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <p className="mb-3">2024's Growth Mirage revealed troubling patterns across key sectors:</p>
              <ul className="list-none space-y-3 pl-0">
                {[
                  { label: "Coal Stockpiling", text: "14.2% production surge vs 4.7% exports created a 28MT surplus (18 days' output)" },
                  { label: "Strategic Miscalculations", text: "166% QoQ rice imports created 2.3MT excess reserves" },
                  { label: "Manufacturing Glut", text: "Electronics/components inventory at 22% of sector GDP" }
                ].map((item, index) => (
                  <li key={index} className="flex space-x-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <p className="mt-0"><strong>{item.label}:</strong> {item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <blockquote className="text-base italic text-gray-700 dark:text-gray-300 mb-2">
                "This inventory overhang - contributing 0.97pp to GDP - masked fundamental weaknesses now exposed by three converging forces."
              </blockquote>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Crisis Catalysts: A Perfect Storm</h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <p className="mb-3">Three major factors contributed to the market's harsh verdict:</p>
              <ul className="list-none space-y-3 pl-0">
                {[
                  { label: "Fed Hawkishness", text: "Rp14,900/USD triggered $317M foreign outflows, increasing dollarized inventory financing costs by 22%" },
                  { label: "China Tariffs", text: "ADRO dropped 4.2% on 28MT coal exposure as export bottlenecks compound stockpiles" },
                  { label: "Earnings Shock", text: "BMRI fell 3.5% on 14% profit drop as inventory impairments hit bank balance sheets" }
                ].map((item, index) => (
                  <li key={index} className="flex space-x-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                    <p className="mt-0"><strong>{item.label}:</strong> {item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">The Great Unwind: Scenarios & Strategic Imperatives</h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Inventory Normalization Pathways</h3>
                  <ul className="list-none space-y-3 pl-0">
                    {[
                      { scenario: "Managed Drawdown", probability: "55%", impact: "-0.4-0.6pp GDP, 5-7% EPS contraction" },
                      { scenario: "Fire Sale", probability: "30%", impact: "-0.8-1.0pp GDP, 12-15% EPS collapse" },
                      { scenario: "Stagnation", probability: "15%", impact: "+0.2pp GDP, Chronic 3-4% annual drag" }
                    ].map((item, index) => (
                      <li key={index} className="flex space-x-2">
                        <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500 flex-shrink-0" />
                        <p className="mt-0">
                          <strong>{item.scenario} ({item.probability}):</strong> {item.impact}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">The Bottom Line</h2>
              <p className="text-gray-700 dark:text-gray-300">
                While the inventory reckoning has exposed near-term vulnerabilities, it also creates opportunity - successful normalization could catalyze 7.6% NGDP growth through reflationary effects. However, as February's market tantrum proved, Indonesia can no longer afford growth models built on warehouse arithmetic rather than genuine economic value creation.
              </p>
            </CardContent>
          </Card>
        </div>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 mt-8">
          <p className="mb-2">
            Disclosure: This analysis incorporates data from Bank Indonesia, BPS Statistics, and various market reports. The views expressed here are based on available public information and market data.
          </p>
          <p>© 2025 Daily Digest. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
