import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, AlertCircle, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import MetaTags from '@/components/SEO/MetaTags';
import type { ArticleMetadata } from '@/lib/meta-tags';

export default function IndonesiaEconomicCrisis() {
  const [location] = useLocation();
  const article = sampleArticles.find(a => a.slug === 'indonesia-economic-inventory-crisis');

  // Create article metadata for the MetaTags component
  const metadata: ArticleMetadata | null = article ? {
    title: `${article.title} | Daily Digest`,
    description: article.description,
    url: `https://lucaxyzz-digest.replit.app/indonesia-economic-crisis`,
    image: '/images/indonesia-economic-crisis.jpg',
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

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Indonesia's economic narrative took a dramatic turn in early 2025, as financial markets delivered a brutal verdict on the nation's inventory-dependent growth model. The Jakarta Composite Index's 2.1% plunge on February 6 - its worst single-day performance in eight months - served as exclamation point to revelations that 19% of 2024's 5.03% GDP growth came from unsustainable inventory accumulation, creating a dangerous economic paradox now coming home to roost.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            The inventory overhang extends beyond the coal sector's unprecedented stockpiling, encompassing significant rice import surpluses and a broader accumulation in manufactured goods amid weakening global demand. This systemic inventory buildup represents a stark departure from historical norms—prior to 2024, the long-term average contribution of inventory changes to GDP growth maintained a neutral position. This deviation from the mean strongly suggests an impending growth deceleration in 2025, as the unsustainable inventory accumulation inevitably normalizes.
          </p>
        </div>
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
                <h3 className="font-bold text-gray-900 dark:text-white">2024 GDP Growth</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">5.03%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">0.97pp from Inventory</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Coal Stockpile</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">28MT</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">18 days' surplus output</p>
            </CardContent>
          </Card>
        </div>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Crisis Catalysts: Market Forces Converge</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This inventory overhang - contributing 0.97pp to GDP - masked fundamental weaknesses now exposed by three converging forces:
          </p>

          <Card className="bg-blue-50 dark:bg-blue-900/20 mb-4">
            <CardContent className="p-4">
              <blockquote className="text-base italic text-gray-700 dark:text-gray-300 mb-2">
                "Indonesia's 5.03% growth in 2024 carries an artificial underbelly – when 0.97 percentage points (19% of total expansion) rely on inventory stockpiles rather than sustainable demand"
              </blockquote>
              <p className="text-sm text-gray-600 dark:text-gray-400">— Barra Kukuh Mamia, Head of Macroeconomic Research, BCA</p>
            </CardContent>
          </Card>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Crisis Catalyst</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Market Impact (Feb 6)</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Inventory Linkage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Fed Hawkishness</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">$317M foreign outflows</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Dollarized inventory financing costs up 22%</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">China Tariffs</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">ADRO -2.29% (28MT coal exposure)</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Export bottleneck compounds stockpiles</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Earnings Shock</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">BMRI -7.69% (14% profit drop)</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Inventory impairments hit bank balance sheets</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Market Technicals: The Chart of Capitulation</h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none mb-4">
            <p className="mb-3">The IHSG's breakdown below 6,900 (critical Fibonacci support) suggests:</p>
            <ul className="list-none space-y-2">
              <li>• Immediate target 6,750 (-2.8% from current)</li>
              <li>• Resistance now at 7,150 (200-day MA)</li>
              <li>• Volume surge to Rp18.4T (145% of 30-day avg) confirms distribution</li>
            </ul>
            <p className="mt-3">
              This technical damage mirrors fundamental realities - 14% of manufacturing loans turning substandard, while inventory carrying costs consume 7.2% of corporate cash flow (vs 4.1% 5-year avg).
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">The House of Cards: How Inventory Artifice Boosted Growth</h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <p className="mb-2">2024's Growth Mirage revealed troubling patterns across key sectors:</p>
            <ul className="list-none pl-0 mb-4">
              {[
                { label: "Coal Stockpiling", text: "14.2% production surge vs 4.7% exports - 28MT surplus (18 days' output)" },
                { label: "Strategic Miscalculations", text: "166% QoQ rice imports created 2.3MT excess reserves" },
                { label: "Manufacturing Glut", text: "Electronics/components inventory at 22% of sector GDP" }
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
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">The Great Unwind: Scenarios & Strategic Imperatives</h2>

          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Inventory Normalization Pathways:</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Scenario</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Probability</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Real GDP Impact</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Corporate Earnings Risk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Managed Drawdown</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">55%</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">-0.4-0.6pp</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">5-7% EPS contraction</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Fire Sale</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">30%</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">-0.8-1.0pp</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">12-15% EPS collapse</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Stagnation</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">15%</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">+0.2pp</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Chronic 3-4% annual drag</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Critical Crossroads for Policymakers:</h3>
          <div className="space-y-3 mb-4">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Monetary Tightrope:</span> BI's 25bps cut risks stoking inventory inflation (current 2.1% carrying costs)
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Fiscal Reallocation:</span> Prabowo's welfare shift could divert Rp45T from inventory-heavy sectors
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">SOE Rescue Plan:</span> Mandatory inventory purchases for infrastructure projects under consideration
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Sectoral Reckoning: From Growth Driver to Liability</h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Banking Sector (-1.75%)</h3>
                <ul className="list-none space-y-2">
                  <li>• BMRI's manufacturing NPL ratio hit 4.1% (Q4-24) vs 2.8% YoY</li>
                  <li>• Inventory-linked loans reached 18% of corporate credit portfolio</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Basic Materials (-1.95%)</h3>
                <ul className="list-none space-y-2">
                  <li>• KRAS steel inventories at 22% sales ratio - 5.2% share drop</li>
                  <li>• TPIA petrochemical stockpiles at 45-day cover (-6.9% session loss)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Automotive Crisis</h3>
                <ul className="list-none space-y-2">
                  <li>• ASII inventories hit 1.8M units (+37% YoY) - 4.3% plunge</li>
                  <li>• 22% of dealer lots now holding &gt;90 days' supply</li>
                </ul>
              </div>
            </div>
          </div>
        </section>


        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">The Path Forward: From Inventory Arithmetic to Demand Economics</h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <p className="mb-3">Strategic pivots must address both symptoms and causes:</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Immediate Term (Q1-25)</h3>
                <ul className="list-none space-y-2">
                  <li>• Emergency export subsidies for coal/steel inventories (est. Rp7.2T cost)</li>
                  <li>• Temporary tax holiday for inventory-to-investment conversion</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Structural Reform</h3>
                <ul className="list-none space-y-2">
                  <li>1. Demand-Side Stimulus: Shift from rice stockpiling to direct nutrition vouchers</li>
                  <li>2. Manufacturing Upgrade: 30% tax credit for Industry 4.0 adoption in glut sectors</li>
                  <li>3. Commodity Hedge Fund: SOE-led buffer stock mechanism with ASEAN partners</li>
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
        <p className="mb-2">
          Sources: Mamia, Barra Kukuh. "GDP: What Can We Expect from This 'Baby Bump'?" PT Bank Central Asia Tbk, 6 Feb. 2025, https://www.bca.co.id/-/media/Feature/Report/File/S8/Laporan-Riset-Ekonomi/2025/02/20250206-gdp-what-can-we-expect-from-this-baby-bump.pdf.
        </p>
        <p>© 2025 Daily Digest. All rights reserved.</p>
      </footer>
    </div>
  );
}