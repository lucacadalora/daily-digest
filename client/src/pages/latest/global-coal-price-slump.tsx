import React from 'react';
import { Header } from '@/components/Header';
import { Link } from 'wouter';
import { ArrowLeft, ChevronRight, Share2, Printer, Clock, Mail, Facebook, Twitter } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import MetaTags from '@/components/SEO/MetaTags';
import type { ArticleMetadata } from '@/lib/meta-tags';

/**
 * Enhanced article metadata for the Global Coal Price Slump article
 * This metadata is optimized for social media sharing across all platforms
 * including Facebook, WhatsApp, Twitter/X, and LinkedIn
 */
const articleMetadata: ArticleMetadata = {
  // Core metadata
  title: "Global Coal's Price Slump Masks Brewing Supply Crisis and Potential Price Surge | Daily Digest",
  description: "Analysis of why today's depressed coal prices conceal a brewing market tension between collapsing investment and stubborn demand that could lead to a sharp price rebound.",
  url: 'https://lucaxyzz-digest.replit.app/latest/global-coal-price-slump',
  
  // Image with cache busting parameter to ensure fresh images on social platforms
  image: 'https://lucaxyzz-digest.replit.app/latest/coal-image.jpeg?v=20250303_v3',
  imageWidth: '1200',
  imageHeight: '630',
  imageAlt: 'Global coal mining barge with price chart overlay showing the current slump and potential future rebound',
  
  // Article metadata
  author: 'Luca Cada Lora',
  publishedTime: '2025-03-03',
  section: 'Commodities',
  
  // Content categorization
  tags: ['Coal', 'Energy', 'ESG', 'Climate', 'Commodities', 'Industry', 'Price', 'Supply'],
  
  // Site information
  siteName: 'Daily Digest',
  locale: 'en_US',
  
  // Twitter specific metadata
  twitterSite: '@dailydigest',
  twitterCreator: '@dailydigest',
  
  // Optional Facebook App ID (not needed for this implementation)
  // fbAppId: '123456789'
};

export default function GlobalCoalPriceSlump() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* MetaTags component handles meta tag updates and cleanup */}
      <MetaTags metadata={articleMetadata} cacheBuster="20250303_v3" />
      
      <Header simplified />
      
      {/* Top categories navigation - responsive for both desktop and mobile */}
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
              Global Coal's Price Slump Masks Brewing Supply Crisis and Potential Price Surge
            </h1>
            
            {/* Bullet points - tighter spacing, more compact */}
            <ul className="mb-5 pl-5 space-y-0.5">
              <li className="text-sm font-medium text-black dark:text-white list-disc">
                Asian benchmark at lowest levels since 2021, hovering near $100 a ton
              </li>
              <li className="text-sm font-medium text-black dark:text-white list-disc">
                ESG pressures and climate policies stifling investment in new production
              </li>
            </ul>
            
            {/* Main image - smaller and more contained with caption that's always visible */}
            <div className="relative w-full h-auto mb-6">
              <div className="w-full max-h-96 overflow-hidden">
                <img 
                  src="/latest/tongkang.jpeg" 
                  alt="Coal barges in Indonesia" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="w-full">
                <p className="text-xs sm:text-sm text-gray-500 mb-3 mt-2 italic leading-tight px-1">
                  Coal barges in Indonesia, one of the world's largest coal exporters. Credit: Shutterstock
                </p>
              </div>
            </div>
            
            {/* Author and timestamp - better alignment */}
            <div className="flex flex-col sm:flex-row sm:items-center text-xs gap-2 mb-3">
              <div className="font-semibold">By Luca Cada Lora</div>
              <div className="text-gray-500 sm:ml-4">
                March 3, 2025
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
              <Badge className="ml-auto text-xs py-0 h-6" variant="outline">Listen 4:25</Badge>
            </div>
          </div>
          
          {/* Article content - full width */}
          <div className="max-w-3xl mx-auto">
            <article className="prose dark:prose-invert prose-sm sm:prose-base max-w-none text-black dark:text-gray-100 prose-headings:font-bold prose-headings:text-black dark:prose-headings:text-white">
              <p className="text-base sm:text-lg font-medium leading-relaxed">
                Today's depressed coal prices conceal a brewing market tension that few analysts are discussing. Australian thermal coal contracts, the benchmark for Asia, have fallen to around $100 a ton – returning to price levels not seen since May 2021, before Russia's invasion of Ukraine upended global energy markets.
              </p>
              
              <p>
                While producers struggle and critics celebrate coal's apparent decline, underlying market dynamics suggest this downturn may be short-lived. A critical mismatch between investment patterns and demand trends is setting the stage for potential market tightness.
              </p>
              
              {/* Chart component - using actual image with consistent styling */}
              <div className="bg-white dark:bg-gray-950 p-3 my-6 border border-gray-200 dark:border-gray-800">
                <div className="w-full">
                  <img 
                    src="/latest/Coal price cycle.png" 
                    alt="Coal Price Cycle chart showing historical prices and potential supply squeeze"
                    className="w-full h-auto object-contain"
                  />
                </div>

              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-3">Investment Retreat vs. Stubborn Demand</h3>
              
              <p>
                Investment in new coal production has collapsed as shareholders and banks increasingly reject funding for new projects. Environmental concerns and fears of "stranded assets" have made financing virtually impossible across much of the industry.
              </p>
              
              <p>
                "In previous price highs, that would've stimulated or incentivized a lot of new projects," said Steve Hulton, senior vice president of coal markets at Rystad Energy. "We haven't seen any of that happen. And we saw more players took the opportunity to actually exit stakes."
              </p>
              
              <p>
                Even when prices spiked dramatically in 2022 during Europe's scramble for energy alternatives after Russia's invasion of Ukraine, producers remained reluctant to develop new mines:
              </p>
              
              <ul className="pl-5 space-y-1 mb-5 list-disc">
                <li className="text-sm sm:text-base">Only 10 of 70 nations tracked by Global Energy Monitor plan to boost output by more than 10 million tons</li>
                <li className="text-sm sm:text-base">76% of proposed new thermal coal projects (1.8 billion metric tons per year) are concentrated in just China and India</li>
                <li className="text-sm sm:text-base">Most countries have abandoned new mine development entirely</li>
                <li className="text-sm sm:text-base">Financial institutions have drastically reduced coal lending</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-8 mb-3">Demand Defies Green Transition Expectations</h3>
              
              <p>
                Despite rapid renewable energy expansion, coal consumption continues to exceed forecasts. The International Energy Agency has been forced to revise its coal demand outlook higher in its last four annual reports and has reversed its previous position that demand had peaked.
              </p>
              
              {/* Second chart component - using actual image with consistent styling */}
              <div className="bg-white dark:bg-gray-950 p-3 my-6 border border-gray-200 dark:border-gray-800">
                <div className="w-full">
                  <img 
                    src="/latest/Coal demand.png" 
                    alt="Coal Demand Forecast vs. Reality chart showing IEA projection revisions"
                    className="w-full h-auto object-contain"
                  />
                </div>

              </div>
              
              <p>
                Several factors are driving persistent demand:
              </p>
              
              <ul className="pl-5 space-y-1 mb-5 list-disc">
                <li className="text-sm sm:text-base">Continued electrification in developing economies</li>
                <li className="text-sm sm:text-base">Exploding data center requirements for AI and cloud computing</li>
                <li className="text-sm sm:text-base">Extended operational life of coal plants in the US, Japan and Germany</li>
                <li className="text-sm sm:text-base">Sustained industrial energy needs in emerging markets</li>
              </ul>
              
              <p>
                India's coal consumption is projected to reach 1.5 billion tons by March 2030 (growing about 3% annually), according to the country's coal ministry. China, consuming half the world's coal, continues to see demand increases, with the IEA projecting a 1.3% rise through 2027.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-3">Current Surplus: A Temporary Phenomenon</h3>
              
              <p>
                Today's low prices reflect several short-term factors:
              </p>
              
              <ul className="pl-5 space-y-1 mb-5 list-disc">
                <li className="text-sm sm:text-base">Unusually mild winter across key Asian markets</li>
                <li className="text-sm sm:text-base">Excessive inventory buildup by Chinese coal companies following 2021-2022 shortages</li>
                <li className="text-sm sm:text-base">Temporary industrial demand weakness</li>
              </ul>
              
              <p>
                China Coal Resource reports total Chinese coal inventories reached 665 million tons by December's end, a 21% year-over-year increase and sufficient to supply the nation for more than a month. Major players including China Shenhua Energy Co. have suspended foreign coal purchases while working to reduce port stockpiles.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-3">Industry Strategists Bet on Coal's Staying Power</h3>
              
              <blockquote className="border-l-4 border-blue-600 pl-4 italic my-6 text-gray-700 dark:text-gray-300">
                "A lot of our minority joint venture partners around the world, more particularly in Australia, wanted to get out of steam coal," Gary Nagle, CEO of Glencore Plc explained during a recent earnings call, discussing his company's ongoing commitment to coal. "At the time, coal was a four-letter word. It seems in today's world, coal is no longer a four-letter word."
              </blockquote>
              
              <p>
                Wood Mackenzie analyst Rory Simington argues the supply constraints and resulting price volatility indicate "a turbulent endgame for coal" rather than a gradual decline.
              </p>
              
              <p>
                With Newcastle coal prices at current levels, approximately 10% of export mines are operating below profitability at prices under $110 a ton. These operations will likely reduce or suspend output, providing some price support.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-3">Outlook: Preparing for Price Recovery</h3>
              
              <p>
                The combination of limited supply growth and persistent demand signals a potential sharp rebound for internationally traded coal that could:
              </p>
              
              <ul className="pl-5 space-y-1 mb-5 list-disc">
                <li className="text-sm sm:text-base">Increase energy costs for households and manufacturers in developing economies</li>
                <li className="text-sm sm:text-base">Extend coal's profitability timeline beyond current expectations</li>
                <li className="text-sm sm:text-base">Complicate climate targets and emission reduction plans</li>
                <li className="text-sm sm:text-base">Accelerate demand destruction in price-sensitive regions</li>
              </ul>
              
              <blockquote className="border-l-4 border-blue-600 pl-4 italic my-6 text-gray-700 dark:text-gray-300">
                "Structurally there are pressures, no doubt about it," Simington noted. "But to date, the overall growth of energy demand has meant consumption of coal keeps being able to grow."
              </blockquote>
            </article>
            
            <Separator className="my-6" />
            
            <footer className="text-xs text-gray-500 mb-10">
              <p>Source: <a href="https://www.bloomberg.com/news/articles/2025-03-02/investors-are-scouring-emerging-markets-for-trump-proof-bets?srnd=undefined&sref=DLVyDcXJ" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Bloomberg</a>, curated by Luca Cada Lora</p>
            </footer>
            
            {/* More From Daily | Digest Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">More From Daily | Digest</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <Link href="/latest/china-steel-reform" className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800 mb-2">
                    <img 
                      src="/latest/china-steel.png" 
                      alt="China's Steel Sector Reform" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-blue-600 leading-tight">
                    China's Steel Sector Seized by Talk of 'Supply Reform 2.0'
                  </h3>
                </Link>
                <Link href="/japan-economic-security" className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800 mb-2">
                    <img 
                      src="/images/japan-economic-security.jpg" 
                      alt="Japan Economic Security" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-blue-600 leading-tight">
                    Japan's Economic Security Strategy: Balancing Trade & National Defense
                  </h3>
                </Link>
                <Link href="/indonesia-coal-dilemma" className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800 mb-2">
                    <img 
                      src="/images/indonesia-coal-dilemma.jpg" 
                      alt="Indonesia Coal Dilemma" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-blue-600 leading-tight">
                    Indonesia's Coal Dilemma: Balancing Revenue and Climate Goals
                  </h3>
                </Link>
                <Link href="/trade-war-analysis" className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800 mb-2">
                    <img 
                      src="/images/trade-war-analysis.jpg" 
                      alt="Trade War Analysis" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-blue-600 leading-tight">
                    US-China Trade War: Economic Analysis and Market Impact
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