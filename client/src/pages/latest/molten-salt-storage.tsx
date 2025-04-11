import React from 'react';
import { Header } from '@/components/Header';
import { Link } from 'wouter';
import { ArrowLeft, ChevronRight, Share2, Printer, Clock, Mail, Facebook, Twitter } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import ArticleSEO from '@/components/SEO/ArticleSEO';

export default function MoltenSaltStorage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ArticleSEO component uses centralized article config for SEO */}
      <ArticleSEO articleId="molten-salt-storage" />
      
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
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Energy</span>
            </div>
            
            {/* Main Headline - adjusted size and spacing */}
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-black dark:text-white leading-tight">
              Molten Salt Energy Storage Revamps Aging Power Plant in East China's Suzhou
            </h1>
            
            {/* Bullet points - tighter spacing, more compact */}
            <ul className="mb-5 pl-5 space-y-0.5">
              <li className="text-sm font-medium text-black dark:text-white list-disc">
                Research suggests molten salt energy storage can enhance aging coal-fired power plants' efficiency and flexibility
              </li>
              <li className="text-sm font-medium text-black dark:text-white list-disc">
                Project reduces coal use by 32,000 tonnes and carbon emissions by 85,000 tonnes annually
              </li>
            </ul>
            
            {/* Main image - smaller and more contained with caption that's always visible */}
            <div className="relative w-full h-auto mb-6">
              <div className="w-full max-h-96 overflow-hidden">
                <img 
                  src="/latest/molten-salt.png" 
                  alt="Molten salt energy storage tanks at Suzhou Power Plant in Anhui Province, China" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="w-full">
                <p className="text-xs sm:text-sm text-gray-500 mb-3 mt-2 italic leading-tight px-1">
                  Molten salt storage tanks under construction at the Suzhou Power Plant in Anhui Province, China. Credit: China Energy
                </p>
              </div>
            </div>
            
            {/* Author and timestamp - better alignment */}
            <div className="flex flex-col sm:flex-row sm:items-center text-xs gap-2 mb-3">
              <div className="font-semibold">By Luca Cada Lora</div>
              <div className="text-gray-500 sm:ml-4">
                April 11, 2025
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
              <Badge className="ml-auto text-xs py-0 h-6" variant="outline">Listen 3:45</Badge>
            </div>
          </div>
          
          {/* Article content - full width */}
          <div className="max-w-3xl mx-auto">
            <article className="prose dark:prose-invert prose-sm sm:prose-base max-w-none text-black dark:text-gray-100 prose-headings:font-bold prose-headings:text-black dark:prose-headings:text-white">
              <p className="text-base sm:text-lg font-medium leading-relaxed">
                China is pioneering a significant upgrade at the Suzhou Power Plant in Anhui Province, using molten salt energy storage to revamp an aging coal-fired facility. This project aims to improve load-following capabilities and grid stability while reducing environmental impact, aligning with national carbon neutrality targets.
              </p>
              
              <p>
                The Suzhou Power Plant, operated by China Energy's Anhui Company, has installed two massive molten salt tanks with a thermal storage capacity of 1,000 MWh. This system allows the plant's two 350 MW units to maintain continuous heat supply for up to four hours at full capacity and five hours at 30% load, enhancing operational flexibility.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-3">Project Overview</h3>
              
              <p>
                Molten salt energy storage is a technology traditionally utilized in concentrated solar power (CSP) plants. It involves heating a mixture of sodium and potassium nitrates to high temperatures, storing the thermal energy in insulated tanks, and using it later to generate steam for electricity or heat supply. In the context of the Suzhou Power Plant, this technology is innovatively applied to a coal-fired facility.
              </p>
              
              <blockquote className="border-l-4 border-blue-600 pl-4 italic my-6 text-gray-700 dark:text-gray-300">
                "This configuration enables the plant to operate more efficiently during periods of low electricity demand while still meeting heating requirements, reducing the need for inefficient startups and shutdowns."
                — Qiao Yancai, Head of Molten Salt Energy Storage at Suzhou Power Plant
              </blockquote>
              
              <p>
                The system stores excess heat produced during low electricity demand periods, using it later to generate steam for both heating and power generation. This decoupling of heat and electricity production enhances operational flexibility, reducing the need for inefficient startups and shutdowns.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-3">Environmental and Operational Benefits</h3>
              
              <p>
                The environmental impact of this project is significant, with projections to reduce standard coal consumption by 32,000 tonnes and carbon emissions by 85,000 tonnes annually. The storage system enhances the plant's flexibility by allowing it to store excess heat during low demand and release it during peak times, reducing grid strain.
              </p>
              
              <p>
                Several key benefits include:
              </p>
              
              <ul className="pl-5 space-y-1 mb-5 list-disc">
                <li className="text-sm sm:text-base">Improved grid stability through enhanced load-following capabilities</li>
                <li className="text-sm sm:text-base">Extended operational life of existing coal-fired infrastructure</li>
                <li className="text-sm sm:text-base">Reduced emissions and coal consumption</li>
                <li className="text-sm sm:text-base">Better integration of intermittent renewable energy sources</li>
              </ul>
              
              <p>
                This is particularly vital as China increases its reliance on intermittent renewables like wind and solar. The ability to operate efficiently at low loads, down to 30% of rated capacity, is crucial for balancing the grid as renewable penetration increases.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-3">Broader Context and Significance</h3>
              
              <p>
                This project is a demonstration of how existing fossil fuel infrastructure can be retrofitted with advanced technologies to extend its operational life while reducing environmental impact. China Energy Investment Corporation, a major player formed from the merger of Shenhua Group and China Guodian Corporation, operates the plant and is investing in such innovations to modernize its fleet.
              </p>
              
              <p>
                This aligns with China's energy transition strategy, aiming to make coal plants more efficient and compatible with the growth of renewable energy. Globally, similar applications are being explored, with academic research highlighting the integration of molten salt storage with supercritical coal-fired plants for grid energy storage.
              </p>
              
              <p>
                The Suzhou project could serve as a model, potentially inspiring upgrades in other regions, contributing to global efforts to combat climate change while leveraging existing infrastructure.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-3">Technical Insights and Future Implications</h3>
              
              <p>
                The dual-tank system involves storing hot molten salt in one tank and cold in another, with the salt heated by steam extraction from the boiler. This process allows for high efficiency, with round-trip efficiencies of 95-99% in similar applications.
              </p>
              
              <p>
                Looking ahead, the success of this project could lead to wider adoption, especially in regions with aging coal fleets. It demonstrates a pathway to decarbonize existing infrastructure, potentially reducing the need for premature plant closures and associated economic impacts.
              </p>
              
              <p>
                However, challenges such as cost, scalability, and long-term performance will need monitoring as the technology matures and is deployed at greater scale.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-3">Conclusion</h3>
              
              <p>
                The Suzhou Power Plant's molten salt energy storage project represents a pioneering effort to enhance the efficiency and sustainability of coal-fired facilities. By reducing emissions, improving flexibility, and supporting renewable integration, it aligns with China's ambitious climate goals and could inspire global energy transition strategies.
              </p>
              
              <p>
                As research and implementation continue, this project may pave the way for a more sustainable energy future, balancing economic and environmental considerations in the ongoing transition to clean energy.
              </p>
            </article>
            
            <Separator className="my-6" />
            
            <footer className="text-xs text-gray-500 mb-10">
              <p>Source: Bastille Post, CEIC, Inside Climate News, curated by Luca Cada Lora</p>
            </footer>
            
            {/* More From Daily | Digest Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">More From Daily | Digest</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Related article 1 */}
                <Link href="/latest/global-coal-price-slump">
                  <div className="group cursor-pointer">
                    <div className="aspect-video overflow-hidden rounded-md mb-3">
                      <img 
                        src="/latest/tongkang.jpeg" 
                        alt="Coal barges in Indonesia" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                      Global Coal's Price Slump Masks Brewing Supply Crisis
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      March 3, 2025
                    </p>
                  </div>
                </Link>
                
                {/* Related article 2 */}
                <Link href="/latest/china-steel-reform">
                  <div className="group cursor-pointer">
                    <div className="aspect-video overflow-hidden rounded-md mb-3">
                      <img 
                        src="/latest/china-steel-true.png" 
                        alt="Steel factory in China" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                      China's Steel Sector Seized by Talk of 'Supply Reform 2.0'
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      March 2, 2025
                    </p>
                  </div>
                </Link>
                
                {/* Related article 3 - placeholder or another relevant article */}
                <Link href="#">
                  <div className="group cursor-pointer">
                    <div className="aspect-video overflow-hidden rounded-md mb-3 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-400">Coming Soon</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                      Energy Storage Technologies: A Global Market Outlook
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Coming Soon
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}