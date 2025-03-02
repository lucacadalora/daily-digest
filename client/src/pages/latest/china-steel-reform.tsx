import React from 'react';
import { Header } from '@/components/Header';
import { Link } from 'wouter';
import { ArrowLeft, Calendar, ChevronRight, Share2, Printer, Clock, Mail, Facebook, Twitter } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function ChinaSteelReform() {
  // Update page title and meta tags on component mount
  React.useEffect(() => {
    document.title = "China's Steel Sector Seized by Talk of 'Supply Reform 2.0'";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "World's biggest supplier needs an overhaul to cut production. Beijing may order 50 million tons of capacity cuts: Citigroup");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header simplified />
      
      <main className="container max-w-5xl py-6 px-4 md:px-6">
        {/* Top navigation */}
        <div className="mb-8">
          <Link href="/latest">
            <div className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 cursor-pointer">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Latest News
            </div>
          </Link>
          
          {/* Category and Section */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-6">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-black dark:text-white">Markets</span>
              <span className="text-sm text-muted-foreground">Commodities</span>
            </div>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-black dark:text-white leading-tight">
            China's Steel Sector Seized by Talk of 'Supply Reform 2.0'
          </h1>
          
          {/* Bullet points */}
          <ul className="mb-6 pl-6 space-y-1">
            <li className="text-sm md:text-base font-medium text-black dark:text-white list-disc">
              World's biggest supplier needs an overhaul to cut production
            </li>
            <li className="text-sm md:text-base font-medium text-black dark:text-white list-disc">
              Beijing may order 50 million tons of capacity cuts: Citigroup
            </li>
          </ul>
          
          {/* Main image */}
          <div className="relative w-full h-auto mb-2 border border-gray-200 dark:border-gray-800">
            <img 
              src="/latest/china-steel.png" 
              alt="Steel factory in China" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-muted-foreground mb-4 italic">
            All eyes are now on China's virtual National People's Congress legislative meetings next week, 
            to see if any guidance is issued for the steel industry. Photographer: Qilai Shen/Bloomberg
          </p>
          
          {/* Author and timestamp */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-6">
            <div className="text-sm font-semibold">By Katharine Gemmell</div>
            <div className="text-xs text-muted-foreground flex items-center md:ml-4">
              <span>February 28, 2025 at 8:05 AM GMT+7</span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center">
              <span className="md:border-l md:border-gray-300 md:pl-4 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Updated on February 28, 2025 at 4:45 PM GMT+7
              </span>
            </div>
          </div>
          
          {/* Social sharing tools */}
          <div className="flex items-center gap-3 mb-8 border-y border-gray-200 dark:border-gray-800 py-3">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
              <Facebook className="h-4 w-4" />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
              <Twitter className="h-4 w-4" />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
              <Mail className="h-4 w-4" />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
              <Printer className="h-4 w-4" />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
              <Share2 className="h-4 w-4" />
            </button>
            <Badge className="ml-auto" variant="outline">Listen 3:55</Badge>
          </div>
        </div>
        
        {/* Article content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="col-span-1 lg:col-span-8">
            <article className="prose dark:prose-invert max-w-none text-black dark:text-gray-100">
              <p className="text-lg font-medium leading-relaxed">
                China's billion-ton steel industry is edging toward its biggest shake-up in a decade, with speculation growing that Beijing will order plant closures in response to a construction slowdown at home and a wave of protectionism overseas.
              </p>
              
              <p>
                The world's biggest steel market has been abuzz this week with speculation that Beijing will mandate capacity cuts of 50 million tons – possibly as early as a key political gathering in the capital next week. An unverified screenshot implying that a plan had been approved went viral among steel-watchers on China's ubiquitous WeChat messaging app, stoking gains for steel prices and steelmakers.
              </p>
              
              <p>
                No plans have been announced, but the widespread speculation reflect broad recognition that the struggling steel industry needs a fresh overhaul, nearly a decade after President Xi Jinping launched his first supply side reforms. The country's chronic property crisis has sent domestic steel demand falling for the past four years.
              </p>
              
              {/* Chart component */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 my-8 border border-gray-200 dark:border-gray-800">
                <h3 className="text-base font-bold mb-4 text-black dark:text-white">
                  China's Steelmaker Profits Slump
                </h3>
                <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
                  Steel companies see lowest profits in decades
                </h4>
                <div className="relative h-[300px] w-full bg-white dark:bg-gray-800 flex items-center justify-center">
                  <img 
                    src="/latest/charts/china-steel-profits.svg" 
                    alt="Chart showing Chinese steel industry profits slump"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3 ml-1">
                  <span className="italic">Source: China's National Bureau of Statistics</span>
                </p>
              </div>
              
              <p>
                The international environment has grown increasingly hostile as nations move to block China's export flood that topped 110 million tons last year and encouraged US President Donald Trump's tough line on metals tariffs. That's piling pressure on China's leaders.
              </p>
              
              <blockquote className="border-l-4 border-blue-600 pl-4 italic my-6">
                "We understand the policy stance on steel has changed at the Politburo level and more actions will follow to reduce supply," Jack Shang, a Citigroup Inc. analyst wrote in a research note. "It's time for a supply reform 2.0."
              </blockquote>
              
              <p>
                The bank predicts a supply cut of around 50 million tons.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">More Severe</h3>
              
              <p>
                China dominates global steel production, and its exports have fueled bouts of trade tensions over the past two decades. A previous round of government-backed reforms were unveiled by Xi in 2016, in the wake of a previous demand crash and export surge. During that round of reforms, 150 million tons of capacity cuts were made over three years.
              </p>
              
              <p>
                Trump argued that his blanket 25% tariffs against steel imports were necessary to protect American industry against China-fueled overcapacity. But criticism of Beijing's steel dominance has grown more widespread as the country's economic troubles have sent it looking abroad for steel buyers.
              </p>
              
              {/* Second chart component */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 my-8 border border-gray-200 dark:border-gray-800">
                <div className="relative h-[300px] w-full bg-white dark:bg-gray-800 flex items-center justify-center">
                  <img 
                    src="/latest/charts/china-steel-exports.svg" 
                    alt="Chart showing Chinese steel exports rising as domestic demand falls"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3 ml-1">
                  <span className="italic">Source: China's General Administration of Customs</span>
                </p>
              </div>
              
              <h3 className="text-lg font-bold mt-8 mb-2">Trade tensions are intensifying:</h3>
              
              <ul className="pl-6 space-y-2 mb-6">
                <li className="list-disc">Over 30 new trade cases launched against Chinese steel in 2024</li>
                <li className="list-disc">US maintaining Trump's 25% tariffs</li>
                <li className="list-disc">South Korea and Vietnam implementing new tariffs</li>
                <li className="list-disc">EU revamping safeguards; India considering tougher measures</li>
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
            
            <Separator className="my-8" />
            
            <footer className="text-sm text-muted-foreground">
              <p>Source: Bloomberg, reporting by Katharine Gemmell</p>
            </footer>
          </div>
          
          {/* Right sidebar */}
          <div className="col-span-1 lg:col-span-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-sm mb-8">
              <h4 className="text-lg font-bold mb-4">Most Read</h4>
              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                  <h5 className="font-medium text-sm hover:text-blue-600 cursor-pointer">
                    Rich People Are Filing a Cash Common to the US Economy—But at What Cost?
                  </h5>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                  <h5 className="font-medium text-sm hover:text-blue-600 cursor-pointer">
                    Trump's SAT Tax Promise Hinges on Changes to Section 1031
                  </h5>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                  <h5 className="font-medium text-sm hover:text-blue-600 cursor-pointer">
                    OpenSea Reveals Theoretical Margin of Up to 99.99% on NFTs
                  </h5>
                </div>
                <div className="pb-2">
                  <h5 className="font-medium text-sm hover:text-blue-600 cursor-pointer">
                    If a WEF Used a Basic Assumption About How Companies Are Organized
                  </h5>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-lg font-bold mb-4">Related Articles</h4>
              <Link href="#" className="group block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-16 bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                    <img 
                      src="/latest/china-steel.png" 
                      alt="Steel factory" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm group-hover:text-blue-600">
                      China's Rail Freight Volumes Fall as Industrial Recovery Stalls
                    </h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      3 HOURS AGO
                    </p>
                  </div>
                </div>
              </Link>
              <Link href="#" className="group block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-16 bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                    <img 
                      src="/latest/china-steel.png" 
                      alt="Steel factory" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm group-hover:text-blue-600">
                      South Korea Expands Steel Tariffs Against Chinese Products 
                    </h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 DAY AGO
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}