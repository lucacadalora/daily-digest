import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ChatBox } from "@/components/ChatBox";
import { SubscribeModal } from "@/components/SubscribeModal";
import { Header } from "@/components/Header";

export default function Home() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Header */}
      <Header onSubscribe={() => setIsSubscribeOpen(true)} />

      {/* Subscription Modal */}
      <SubscribeModal 
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />

      {/* Top Spacing for Fixed Header */}
      <div className="h-36 sm:h-32"></div>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 py-6 sm:py-8 dark:text-gray-200">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - ChatBox (Hidden on mobile) */}
          <div id="chat" className="hidden md:block md:w-80 flex-shrink-0 scroll-mt-40">
            <ChatBox />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Featured Article Card */}
            <Card className="mb-8 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span className="font-medium">Daily Digest</span>
                  <span>•</span>
                  <span>Markets</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Floodgates Open as Trade War Tsunami Swamps IHSG
                </h2>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xl font-bold text-red-600">-5.16%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">IHSG Drop</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-600">↑ 32%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Chinese Imports</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-red-600">-18-23%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Local Impact</div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Bank Indonesia issues stark warning as Chinese goods flood Indonesian markets, threatening local 
                  industries and validating our previous week's bearish outlook. IHSG breaches critical 6,900 support exactly...
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">February 10, 2025</span>
                  <Link href="/newsletter/trade-war-tsunami-feb-10-14" 
                        className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    Read More
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Chat Box Section */}
          <div id="mobile-chat" className="md:hidden mt-8 scroll-mt-40">
            <ChatBox />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12 bg-white dark:bg-gray-900">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 Daily Digest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}