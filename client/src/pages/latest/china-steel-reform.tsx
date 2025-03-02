import React from 'react';
import { Header } from '@/components/Header';
import { Link } from 'wouter';
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ChinaSteelReform() {
  // Update page title and meta tags on component mount
  React.useEffect(() => {
    document.title = "China's Steel Sector: 'Supply Reform 2.0' Looms";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "China's billion-ton steel industry appears headed for its biggest restructuring in a decade with potential plant closures of around 50 million tons.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header simplified />
      
      <main className="container max-w-4xl py-6 px-4 md:px-6">
        <div className="mb-6">
          <Link href="/latest">
            <div className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 cursor-pointer">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Latest News
            </div>
          </Link>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-teal-600 text-white px-2 py-0.5 uppercase">Markets</span>
            <span className="text-xs font-medium text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              February 28, 2025
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            China's Steel Sector: 'Supply Reform 2.0' Looms
          </h1>
          
          <div className="relative w-full h-64 md:h-80 mb-6">
            <img 
              src="/latest/china-steel.png" 
              alt="Chinese steel factory" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg font-medium leading-relaxed">
            China's billion-ton steel industry appears headed for its biggest restructuring in a decade. Speculation is growing that Beijing will order plant closures of around 50 million tons, possibly as early as next week's National People's Congress.
          </p>
          
          <p>
            An unverified screenshot suggesting government approval of capacity cuts went viral on China's WeChat this week, driving up steel prices and steelmaker stocks. While no official plans have been announced, the industry widely acknowledges the need for another round of supply-side reforms, nearly a decade after President Xi Jinping's first intervention.
          </p>
          
          <div className="my-8">
            <img 
              src="/latest/charts/china-steel-profits.svg" 
              alt="Chart showing Chinese steel industry profits slump"
              className="w-full"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Chart shows steel companies experiencing lowest profits in decades.<br/>
              <span className="italic">Source: China's National Bureau of Statistics</span>
            </p>
          </div>
          
          <p>
            The country's chronic property crisis has pushed domestic steel demand down for four consecutive years. Meanwhile, the international environment has grown increasingly hostile as nations move to block China's export flood, which topped 110 million tons last year.
          </p>
          
          <blockquote>
            "We understand the policy stance on steel has changed at the Politburo level and more actions will follow to reduce supply. It's time for a supply reform 2.0."
            <footer className="font-medium">— Jack Shang, Citigroup Inc. analyst</footer>
          </blockquote>
          
          <p>
            The sector operated in the red for most of 2024, with debt climbing to record highs and an unprecedented number of companies reporting losses. Alternative demand sources like manufacturing, green infrastructure, and shipbuilding haven't been sufficient to offset the decline.
          </p>
          
          <div className="my-8">
            <img 
              src="/latest/charts/china-steel-exports.svg" 
              alt="Chart showing Chinese steel exports rising as domestic demand falls"
              className="w-full"
            />
            <p className="text-sm text-muted-foreground mt-2">
              <span className="italic">Source: China's General Administration of Customs</span>
            </p>
          </div>
          
          <h3>Trade tensions are intensifying:</h3>
          
          <ul>
            <li>Over 30 new trade cases launched against Chinese steel in 2024</li>
            <li>US maintaining Trump's 25% tariffs</li>
            <li>South Korea and Vietnam implementing new tariffs</li>
            <li>EU revamping safeguards; India considering tougher measures</li>
          </ul>
          
          <p>
            During the previous reform period (2016-2019), China eliminated 150 million tons of capacity. According to the Centre for Research on Energy and Clean Air, the country would need to cut another 150 million tons of coal-fired blast furnace capacity to meet its climate targets.
          </p>
          
          <p>
            Citigroup analysts suggest new measures would target smaller, inefficient companies while benefiting industry giants like China Baowu Steel Group and Ansteel Group. "China's supply-side reforms have always targeted smaller, less efficient companies," confirms Sabrin Chowdhury, head of commodities at BMI. "This works to consolidate the industry and benefit larger, more efficient state-owned enterprises."
          </p>
          
          <p>
            All eyes are now on the National People's Congress next week for potential policy announcements in this final year of China's current Five-Year Plan.
          </p>
          
          <Separator className="my-6" />
          
          <div className="text-sm text-muted-foreground">
            <p>Source: Bloomberg, reporting by Katharine Gemmell</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">More from Latest News</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="#" className="group">
              <div className="flex items-center p-4 border border-border hover:bg-accent">
                <div className="flex-1 mr-2">
                  <h4 className="font-semibold font-serif group-hover:text-primary transition-colors">
                    Japan Unveils $30B Package to Boost Semiconductor Industry
                  </h4>
                  <p className="text-xs text-muted-foreground">Technology • 5 HR AGO</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
            <Link href="#" className="group">
              <div className="flex items-center p-4 border border-border hover:bg-accent">
                <div className="flex-1 mr-2">
                  <h4 className="font-semibold font-serif group-hover:text-primary transition-colors">
                    Indonesia's Nickel Exports Hit Record High as EV Demand Surges
                  </h4>
                  <p className="text-xs text-muted-foreground">Commodities • 8 HR AGO</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}