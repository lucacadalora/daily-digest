import React from 'react';
import { TrendingDown, AlertCircle, Shield, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Article } from "@/types/newsletter";

interface TradeWarContentProps {
  article: Article;
}

const MetricCard = ({ icon: Icon, title, mainValue, subtitle, iconColor }: {
  icon: any;
  title: string;
  mainValue: string;
  subtitle: string;
  iconColor: string;
}) => {
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

export function TradeWarContent({ article }: TradeWarContentProps) {
  return (
    <div className="py-8">
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
        {article.title}
      </h1>

      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{article.date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4" />
          <span>JAKARTA</span>
        </div>
      </div>

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
        <MetricCard
          icon={TrendingDown}
          title="IHSG Support Level"
          mainValue="6,900-6,956"
          subtitle="Critical psychological support zone"
          iconColor="text-blue-600"
        />

        {/* Most Impacted Sectors Card */}
        <MetricCard
          icon={AlertCircle}
          title="Most Impacted Sectors"
          mainValue="Cyclicals & Basic Ind"
          subtitle="Direct trade war exposure"
          iconColor="text-orange-600"
        />

        {/* Defensive Opportunities Card */}
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
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">IHSG Implications</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-900 dark:text-white">Scenario</th>
                  <th className="p-4 text-left font-bold text-gray-900 dark:text-white">Mechanism</th>
                  <th className="p-4 text-left font-bold text-gray-900 dark:text-white">IHSG Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Limited Retaliation</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">China imposes symbolic tariffs (e.g., luxury goods)</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">Range-bound (7,000–7,215)</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Moderate Escalation</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">Rare earth/tech restrictions + yuan devaluation</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">Test 6,956 support</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Full Trade War</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">Broad tariffs, supply chain decoupling</td>
                  <td className="p-4 font-bold text-gray-900 dark:text-white">6,721–6,900 (15% YTD drop)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">China's Retaliatory Playbook</h2>
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

        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Investor Action Plan</h2>
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
      </div>

      <Card className="bg-blue-50 dark:bg-blue-900/20 mt-6">
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

      <div className="mt-8">
        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-2">
            <p>Sources: IDX, Kontan, CNBC Indonesia, Previous Analysis</p>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Weekly Special Edition</span>
              <span>•</span>
              <span>Vol. 5, No. 2</span>
            </div>
          </div>
          <p className="text-xs mb-2">
            Disclaimer: For general information only. Not financial advice. 
            Consult your financial advisor before making investment decisions.
          </p>
          <p>© 2025 Market Analysis Report</p>
        </footer>
      </div>
    </div>
  );
}