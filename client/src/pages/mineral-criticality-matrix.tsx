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
import MatrixChart from '@/components/ui/MatrixChart';

const MineralCriticalityMatrix = () => {
  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Website Title */}
        <div className="text-center py-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-serif font-bold">
            <span className="text-blue-600">Daily</span> | <span className="text-gray-900 dark:text-white">Digest</span>
          </h1>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4">
          <a href="/" className="hover:text-blue-600 cursor-pointer">Home</a>
          <ChevronRight className="h-4 w-4" />
          <a href="/newsletter" className="hover:text-blue-600 cursor-pointer">Newsletter</a>
          <ChevronRight className="h-4 w-4" />
          <span>Indonesia's Mineral Criticality Matrix</span>
        </nav>

        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="py-4">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              Indonesia's Mineral Criticality Matrix: Strategic and Supply Chain Perspectives
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>February 4, 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>JAKARTA</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              By Luca Cada Lora
            </div>
          </div>
        </header>

        {/* Introduction */}
        <section className="py-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            As the global economy evolves amidst shifting trade dynamics and rapid technological advancements, the critical role of minerals has never been more apparent. Indonesia, blessed with a rich and diverse resource base, is uniquely positioned—but also faces significant challenges. Supply chain vulnerabilities, geopolitical uncertainties, and escalating economic stakes call for a strategic rethinking of how these resources are managed.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
            This special report introduces Indonesia's Mineral Criticality Matrix—a comprehensive framework designed to assess and balance the economic and strategic importance of minerals against their supply chain risks. By examining factors such as production capacity, domestic processing, and global market dynamics, this analysis aims to provide policymakers, industry leaders, and stakeholders with actionable insights to drive sustainable growth and secure national interests.
          </p>
        </section>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-gray-200 dark:border-gray-800">
          {/* Card 1: GDP Contribution */}
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">GDP Contribution</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8.3%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">of National GDP</p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Export Share */}
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <AlertCircle className="h-6 w-6 text-orange-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Export Share</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">15%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">of Total Exports</p>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Domestic Processing Efficiency */}
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-1">
                <Shield className="h-6 w-6 text-blue-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Domestic Processing</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">60%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Processed Locally</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Matrix Visualization */}
        <section className="py-4 border-b border-gray-200 dark:border-gray-800">
          <MatrixChart />
        </section>

        {/* Article Content */}
        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          {/* 1. Overview */}
          <section className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              1. Overview of the Mineral Criticality Matrix
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Mineral Criticality Matrix provides a framework to evaluate minerals based on two axes:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">X-Axis: Economic &amp; Strategic Importance</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Contribution to GDP and export revenues.</li>
                  <li>Role in key industries (e.g., high-tech, renewable energy, defense).</li>
                  <li>Future growth potential in emerging markets.</li>
                  <li>Strategic significance in global supply chains.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Y-Axis: Supply Chain Risk</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Production capacity versus global demand.</li>
                  <li>Reserve sufficiency and longevity.</li>
                  <li>Level of domestic downstreaming (value-added processing).</li>
                  <li>Vulnerability to market volatility and regulatory changes.</li>
                  <li>Dependence on imported technology or raw materials.</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 space-y-6">
                <h3 className="font-bold text-gray-900 dark:text-white">Quadrant Analysis</h3>

                {/* Grid of quadrant cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Upper Left Quadrant */}
                  <Card className="bg-orange-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <AlertCircle className="h-6 w-6 text-orange-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            Upper Left – High Criticality
                          </h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <p><strong>Risk Profile:</strong> High supply chain vulnerability with moderate economic impact</p>
                            <p><strong>Key Focus:</strong> Risk mitigation and strategic reserves</p>
                            <p><strong>Action Items:</strong></p>
                            <ul className="list-disc ml-4 space-y-1">
                              <li>Develop strategic stockpiles</li>
                              <li>Invest in processing technology</li>
                              <li>Monitor specialized sector impacts</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upper Right Quadrant */}
                  <Card className="bg-red-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <TrendingUp className="h-6 w-6 text-red-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            Upper Right – Very High Criticality
                          </h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <p><strong>Risk Profile:</strong> High risk combined with major economic importance</p>
                            <p><strong>Key Focus:</strong> Immediate strategic intervention</p>
                            <p><strong>Action Items:</strong></p>
                            <ul className="list-disc ml-4 space-y-1">
                              <li>Prioritize downstream processing</li>
                              <li>Diversify supply sources</li>
                              <li>Boost R&D investment</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lower Left Quadrant */}
                  <Card className="bg-green-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Shield className="h-6 w-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            Lower Left – Moderate Criticality
                          </h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <p><strong>Risk Profile:</strong> Stable supply with lower economic impact</p>
                            <p><strong>Key Focus:</strong> Maintenance and monitoring</p>
                            <p><strong>Action Items:</strong></p>
                            <ul className="list-disc ml-4 space-y-1">
                              <li>Regular market assessment</li>
                              <li>Efficiency improvements</li>
                              <li>Future potential evaluation</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lower Right Quadrant */}
                  <Card className="bg-blue-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <TrendingUp className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            Lower Right – High Criticality
                          </h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <p><strong>Risk Profile:</strong> Stable supply with high economic value</p>
                            <p><strong>Key Focus:</strong> Value optimization</p>
                            <p><strong>Action Items:</strong></p>
                            <ul className="list-disc ml-4 space-y-1">
                              <li>Enhance processing efficiency</li>
                              <li>Secure long-term agreements</li>
                              <li>Expand value-added production</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
          </section>

          {/* 2. Integrating the Four Mineral Categories */}
          <section className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              2. Integrating the Four Mineral Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exploration Potential */}
              <Card className="bg-blue-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🔍</div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Exploration Potential</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600">⚡</span>
                          <span className="font-medium">Rare Earth Elements</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Early-stage discoveries with potential strategic value in emerging technologies and renewable energy sectors.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Mineral Projects */}
              <Card className="bg-green-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">⚒️</div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Advanced Mineral Projects</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">🏗️</span>
                          <span className="font-medium">Bauxite</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Projects moving beyond exploration with significant development potential.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Produced and/or Processed */}
              <Card className="bg-orange-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Produced and/or Processed</h3>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full">
                            <span className="text-sm">⛏️</span>
                            <span className="text-sm font-medium">Nickel</span>
                          </span>
                          <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full">
                            <span className="text-sm">🔧</span>
                            <span className="text-sm font-medium">Tin</span>
                          </span>
                          <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full">
                            <span className="text-sm">⚙️</span>
                            <span className="text-sm font-medium">Iron Ore</span>
                          </span>
                          <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full">
                            <span className="text-sm">💎</span>
                            <span className="text-sm font-medium">Gold</span>
                          </span>
                          <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full">
                            <span className="text-sm">⚫</span>
                            <span className="text-sm font-medium">Coal</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Well-established minerals with active production and processing capabilities.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Processed Only */}
              <Card className="bg-purple-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🏭</div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Processed Only</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-600">🔮</span>
                          <span className="font-medium">Copper</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Minerals processed domestically from imported raw materials.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 3. Case Examples */}
          <section className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              3. Case Examples of Mineral Positions in Indonesia
            </h2>
            <div className="space-y-6">
              {/* Nickel */}
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Nickel</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Context:</strong> Indonesia is one of the world's largest nickel producers with strong demand from battery and electric vehicle industries.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Production &amp; Downstreaming:</strong> While production volumes are robust, limited domestic processing can elevate supply chain risks.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Matrix Position:</strong> Likely placed in the Upper Right Quadrant (Very High Criticality).
                  </p>
                </CardContent>
              </Card>

              {/* Tin */}
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Tin</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Context:</strong> Tin has a long history in Indonesia with well-established mining practices.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Production &amp; Reserves:</strong> Stable production and sufficient reserves generally ensure a secure supply chain.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Matrix Position:</strong> Typically in the Lower Right Quadrant (High Criticality), with potential for upward shift if global demand volatility increases.
                  </p>
                </CardContent>
              </Card>

              {/* Bauxite */}
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Bauxite</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Context:</strong> Indonesia holds sizable bauxite reserves critical for aluminum production.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Downstreaming:</strong> Inadequate domestic aluminum smelting capacity can elevate supply chain risk.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Matrix Position:</strong> Possibly positioned between the Upper Left and Lower Right Quadrants, depending on improvements in processing capacity.
                  </p>
                </CardContent>
              </Card>

              {/* Coal */}
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Coal</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Context:</strong> Coal is a significant export commodity with established mining and processing infrastructure.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Market Dynamics:</strong> While domestic supply chain risks are low, global decarbonization trends could impact its strategic importance.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Matrix Position:</strong> Currently in the Lower Right Quadrant, though long-term strategic shifts might prompt reassessment.
                  </p>
                </CardContent>
              </Card>

              {/* Gold */}
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Gold</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Context:</strong> Gold is a high-value mineral with robust local processing and established markets.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Matrix Position:</strong> Likely in the Lower Right Quadrant, as mature supply chains and strategic reserve status reduce its risk.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 4. Quantitative Scoring and Data Integration */}
          <section className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              4. Quantitative Scoring and Data Integration
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To quantify the analysis, the following indices are used:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong>Supply Chain Risk Index (1–10 scale):</strong> Derived from factors such as the reserve-to-production ratio, domestic processing capacity, and reliance on imports. For example, Nickel might score 8–9 while Coal could score 3–4.
              </li>
              <li>
                <strong>Economic &amp; Strategic Importance Index (1–10 scale):</strong> Based on export revenue share, GDP contribution, and critical industrial applications. Minerals like Nickel and Gold may score 8–10, whereas those with niche applications may score 4–6.
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Each mineral is then plotted as a coordinate (x, y) on a dynamic dashboard or scatter plot to help policymakers identify "hotspots" where intervention or investment is most needed.
            </p>
          </section>

          {/* 5. Policy and Strategic Implications */}
          <section className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              5. Policy and Strategic Implications
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  For Minerals in the Upper Right ("Very High Criticality"):
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Prioritize investments in domestic processing and downstreaming.</li>
                  <li>Enhance R&amp;D for technology substitution and process improvement.</li>
                  <li>Develop strategic stockpiling and diversify supply sources to buffer against global market volatility.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  For Minerals in the Upper Left and Lower Right ("High Criticality"):
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Even if one axis is favorable, ensure contingency planning in the vulnerable dimension.</li>
                  <li>Monitor global market trends and adjust domestic policies to maintain competitive processing capacities.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  For Minerals in the Lower Left ("Moderate Criticality"):
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Maintain routine monitoring.</li>
                  <li>Invest in exploratory projects and pilot studies to safeguard future potential.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Conclusion */}
          <section className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              6. Conclusion
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Indonesia's mineral criticality matrix—mapping supply chain risk against economic and strategic importance—provides a robust framework for:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>Risk Management: Identifying minerals that could become supply chain chokepoints.</li>
              <li>Investment Prioritization: Directing capital toward increasing domestic processing and reserve development.</li>
              <li>Strategic Planning: Informing policy to safeguard critical minerals, ensuring long-term economic stability and national security.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              This quantitative approach, which integrates indices derived from production, capacity, reserves, and downstreaming data, allows for dynamic re-assessment as market conditions evolve.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              <strong>Note:</strong> The precise placement of each mineral in the matrix depends on current datasets and may be updated periodically.
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 pb-6">
          <div className="flex items-center justify-between mb-2">
            <p>Sources: Industry Reports, Government Data, Academic Research</p>
          </div>
          <p>© 2025 Mineral Analysis Report</p>
        </footer>
      </div>
    </div>
  );
};

export default MineralCriticalityMatrix;