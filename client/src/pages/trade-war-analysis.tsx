import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, AlertCircle, Shield, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link } from "wouter";
import { Header } from "@/components/Header";

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  mainValue: string;
  subtitle: string;
  iconColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, mainValue, subtitle, iconColor }) => {
  return (
    <Card className="bg-gray-50 dark:bg-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{mainValue}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export default function TradeWarAnalysis() {
  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <Header simplified showCategories={false} />
      <div className="h-36 sm:h-32"></div>

      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletter" className="hover:text-blue-600">Newsletter</Link>
          <ChevronRight className="h-4 w-4" />
          <span>US-China Trade War Impact</span>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-bold uppercase">Market Strategy</span>
              <span>•</span>
              <span>Analysis</span>
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

            <div className="text-sm">
              <p className="font-semibold dark:text-gray-300">By Luca Cada Lora</p>
            </div>
          </div>
        </header>

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            President Trump's 25% tariffs on Canada/Mexico and 10% on China risk triggering a retaliatory spiral, 
            with Beijing likely to counter with targeted measures on US goods and allies. Indonesia's export-reliant 
            industries and foreign-owned equities stand in the crossfire, threatening to push the IHSG below critical 
            support levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <MetricCard
            icon={TrendingDown}
            title="IHSG Support Level"
            mainValue="6,900-6,956"
            subtitle="Critical psychological support"
            iconColor="text-blue-600"
          />
          <MetricCard
            icon={AlertCircle}
            title="Most Impacted Sectors"
            mainValue="Cyclicals & Basic Ind"
            subtitle="Direct trade war exposure"
            iconColor="text-orange-600"
          />
          <MetricCard
            icon={Shield}
            title="Defensive Opportunities"
            mainValue="Non-Cyclicals & Finance"
            subtitle="Domestic demand shield"
            iconColor="text-green-600"
          />
        </div>

        <div className="py-4 space-y-6">
          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              China's Retaliatory Playbook
            </h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <ul className="list-none space-y-3 pl-0">
                <li className="flex space-x-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p className="mt-0">
                    <strong>Tech Restrictions:</strong> Beijing may limit rare earth exports critical for US tech 
                    manufacturing, disrupting Indonesia's $2.11B nickel export pipeline to China.
                  </p>
                </li>
                <li className="flex space-x-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p className="mt-0">
                    <strong>Agricultural Tariffs:</strong> Soybean or palm oil levies could pressure Indonesia's 
                    CPO exports (25% global market share), already weakened by EU deforestation rules.
                  </p>
                </li>
                <li className="flex space-x-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p className="mt-0">
                    <strong>Currency Devaluation:</strong> A weaker yuan (CNY) risks competitive devaluations 
                    across ASEAN, pressuring USDIDR toward 16,300–16,500.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Supply Chain Spillovers</h2>
              <ul className="list-none space-y-3 pl-0">
                <li className="flex space-x-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Electronics & Auto:</strong> US-China factory relocations may sideline Indonesian 
                    suppliers like <strong>ASII</strong> and <strong>UNTR</strong>.
                  </p>
                </li>
                <li className="flex space-x-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Commodity Demand:</strong> China's slowdown could reduce coal imports from 
                    <strong>ADRO</strong> and <strong>PTBA</strong>.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              Sectoral Vulnerabilities
            </h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Commodity Exporters</h3>
                  <ul className="list-none space-y-3 pl-0">
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                      <p className="mt-0"><strong>ADRO, PTBA:</strong> Coal prices face dual pressure from China's demand slump and US tariffs.</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                      <p className="mt-0"><strong>AALI, LSIP:</strong> Palm oil exporters risk margin compression if China imposes retaliatory levies.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              Investor Action Plan
            </h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Defensive Positioning</h3>
                  <ul className="list-none space-y-3 pl-0">
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="mt-0">Shift to <strong>KLBF</strong> (healthcare) and <strong>TLKM</strong> (telecom) for stability.</p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="mt-0">Hedge USDIDR exposure via BI's SRBI bonds (6.25% yield).</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">The Bottom Line</h2>
              <p className="text-gray-700 dark:text-gray-300">
                A US-China trade war remains the <strong>#1 systemic risk</strong> for the IHSG this week. 
                Investors must brace for volatility, with 6,900 acting as a critical line in the sand. 
                Regulatory agility (BI's $140B forex reserves) and domestic demand resilience could mitigate 
                losses, but proactive risk management is non-negotiable.
              </p>
            </CardContent>
          </Card>
        </div>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="mb-2">Sources: IDX, Kontan, CNBC Indonesia, Previous Analysis</p>
          <p>© 2025 Market Analysis Report</p>
        </footer>
      </div>
    </div>
  );
}