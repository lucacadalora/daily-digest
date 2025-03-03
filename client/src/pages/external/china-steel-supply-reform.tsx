import React from 'react';
import { Header } from "@/components/Header";
import { SubscribeModal } from "@/components/SubscribeModal";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import MetaTags from '@/components/SEO/MetaTags';
import type { ArticleMetadata } from '@/lib/meta-tags';

export default function ChinaSteel() {
  const [isSubscribeOpen, setIsSubscribeOpen] = React.useState(false);

  // Define article metadata for MetaTags component
  const articleMetadata: ArticleMetadata = {
    title: "China's Steel Sector: 'Supply Reform 2.0' Looms | Daily Digest",
    description: "China's steel sector faces a new round of supply-side structural reforms as the government aims to reduce carbon emissions and tackle overcapacity.",
    url: "https://lucaxyzz-digest.replit.app/external/china-steel-supply-reform",
    image: "/api/image?path=/latest/china-steel.png",
    author: "Daily Digest Staff",
    publishedTime: "2025-03-02T18:00:00Z",
    section: "Markets",
    tags: ["China", "Steel", "Supply Reform", "Manufacturing", "Commodities"],
    siteName: "Daily Digest",
    twitterSite: "@dailydigest",
    twitterCreator: "@dailydigest"
  };

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Add MetaTags component for SEO and social sharing */}
      <MetaTags metadata={articleMetadata} cacheBuster="20250302" />
      
      <Header onSubscribe={() => setIsSubscribeOpen(true)} showCategories={false} />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />

      <div className="h-36 sm:h-32"></div>

      <main className="max-w-[860px] mx-auto px-4 py-6 sm:py-8 dark:text-gray-200">
        <div className="mb-8">
          <Link href="/latest" className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-4 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Latest
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            China's Steel Sector: 'Supply Reform 2.0' Looms
          </h1>
          
          <div className="flex items-center text-sm mb-6">
            <span className="font-medium text-blue-600 dark:text-blue-400 mr-3">Markets</span>
            <span className="font-bold text-teal-600 dark:text-teal-400 uppercase">3 HR AGO</span>
          </div>
        </div>

        <div className="mb-8">
          <img 
            src="/latest/china-steel.png" 
            alt="Steel factory production line with rolled steel coils" 
            className="w-full rounded-lg"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
            Steel coils at a production facility in China. The country's steel industry faces new supply-side reforms aimed at reducing carbon emissions and overcapacity.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="font-medium text-gray-900 dark:text-white text-lg">
            Beijing is preparing to implement what analysts are calling "Supply Reform 2.0" for China's massive steel industry, targeting both carbon emissions and chronic overcapacity that has plagued the sector for years.
          </p>
          
          <p>
            China's National Development and Reform Commission (NDRC) has drafted new policies that could be unveiled as early as next month, according to sources familiar with the matter. The reforms come as China's steel sector faces mounting pressure on multiple fronts: environmental targets, international trade tensions, and slowing domestic demand amid a prolonged property crisis.
          </p>
          
          <h2>Market Impact</h2>
          
          <p>
            The steel sector reforms could have significant implications for global commodity markets, particularly iron ore. Australia and Brazil, as major suppliers of iron ore to China, could face reduced demand if steel production is curtailed. The reforms may also impact coal and coking coal markets, as well as steel-consuming sectors such as construction, automotive, and manufacturing.
          </p>
          
          <p>
            "These policies are likely to create winners and losers within China's steel industry," said Zhang Wei, metals analyst at Global Commodities Research. "Larger, more efficient producers with lower emissions may benefit from industry consolidation, while smaller, higher-polluting mills could face closure or forced mergers."
          </p>
          
          <h2>Key Components of the Reform</h2>
          
          <p>
            The new reform package is expected to include several key components:
          </p>
          
          <ul>
            <li>More stringent emissions targets for steel producers, with specific carbon intensity reduction goals</li>
            <li>Accelerated closure of outdated and inefficient capacity</li>
            <li>New restrictions on capacity swaps and replacements</li>
            <li>Enhanced monitoring and enforcement of production cuts</li>
            <li>Incentives for electric arc furnace (EAF) technology and hydrogen-based steelmaking</li>
            <li>Support for industry consolidation among major producers</li>
          </ul>
          
          <p>
            The first wave of supply-side reforms, implemented from 2016-2020, successfully eliminated over 150 million tonnes of outdated steelmaking capacity. However, this was largely offset by the addition of new, more efficient capacity, keeping total potential output relatively stable.
          </p>
          
          <h2>Property Crisis Connection</h2>
          
          <p>
            The steel industry reforms come as China continues to grapple with an extended downturn in its property sector, which traditionally accounts for 30-40% of the country's steel consumption. With property investment continuing to decline and a massive inventory of unsold homes, domestic steel demand faces structural headwinds.
          </p>
          
          <p>
            "This creates both a challenge and an opportunity for policymakers," said Li Huawei, economist at China Financial Institute. "On one hand, it's difficult to push through painful reforms during an economic slowdown. On the other hand, the property downturn provides a natural moment to address long-standing overcapacity issues."
          </p>
          
          <h2>International Implications</h2>
          
          <p>
            China's steel industry reforms could also influence global trade dynamics and climate policies. Chinese steel exports have been a source of trade friction with the United States, European Union, and other regions that have imposed tariffs and other trade barriers on Chinese steel products.
          </p>
          
          <p>
            "If these reforms succeed in meaningfully reducing China's steel output, we could potentially see some easing of global trade tensions in the sector," said Michael Brown, international trade analyst at Strategic Policy Research. "However, there's also concern that production cuts in China could lead to more aggressive export strategies to maintain revenues, actually intensifying trade conflicts."
          </p>
          
          <p>
            As the world's largest steel producer, accounting for over half of global output, any significant shifts in China's steel sector will have ripple effects throughout global markets. Investors and industry stakeholders across the steel value chain are closely monitoring these policy developments, with official announcements expected in conjunction with upcoming economic planning meetings.
          </p>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12 bg-white dark:bg-gray-900">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 Daily Digest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}