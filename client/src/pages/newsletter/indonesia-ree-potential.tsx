import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Layers, Map, BarChart3, FileText, AlertTriangle, DollarSign, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import { Article } from "@/types/newsletter";
import MetaTags from '@/components/SEO/MetaTags'; 
import type { ArticleMetadata } from '@/lib/meta-tags';
import { PieChart, BarChart, ValuePieChart } from '@/components/charts';

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
    url: `https://lucaxyzz-digest.replit.app/newsletter/indonesia-ree-potential`,
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

export default function IndonesiaREEPotential() {
  const [location] = useLocation();
  const slug = 'indonesia-ree-potential';

  const article = sampleArticles.find(a => a.slug === slug);

  // Convert article to metadata format for MetaTags component
  const metadata = article ? convertToMetadata(article) : null;

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Add MetaTags component for SEO */}
      {metadata && <MetaTags metadata={metadata} cacheBuster="20250313" />}
      
      <Header simplified showCategories={false} />
      <div className="h-36 sm:h-32"></div>

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletter" className="hover:text-blue-600">Newsletter</Link>
          <ChevronRight className="h-4 w-4" />
          <span>$2 Billion USD Rare Earth Elements Potential</span>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">Industries</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="font-bold uppercase">Resource Analysis</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              $2 Billion USD Rare Earth Elements Potential: Unlocking value from Indonesian tin smelter byproduct recovery
            </h1>

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>March 13, 2025</span>
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
            Indonesia's rare earth element (REE) potential from tin smelter byproducts in the Bangka Belitung Islands represents a significant opportunity, with an estimated 116,142 tons of REE oxides valued at approximately $2 billion USD. Detailed analysis reveals that these reserves, primarily derived from monazite and xenotime minerals, could position Indonesia as a strategic player in the global REE market at a time when demand for these critical minerals is accelerating due to their essential role in green technology and high-tech manufacturing.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Tin smelters, particularly those operated by PT Timah, are the primary source for this potential REE recovery. With an estimated 186,663 tons of monazite reserves yielding about 102,665 tons of light REE oxides, and 20,734 tons of xenotime reserves contributing approximately 13,477 tons of heavy REE oxides, these byproducts represent a diverse portfolio of critical minerals including cerium, lanthanum, neodymium, yttrium, and dysprosium – many of which are vital components in permanent magnets, catalysts, and electronic devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Map className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Primary Source</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">PT Timah</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tin smelters in Bangka Belitung Islands are the primary source for REE recovery</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Layers className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Estimated Reserves</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">116,142 tons</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total REE oxide reserves from monazite and xenotime minerals</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-5 w-5 text-amber-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Market Value</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$1.99B USD</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Estimated total market value based on current REE prices</p>
            </CardContent>
          </Card>
        </div>

        <section className="py-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Background on REEs and Critical Minerals
          </h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <p className="mb-4">
              Rare Earth Elements (REEs) comprise 17 elements including the lanthanides, scandium, and yttrium, which are vital for high-tech applications such as electronics, electric vehicles, and renewable energy technologies. Despite their name, most REEs are not particularly rare in the Earth's crust, but economically viable concentrations are less common.
            </p>
            <p className="mb-4">
              Indonesia's critical mineral resources include nickel, copper, bauxite, and tin, with recent designations of 47 critical minerals by the Ministry of Energy and Mineral Resources. This reflects the country's growing recognition of the strategic importance of these resources for economic development and technological sovereignty.
            </p>
            <p className="mb-4">
              REEs are often found as by-products in certain ores. In Indonesia's case, monazite, which is associated with tin mining, contains light REEs such as cerium, lanthanum, and neodymium. Xenotime, another by-product, contributes heavy REEs and yttrium, which are particularly valuable due to their relative scarcity and growing demand in high-tech industries.
            </p>
          </div>
        </section>

        <section className="py-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Major Smelters with REE Potential
          </h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <p className="mb-4">
              Tin mining in Indonesia is concentrated in the Bangka Belitung Islands, where monazite and xenotime, REE-bearing minerals, are common by-products in tailings. PT Timah, a state-owned company, has been actively developing REE processing, with a pilot plant for converting monazite into Rare Earth Hydroxide (REOH) since 2015.
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="p-3 text-left font-medium dark:border-slate-700">Smelter Name</th>
                    <th className="p-3 text-left font-medium dark:border-slate-700">Location</th>
                    <th className="p-3 text-left font-medium dark:border-slate-700">Type</th>
                    <th className="p-3 text-left font-medium dark:border-slate-700">REE Source</th>
                    <th className="p-3 text-left font-medium dark:border-slate-700">Notes on REE Potential</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="p-3 font-medium text-gray-900 dark:text-white">PT Timah</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Bangka Belitung Islands</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Tin</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Monazite, xenotime in tailings</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Actively processing, pilot plant operational</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="p-3 font-medium text-gray-900 dark:text-white">PT Bangka Global Mandiri</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Bangka Belitung Islands</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Tin</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Monazite, xenotime in tailings</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Likely REE by-products, joint venture</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="p-3 font-medium text-gray-900 dark:text-white">Other smaller tin smelters</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Bangka Belitung Islands</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Tin</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Monazite, xenotime in tailings</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Potential REE, data limited</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="mb-4">
              At least 16 smelters operate on Bangka Island, contributing to over 190,000 tonnes annual capacity. The prevalence of these operations creates a significant opportunity for REE recovery as a value-added side stream, potentially increasing the economic efficiency of Indonesia's tin industry while diversifying its mineral product portfolio.
            </p>
          </div>
        </section>

        <section className="py-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Estimated Reserves & Composition
          </h2>
          
          <Tabs defaultValue="monazite" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monazite">Monazite</TabsTrigger>
              <TabsTrigger value="xenotime">Xenotime</TabsTrigger>
            </TabsList>
            <TabsContent value="monazite" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monazite Reserves and Composition</CardTitle>
                  <CardDescription>
                    Total monazite reserves: approximately 186,663 tons, with 55% REE oxides, yielding about 102,665
                    tons of REE oxides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="mb-4 text-lg font-medium">Composition Breakdown</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Cerium oxide (CeO₂):</span>
                          <span className="font-medium">47,800 tons</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Lanthanum oxide (La₂O₃):</span>
                          <span className="font-medium">24,640 tons</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Neodymium oxide (Nd₂O₃):</span>
                          <span className="font-medium">17,453 tons</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Praseodymium oxide (Pr₂O₃):</span>
                          <span className="font-medium">5,133 tons</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Other light REEs:</span>
                          <span className="font-medium">7,700 tons</span>
                        </li>
                      </ul>
                    </div>
                    <div className="h-64">
                      <PieChart
                        data={[
                          { name: "Cerium oxide", value: 47800, color: "#4f46e5" },
                          { name: "Lanthanum oxide", value: 24640, color: "#8b5cf6" },
                          { name: "Neodymium oxide", value: 17453, color: "#a855f7" },
                          { name: "Praseodymium oxide", value: 5133, color: "#d946ef" },
                          { name: "Other light REEs", value: 7700, color: "#ec4899" },
                        ]}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="xenotime" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Xenotime Reserves and Composition</CardTitle>
                  <CardDescription>
                    Total xenotime reserves: approximately 20,734 tons, with 65% REE oxides, yielding about 13,477 tons
                    of REE oxides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="mb-4 text-lg font-medium">Composition Breakdown</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Yttrium oxide (Y₂O₃):</span>
                          <span className="font-medium">9,300 tons</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Dysprosium oxide (Dy₂O₃):</span>
                          <span className="font-medium">1,262 tons</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Erbium oxide (Er₂O₃):</span>
                          <span className="font-medium">1,005 tons</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Ytterbium oxide (Yb₂O₃):</span>
                          <span className="font-medium">751 tons</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Other heavy REEs:</span>
                          <span className="font-medium">1,159 tons</span>
                        </li>
                      </ul>
                    </div>
                    <div className="h-64">
                      <PieChart
                        data={[
                          { name: "Yttrium oxide", value: 9300, color: "#0ea5e9" },
                          { name: "Dysprosium oxide", value: 1262, color: "#06b6d4" },
                          { name: "Erbium oxide", value: 1005, color: "#14b8a6" },
                          { name: "Ytterbium oxide", value: 751, color: "#10b981" },
                          { name: "Other heavy REEs", value: 1159, color: "#22c55e" },
                        ]}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section className="py-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Comparative Analysis of Major REE Oxides
          </h2>
          
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle>Distribution Between Monazite and Xenotime Sources</CardTitle>
              <CardDescription>
                Comparing the major REE oxides available from the two primary mineral sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart />
              </div>
            </CardContent>
          </Card>
          
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none mt-6">
            <p>
              The comparative analysis highlights the complementary nature of monazite and xenotime mineral sources. Monazite predominantly contains light rare earth elements (LREEs) such as cerium, lanthanum, and neodymium, which are widely used in catalysts, glass polishing, and certain types of magnets. In contrast, xenotime is rich in heavy rare earth elements (HREEs) like yttrium, dysprosium, and erbium, which command higher market prices due to their critical applications in advanced technologies.
            </p>
            <p>
              This diversity provides Indonesia with a valuable advantage in the REE market, as having access to both light and heavy REEs allows for a more comprehensive product portfolio that can meet various industrial demands.
            </p>
          </div>
        </section>

        <section className="py-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Estimated Market Value
          </h2>
          
          <Card className="bg-white dark:bg-gray-800 shadow-sm mb-6">
            <CardHeader>
              <CardTitle>Value Distribution by REE Oxide</CardTitle>
              <CardDescription>
                Breakdown of the estimated $2 billion USD total value across different rare earth oxides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ValuePieChart />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white dark:bg-gray-800 shadow-sm">
              <CardHeader>
                <CardTitle>Price Reference (USD per metric ton)</CardTitle>
                <CardDescription>Market prices as of March 13, 2025, sourced from metal.com</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left font-medium">REE Oxide</th>
                          <th className="p-2 text-right font-medium">Price (USD/mt)</th>
                          <th className="p-2 text-left font-medium">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">CeO₂</td>
                          <td className="p-2 text-right">1,524.38</td>
                          <td className="p-2">Standard price</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">La₂O₃</td>
                          <td className="p-2 text-right">536.58</td>
                          <td className="p-2">Lower end price</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Nd₂O₃</td>
                          <td className="p-2 text-right">55,731.22</td>
                          <td className="p-2">High demand</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Pr₂O₃</td>
                          <td className="p-2 text-right">56,219.03</td>
                          <td className="p-2">High demand</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Dy₂O₃</td>
                          <td className="p-2 text-right">207,930.00</td>
                          <td className="p-2">Critical material</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 shadow-sm">
              <CardHeader>
                <CardTitle>Value Calculation Method</CardTitle>
                <CardDescription>Based on reserves multiplied by current market prices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    The total value is calculated by multiplying each reserve by its price and summing the results:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex justify-between">
                      <span>Nd₂O₃: 17,453 tons × $55,731.22/mt</span>
                      <span className="font-medium">≈ $972.7M</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Pr₂O₃: 5,133 tons × $56,219.03/mt</span>
                      <span className="font-medium">≈ $288.6M</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Dy₂O₃: 1,262 tons × $207,930/mt</span>
                      <span className="font-medium">≈ $262.4M</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Tb₂O₃: 253 tons × $804,870/mt</span>
                      <span className="font-medium">≈ $203.6M</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Other REEs combined</span>
                      <span className="font-medium">≈ $271.5M</span>
                    </li>
                  </ul>
                  <p className="font-medium text-green-600">Total estimated value: $1,998,787,773 USD</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Strategic Implications and Market Opportunities
          </h2>
          <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
            <p className="mb-4">
              The identified REE potential in Indonesia's tin smelter byproducts presents several strategic implications for investors, policymakers, and industry stakeholders:
            </p>
            <ul className="list-none space-y-3 pl-0">
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="mt-0">
                  <strong>Supply Chain Diversification:</strong> Development of Indonesia's REE resources could help diversify global supply chains currently dominated by China, which controls approximately 85% of global processing capacity.
                </p>
              </li>
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="mt-0">
                  <strong>Value-Added Processing:</strong> There is significant potential to develop downstream processing capabilities, moving beyond raw material exports to higher-value REE products such as metals, alloys, and magnets.
                </p>
              </li>
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="mt-0">
                  <strong>Environmental Considerations:</strong> Processing of monazite and xenotime requires careful management of radioactive elements like thorium and uranium, necessitating investment in proper environmental controls and waste management systems.
                </p>
              </li>
              <li className="flex space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="mt-0">
                  <strong>Technology Partnerships:</strong> The complexity of REE separation and processing creates opportunities for technology partnerships with companies from Japan, Europe, and North America seeking to reduce dependence on Chinese supply chains.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <Card className="bg-blue-50 dark:bg-blue-900/20 mb-8 mt-4">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">The Bottom Line</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Indonesia's tin smelter byproducts represent a significant untapped opportunity in the global rare earth elements market. With an estimated 116,142 tons of REE oxides valued at approximately $2 billion USD, developing this resource could strengthen Indonesia's position in critical mineral supply chains while creating substantial economic value. The diversity of elements available—spanning both light and heavy REEs—provides multiple pathways for market development and strategic partnerships as global demand for these vital materials continues to grow.
            </p>
          </CardContent>
        </Card>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 mt-8">
          <div className="mb-2">
            <p>Sources:</p>
            <ul className="list-disc pl-5">
              <li>
                <a href="#" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  PT Timah Annual Report 2024
                </a>
              </li>
              <li>
                <a href="#" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  Indonesia Ministry of Energy and Mineral Resources (March 2025)
                </a>
              </li>
              <li>
                <a href="#" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  Global Rare Earth Elements Market Analysis (February 2025)
                </a>
              </li>
            </ul>
          </div>
          <p>© 2025 Daily Digest Market Analysis</p>
        </footer>

        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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