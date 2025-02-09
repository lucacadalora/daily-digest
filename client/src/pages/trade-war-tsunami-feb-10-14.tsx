import React from 'react';
import {
  Clock,
  MapPin,
  ChevronRight,
  TrendingDown,
  AlertTriangle,
  ArrowUpCircle,
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
          <span>Trade War Impact</span>
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
            Trade War Tsunami: Indonesia Emerges as China's Surplus Dumping Ground
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

        {/* Weekly Market Alert Section */}
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

        {/* Metric Cards - Updated with detailed information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-gray-200 dark:border-gray-800">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <TrendingDown className="h-6 w-6 text-red-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">IHSG Range</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">6,742–6,900</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sideways with Bearish Bias</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">USDIDR Crisis</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">+25 bps</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Near 16,500 Threshold</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <ArrowUpCircle className="h-6 w-6 text-green-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Buy MDKA</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">Gold Proxy</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">As Gold Nears $2,900</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Opening Narrative Section */}
        <section className="prose dark:prose-invert max-w-none mb-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                The Floodgates Open
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Bank Indonesia (BI) issued a critical warning this week: "Chinese goods barred from US markets are flooding Indonesia", threatening to overwhelm domestic industries. This follows President Trump's 10% tariffs on $48B of Chinese exports, redirecting surplus goods to ASEAN markets. Indonesia, with its porous import controls, absorbed 32% of this diverted volume, turning the archipelago into a primary dumping ground for Chinese textiles, electronics, and ceramics.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Mechanism: How Indonesia Became Ground Zero
              </h2>
              <div className="space-y-6">
                {/* Point 1: US-China Tariffs */}
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    US-China Tariffs Redirect Flood of Cheap Goods
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    The Trump administration's 10–25% tariffs on Chinese exports forced Beijing to reroute $48B of surplus goods to ASEAN markets. Indonesia's 1,000+ illegal seaports and lax border controls made it a prime target, absorbing 32% of China's diverted goods — from textiles to electronics. Example: $360M of smuggled Chinese ceramics crushed local producers like PT Kusumahadi Santosa, which laid off 3,000 workers.
                  </p>
                </div>

                {/* Point 2: Price Wars */}
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    Price Wars Crush Local Industries
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Chinese products are sold 40–60% cheaper than Indonesian equivalents, exploiting weak anti-dumping laws. Textile MSMEs lost 58% market share to Chinese apparel, forcing 20–30 factories to close. E-commerce platforms like Shopee and TikTok Shop prioritized Chinese sellers, drowning out local businesses. Despite a 200% retaliatory tariff announced in 2025, enforcement delays leave industries defenseless.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Previously in Weekly Special Section */}
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

        {/* IHSG Technical Outlook Section */}
        <section className="prose dark:prose-invert max-w-none mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            IHSG Technical Outlook
          </h2>

          <div className="space-y-6">
            {/* Current Position */}
            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white">Current Position</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Last Close: 6,752.57 (-5.16% weekly), lowest since June 2024.
              </p>
              <div className="ml-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Key Levels:</strong>
                </p>
                <ul className="list-disc list-inside">
                  <li>Support: 6,742–6,830 (critical zone; breach risks 6,600–6,700)</li>
                  <li>Resistance: 6,900–7,029 (previous support now resistance)</li>
                </ul>
              </div>
            </div>

            {/* Key Indicators */}
            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white">Key Indicators</h3>
              <div className="ml-4 space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Trend:</strong> Bearish (confirmed breakdown below 6,900)
                </p>
                <div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Momentum:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    <li>Stochastic RSI: Oversold (hinting at short-term rebound)</li>
                    <li>Fibonacci: Next major support at 6,600–6,700 (78.6% retracement)</li>
                  </ul>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Volume:</strong> High sell-off volumes (Rp 11.6T/day) confirm bearishness
                </p>
              </div>
            </div>

            {/* Critical Scenarios Table */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Critical Scenarios</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Case</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Probability</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Target</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Triggers</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Bull</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">20%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">6,900–7,029</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Oversold rebound + BI rate hike.</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Base</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">50%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">6,742–6,900</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">MSCI fallout + tariff uncertainty.</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Bear</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">30%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">6,500–6,700</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">USDIDR surge + China rare earth curbs.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* What to Watch */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">What to Watch</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>6,742 Support: Breach risks algorithmic selling toward 6,600</li>
                <li>6,900 Resistance: Recovery above this signals temporary relief</li>
                <li>BI Meeting (Feb 11): Rate hike could stabilize USDIDR</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Action:</strong> Hedge with gold/defensive stocks (KLBF, TLKM); avoid commodities (ADRO, AALI)
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Bottom Line:</strong> The 6,742–6,830 zone is critical. Prioritize risk management amid high volatility.
              </p>
            </div>

            {/* High-Risk Zones Table */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">High-Risk Zones</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Sector</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Vulnerability</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Key Stocks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Automotive</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">US tariff retaliation risk</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">ASII (-14% WoW), AIMS (-9%)</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Coal</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">China's import quotas cut 40%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">ADRO, PTBA</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Palm Oil</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">EU deforestation rules + China tariffs</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">LSIP, AALI</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Defensive Recalibration */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Defensive Recalibration</h3>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300 font-medium">Upgraded Resilience:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>TLKM (+1.2% WoW): 5G rollout shields earnings</li>
                  <li>KLBF (+2.3% WoW post-drop): Pandemic prep stocks boost demand</li>
                  <li>BBCA: Liquidity coverage ratio at 158% buffers rate hikes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Critical Week Ahead Section */}
        <section className="prose dark:prose-invert max-w-none mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Critical Week Ahead
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                Feb 11: BI Emergency Meeting
              </h3>
              <div className="ml-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Action:</strong> Likely 25bps rate hike (to 6.00%) to stabilize USDIDR, which neared 16,500.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Impact:</strong> Short-term relief for rupiah (16,200–16,300 range). Banks (BBCA, BBNI) face margin pressure but benefit from higher bond yields.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                Feb 12: China's Rare Earth Curbs
              </h3>
              <div className="ml-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Action:</strong> Restrictions on nickel exports to retaliate against US tariffs.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Impact:</strong> ANTM/INCO hit hard – Indonesia's $2.1B nickel exports at risk. Global EV battery supply chains disrupted.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                Feb 14: US ASEAN Auto Tariffs
              </h3>
              <div className="ml-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Risk:</strong> 25% tariffs threaten ASII's exports (30% revenue).
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Fallout:</strong> Auto sector growth stalls; components from China face scrutiny. Investors pivot to defensive stocks (TLKM, BBCA).
                </p>
              </div>
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