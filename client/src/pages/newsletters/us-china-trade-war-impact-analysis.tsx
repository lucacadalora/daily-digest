import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, AlertCircle, Shield, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link } from "wouter";
import { Header } from "@/components/Header";

const TradeWarAnalysis = () => {
  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Header */}
      <Header simplified showCategories={false} />

      {/* Header spacing */}
      <div className="h-36 sm:h-32"></div>

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletters" className="hover:text-blue-600">Market Analysis</Link>
          <ChevronRight className="h-4 w-4" />
          <span>US-China Trade War Impact</span>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">Weekly Special</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="font-bold uppercase">Market Strategy</span>
                <span>•</span>
                <span>February 3-7, 2025</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              US-China Retaliation: Escalation Could Trigger IHSG Sell-Offs Below 6,900
            </h1>

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>February 2, 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>JAKARTA</span>
              </div>
            </div>
          </div>
        </header>

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-4">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-amber-600 mr-2" />
              <span className="font-bold text-amber-800 dark:text-amber-200">Weekly Market Alert</span>
            </div>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              This special report outlines critical market scenarios and action plans for the week of February 3-7, 2025. 
              This special report outlines key market scenarios and potential impacts for the week ahead.
            </p>
          </div>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            President Trump's 25% tariffs on Canada/Mexico and 10% on China risk triggering a retaliatory spiral, 
            with Beijing likely to counter with targeted measures on US goods and allies. Indonesia's export-reliant 
            industries and foreign-owned equities stand in the crossfire, threatening to push the IHSG below critical 
            support levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          {/* Strategic Takeaway Card */}
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">IHSG Support Level</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">6,900-6,956</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">Critical psychological support zone</p>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Action Required:</span> Monitor support level closely. Consider reducing position sizes if breached.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rest of the cards and content... */}
          {/* Note: The rest of the content from the pasted file will go here */}
          
        </div>

        {/* Footer */}
        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 mt-8">
          <div className="flex items-center justify-between mb-2">
            <p>Sources: IDX, Kontan, CNBC Indonesia, Previous Analysis</p>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Weekly Special Edition</span>
              <span>•</span>
              <span>Vol. 5, No. 2</span>
            </div>
          </div>
          <p className="text-xs mb-2">Disclaimer: For general information only. Not financial advice. Consult your financial advisor before making investment decisions.</p>
          <p>© 2025 Market Analysis Report</p>
        </footer>
      </div>
    </div>
  );
};

export default TradeWarAnalysis;
