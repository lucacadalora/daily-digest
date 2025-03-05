import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, DollarSign, Clock, MapPin, ChevronRight, Calculator, BarChart, LineChart } from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import MetaTags from '@/components/SEO/MetaTags';
import type { ArticleMetadata } from '@/lib/meta-tags';

export default function IndonesiaEconomicTightrope() {
  const [location] = useLocation();
  const article = sampleArticles.find(a => a.slug === 'indonesia-economic-tightrope-export-rules');

  // Create article metadata for the MetaTags component
  const metadata: ArticleMetadata | null = article ? {
    title: `${article.title} | Daily Digest`,
    description: article.description,
    url: `https://lucaxyzz-digest.replit.app/indonesia-economic-tightrope-export-rules`,
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
          <span>Indonesia's Economic Tightrope</span>
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
              <p className="text-gray-600 dark:text-gray-400 mt-1">Source: "Follow The Money #1-2025" by BCA Economic and Industry Research</p>
            </div>
          </div>
        </header>

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Indonesia's economy faces a pivotal moment. A liquidity deficit in the banking system—reflected in a Net Bank Balance (NBB) of -1.70% of GDP—drove a 4.4% Rupiah depreciation in 2024, raising costs for importers and threatening inflation. Enter PP No 8 2025, a bold regulation effective March 1, 2025, mandating 100% repatriation of commodity export proceeds for 12 months. With potential inflows of USD 50 billion, this could reshape liquidity and stabilize the Rupiah—if it can capture the "missing money" that leaks offshore through under-invoicing and transfer pricing.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            This newsletter, tailored for high-value industries, policymakers, and retail investors, explores Indonesia's liquidity crunch, evolving policies, and the delicate balance between growth and currency stability.
          </p>
        </div>
        
        <div className="py-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">Key Insights at a Glance</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li><span className="font-semibold">Liquidity Strain:</span> NBB hit -1.70% of GDP by end-2024, signaling a borrowing-deposit gap.</li>
            <li><span className="font-semibold">Rupiah Pressure:</span> Depreciated 4.4% in 2024, reaching 16,102 USD/IDR, with risks ahead.</li>
            <li><span className="font-semibold">DHE-SDA Potential:</span> New rules could unlock USD 50 billion, but enforcement is key.</li>
            <li><span className="font-semibold">Bond Market Boost:</span> A 25 bps BI rate cut and lower yields offer relief, though equity outflows persist.</li>
            <li><span className="font-semibold">Policy Shift:</span> Tax efforts swelled reserves to IDR 500 trillion, shifting liquidity to the public sector.</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calculator className="h-5 w-5 text-red-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Net Bank Balance</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">-1.70%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">of GDP</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Rupiah Depreciation</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">-4.4%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">2024 performance</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">DHE-SDA Potential</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$50B</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Export proceeds</p>
            </CardContent>
          </Card>
        </div>

        <div className="overflow-x-auto mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">The Numbers That Matter</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Metric</th>
                <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Value</th>
                <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Implication</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Net Bank Balance (NBB)</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">-1.70% of GDP</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Liquidity deficit pressures Rupiah</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Rupiah Depreciation</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">-4.4% (2024)</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Raises import costs, inflation risks</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">DHE-SDA Inflow Potential</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">USD 50 billion</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Could offset NBB if "missing money" is captured</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">"Missing Money" Estimate</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">USD 10-20 billion</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Annual loss from Big-3 commodities</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">SRBI Inflows (2024)</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">IDR 162 trillion</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Supported Rupiah but capacity is limited</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">1. The Liquidity Crunch: A Banking System Under Strain</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Indonesia's banking system ended 2024 with a liquidity deficit, as borrowing outpaced deposits. The NBB, a measure of net liquidity, stood at -1.70% of GDP, typically implying a 6-8% Rupiah depreciation. That it fell only 4.4% reflects IDR 162 trillion in foreign inflows from Bank Indonesia's SRBI securities. Yet, with BI's issuance capacity limited and equity outflows rising, this relief may be short-lived.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Banks in Indonesia are lending out more money (loans and bonds) than people are putting in as deposits. By the end of 2024, this gap (called Net Bank Balance or NBB) was -1.70% of GDP (a measure of the country's total economic activity).
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Bond markets improved in early 2025, driven by a 25 bps rate cut in January and a "Trump trade" reversal (easing expectations of higher US rates). Lower yields reduced the crowding-out effect, where government bonds (SBN) absorb funds needed for private investment. Still, the Rupiah remains vulnerable unless liquidity improves.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">2. Policy Evolution: From Jokowi to Prabowo</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            In December 2024, a tax collection "extra effort" shifted liquidity from private hands to the government, boosting Ministry of Finance reserves to IDR 500 trillion. However, individual deposits shrank by 2.1% YoY, and consumer loan growth slowed, deepening the private sector's liquidity squeeze.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            President Prabowo's Prabowonomics diverges from Jokowi's infrastructure-heavy Jokowinomics. While Jokowi used fiscal expansion and SRBI to draw foreign capital, Prabowo cuts spending to fund welfare (e.g., free school meals, MBG) and targets export proceeds via PP No 8 2025. This shift aims to retain domestic wealth without widening deficits.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Policy Comparison: Jokowinomics vs. Prabowonomics</h3>
          
          <div className="mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white">Jokowinomics (2014-2024):</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li><span className="font-semibold">Fiscal Expansion:</span> Jokowi raised government capital expenditure (CAPEX) by 46% in 2015, funded partly by slashing fuel subsidies. This fueled infrastructure projects like toll roads and airports.</li>
              <li><span className="font-semibold">Debt Strategy:</span> To bridge revenue gaps (tax-to-GDP ratio stagnated below 11%), Jokowi injected IDR 283 trillion into state-owned enterprises (SOEs) from 2015-2019, boosting their equity and enabling borrowing of IDR 250 trillion domestically and USD 15.4 billion externally. A tax amnesty in 2016-17 netted IDR 130 trillion in penalties and IDR 90 trillion in repatriated deposits, easing fiscal pressure temporarily.</li>
              <li><span className="font-semibold">SRBI Inflows:</span> In 2024, Bank Indonesia's SRBI securities attracted IDR 162 trillion (0.73% of GDP) in foreign inflows, cushioning Rupiah depreciation.</li>
              <li><span className="font-semibold">Debt Burden:</span> The report doesn't quantify total debt, but Jokowi's reliance on SOE borrowing and fiscal stimulus suggests a significant increase in public and quasi-public debt. External borrowing by SOEs (USD 15.4 billion, or ~IDR 240 trillion at 2024 rates) and domestic loans added to the fiscal load, though kept within the statutory 3% GDP deficit ceiling.</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white">Prabowonomics (2024-):</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li><span className="font-semibold">Spending Cuts:</span> Prabowo pivots from fiscal expansion, cutting "unnecessary spending" to reallocate funds toward welfare, such as the free school meals program (MBG). The report notes this isn't about reducing overall spending but redirecting it.</li>
              <li><span className="font-semibold">DHE-SDA Repatriation:</span> PP No 8 2025 targets USD 50 billion in export proceeds from natural resources, aiming to retain domestic wealth without new borrowing.</li>
              <li><span className="font-semibold">SOE Super-Holding:</span> The creation of BPI Danantara as an SOE super-holding seeks to reallocate USD 20 billion/year from the state budget as equity, attracting foreign co-investment and loans to grow assets by USD 120-160 billion/year.</li>
              <li><span className="font-semibold">Debt Approach:</span> Unlike Jokowi, Prabowo avoids direct fiscal deficits, leveraging existing resources (export proceeds, gold monetization) and private investment. However, SOE borrowing under BPI Danantara could indirectly increase debt if foreign loans materialize.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">3. DHE-SDA: A Potential Game-Changer?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Signed into law on February 17, 2025, PP No 8 2025 replaces the less stringent PP No 36 2023 and zeroes in on natural resource exports (excluding oil and gas). It's a cornerstone of Prabowo's strategy to shore up liquidity and assert economic sovereignty. Here's how it works:
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Core Provisions</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
            <li><span className="font-semibold">100% Repatriation:</span> Exporters in mining (e.g., coal, nickel, copper), plantations (e.g., palm oil), forestry, and fisheries must return all export proceeds to Indonesia.</li>
            <li><span className="font-semibold">12-Month Lock-In:</span> Funds must remain in special accounts at national banks for a full year.</li>
            <li><span className="font-semibold">Permitted Uses:</span> Proceeds can fund operational costs, tax payments, or foreign currency dividends, offering some flexibility.</li>
            <li><span className="font-semibold">Enforcement Teeth:</span> Non-compliance triggers suspension of export services, a severe penalty for commodity giants.</li>
            <li><span className="font-semibold">Exclusions:</span> Oil and gas exports stay under PP No 36 2023, reflecting their unique fiscal role.</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Why It Matters</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Indonesia's commodity exports are a lifeline, yet billions leak offshore annually. The report estimates USD 10-20 billion vanishes through practices like under-invoicing (declaring lower export values) and transfer pricing (shifting profits to low-tax jurisdictions). PP No 8 2025 aims to plug this gap, channeling funds back into the domestic economy. If successful, it could improve NBB by up to 2% of GDP and strengthen the Rupiah significantly.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Signed February 17, 2025, PP No 8 2025 mandates that commodity exporters (coal, palm oil, nickel) repatriate 100% of proceeds for 12 months, up from 30% for 3 months. Non-compliance risks export bans, a strong incentive for compliance. The goal? Up to USD 50 billion in inflows.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Yet, the report distinguishes "known money" (reported proceeds) from "missing money" (USD 10-20 billion annually from mis-invoicing and transfer pricing in the "Big-3" commodities). While "known money" boosts deposits, it's offset by lending, leaving NBB unchanged. Capturing "missing money" could improve NBB by 2% of GDP and strengthen the Rupiah.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">4. Growth vs. Rupiah: The Core Tradeoff</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Indonesia faces a dilemma: boosting growth often weakens the Rupiah, while stabilizing the currency can stifle activity.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Market Catalysts: What's at Stake?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            PP No 8 2025 isn't just policy—it's a market mover. Here's how it could ripple through the economy:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Catalyst</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Potential Impact</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Key Linkage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Liquidity Injection</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">USD 50B boosts bank reserves</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Strengthens Rupiah, lowers borrowing costs</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">"Missing Money" Recovery</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">USD 10-20B reclaimed</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Reduces NBB deficit, lifts investor confidence</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Compliance Costs</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Higher burdens for exporters</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">May squeeze margins in mining, agriculture</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Policy Enforcement</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Suspension of export violators</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Deters evasion but risks trade disruptions</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Upside:</span> Capturing "missing money" could stabilize the Rupiah, reduce inflation (projected at 2.5-3.5% in 2025), and ease fiscal pressures on Prabowo's 8% GDP growth target.</p>
            <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Downside:</span> If funds are lent out rapidly or exporters evade rules, liquidity gains could evaporate, leaving the Rupiah vulnerable to further slides.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">5. 2025 Outlook: Modest Growth, Persistent Risks</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">BCA Research projects:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
            <li><span className="font-semibold">GDP Growth:</span> 4.9% (from 5.0% in 2024)</li>
            <li><span className="font-semibold">CPI Inflation:</span> 2.5%</li>
            <li><span className="font-semibold">BI Rate:</span> 5.50%</li>
            <li><span className="font-semibold">USD/IDR:</span> 16,887 (year-end)</li>
            <li><span className="font-semibold">Current Account:</span> -0.9% of GDP</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Sectoral Impacts:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li><span className="font-semibold">Banking:</span> Liquidity strain may lift lending rates; manufacturing NPLs hit 4.1%.</li>
            <li><span className="font-semibold">Commodities:</span> Exporters face compliance costs but gain from a stronger Rupiah.</li>
            <li><span className="font-semibold">Consumers:</span> Importers benefit from stability; local firms face demand risks.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">6. Investor Outlook: Navigating Uncertainty in 2025</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            As a retail investor in Indonesia, the 2025 economic landscape offers a mix of opportunities and challenges, shaped by modest growth, persistent risks, and policy uncertainties. Drawing from BCA Research's projections and additional insights, here's a comprehensive guide to positioning your portfolio across the Jakarta Composite Index (IHSG), bonds, yields, and other factors.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Strategic Insights: What to Watch</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li><span className="font-semibold">For Industries:</span> Exporters must adapt to DHE-SDA compliance; importers should hedge against Rupiah volatility.</li>
            <li><span className="font-semibold">For Policymakers:</span> Enforce PP No 8 2025 to target "missing money" and monitor NBB trends.</li>
            <li><span className="font-semibold">For Investors:</span> Bonds offer opportunities post-rate cut; watch commodity prices and equity flows.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">The Bottom Line</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Indonesia's economic tightrope hinges on execution. PP No 8 2025 could inject USD 50 billion, but capturing "missing money" is critical to easing liquidity and steadying the Rupiah. Success could lower inflation and boost confidence; failure risks prolonged volatility. Stakeholders should track enforcement and liquidity metrics closely as 2025 unfolds.
          </p>
        </section>

        <section className="mb-8 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">Source</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Mamia, B. K. (2025). Bringing it all back home (Follow the Money No. 1-2025). Jakarta, Indonesia: BCA Economic and Industry Research.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <a 
              href="https://www.bca.co.id/-/media/Feature/Report/File/S8/Laporan-Riset-Ekonomi/2025/03/follow-the-money-1-bringing-it-all-back-home-04-march-2025.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://www.bca.co.id/-/media/Feature/Report/File/S8/Laporan-Riset-Ekonomi/2025/03/follow-the-money-1-bringing-it-all-back-home-04-march-2025.pdf
            </a>
          </p>
        </section>

        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
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