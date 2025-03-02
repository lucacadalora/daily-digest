import React from 'react';
import {
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
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
              IHSG at Critical Juncture: Inflation Relief Creates Bullish Momentum
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
        <div className="bg-[#F0FDF4] border-l-4 border-green-500 p-4 rounded-r mb-8 mt-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-800" />
            <p className="font-medium text-green-800 mb-0">Weekly Market Alert</p>
          </div>
          <p className="text-gray-700 mt-2">
            This special report outlines critical market scenarios and action plans for the week of March 3-7, 2025.
            With inflation easing and foreign inflows resuming, IHSG shows signs of reversing its bearish trend.
          </p>
        </div>

        {/* Metric Cards - Updated with detailed information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-gray-200 dark:border-gray-800">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">IHSG Range</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">6,950–7,150</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cautiously Bullish</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">USDIDR Stabilizing</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">16,150</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Strengthening Trend</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <ArrowUpCircle className="h-6 w-6 text-green-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Consumer Play</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">Buy UNVR</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pre-Ramadan Boost</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Opening Narrative Section */}
        <section className="prose dark:prose-invert max-w-none mb-8 mt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Inflation Pivot Boosts Market Confidence
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Indonesia's February inflation came in at a surprisingly low 2.8% YoY (vs. 3.1% consensus), marking the second consecutive month of moderation. This cooling inflation, combined with Bank Indonesia's decision to hold rates steady at 6.00% last month, has created a more favorable backdrop for equities. Foreign investors have registered net inflows of $215M in the last week – the strongest weekly inflow since November 2024 – signaling renewed confidence in Indonesia's macroeconomic stability.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Key Market Drivers: US-China Tensions Easing
              </h2>
              <div className="space-y-6">
                {/* Point 1: Global Factors */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    Trade War De-escalation Lifts Regional Markets
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    The first round of negotiations between US and Chinese trade representatives yielded progress on reducing tariffs on agricultural goods and critical minerals. Markets are pricing in a 65% probability of a comprehensive trade deal by Q2 2025, significantly reducing the risk premium on emerging market equities. The Shanghai Composite gained 4.2% last week, while the Nikkei rose 2.1%. This positive momentum has created favorable spillover effects for ASEAN markets, with the IHSG up 3.1% last week.
                  </p>
                </div>

                {/* Point 2: Domestic Tailwinds */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    Pre-Ramadan Consumer Cycle Begins
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    With Ramadan beginning on March 11, Indonesia's seasonal consumer spending surge is underway. Historical patterns show the consumer sector outperforming the broader market by 8-12% during the 4-6 weeks preceding Ramadan. Bank Indonesia's retail sales survey indicates a 6.2% YoY increase in February 2025, with food & beverage and clothing segments showing the strongest growth. Consumer staples (UNVR, ICBP) and retail stocks (ACES, LPPF) are already showing momentum, with average gains of 5.3% in the past two weeks.
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
            Our bearish outlook from February has been partially invalidated by recent positive developments.
            For new readers, our previous report warned of Chinese import flooding and IHSG weakness.
            Here's what has changed:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Partial Invalidation:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>IHSG Recovery:</strong> Index climbed to 6,903.75 (+2.2% WoW), reclaiming the 6,900 level
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>BI Stance:</strong> Rate hold at 6.00% supported by improving inflation data
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Currency Relief:</strong> USDIDR strengthened to 16,150 from 16,450
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Still Valid Concerns:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Import Threats:</strong> Chinese imports still 27% above pre-tariff levels, damaging SME profitability
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Sector Pressures:</strong> Textile, furniture, and electronics manufacturers remain under pressure
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
                Last Close: 6,903.75 (+2.2% weekly), reclaimed critical 6,900 level.
              </p>
              <div className="ml-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Key Levels:</strong>
                </p>
                <ul className="list-disc list-inside">
                  <li>Support: 6,850–6,900 (previously resistance, now support)</li>
                  <li>Resistance: 7,050–7,150 (mid-January peaks)</li>
                </ul>
              </div>
            </div>

            {/* Key Indicators */}
            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white">Key Indicators</h3>
              <div className="ml-4 space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Trend:</strong> Shifting to bullish (6,900 reclaimed, 50-day MA turning upward)
                </p>
                <div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Momentum:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    <li>RSI: 57.3 (neutral with bullish bias)</li>
                    <li>MACD: Positive crossover signaling momentum shift</li>
                  </ul>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Volume:</strong> Rising buy volumes (Rp 13.2T/day), confirming bullish momentum
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
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">40%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">7,100–7,250</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">US-China tariff reduction + pre-Ramadan rally</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Base</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">45%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">6,950–7,100</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Stable inflation + cautious foreign inflows</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Bear</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">15%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">6,700–6,850</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Renewed US rate hike fears + trade negotiations breakdown</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>


            {/* Sectoral Outlook Table */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Sectoral Outlook</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Sector</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Outlook</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Key Stocks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Consumer</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Strongly Bullish ⭐⭐⭐</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">UNVR (+5.7% WoW), ICBP (+4.2%), HMSP (+3.1%)</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Banking</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Bullish ⭐⭐</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">BBCA (+3.4%), BBRI (+2.8%), BMRI (+2.5%)</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Property</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Bullish ⭐⭐</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">BSDE (+7.3%), CTRA (+6.1%), PWON (+5.8%)</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Commodities</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Neutral ⭐</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">MDKA (+1.2%), ANTM (+0.7%), ADRO (-0.8%)</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Manufacturing</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Bearish ⭐</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">ASII (+0.4%), SRIL (-2.1%), INTP (-1.5%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Consumer Sector Focus */}
            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
                Ramadan Opportunity: UNVR and ICBP Lead Consumer Rally
              </h2>
              <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">UNVR</h3>
                  <ul className="list-none space-y-2">
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Buy Trigger:</strong> Recent earnings beat expectations with 12% YoY revenue growth and improving margins.</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Action:</strong> Accumulate below Rp5,200 with Rp5,800 target before Ramadan peak season.</p>
                    </li>
                  </ul>

                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">ICBP</h3>
                  <ul className="list-none space-y-2">
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Growth Catalyst:</strong> Non-instant noodle segments (dairy, snacks) showing 15%+ growth.</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                      <p className="mt-0"><strong>Action:</strong> Price target Rp13,500 (13% upside) with support at Rp11,800.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
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
                March 5: BI Special Report on Imports
              </h3>
              <div className="ml-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Expectation:</strong> Assessment of Chinese import trends and potential safeguard measures.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Market Impact:</strong> Positive for SRIL, PBRX if stricter import controls announced.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-green-600" />
                March 6-7: US Jobs Data
              </h3>
              <div className="ml-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Expectation:</strong> 175K new jobs (cooling from 209K in February).
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Market Impact:</strong> Weaker jobs report could reinforce Fed rate cut expectations, boosting EM flows.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-orange-600" />
                March 7: Indonesia Foreign Reserves
              </h3>
              <div className="ml-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Expectation:</strong> Increase to $139B (from $137.2B) due to energy export revenues.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Market Impact:</strong> Positive for rupiah and banking sector (BBRI, BMRI, BBNI).
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
            The IHSG's breakthrough above 6,900 marks a potential trend reversal from the February slump. While concerns remain about Chinese imports and global trade tensions, easing inflation, pre-Ramadan consumption, and improving foreign investor sentiment create a more favorable backdrop. The consumer sector offers the best risk-reward profile, with UNVR and ICBP as standout plays. The 7,000-7,100 range serves as the next crucial resistance zone - breaking above would confirm the bullish shift.
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
            <p className="font-medium">Sources: IDX, Bank Indonesia, Bloomberg, Internal Research</p>
            <p className="italic">Disclaimer: For general information only. Not financial advice. Consult your financial advisor before making investment decisions.</p>
            <p>© 2025 Market Analysis Report</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default IHSGOutlookMarch37;