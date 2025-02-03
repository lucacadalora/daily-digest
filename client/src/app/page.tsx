
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/Header'
import { MarketTicker } from '@/components/MarketTicker'
import Home from '@/pages/home'

const queryClient = new QueryClient()

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Header />
        <MarketTicker />
        <main className="container mx-auto px-4 py-8">
          <Home />
        </main>
        <Toaster />
      </div>
    </QueryClientProvider>
  )
}
