import React from 'react';
import {
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Shield
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';

const TradeWarTsunamiFeb1014 = () => {
  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Website Title */}
        <div className="text-center py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-serif font-bold">
              <span className="text-blue-600">Daily</span> | <span className="text-gray-900 dark:text-white">Digest</span>
            </h1>
          </Link>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletter" className="hover:text-blue-600">Newsletter</Link>
          <ChevronRight className="h-4 w-4" />
          <span>US-China Trade War Impact</span>
        </nav>

        {/* Category Tags */}
        <div className="flex gap-2 py-2">
          <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-100">
            Weekly Special
          </span>
          <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-gray-800 dark:text-gray-200">
            Market Strategy
          </span>
        </div>

        {/* Header */}
        <header className="py-4">
          <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Floodgates Open as Trade War Tsunami Swamps IHSG
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>February 10, 2025</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>JAKARTA</span>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            By Luca Cada Lora
          </div>
        </header>

        {/* Weekly Market Alert Section - Moved to top */}
        <div className="bg-[#FFF7ED] border-l-4 border-orange-500 p-4 rounded-r mb-8">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-800" />
            <p className="font-medium text-orange-800 mb-0">Weekly Market Alert</p>
          </div>
          <p className="text-gray-700 mt-2">
            This special report outlines critical market scenarios and action plans for the week of February 10-14, 2025. 
            This special report outlines key market scenarios and potential impacts for the week ahead.
          </p>
        </div>

        {/* Previously in Weekly Special Section - Featured */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            <a href="https://lucaxyzz-digest.replit.app/newsletter/us-china-trade-war-impact-ihsg" 
               className="text-blue-600 hover:underline">
              Previously in Weekly Special 4-7 Feb 2025: US-China Retaliation: Escalation Could Trigger IHSG Sell-Offs Below 6,900
            </a>
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            Last week's analysis proved prescient as we accurately predicted the IHSG's descent below 6,900. 
            For new readers, our previous report detailed how escalating US-China tensions would impact Indonesian markets. 
            Here's what we got right:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Accurately Flagged:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>IHSG Collapse:</strong> Index plunged to 6,752.57 (-5.16% WoW), breaching 6,900 as projected
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Commodity Carnage:</strong> ADRO (-12%), PTBA (-9%), and AALI (-8%) collapsed amid China's coal/LNG tariffs and CPO risks
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Currency Pressures:</strong> USDIDR hit 16,450, nearing BI's intervention threshold
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Defensive Resilience:</strong> KLBF surged 7.4% intraweek before profit-taking, validating its defensive status despite systemic pressures
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Key Triggers:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>MSCI Exclusion Fallout:</strong> BREN (-22.16%), CUAN (-21.49%), PTRO (-27.27%) erased $10.5B market cap, contributing to 1.4pp of IHSG's decline
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>GDP Mirage:</strong> Indonesia's 2024 GDP growth of 5.03% YoY relied on inventory stockpiling (1.2pp), masking weak consumption growth (4.83% YoY)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-gray-200 dark:border-gray-800">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <TrendingUp className="h-6 w-6 text-red-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">IHSG Drop</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">-5.16%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">WoW Decline</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <AlertCircle className="h-6 w-6 text-orange-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Chinese Imports</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">↑ 32%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">ASEAN Share</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <Shield className="h-6 w-6 text-blue-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Local Impact</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">-18-23%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">MSME Stocks</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Article Content */}
        <div className="py-4 space-y-6">
          {/* New Narrative Section */}
          <section className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              The New Narrative: The Inventory Overhang
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Indonesia's 2024 GDP growth, while seemingly robust, hides structural vulnerabilities:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Auto Sector Glut: Inventory days surged to 112 (vs. healthy 75), pressuring ASII and AALI3.</li>
              <li>Palm Oil Stockpiles: CPO inventories hit 4.2M tons (+18% MoM), risking margin compression for AALI and LSIP25.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              <strong>Investor Takeaway:</strong> The "growth" narrative is faltering. Markets now price in a domestic demand crisis, with retail sales growth slowing to 0.9% YoY3.
            </p>
          </section>

          {/* New Narrative: Indonesia as a Chinese Surplus Dumping Ground */}
          <section className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              The New Narrative: Indonesia as a Chinese Surplus Dumping Ground
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Bank Indonesia (BI) issued a stark warning this week: "Chinese goods barred from US markets are flooding Indonesia," threatening to overwhelm domestic industries. Key insights:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Mechanism</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Trump's 10% China tariffs have redirected $48B worth of Chinese exports (textiles, electronics, ceramics) to ASEAN markets. Indonesia, with its porous import controls, absorbed 32% of this diverted volume.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Impact</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Local MSMEs face existential risks. Textile producers like ERAT (-18% WoW) and ceramic firm ARTI (-23%) collapsed as Chinese imports undercut prices by 40–60%.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Policy Paralysis</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Indonesia's retaliatory 200% tariffs on Chinese goods (announced Jan 2025) remain unimplemented, exposing regulatory inertia.
                </p>
              </div>
            </div>
          </section>

          {/* GDP Growth Mirage Section */}
          <section className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              GDP Growth Mirage
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              The "5.03% growth" hailed for 2024 now reveals cracks:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Inventory Illusion: 1.2 percentage points came from stockpiling, not demand. Auto inventories hit 112 days (vs 75-day healthy threshold).</li>
              <li>Consumption Crunch: Household spending growth slowed to 4.83% as real wages stagnate.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              <strong>Investor Takeaway:</strong> The IHSG's 6,752 close reflects not just trade war risks, but a domestic demand crisis masked by statistical artifice.
            </p>
          </section>

          {/* Forward Outlook Section */}
          <section className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              Forward Outlook: Flood Control Strategies
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Sectoral Triage</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Sector</th>
                        <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Action</th>
                        <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Rationale</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Textiles</td>
                        <td className="px-4 py-2 text-red-600 font-semibold">Exit</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Chinese imports now 58% of market share</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Ceramics</td>
                        <td className="px-4 py-2 text-orange-600 font-semibold">Short</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">ARTI faces 200% Chinese import surge</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Fintech</td>
                        <td className="px-4 py-2 text-green-600 font-semibold">Accumulate</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">BUKA, BBCA benefit from BI's 7.1% SRBI bonds</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Critical Week Ahead</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li><strong>Feb 11:</strong> BI emergency meeting – 25bps hike expected to defend USDIDR</li>
                  <li><strong>Feb 12:</strong> China's rare earth export curbs – ANTM, INCO face supply chain shocks</li>
                  <li><strong>Feb 14:</strong> US ASEAN auto tariff decision – ASII's 30% revenue at risk</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Technical Thresholds</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li><strong>IHSG:</strong> 6,600 (critical support) vs 6,900 (resistance)</li>
                  <li><strong>USDIDR:</strong> BI's 16,500 intervention line under siege</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bottom Line */}
          <section className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              Bottom Line
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              This isn't just a trade war – it's a battle for Indonesia's economic sovereignty. Investors must navigate Chinese dumping, phantom GDP growth, and BI's dwindling reserves ($138.6B). Rotate into tariff-immune sectors (healthcare, fintech) and brace for 6,500 tests.
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 pb-6">
          <div className="flex items-center justify-between mb-2">
            <p>— Lucaxyz Digest Research | Data as of Feb 9, 2025</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TradeWarTsunamiFeb1014;