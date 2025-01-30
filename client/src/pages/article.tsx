import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, BarChart3, AlertCircle, Clock, MapPin } from 'lucide-react';

export default function WSJArticle() {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      <header className="border-b border-gray-200 pb-6">
        <div className="px-6 pt-6">
          <div className="flex items-center space-x-2 text-xs text-gray-600 mb-4">
            <span className="font-bold uppercase">Markets</span>
            <span>•</span>
            <span>Analysis</span>
          </div>
          
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bank Rakyat Indonesia: The Undervalued Dividend Powerhouse Poised for a Re-Rating
          </h1>
          
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0 text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>January 30, 2025 4:15 PM WIB</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>JAKARTA</span>
            </div>
          </div>

          <div className="text-sm">
            <p className="font-semibold">By Southeast Asia Markets Correspondent</p>
          </div>
        </div>
      </header>

      <div className="px-6 py-8 border-b border-gray-200">
        <p className="text-xl text-gray-700 leading-relaxed">
          In a market where yield-hungry investors are scrambling for stable returns, Bank Rakyat Indonesia (IDX: BBRI) has emerged as a compelling anomaly: a blue-chip stock trading at a steep discount to intrinsic value while offering one of Asia's highest dividend yields. Our analysis of financial disclosures, analyst models, and macroeconomic trends reveals why this state-backed lender could deliver 30–40% total returns in 2025 through a rare combination of income and growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-3">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">Current Valuation</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">10.3x P/E</p>
            <p className="text-sm text-gray-600">46% discount to peers</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h3 className="font-bold text-gray-900">2025 Dividend Yield</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">8.4%</p>
            <p className="text-sm text-gray-600">IDR 350/share forecast</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-3">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <h3 className="font-bold text-gray-900">Digital Growth</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">+62% YoY</p>
            <p className="text-sm text-gray-600">Mobile loan disbursements</p>
          </CardContent>
        </Card>
      </div>

      <div className="px-6 py-8 space-y-8">
        <section>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">The Valuation Gap: A Mispriced National Champion</h2>
          <div className="prose text-gray-700">
            <p className="mb-4">At IDR 4,190 per share, BBRI trades at a trailing P/E of 10.3x — a 46% discount to its Indonesian banking peers (14.7x) and nearly half the valuation of regional counterparts like Malaysia's CIMB (19.1x). This disparity becomes starker when contextualized against fundamentals:</p>
            
            <ul className="list-none space-y-4 pl-0">
              <li className="flex space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p><strong>Profit Growth:</strong> Net profit rose 12% YoY in Q3 2024 to IDR 16.2T, driven by a 34% surge in fee-based income from digital transactions and microloans.</p>
              </li>
              <li className="flex space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p><strong>Asset Quality:</strong> Gross NPL ratio held steady at 2.8% (vs. industry average 3.1%), with 89% of its IDR 1,895T loan book concentrated in resilient UMKM (micro-SME) segments.</p>
              </li>
              <li className="flex space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p><strong>Capital Buffers:</strong> CET1 ratio of 19.4% (Dec 2024) provides ample room for dividend hikes and share buybacks.</p>
              </li>
            </ul>
          </div>
        </section>

        <Card className="bg-gray-50 my-8">
          <CardContent className="p-6">
            <blockquote className="text-lg italic text-gray-700 mb-4">
              "BBRI is arguably the most undervalated large-cap bank in ASEAN. Its P/BV of 1.9x ignores the structural shift toward high-margin digital lending."
            </blockquote>
            <p className="text-sm text-gray-600">— Arief Budiman, RHB Sekuritas Banking Analyst</p>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Dividend Dynasty: A 7.1% Yield Backed by State Policy</h2>
          <div className="prose text-gray-700">
            <p className="mb-4">The stock's appeal as a passive income vehicle is quantifiable:</p>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                <p><strong>2024 Payout:</strong> IDR 135/share interim dividend (paid Jan 15, 2025), with a final dividend expected to bring the total to IDR 300–316/share (7.1–7.5% yield).</p>
              </li>
              <li className="flex space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                <p><strong>2025 Forecast:</strong> Consensus estimates project IDR 350/share dividends (8.4% yield), supported by a government-mandated 35% payout ratio and IDR 220T in retained earnings.</p>
              </li>
            </ul>
            <p className="mt-4">Notably, BBRI has increased dividends for 8 consecutive years — a track record unmatched by Indonesian peers.</p>
          </div>
        </section>

        <Card className="bg-gray-50 my-8">
          <CardContent className="p-6">
            <blockquote className="text-lg italic text-gray-700 mb-4">
              "This isn't just a high-yielder; it's a dividend compound. At current prices, reinvested dividends could deliver 12% annualized returns over five years."
            </blockquote>
            <p className="text-sm text-gray-600">— Maria Tanumihardja, Ciptadana Strategist</p>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Catalysts: Rate Cuts, Digital Adoption, and Foreign Flows</h2>
          <div className="prose text-gray-700">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Monetary Policy Tailwinds</h3>
                <p>Bank Indonesia's 25bps rate cut to 5.75% (Jan 2025) is expected to reduce BBRI's funding costs by 30–40bps, boosting net interest margins to 7.5% by Q4 2025.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Digital Banking Breakthrough</h3>
                <p>The BRI Mobile app now processes IDR 185T/month in microloan disbursements (+62% YoY), capturing 28% of Indonesia's digital lending market. Cross-selling insurance and wealth products to its 34 million users could add IDR 4.2T to 2025 non-interest income.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Foreign Institutional Demand</h3>
                <p>After a IDR 8.2T net sell-off in 2024, foreign investors turned net buyers in January 2025 (IDR 1.2T inflow), likely attracted by the IDR 4,000–4,200 support zone and yield spread over US Treasuries.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Risks: What Could Derail the Thesis?</h2>
          <div className="prose text-gray-700">
            <ul className="list-none space-y-4 pl-0">
              <li className="flex space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                <p><strong>Macro Sensitivity:</strong> 57% of BBRI's loan book is floating-rate, exposing it to BI rate volatility.</p>
              </li>
              <li className="flex space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                <p><strong>NPL Creep:</strong> Restructuring of IDR 48T in pandemic-era microloans (3.2% of total) could pressure asset quality if economic growth dips below 4.5%.</p>
              </li>
              <li className="flex space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                <p><strong>Political Pressures:</strong> As a 53% state-owned entity, BBRI faces risks of directed lending to priority sectors at suboptimal margins.</p>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Technical Outlook: Breaking Out of a 12-Month Range</h2>
          <div className="prose text-gray-700">
            <ul className="list-none space-y-4 pl-0">
              <li className="flex space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p><strong>Support/Resistance:</strong> Strong base at IDR 3,800 (Jan 2025 low) vs. immediate resistance at IDR 4,500 (Nov 2024 high). A close above IDR 4,600 would confirm a bullish cup-and-handle pattern targeting IDR 5,750.</p>
              </li>
              <li className="flex space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p><strong>Volume Signal:</strong> January's rally to IDR 4,350 occurred on 30% above-average volume, indicating institutional participation.</p>
              </li>
            </ul>
          </div>
        </section>

        <Card className="bg-blue-50 my-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">The Bottom Line</h2>
            <p className="text-gray-700 mb-4">
              At 10.3x earnings and 1.9x book value, BBRI prices in excessive pessimism about Indonesian macro risks while ignoring its best-in-class yield, digital growth runway, and defensive SME exposure. For investors with a 12–18 month horizon, this represents a high-conviction opportunity to lock in 8%+ dividends while awaiting multiple expansion.
            </p>
          </CardContent>
        </Card>

        <footer className="text-sm text-gray-500 border-t border-gray-200 pt-8">
          <p className="mb-2">Disclosure: This analysis incorporates data from BBRI investor relations, Bloomberg, CNBC Indonesia, and RHB/Ciptadana research reports. The author holds no positions in BBRI at publication time.</p>
          <p>© 2025 The Wall Street Journal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
