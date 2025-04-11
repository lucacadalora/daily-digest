import React from 'react';
import { Header } from "../client/src/components/Header";
import { MarketTicker } from "../client/src/components/MarketTicker";
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header showCategories={true} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Market Insights Platform</h1>
        <div className="mb-8">
          <MarketTicker />
        </div>
        
        {/* Latest Articles Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Latest Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Molten Salt Energy Article */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/latest/molten-salt.png" 
                  alt="Molten salt energy storage tanks at Suzhou Power Plant" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Energy</span>
                <h3 className="font-bold text-lg mt-1 mb-2">Molten Salt Energy Storage Revamps Aging Power Plant in East China's Suzhou</h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  China is pioneering molten salt energy storage technology to enhance the efficiency and flexibility of aging coal-fired power plants.
                </p>
                <a 
                  href="/latest/molten-salt-storage" 
                  className="text-blue-600 font-medium text-sm hover:underline inline-flex items-center"
                >
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Global Coal Article */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/latest/tongkang.jpeg" 
                  alt="Coal barges in Indonesia" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Commodities</span>
                <h3 className="font-bold text-lg mt-1 mb-2">Global Coal's Price Slump Masks Brewing Supply Crisis</h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  Today's depressed coal prices conceal a brewing market tension between collapsing investment and stubborn demand.
                </p>
                <a 
                  href="/latest/global-coal-share" 
                  className="text-blue-600 font-medium text-sm hover:underline inline-flex items-center"
                >
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* China Steel Article */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/latest/china-steel-true.png" 
                  alt="Steel factory in China" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Industries</span>
                <h3 className="font-bold text-lg mt-1 mb-2">China's Steel Sector Seized by Talk of 'Supply Reform 2.0'</h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  China's billion-ton steel industry is edging toward its biggest shake-up in a decade with potential plant closures.
                </p>
                <a 
                  href="/latest/china-steel-share" 
                  className="text-blue-600 font-medium text-sm hover:underline inline-flex items-center"
                >
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Platform Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Migration in Progress</h2>
            <p className="text-muted-foreground">
              We are currently migrating this platform to Next.js for improved performance,
              SEO benefits, and enhanced developer experience.
            </p>
          </div>
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Benefits of Next.js</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Server-side rendering for better SEO</li>
              <li>Improved performance with automatic code splitting</li>
              <li>Built-in API routes for backend functionality</li>
              <li>Simplified routing with file-based routing system</li>
              <li>Enhanced developer experience</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}