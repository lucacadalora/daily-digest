
'use client'

import { Header } from "@/components/Header"
import { useEffect, useState } from "react"

export default function Home() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <Header onSubscribe={() => setIsSubscribeOpen(true)} showCategories={true} />
      
      <div className="h-36 sm:h-32"></div>
      
      <main className="max-w-[1200px] mx-auto px-4 py-6 sm:py-8 dark:text-gray-200">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          MarketMind AI - Advanced Market Insights
        </h1>
        
        <p className="text-lg mb-8">
          Welcome to MarketMind AI, your destination for comprehensive financial market analysis with a focus on Indonesian and global market dynamics.
        </p>
      </main>
    </div>
  )
}
