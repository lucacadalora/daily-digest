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

            <h3 className="text-xl font-bold mt-8 mb-4">Contributors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h4 className="font-semibold text-lg mb-2">DeepSeek R1</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced reasoning and pattern recognition for complex market analysis
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h4 className="font-semibold text-lg mb-2">gpt-o3-mini</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time data processing and market trend identification
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}