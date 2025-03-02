import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, AlertCircle, Shield, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import { Article } from "@/types/newsletter";
import MetaTags from '@/components/SEO/MetaTags'; 
import type { ArticleMetadata } from '@/lib/meta-tags';

// Function to convert Article to ArticleMetadata format for the MetaTags component
function convertToMetadata(article: Article): ArticleMetadata {
  // Create a richer description by combining metrics and description
  const enrichedDescription = article.previewMetrics 
    ? `${article.previewMetrics.map(m => `${m.label}: ${m.value}`).join(" | ")}. ${article.description}`
    : article.description;

  // Create a rich title that includes key metrics if available
  const enrichedTitle = article.previewMetrics 
    ? `${article.title} | ${article.previewMetrics[0].value} ${article.previewMetrics[0].label}`
    : article.title;

  return {
    title: enrichedTitle,
    description: enrichedDescription,
    url: `https://lucaxyzz-digest.replit.app/indonesia-coal-dilemma`,
    // Don't include image to avoid using the wrong one in social sharing
    author: article.author,
    publishedTime: article.date,
    section: article.category,
    tags: article.tags || [article.category],
    siteName: 'Daily Digest',
    twitterSite: '@dailydigest',
    twitterCreator: '@dailydigest'
  };
}

export default function IndonesiaCoalDilemma() {
  const [location] = useLocation();
  const slug = location.split("/").pop();

  const article = sampleArticles.find(a => a.slug === slug);

  // Convert article to metadata format for MetaTags component
  const metadata = article ? convertToMetadata(article) : null;

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Add MetaTags component for SEO */}
      {metadata && <MetaTags metadata={metadata} cacheBuster="20250302" />}
      
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
              Indonesia's Coal Dilemma: Navigating Commodity Risks in a Decarbonizing World
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
            Indonesia stands at a crossroads, its economic engine tethered to coal yet increasingly battered by the winds of global decarbonization. A groundbreaking study leveraging the EIRIN model lays bare the stakes: Indonesia's heavy reliance on coal—powering 12% of GDP, 38% of electricity, and $30 billion in annual exports—faces mounting spillover risks from climate policies in major trading partners like China and the EU. These risks threaten to destabilize the nation's balance of payments, inflate sovereign debt, and strand billions in carbon-heavy assets.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            The paper paints a vivid picture. China's commitment to slash coal imports by 30% by 2030 could gut Indonesia's export revenue, triggering a "demand shock" that reverberates through fiscal and financial systems. Under the Net Zero 2050 scenario, sovereign debt could surge by 23% of GDP by mid-century as coal royalties (15% of the budget) evaporate and borrowing spikes. The rupiah faces a potential 15% depreciation by 2030, amplifying the burden of $180 billion in dollar-denominated debt. Meanwhile, coal-fired power plants and mines risk becoming obsolete, with stranded assets threatening $40 billion in economic value.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Yet, the study doesn't just tally losses—it spotlights trade-offs and solutions. A disorderly transition could shrink GDP by 24%, but a coordinated climate policy aligning domestic diversification with global decarbonization could limit losses to 5-10%. Indonesia's geothermal and solar potential, already drawing $5 billion annually, hints at a viable pivot. The paper stresses that timing is critical: delay risks financial instability, while haste could exacerbate fiscal strain.
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Potential increase in sovereign debt as a share of GDP by 2050 (Net Zero 2050 scenario)</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Export Revenue at Risk</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$30B</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Annual coal export revenue at risk from decarbonization spillovers</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">GDP Contribution</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">12%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Coal's contribution to Indonesia's GDP (2024)</p>
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
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <p className="mb-4">
              The fallout hits public finance hard. Coal royalties and taxes underpin 15% of Indonesia's budget—without them, the government faces a borrowing binge. The study forecasts a 23% GDP debt increase by 2050 under aggressive decarbonization, with bond yields climbing 2% as markets price in risk.
            </p>
          </div>

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
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            A credit downgrade to BB+ by 2035 looms, raising borrowing costs further.
          </p>
        </section>

        <section className="py-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Trade-Offs and Stranded Assets: A Dual Threat
          </h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <p className="mb-4">
              The study frames a stark dilemma: decarbonize hastily, and financial instability spikes; lag, and stranded assets pile up. A chaotic Net Zero 2050 transition could slash GDP by 24%, while coal-related loans—$40 billion in banking exposure—risk turning toxic, with non-performing loans (NPLs) hitting 12% by 2035.
            </p>
            <ul className="list-none space-y-3 pl-0">
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="mt-0"><strong>Banking Risk:</strong> NPLs could quadruple to 12% by 2035</p>
              </li>
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="mt-0"><strong>Asset Losses:</strong> Coal infrastructure may lose 50% of its value by 2040</p>
              </li>
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="mt-0"><strong>Growth Hit:</strong> A 10% GDP loss by 2030 under a delayed transition</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            The Coordinated Policy Lifeline
          </h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <p className="mb-4">
              Coordinated climate policy emerges as the linchpin. A synchronized push—pairing renewable investment with global decarbonization—could cap GDP losses at 5-10%. Indonesia's solar and geothermal sectors, yielding 8-10% returns, offer a foothold. The planned 2025 green bond issuance signals momentum, but scaling up hinges on carbon pricing and subsidy reform.
            </p>
            <ul className="list-none space-y-3 pl-0">
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="mt-0"><strong>Renewable Potential:</strong> 8-10% returns in solar and geothermal projects</p>
              </li>
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="mt-0"><strong>Green Financing:</strong> Green bonds provide ESG-aligned opportunities</p>
              </li>
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="mt-0"><strong>Policy Alignment:</strong> Carbon pricing and subsidy cuts are critical</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Strategic Moves: Enhancing Resilience Amid Transition Risks
          </h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <p className="mb-4">
              The paper's insights reveal both current practices and gaps that need addressing to navigate Indonesia's coal dilemma. Here's how portfolios can adapt:
            </p>
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
              <li>
                <a href="https://www.sciencedirect.com/science/article/pii/S0140988325000349?via%3Dihub" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  Climate Transition Spillovers and Sovereign Risk: Evidence from Indonesia (2025)
                </a>
              </li>
            </ul>
          </div>
          <p>© 2025 Market Analysis Report</p>
        </footer>
      </div>
    </div>
  );
}