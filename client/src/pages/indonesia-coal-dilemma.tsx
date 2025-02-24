import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, AlertCircle, Shield, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import { Article } from "@/types/newsletter";

function updateMetaTags(article: Article) {
  // Create a richer description by combining metrics and description
  const enrichedDescription = article.previewMetrics 
    ? `${article.previewMetrics.map(m => `${m.label}: ${m.value}`).join(" | ")}. ${article.description}`
    : article.description;

  // Create a rich title that includes key metrics if available
  const enrichedTitle = article.previewMetrics 
    ? `${article.title} | ${article.previewMetrics[0].value} ${article.previewMetrics[0].label}`
    : article.title;

  const metaTags = {
    // Open Graph
    "og:title": enrichedTitle,
    "og:description": enrichedDescription,
    "og:type": "article",
    "og:url": `https://lucaxyzz-digest.replit.app/newsletter/${article.slug}`,
    "og:site_name": "Daily Digest",
    "og:locale": "en_US",

    // Twitter Card
    "twitter:card": "summary",
    "twitter:site": "@dailydigest",
    "twitter:creator": "@dailydigest",
    "twitter:title": enrichedTitle,
    "twitter:description": enrichedDescription,
    "twitter:domain": "lucaxyzz-digest.replit.app",

    // Article Metadata
    "article:published_time": article.date,
    "article:author": article.author,
    "article:section": article.category,
    "article:tag": article.tags ? article.tags.join(",") : article.category,

    // Basic SEO
    "description": enrichedDescription,
    "keywords": article.tags ? article.tags.join(",") : `${article.category},market analysis,financial news`,
    "news_keywords": article.tags ? article.tags.join(",") : article.category
  };

  // Update meta tags
  Object.entries(metaTags).forEach(([name, content]) => {
    let tag;
    if (name.startsWith('og:') || name.startsWith('article:')) {
      tag = document.querySelector(`meta[property="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', name);
        document.head.appendChild(tag);
      }
    } else {
      tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
    }
    tag.setAttribute('content', content);
  });

  // Update document title with the enriched title
  document.title = `${enrichedTitle} | Daily Digest`;
}

export default function IndonesiaCoalDilemma() {
  const [location] = useLocation();
  const slug = location.split("/").pop();

  const article = sampleArticles.find(a => a.slug === slug);

  useEffect(() => {
    if (article) {
      updateMetaTags(article);
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
          <span>Indonesia's Coal Dilemma</span>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">Economics</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="font-bold uppercase">ESG Risk Analysis</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              Indonesia's Coal Dilemma: Navigating the Dual Threats of Commodity Risks in a Decarbonizing World
            </h1>

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>February 24, 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>JAKARTA</span>
              </div>
            </div>
          </div>
        </header>

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Indonesia stands at a crossroads, its economic engine tethered to coal yet increasingly battered by the winds of global decarbonization. A groundbreaking study leveraging the EIRIN model and Network for Greening the Financial System (NGFS) scenarios lays bare the stakes: Indonesia's heavy reliance on coal—powering 12% of GDP, 38% of electricity, and $30 billion in annual exports—faces mounting spillover risks from climate policies in major trading partners like China and the EU.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Sovereign Debt Risk</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">23%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">GDP debt increase by 2050</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Export Revenue at Risk</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$30B</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Annual coal export revenue</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">GDP Contribution</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">12%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Coal sector (2024)</p>
            </CardContent>
          </Card>
        </div>

        <section className="py-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Spillover Risks: The Balance of Payments Trigger
          </h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <p className="mb-4">
              The study pinpoints Indonesia's balance of payments (BoP) as ground zero. Coal exports, a $30 billion lifeline, face a 40% decline by 2040 under Net Zero 2050, draining foreign reserves and pressuring the current account. The rupiah could weaken by 15% by 2030, inflating the cost of servicing external debt and driving annual financing needs up by $10 billion.
            </p>
            <ul className="list-none space-y-3 pl-0">
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="mt-0"><strong>Export Decline:</strong> 40% drop in coal exports by 2040 (Net Zero 2050)</p>
              </li>
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="mt-0"><strong>Currency Pressure:</strong> 15% depreciation of the rupiah by 2030</p>
              </li>
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="mt-0"><strong>Borrowing Spike:</strong> $10B annual increase in external financing needs</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Public Finance and Debt: A Looming Crisis
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-900 dark:text-white">Scenario</th>
                  <th className="p-4 text-left font-bold text-gray-900 dark:text-white">Debt Increase (% of GDP)</th>
                  <th className="p-4 text-left font-bold text-gray-900 dark:text-white">Fiscal Deficit (% of GDP)</th>
                  <th className="p-4 text-left font-bold text-gray-900 dark:text-white">Bond Yield Increase</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Current Policies</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">+5%</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">3%</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">+0.5%</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Below 2°C</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">+15%</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">5%</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">+1.2%</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Net Zero 2050</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">+23%</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">7%</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">+2.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="py-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Strategic Moves: Enhancing Resilience Amid Transition Risks
          </h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <ul className="list-none space-y-3 pl-0">
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="mt-0">
                  <strong>Reassess Carbon Exposure:</strong> Many institutions already stress-test fossil fuel assets, but the paper flags a 50% value erosion in coal by 2040—far steeper than typical scenarios.
                </p>
              </li>
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="mt-0">
                  <strong>Diversify into Green Sectors:</strong> Some portfolios have dipped into renewables, yet the paper highlights untapped potential in Indonesia's $5 billion solar and geothermal markets.
                </p>
              </li>
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="mt-0">
                  <strong>Hedge Currency Risks:</strong> FX hedging is common against rupiah volatility, but the projected 15% depreciation by 2030 demands more robust strategies.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">The Bottom Line</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Indonesia's coal reliance is a dual-edged sword—powering prosperity but vulnerable to $30 billion in export losses and a 23% GDP debt surge as decarbonization accelerates. Coordinated policy offers a lifeline, potentially halving economic damage and unlocking green opportunities. For stakeholders, adapting now is non-negotiable—resilience hinges on foresight and decisive action.
            </p>
          </CardContent>
        </Card>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 mt-8">
          <div className="mb-2">
            <p>Sources:</p>
            <ul className="list-disc pl-5">
              <li>Climate Transition Spillovers and Sovereign Risk: Evidence from Indonesia (2025)</li>
              <li>Network for Greening the Financial System (NGFS) Scenarios</li>
              <li>World Bank and Indonesian Ministry of Finance Data</li>
            </ul>
          </div>
          <p className="text-xs mb-2">Disclaimer: For general information only. Not financial advice. Consult your financial advisor before making investment decisions.</p>
          <p>© 2025 Market Analysis Report</p>
        </footer>
      </div>
    </div>
  );
}