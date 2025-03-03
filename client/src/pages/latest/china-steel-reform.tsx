import React from 'react';
import { Link, useLocation } from "wouter";
import { Clock, MapPin, ChevronRight, ArrowLeft } from 'lucide-react';
import { Header } from "@/components/Header";
import { SubscribeModal } from "@/components/SubscribeModal";
import { Separator } from "@/components/ui/separator";
import styles from './article.module.css';
import { Button } from '@/components/ui/button';
import MetaTags from '@/components/MetaTags';

export default function ChinaSteelReform() {
  const [location, setLocation] = useLocation();
  const [isSubscribeOpen, setIsSubscribeOpen] = React.useState(false);

  // OG Image metadata
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const title = "China's Steel Sector: 'Supply Reform 2.0' Looms";
  const description = "Beijing tackles carbon emissions and overcapacity in world's largest steel industry";
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <MetaTags 
        title="China's Steel Sector: 'Supply Reform 2.0' Looms | Daily Digest"
        description="China's steel sector faces a new round of supply-side structural reforms as the government aims to reduce carbon emissions and tackle overcapacity."
        imageUrl={ogImageUrl}
      />
      <Header onSubscribe={() => setIsSubscribeOpen(true)} showCategories={false} />
      <SubscribeModal 
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />

      {/* Navigation and article container */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="container max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center py-2 px-4 md:px-0">
            <div className="flex space-x-3 md:space-x-8 overflow-x-auto scrollbar-hide whitespace-nowrap w-full md:w-auto">
              <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600">Markets</span>
              <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600">Economics</span>
              <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600">Industries</span>
              <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600">Tech</span>
              <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600">Insights</span>
            </div>
            <div className="hidden md:block text-blue-600 font-semibold text-lg">
              Daily <span className="text-black dark:text-white">| Digest</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article container */}
      <div className="w-full max-w-screen-xl mx-auto bg-white dark:bg-gray-950 min-h-screen">
        <main className="w-full px-4 sm:px-6 lg:px-8 py-4">
          {/* Top navigation */}
          <div className="max-w-3xl mx-auto mb-2">
            <Link href="/latest">
              <div className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 cursor-pointer">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Latest News
              </div>
            </Link>
          </div>

          {/* Article header area */}
          <div className="max-w-3xl mx-auto">
            {/* Category - matching the image with improved spacing */}
            <div className="mt-4 mb-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Commodities</span>
            </div>

            {/* Main Headline - adjusted size and spacing */}
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-black dark:text-white leading-tight">
              China's Steel Sector Seized by Talk of 'Supply Reform 2.0'
            </h1>

            {/* Bullet points - tighter spacing, more compact */}
            <ul className="mb-5 pl-5 space-y-0.5">
              <li className="text-sm font-medium text-black dark:text-white list-disc">
                World's biggest supplier needs an overhaul to cut production
              </li>
              <li className="text-sm font-medium text-black dark:text-white list-disc">
                Beijing may order 50 million tons of capacity cuts: Citigroup
              </li>
            </ul>

            {/* Main image - smaller and more contained with caption that's always visible */}
            <div className="relative w-full h-auto mb-6">
              <div className="w-full max-h-96 overflow-hidden">
                <img 
                  src="/latest/china-steel.png" 
                  alt="Steel factory in China" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="w-full">
                <p className="text-xs sm:text-sm text-gray-500 mb-3 mt-2 italic leading-tight px-1">
                  All eyes are now on China's virtual National People's Congress legislative meetings next week, 
                  to see if any guidance is issued for the steel industry. Credit: industrieblick, Adobe Stock
                </p>
              </div>
            </div>

            {/* Author and timestamp - better alignment */}
            <div className="flex flex-col sm:flex-row sm:items-center text-xs gap-2 mb-3">
              <div className="font-semibold">By Luca Cada Lora</div>
              <div className="text-gray-500 sm:ml-4">
                March 2, 2025
              </div>
            </div>

            {/* Social sharing tools - better spacing */}
            <div className="flex items-center gap-2 mb-6 border-y border-gray-200 dark:border-gray-800 py-2">
              <button className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Facebook className="h-3.5 w-3.5" />
              </button>
              <button className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Twitter className="h-3.5 w-3.5" />
              </button>
              <button className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Mail className="h-3.5 w-3.5" />
              </button>
              <button className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Printer className="h-3.5 w-3.5" />
              </button>
              <button className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Share2 className="h-3.5 w-3.5" />
              </button>
              <Badge className="ml-auto text-xs py-0 h-6" variant="outline">Listen 3:55</Badge>
            </div>
          </div>

          {/* Article content - full width */}
          <div className="max-w-3xl mx-auto">
            <article className="prose dark:prose-invert prose-sm sm:prose-base max-w-none text-black dark:text-gray-100 prose-headings:font-bold prose-headings:text-black dark:prose-headings:text-white">
              <p className="text-base sm:text-lg font-medium leading-relaxed">
                China's billion-ton steel industry is edging toward its biggest shake-up in a decade, with speculation growing that Beijing will order plant closures in response to a construction slowdown at home and a wave of protectionism overseas.
              </p>

              <p>
                The world's biggest steel market has been abuzz this week with speculation that Beijing will mandate capacity cuts of 50 million tons – possibly as early as a key political gathering in the capital next week. An unverified screenshot implying that a plan had been approved went viral among steel-watchers on China's ubiquitous WeChat messaging app, stoking gains for steel prices and steelmakers.
              </p>

              <p>
                No plans have been announced, but the widespread speculation reflect broad recognition that the struggling steel industry needs a fresh overhaul, nearly a decade after President Xi Jinping launched his first supply side reforms. The country's chronic property crisis has sent domestic steel demand falling for the past four years.
              </p>

              {/* Chart component - using actual image with consistent styling */}
              <div className="bg-white dark:bg-gray-950 p-3 my-6 border border-gray-200 dark:border-gray-800">
                <div className="w-full">
                  <img 
                    src="/latest/charts/china-steel-profits.jpg" 
                    alt="Chart showing Chinese steel industry profits slump"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="w-full">
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 px-1 italic">
                    Source: China's National Bureau of Statistics
                  </p>
                </div>
              </div>

              <p>
                The international environment has grown increasingly hostile as nations move to block China's export flood that topped 110 million tons last year and encouraged US President Donald Trump's tough line on metals tariffs. That's piling pressure on China's leaders.
              </p>

              <blockquote className="border-l-4 border-blue-600 pl-4 italic my-6 text-gray-700 dark:text-gray-300">
                "We understand the policy stance on steel has changed at the Politburo level and more actions will follow to reduce supply," Jack Shang, a Citigroup Inc. analyst wrote in a research note. "It's time for a supply reform 2.0."
              </blockquote>

              <p>
                The bank predicts a supply cut of around 50 million tons.
              </p>

              <h3 className="text-xl font-bold mt-8 mb-3">More Severe</h3>

              <p>
                China dominates global steel production, and its exports have fueled bouts of trade tensions over the past two decades. A previous round of government-backed reforms were unveiled by Xi in 2016, in the wake of a previous demand crash and export surge. During that round of reforms, 150 million tons of capacity cuts were made over three years.
              </p>

              <p>
                Trump argued that his blanket 25% tariffs against steel imports were necessary to protect American industry against China-fueled overcapacity. But criticism of Beijing's steel dominance has grown more widespread as the country's economic troubles have sent it looking abroad for steel buyers.
              </p>

              {/* Second chart component - using actual image with consistent styling */}
              <div className="bg-white dark:bg-gray-950 p-3 my-6 border border-gray-200 dark:border-gray-800">
                <div className="w-full">
                  <img 
                    src="/latest/charts/china-steel-exports.jpg" 
                    alt="Chinese Steel Exports Soar as Domestic Demand Sags"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="w-full">
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 px-1 italic">
                    Source: China's General Administration of Customs
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold mt-6 mb-2">Trade tensions are intensifying:</h3>

              <ul className="pl-5 space-y-1 mb-5 list-disc">
                <li className="text-sm sm:text-base">Over 30 new trade cases launched against Chinese steel in 2024</li>
                <li className="text-sm sm:text-base">US maintaining Trump's 25% tariffs</li>
                <li className="text-sm sm:text-base">South Korea and Vietnam implementing new tariffs</li>
                <li className="text-sm sm:text-base">EU revamping safeguards; India considering tougher measures</li>
              </ul>

              <p>
                According to the Centre for Research on Energy and Clean Air, the country would need to cut another 150 million tons of coal-fired blast furnace capacity to meet its climate targets.
              </p>

              <p>
                Citigroup analysts suggest new measures would target smaller, inefficient companies while benefiting industry giants like China Baowu Steel Group and Ansteel Group. "China's supply-side reforms have always targeted smaller, less efficient companies," confirms Sabrin Chowdhury, head of commodities at BMI. "This works to consolidate the industry and benefit larger, more efficient state-owned enterprises."
              </p>

              <p>
                All eyes are now on the National People's Congress next week for potential policy announcements in this final year of China's current Five-Year Plan.
              </p>
            </article>

            <Separator className="my-6" />

            <footer className="text-xs text-gray-500 mb-10">
              <p>Source: <a href="https://www.bloomberg.com/news/articles/2025-02-28/ailing-china-steel-sector-seized-by-talk-of-supply-reform-2-0" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Bloomberg</a>, curated by Luca Cada Lora</p>
            </footer>

            {/* More From Bloomberg Section - Similar to reference image */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">More From Daily | Digest</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <Link href="#" className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800 mb-2">
                    <img 
                      src="/latest/charts/china-steel.png" 
                      alt="China's Rail Freight" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-blue-600 leading-tight">
                    China's Rail Freight Volumes Fall as Industrial Recovery Stalls
                  </h3>
                </Link>
                <Link href="#" className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800 mb-2">
                    <img 
                      src="/latest/charts/china-steel.png" 
                      alt="South Korea Tariffs" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-blue-600 leading-tight">
                    South Korea Expands Steel Tariffs Against Chinese Products 
                  </h3>
                </Link>
                <Link href="#" className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800 mb-2">
                    <img 
                      src="/latest/charts/china-steel.png" 
                      alt="China Vice Premier" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-blue-600 leading-tight">
                    China Vice Premier Touts Cooperation With US Despite Tariffs
                  </h3>
                </Link>
                <Link href="#" className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800 mb-2">
                    <img 
                      src="/latest/charts/china-steel.png" 
                      alt="China Military Talks" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-blue-600 leading-tight">
                    China Military Talks With US Show Tenuous Engagement Amid Tensions
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}