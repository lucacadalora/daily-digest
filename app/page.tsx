import React from 'react';
import { Header } from "../client/src/components/Header";
import { MarketTicker } from "../client/src/components/MarketTicker";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header showCategories={true} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Market Insights Platform (Next.js)</h1>
        <div className="mb-8">
          <MarketTicker />
        </div>
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