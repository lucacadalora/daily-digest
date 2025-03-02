import React from 'react';
import {
  Clock,
  MapPin,
  ChevronRight,
  TrendingDown,
  AlertTriangle,
  ArrowUpCircle,
  BarChart3,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';

const IHSGOutlookMarch37 = () => {
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
          <span>IHSG Outlook</span>
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
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="py-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              IHSG Weekly Forecast: Navigating Oversold Conditions Amid Structural Headwinds
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>March 3, 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>JAKARTA</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              By Luca Cada Lora
            </div>
          </div>
        </header>


        {/* Weekly Market Alert Section */}
        <div className="bg-[#FEF2F2] border-l-4 border-red-500 p-4 rounded-r mb-8 mt-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-red-800" />
            <p className="font-medium text-red-800 mb-0">Weekly Market Alert</p>
          </div>
          <p className="text-gray-700 mt-2">
            The IHSG enters March 2025 at a critical inflection point after a historic 7.83% weekly decline to 6,270.597, its lowest close since October 2021. Foreign investors drove the sell-off, with Rp10.22 trillion in net outflows last week alone as structural pressures from global trade risks and domestic liquidity constraints mount.
          </p>
        </div>

        {/* Metric Cards - Updated with detailed information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-gray-200 dark:border-gray-800">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <TrendingDown className="h-6 w-6 text-red-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">IHSG Range</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">6,050–6,200</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Critical Support Zone</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">MSCI Impact</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">-$120M</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Passive Outflows</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <ArrowUpCircle className="h-6 w-6 text-green-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gold Proxy</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">Buy MDKA</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">As Gold Nears $2,885/oz</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Opening Narrative Section */}
        <section className="prose dark:prose-invert max-w-none mb-8 mt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Key Drivers for the Week Ahead
              </h2>
              <div className="space-y-6">
                {/* Point 1: MSCI Rebalancing */}
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    MSCI Rebalancing Fallout (Effective March 3)
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    The reduction in Indonesia's weighting from 2.2% to 1.5% in MSCI's Emerging Markets index forces passive fund outflows of ~$120 million, disproportionately affecting large caps like BBCA, BBRI, and BMRI. Stocks added to MSCI Small Cap (MDKA, INKP, CLEO) may see volatility as active funds reposition in response to these changes.
                  </p>
                </div>

                {/* Point 2: Technical Positioning */}
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    Technical Positioning
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Oversold signals from RSI (41.16) and Stochastic RSI hint at exhaustion, but MACD's bearish slope suggests lingering downside risk. Critical support levels at 6,050–6,200 (2021 lows) remain key - a breach risks testing 5,900. Resistance levels have formed at 6,450 (MA20) and 6,640 (February 21 close).
                  </p>
                </div>

                {/* Point 3: Global Sentiment */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    Global Sentiment Risks
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Trump's tariff threats against Mexico/Canada and Fed policy uncertainty keep risk assets under pressure. The USDIDR nearing 16,500 raises intervention risks from Bank Indonesia, which could lead to renewed pressure on equities if rate hikes are needed to defend the currency.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Sector & Stock Spotlight
              </h2>
              <div className="space-y-6">
                {/* Point 1: Big-Cap Bloodbath */}
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    Big-Cap Bloodbath
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    BREN (-25.61% YTD) and BMRI (-10.96%) face continued foreign selling due to MSCI adjustments. The banking sector is particularly vulnerable to further outflows as foreign ownership in this sector remains high.
                  </p>
                </div>

                {/* Point 2: Tech Outliers */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    Tech Outliers
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    The tech sector (+59.31% YTD) remains remarkably resilient (e.g., INET +34.48% last week) but may lack the liquidity to offset broader market declines. These stocks remain attractive for growth investors but should be sized appropriately given potential volatility.
                  </p>
                </div>

                {/* Point 3: Rebound Candidates */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    Rebound Candidates
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    TLKM and BBNI stand out as oversold blue chips with dividend yields exceeding 4%, with technical basing patterns observed on their charts. Meanwhile, ANTM offers exposure to gold's safe-haven appeal at $2,885/oz and may benefit from Bank Indonesia's potential rate hikes to defend the rupiah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Previously in Weekly Special Section */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            <a href="/trade-war-tsunami-feb-10-14"
               className="text-blue-600 hover:underline">
              Previously in Weekly Special Feb 10-14: Trade War Tsunami: Indonesia Emerges as China's Surplus Dumping Ground
            </a>
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            Our prior bearish outlook has proven prescient as market conditions deteriorated further.
            For new readers, our previous report warned of Chinese import flooding and IHSG weakness.
            Here's what's developed since then:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Confirmed Warnings:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>IHSG Collapse:</strong> Index plunged to 6,270 (-7.83% WoW), worst weekly decline since March 2020
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Foreign Flight:</strong> Rp10.22 trillion in outflows last week (Rp18.98 trillion YTD)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Currency Pressure:</strong> USDIDR approaching 16,500 intervention threshold
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">New Developments:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>MSCI Reweighting:</strong> Indonesia's EM index weight reduced from 2.2% to 1.5%
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Tech Resilience:</strong> Technology sector (+59.31% YTD) bucking the market trend
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
                Last Close: 6,270.597 (-7.83% weekly), lowest since October 2021.
              </p>
              <div className="ml-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Key Levels:</strong>
                </p>
                <ul className="list-disc list-inside">
                  <li>Support: 6,050–6,200 (2021 lows); breach risks test of 5,900</li>
                  <li>Resistance: 6,450 (MA20) and 6,640 (February 21 close)</li>
                </ul>
              </div>
            </div>

            {/* Key Indicators */}
            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white">Key Indicators</h3>
              <div className="ml-4 space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Trend:</strong> Strongly bearish (below all major moving averages)
                </p>
                <div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Momentum:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    <li>RSI: 41.16 (approaching oversold)</li>
                    <li>Stochastic RSI: Near exhaustion levels</li>
                    <li>MACD: Bearish slope suggests continued downside risk</li>
                  </ul>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Volume:</strong> Elevated sell volumes (Rp15.8T/day), confirming bearish conviction
                </p>
              </div>
            </div>

            {/* Market Scenarios Table */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Market Scenarios & Actionable Strategies</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Scenario</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Probability</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">IHSG Range</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Catalysts</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Bear</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">40%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">6,050–6,200</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">MSCI outflows accelerate; USDIDR exceeds 16,500</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Short-term hedges (ASII puts); accumulate cash for 6,000 support.</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Base</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">50%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">6,200–6,450</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Technical rebound; mild foreign buying</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Rotate into oversold banks (BBRI, BMRI) and high-yield telcos (TLKM).</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Bull</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">10%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">6,450–6,640</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">BI rate hike; global risk-on rebound</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Buy beaten-down tech (INET) and gold proxies (MDKA).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Contrarian Plays Section */}
            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
                Top Contrarian Plays: Deep-Value Banks & Gold Exposure
              </h2>
              <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
                <div className="space-y-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">1. BBRI (PT Bank Rakyat Indonesia)</h3>
                  <ul className="list-none space-y-2">
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Price (Feb 28 Close):</strong> Rp3,360 (-7.44% WoW, YTD low)</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Dividend Yield:</strong> 6.1% (Rp204/share FY2024 payout)</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Valuation:</strong> 0.66x P/B (vs 5-year avg 1.4x) | ROE: 18.4%</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Technical Setup:</strong> Oversold RSI 28.3 | MACD bearish but nearing reversal</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Action:</strong> Entry: Rp3,300–3,400 | Target: Rp3,900 (+16% upside + dividend) | Stop-loss: Rp3,250</p>
                    </li>
                  </ul>

                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">2. BMRI (PT Bank Mandiri)</h3>
                  <ul className="list-none space-y-2">
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Price (Feb 28 Close):</strong> Rp4,600 | YTD Performance: -10.96%</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Dividend Yield:</strong> 7.83% (Rp358.6/share FY2024 payout)</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Hidden Value:</strong> $1.2B unrealized gain from 20% Telkomsel stake</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Action:</strong> Entry: Rp4,450–4,700 | Target: Rp5,800 (+26% upside)</p>
                    </li>
                  </ul>

                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">3. MDKA (PT Merdeka Copper Gold)</h3>
                  <ul className="list-none space-y-2">
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Price (Feb 28 Close):</strong> Rp1,400 (-4.00% intraday)</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Gold Proxy:</strong> Leverages gold at $2,885/oz | Technical rebound potential</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Action:</strong> Entry: Rp1,350–1,400 | Target: Rp1,650 (+18% upside) | Stop-loss: Rp1,300</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="overflow-x-auto mt-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Sector Comparison Matrix</h3>
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Metric</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">BBRI</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">BMRI</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">MDKA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Dividend Yield</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">6.1%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">7.8%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">0%</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">P/B Ratio</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">0.66x</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">1.1x</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">2.5x</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">YTD Performance</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">-34%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">-31%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">-15%</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Foreign Ownership</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">41%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">32%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">18%</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Liquidity (Avg Vol)</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">150M/day</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">90M/day</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">10M/day</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </section>

        {/* Critical Week Ahead Section */}
        <section className="prose dark:prose-invert max-w-none mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Macro Catalysts to Watch
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                March 3: February Inflation Data
              </h3>
              <div className="ml-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Expectation:</strong> 0.5% YoY vs. 0.76% prior
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Market Impact:</strong> Benign print may ease pressure on Bank Indonesia to hike rates.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                March 5: Fed Chair Powell's Testimony
              </h3>
              <div className="ml-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Risk:</strong> Hawkish tilt could extend EM outflows.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Market Impact:</strong> Watch USDIDR for real-time assessment of foreign sentiment.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-orange-600" />
                MSCI Rebalancing Implementation
              </h3>
              <div className="ml-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Impact:</strong> Passive funds complete final adjustments.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Market Impact:</strong> Potential near-term pressure but could mark the final capitulation in affected stocks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Line */}
        <section className="prose dark:prose-invert max-w-none mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Bottom Line
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The IHSG's path hinges on foreign flow reversals and BI's response to rupiah volatility. While a technical bounce to 6,450 is plausible, sustained recovery requires global risk sentiment stabilization. Accumulate quality names (BBCA, TLKM) at distressed valuations but remain hedged against downside. The MSCI rebalancing implementation may create short-term volatility but could also mark a capitulation point in affected large caps, potentially creating opportunities in oversold blue chips with strong dividend support.
          </p>
        </section>

        {/* Related Analyses */}
        <section className="prose dark:prose-invert max-w-none mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Related Analyses
          </h2>
          <ul className="list-none space-y-3">
            <li>
              <a href="/trade-war-tsunami-feb-10-14"
                 className="text-blue-600 hover:underline">
                Trade War Tsunami: Indonesia as China's Surplus Dumping Ground
              </a>
            </li>
            <li>
              <a href="/insights/bumn-law-comparison"
                 className="text-blue-600 hover:underline">
                New BUMN Law: Impact on State-Owned Enterprises
              </a>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 mt-8">
          <div className="space-y-2">
            <p className="font-medium">Sources: IDX, Bank Indonesia, Bloomberg, MSCI, Internal Research</p>
            <p className="italic">Disclaimer: For general information only. Not financial advice. Consult your financial advisor before making investment decisions.</p>
            <p>© 2025 Market Analysis Report</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default IHSGOutlookMarch37;