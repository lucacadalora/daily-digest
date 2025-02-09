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
            Trade War Tsunami: China's Mineral Export Curbs Ignite IHSG Crisis
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
            This special report outlines critical market scenarios and action plans for the week of February 10-14, 2025, focusing on China's strategic mineral export curbs and their impact on Indonesia's industrial backbone.
          </p>
        </div>

        {/* Metric Cards - Updated with new metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-gray-200 dark:border-gray-800">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <TrendingDown className="h-6 w-6 text-red-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nickel Price</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$15.4K</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">4-year low</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Losses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2,100+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nickel sector</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <ArrowUpCircle className="h-6 w-6 text-green-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Price Gap</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">-33%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">vs global rate</p>
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
                Bank Indonesia (BI) issued a dire warning this week: "China's strategic mineral export curbs are destabilizing Indonesia's industrial backbone", as Beijing escalates its trade war retaliation against the West. Following President Trump's 25% tariffs on Chinese EVs and renewables, China has weaponized its dominance in critical minerals, restricting exports of tungsten, molybdenum, indium, and graphite — key inputs for defense tech, batteries, and electronics. Indonesia, reliant on Chinese refining expertise and mineral imports, now faces a supply chain crisis threatening its nickel ambitions and IHSG stability.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Mechanism: How China's Mineral War Targets Indonesia
              </h2>
              <div className="space-y-6">
                {/* Point 1: China's Export Controls */}
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    1. China's Export Controls Redirect Supply Chain Chaos
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    The Trump administration's 25% tariffs on Chinese clean tech forced Beijing to retaliate with strategic mineral export curbs, disrupting global supply chains. Indonesia, home to 23% of global nickel reserves, relies on Chinese firms (e.g., Tsingshan, GEM Co.) to process 92% of its nickel into battery-grade materials. With China halting exports of tungsten (critical for alloy production) and molybdenum (used in steel), Indonesian smelters like ANTM and INCO face production paralysis.
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Impact:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Nickel Price Crash: Global nickel prices slumped to $15,400/ton (near 4-year lows) as Chinese buyers withhold orders.</li>
                      <li>Smelter Shutdowns: PT Virtue Dragon's $1.2B nickel plant halted operations, laying off 2,100 workers.</li>
                    </ul>
                  </div>
                </div>

                {/* Point 2: Price Wars */}
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    2. Price Manipulation and Market Capture
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Chinese firms exploit Indonesia's reliance on their refining technology to suppress prices and dominate supply chains:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>Oligopsony Tactics: Chinese buyers collude to purchase nickel ore at $28/ton (vs. global $42/ton), squeezing margins for ADRO and PTBA.</li>
                    <li>Tech Dependence: China controls 85% of Indonesia's high-pressure acid leaching (HPAL) technology, critical for EV battery production.</li>
                    <li>Example: PT Trimegah Bangun Persada (ANTM) reported Q4 2024 losses of $120M after China slashed nickel orders by 40%.</li>
                  </ul>
                </div>

                {/* Point 3: Policy Paralysis */}
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    3. Policy Paralysis Amid Crisis
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Jakarta's countermeasures remain fragmented:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>Export Ban Delays: A proposed 2025 ban on raw nickel exports (to boost domestic refining) stalled due to lobbying by Chinese-backed firms.</li>
                    <li>BI's Dilemma: With USDIDR at 16,450, BI's Feb 11 emergency meeting may hike rates 25bps to 6.00%, but this risks stifling growth.</li>
                  </ul>
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
              <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">Defensive Pivot</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Sector</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Catalyst</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Key Stocks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Healthcare</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Pandemic restocking demand</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">KLBF, SIDO</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Gold</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Safe-haven demand at $2,885/oz</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">MDKA, ANTM</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Telcos</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">5G rollout shields earnings</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">TLKM, EXCL</td>
                    </tr>
                  </tbody>
                </table>
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
                <TrendingDown className="h-4 w-4 text-orange-600" />
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
        <section className="prose dark:prose-invert max-w-none mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Bottom Line
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The IHSG's 6,600–6,700 zone is this week's litmus test. While BI's rate hike and Ramadan-driven consumption (UNVR, ICBP) may offer brief respite, systemic risks from trade wars and foreign outflows demand tactical caution. A breach below 6,742 opens a path to 6,400, but oversold conditions hint at dead-cat bounces to 6,900.
          </p>
        </section>

        {/* Related Analyses */}
        <section className="prose dark:prose-invert max-w-none mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Related Analyses
          </h2>
          <ul className="list-none space-y-3">
            <li>
              <a href="https://lucaxyzz-digest.replit.app/newsletter/us-china-trade-war-impact-ihsg" 
                 className="text-blue-600 hover:underline">
                US-China Trade War Impact
              </a>
            </li>
            <li>
              <a href="https://lucaxyzz-digest.replit.app/newsletter/indonesia-economic-inventory-crisis"
                 className="text-blue-600 hover:underline">
                Indonesia's Inventory-Driven GDP Crisis
              </a>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 mt-8">
          <div className="space-y-2">
            <p className="font-medium">Sources: IDX, Kontan, CNBC Indonesia, Previous Analysis</p>
            <p className="italic">Disclaimer: For general information only. Not financial advice. Consult your financial advisor before making investment decisions.</p>
            <p>© 2025 Market Analysis Report</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TradeWarTsunamiFeb1014;