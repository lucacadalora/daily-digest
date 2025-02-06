import React from 'react';
import { Header } from "@/components/Header";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <Header simplified showCategories={false} />
      
      {/* Header spacing */}
      <div className="h-36 sm:h-32"></div>

      <main className="max-w-[800px] mx-auto px-4 py-8">
        <div className="prose dark:prose-invert prose-lg max-w-none">
          <h1 className="font-serif text-4xl font-bold text-center mb-4">Daily | Digest</h1>
          <h2 className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
            AI-Powered Market Intelligence for the Modern Investor
          </h2>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              AI is revolutionizing financial analysis, but the gap between raw machine intelligence and 
              actionable market insights remains vast. At Daily | Digest, we're bridging this divide by 
              combining cutting-edge AI with deep market expertise to deliver analysis that rivals top 
              Wall Street professionals.
            </p>

            <p className="text-lg leading-relaxed">
              Born from the conviction that high-quality market intelligence should be accessible to all, 
              we've developed a platform that harnesses the power of advanced language models and 
              real-time data processing to produce comprehensive, nuanced market analysis that was 
              previously available only to institutional investors.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">Our Mission</h3>
            <p className="text-lg leading-relaxed">
              We challenge the boundaries of AI-driven financial analysis by producing research and insights 
              that match or exceed the quality of top Wall Street analysts. Through sophisticated prompt 
              engineering and multi-model reasoning, we generate deep, contextual market intelligence that 
              integrates global trends with local market dynamics.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">What Sets Us Apart</h3>
            <ul className="list-none space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2.5 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="text-lg leading-relaxed">
                  <strong>Advanced AI Integration:</strong> Utilizing state-of-the-art language models including 
                  Llama-3.1-sonar-reasoning-pro for sophisticated market analysis and pattern recognition.
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2.5 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="text-lg leading-relaxed">
                  <strong>Local Market Focus:</strong> Deep integration with Indonesian financial data sources 
                  including Investor Trust, Kompas, and Stockbit for comprehensive regional coverage.
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2.5 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="text-lg leading-relaxed">
                  <strong>Enhanced Citation System:</strong> Rigorous fact-checking and inline citations 
                  ensure transparency and reliability in our analysis.
                </p>
              </li>
            </ul>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-lg font-medium text-center italic">
                "Our vision is to democratize access to institutional-grade market intelligence through 
                the thoughtful application of artificial intelligence, making sophisticated financial 
                analysis accessible to everyone."
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
