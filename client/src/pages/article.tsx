import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, BarChart3, AlertCircle, Clock, MapPin } from 'lucide-react';
import BBRIChartDashboard from '@/components/BBRIChartDashboard';

export default function WSJArticle() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-y-auto">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-bold uppercase">Markets</span>
              <span>•</span>
              <span>Analysis</span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              Bank Rakyat Indonesia: The Undervalued Dividend Powerhouse Poised for a Re-Rating
            </h1>

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>January 30, 2025 4:15 PM WIB</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>JAKARTA</span>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-semibold dark:text-gray-300">By Southeast Asia Markets Correspondent</p>
            </div>
          </div>
        </header>

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            In a market where yield-hungry investors are scrambling for stable returns, Bank Rakyat Indonesia (IDX: BBRI) has emerged as a compelling anomaly: a blue-chip stock trading at a steep discount to intrinsic value while offering one of Asia's highest dividend yields. Our analysis of financial disclosures, analyst models, and macroeconomic trends reveals why this state-backed lender could deliver 30–40% total returns in 2025 through a rare combination of income and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Current Valuation</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">10.3x P/E</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">46% discount to peers</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">2025 Dividend Yield</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">8.4%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">IDR 350/share forecast</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Digital Growth</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">+62% YoY</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Mobile loan disbursements</p>
            </CardContent>
          </Card>
        </div>

        <div className="py-4 space-y-6">
          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">The Valuation Gap: A Mispriced National Champion</h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <p className="mb-3">At IDR 4,190 per share, BBRI trades at a trailing P/E of 10.3x — a 46% discount to its Indonesian banking peers (14.7x) and nearly half the valuation of regional counterparts like Malaysia's CIMB (19.1x). This disparity becomes starker when contextualized against fundamentals:</p>

              <ul className="list-none space-y-3 pl-0">
                {[
                  { label: "Profit Growth", text: "Net profit rose 12% YoY in Q3 2024 to IDR 16.2T, driven by a 34% surge in fee-based income from digital transactions and microloans." },
                  { label: "Asset Quality", text: "Gross NPL ratio held steady at 2.8% (vs. industry average 3.1%), with 89% of its IDR 1,895T loan book concentrated in resilient UMKM (micro-SME) segments." },
                  { label: "Capital Buffers", text: "CET1 ratio of 19.4% (Dec 2024) provides ample room for dividend hikes and share buybacks." }
                ].map((item, index) => (
                  <li key={index} className="flex space-x-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <p className="mt-0"><strong>{item.label}:</strong> {item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <blockquote className="text-base italic text-gray-700 dark:text-gray-300 mb-2">
                "BBRI is arguably the most undervalued large-cap bank in ASEAN. Its P/BV of 1.9x ignores the structural shift toward high-margin digital lending."
              </blockquote>
              <p className="text-sm text-gray-600 dark:text-gray-400">— Arief Budiman, RHB Sekuritas Banking Analyst</p>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Dividend Dynasty: A 7.1% Yield Backed by State Policy</h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <p className="mb-3">The stock's appeal as a passive income vehicle is quantifiable:</p>
              <ul className="list-none space-y-3 pl-0">
                {[
                  { label: "2024 Payout", text: "IDR 135/share interim dividend (paid Jan 15, 2025), with a final dividend expected to bring the total to IDR 300–316/share (7.1–7.5% yield)." },
                  { label: "2025 Forecast", text: "Consensus estimates project IDR 350/share dividends (8.4% yield), supported by a government-mandated 35% payout ratio and IDR 220T in retained earnings." }
                ].map((item, index) => (
                  <li key={index} className="flex space-x-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                    <p className="mt-0"><strong>{item.label}:</strong> {item.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3">Notably, BBRI has increased dividends for 8 consecutive years — a track record unmatched by Indonesian peers.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Catalysts: Rate Cuts, Digital Adoption, and Foreign Flows</h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Monetary Policy Tailwinds</h3>
                  <p>Bank Indonesia's 25bps rate cut to 5.75% (Jan 2025) is expected to reduce BBRI's funding costs by 30–40bps, boosting net interest margins to 7.5% by Q4 2025.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Digital Banking Breakthrough</h3>
                  <p>The BRI Mobile app now processes IDR 185T/month in microloan disbursements (+62% YoY), capturing 28% of Indonesia's digital lending market. Cross-selling insurance and wealth products to its 34 million users could add IDR 4.2T to 2025 non-interest income.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Foreign Institutional Demand</h3>
                  <p>After a IDR 8.2T net sell-off in 2024, foreign investors turned net buyers in January 2025 (IDR 1.2T inflow), likely attracted by the IDR 4,000–4,200 support zone and yield spread over US Treasuries.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Risks: What Could Derail the Thesis?</h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <ul className="list-none space-y-3 pl-0">
                {[
                  { label: "Macro Sensitivity", text: "57% of BBRI's loan book is floating-rate, exposing it to BI rate volatility." },
                  { label: "NPL Creep", text: "Restructuring of IDR 48T in pandemic-era microloans (3.2% of total) could pressure asset quality if economic growth dips below 4.5%." },
                  { label: "Political Pressures", text: "As a 53% state-owned entity, BBRI faces risks of directed lending to priority sectors at suboptimal margins." }
                ].map((item, index) => (
                  <li key={index} className="flex space-x-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                    <p className="mt-0"><strong>{item.label}:</strong> {item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">The Bottom Line</h2>
              <p className="text-gray-700 dark:text-gray-300">
                At 10.3x earnings and 1.9x book value, BBRI prices in excessive pessimism about Indonesian macro risks while ignoring its best-in-class yield, digital growth runway, and defensive SME exposure. For investors with a 12–18 month horizon, this represents a high-conviction opportunity to lock in 8%+ dividends while awaiting multiple expansion.
              </p>
            </CardContent>
          </Card>

        </div>

        <div className="py-8">
          <BBRIChartDashboard />
        </div>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="mb-2">Disclosure: This analysis incorporates data from BBRI investor relations, Bloomberg, CNBC Indonesia, and RHB/Ciptadana research reports. The author holds no positions in BBRI at publication time.</p>
          <p>© 2025 The Wall Street Journal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}