import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, DollarSign, Clock, MapPin, ChevronRight, Calculator, BarChart, LineChart, TrendingUp } from 'lucide-react';
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
              Saving USD 50 Billion: How PP No 8 2025 Could Transform Indonesia's Liquidity
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
            Indonesia's economy faces a pivotal moment. A liquidity deficit in the banking system—reflected in a Net Bank Balance (NBB) of -1.70% of GDP—drove a 4.4% Rupiah depreciation in 2024, raising costs for importers and threatening inflation. Enter PP No 8 2025, a bold regulation effective March 1, 2025, mandating 100% repatriation of commodity export proceeds for 12 months. With potential inflows of USD 50 billion, this could reshape liquidity and stabilize the Rupiah—if it can capture the "missing money" that leaks offshore through under-invoicing and transfer pricing.
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
          
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-5 mb-6 border-l-4 border-red-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-red-100 dark:bg-red-800 p-2 rounded-full">
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">Net Bank Balance: -1.70% of GDP</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Indonesia's banking system faces a critical liquidity deficit as lending has outpaced deposits throughout 2024. This imbalance threatens currency stability and economic growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full mr-2">
                  <Calculator className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                Understanding the Deficit
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="text-gray-400 mr-2 mt-1">•</div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Net Bank Balance (NBB)</span> measures the difference between bank lending and deposits as a percentage of GDP
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="text-gray-400 mr-2 mt-1">•</div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Historical correlation:</span> An NBB of -1.70% typically correlates with a 6-8% Rupiah depreciation
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="text-gray-400 mr-2 mt-1">•</div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Current impact:</span> The Rupiah fell only 4.4% in 2024, better than expected due to policy interventions
                  </p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full mr-2">
                  <Calculator className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                Bank Indonesia's Intervention
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="text-gray-400 mr-2 mt-1">•</div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">SRBI securities</span> attracted IDR 162 trillion in foreign inflows, temporarily supporting the Rupiah
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="text-gray-400 mr-2 mt-1">•</div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Limited capacity:</span> BI's issuance ability is reaching its ceiling, making this solution unsustainable
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="text-gray-400 mr-2 mt-1">•</div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Rising equity outflows</span> threaten to reverse these gains, increasing pressure on the Rupiah
                  </p>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">Recent Bond Market Developments</h3>
            </div>
            <div className="p-5 bg-white dark:bg-gray-800">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Positive Factors</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        25 bps rate cut by Bank Indonesia in January 2025
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        "Trump trade" reversal easing expectations of higher US rates
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Lower yields on government securities
                      </p>
                    </li>
                  </ul>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ongoing Challenges</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded-full mr-2 mt-1">
                        <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        "Crowding-out effect" where government bonds absorb private investment funds
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded-full mr-2 mt-1">
                        <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Rupiah remains vulnerable without structural liquidity improvements
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded-full mr-2 mt-1">
                        <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Short-term improvements may mask longer-term structural issues
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Policy Area</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Jokowinomics (2014-2024)</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Prabowonomics (2024-)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold">Spending Focus</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    <div className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mr-2 mt-1">
                        <BarChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        Capital expenditure (+46% in 2015)<br/>
                        Infrastructure focus (toll roads, airports)
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-2 mt-1">
                        <LineChart className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        Welfare programs<br/>
                        Free school meals (MBG)<br/>
                        Reallocation vs. expansion
                      </div>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold">Liquidity Strategy</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    <div className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mr-2 mt-1">
                        <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        SRBI securities (IDR 162T in 2024)<br/>
                        Tax amnesty (IDR 130T penalties)<br/>
                        Foreign capital attraction
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-2 mt-1">
                        <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        DHE-SDA repatriation (USD 50B potential)<br/>
                        Capturing "missing money"<br/>
                        Domestic wealth retention
                      </div>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold">SOE Approach</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    <div className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mr-2 mt-1">
                        <Calculator className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        Direct equity injections (IDR 283T)<br/>
                        Enabled borrowing (IDR 250T domestic, USD 15.4B external)
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-2 mt-1">
                        <Calculator className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        BPI Danantara super-holding<br/>
                        USD 20B/year equity allocation<br/>
                        Foreign co-investment model
                      </div>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold">Debt Philosophy</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    <div className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mr-2 mt-1">
                        <TrendingDown className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        Increase in public and quasi-public debt<br/>
                        SOE-driven borrowing<br/>
                        3% GDP deficit ceiling maintained
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-2 mt-1">
                        <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        Avoids direct fiscal deficits<br/>
                        Leverages existing resources<br/>
                        Potential indirect debt via SOE holdings
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">3. DHE-SDA: A Potential Game-Changer?</h2>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5 mb-6 border-l-4 border-blue-500">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Decree PP No 8 2025</h3>
              <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 text-xs px-2.5 py-0.5 rounded-full">
                Effective March 1, 2025
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Signed into law on February 17, 2025, this regulation replaces the less stringent PP No 36 2023 and zeroes in on natural resource exports (excluding oil and gas). It's a cornerstone of Prabowo's strategy to shore up liquidity and assert economic sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-800">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="bg-green-100 dark:bg-green-800 p-1 rounded mr-2">
                    <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </span>
                  Before: PP No 36 2023
                </h3>
              </div>
              <CardContent className="p-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">30% repatriation</span> of export proceeds
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">3-month holding period</span> in special accounts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Limited enforcement</span> and compliance tracking
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-gray-200 dark:border-gray-800">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-800 p-1 rounded mr-2">
                    <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </span>
                  After: PP No 8 2025
                </h3>
              </div>
              <CardContent className="p-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">100% repatriation</span> of all export proceeds
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">12-month lock-in period</span> in national banks
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Strict enforcement</span> with export service suspension
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Key Commodities Affected</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm flex flex-col items-center">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Coal</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Major export</span>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm flex flex-col items-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Palm Oil</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Plantations</span>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm flex flex-col items-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Nickel</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Mining</span>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm flex flex-col items-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Copper</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Mining</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Missing Money: The Critical Target</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">The Problem</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Indonesia's commodity exports are a lifeline, yet billions leak offshore annually through two main mechanisms:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded-full mr-2 mt-1">
                      <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <span className="font-semibold">Under-invoicing:</span>
                      <span className="text-gray-700 dark:text-gray-300"> Declaring lower export values to reduce taxes and keep proceeds offshore</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded-full mr-2 mt-1">
                      <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <span className="font-semibold">Transfer pricing:</span>
                      <span className="text-gray-700 dark:text-gray-300"> Shifting profits to related entities in low-tax jurisdictions</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">The Potential</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Annual "Missing Money"</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">$10-20 Billion</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                      <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  If PP No 8 2025 successfully captures this "missing money":
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-1">
                      <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <span className="font-semibold">NBB improvement:</span>
                      <span className="text-gray-700 dark:text-gray-300"> Up to 2% of GDP</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-1">
                      <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <span className="font-semibold">Rupiah:</span>
                      <span className="text-gray-700 dark:text-gray-300"> Significant strengthening</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">The Critical Distinction</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The report makes a crucial distinction that determines the regulation's ultimate impact:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h5 className="font-medium text-gray-900 dark:text-white flex items-center mb-2">
                  <span className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full mr-2">
                    <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </span>
                  "Known Money"
                </h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Currently reported export proceeds that are already visible to authorities. While repatriation boosts bank deposits, these are typically matched by lending, leaving NBB unchanged.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h5 className="font-medium text-gray-900 dark:text-white flex items-center mb-2">
                  <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">
                    <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </span>
                  "Missing Money"
                </h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Unreported proceeds from under-invoicing and transfer pricing. Capturing this hidden wealth is what would truly transform Indonesia's liquidity and strengthen the Rupiah.
                </p>
              </div>
            </div>
          </div>
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
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-5 border-l-4 border-blue-500 mb-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              For retail investors in Indonesia, 2025 brings opportunities and risks with GDP growth at 4.9%, a weaker Rupiah (16,887 USD/IDR), and a current account deficit (-0.9% of GDP). The Jakarta Composite Index (IHSG) may face pressure from liquidity issues and equity outflows, but commodity stocks (e.g., mining, palm oil) could shine if policies like PP No 8 2025 strengthen the Rupiah, while consumer staples offer stability. Bonds look promising with a BI rate of 5.50% and 10-year SBN yields at 7.47%, though global rate hikes could push yields up. Inflation at 2.5% supports fixed-income investments.
            </p>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600">
              <h4 className="font-bold text-gray-900 dark:text-white flex items-center mb-3">
                <div className="bg-green-100 dark:bg-green-800 p-1 rounded-full mr-2">
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                What to Do:
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Diversify across commodity exporters, consumer staples, and government bonds (SBN) for safety. Hedge Rupiah risks with USD assets (e.g., US ETFs). Watch policy enforcement (e.g., DHE-SDA) and global trends (e.g., US rates) to adjust your mix—banks may struggle with 4.1% manufacturing NPLs, so limit exposure there. Stay flexible and informed to handle uncertainties.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Strategic Insights: What to Watch</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li><span className="font-semibold">For Industries:</span> Exporters must adapt to DHE-SDA compliance; importers should hedge against Rupiah volatility.</li>
            <li><span className="font-semibold">For Policymakers:</span> Enforce PP No 8 2025 to target "missing money" and monitor NBB trends.</li>
            <li><span className="font-semibold">For Investors:</span> Bonds offer opportunities post-rate cut; watch commodity prices and equity flows.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">The Bottom Line</h2>
          
          <Card className="border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-md">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4">
              <h3 className="text-white font-bold text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Success Scenario
              </h3>
            </div>
            <CardContent className="p-5 bg-white dark:bg-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <p className="font-semibold text-gray-900 dark:text-white">USD 50B Injection</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">DHE-SDA repatriation</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <p className="font-semibold text-gray-900 dark:text-white">Rupiah Stabilization</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lower inflation</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Calculator className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <p className="font-semibold text-gray-900 dark:text-white">Improved NBB</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Better liquidity</p>
              </div>
            </CardContent>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-850 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-bold">Critical Success Factor:</span> Indonesia's economic tightrope hinges on execution. Success requires capturing the "missing money" through effective enforcement of PP No 8 2025. Stakeholders should track enforcement metrics and NBB trends closely as 2025 unfolds.
              </p>
            </div>
          </Card>
        </section>

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

        <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              Source: <a 
                href="https://www.bca.co.id/-/media/Feature/Report/File/S8/Laporan-Riset-Ekonomi/2025/03/follow-the-money-1-bringing-it-all-back-home-04-march-2025.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center"
              >
                "Follow The Money #1-2025" by BCA Economic and Industry Research
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Mamia, B. K. (2025). Bringing it all back home (Follow the Money No. 1-2025). Jakarta, Indonesia: BCA Economic and Industry Research.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}