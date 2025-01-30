import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MarketPrice = {
  price: number;
  change24h: number;
};

type MarketData = {
  crypto: {
    BTC: MarketPrice;
    ETH: MarketPrice;
  };
  stocks: {
    BBRI: MarketPrice;
    TLKM: MarketPrice;
    ASII: MarketPrice;
    BBCA: MarketPrice;
    AAPL: MarketPrice;
    MSFT: MarketPrice;
    GOOGL: MarketPrice;
    TSLA: MarketPrice;
  };
  indices: {
    IHSG: MarketPrice;
    'S&P500': MarketPrice;
    NASDAQ: MarketPrice;
    DJI: MarketPrice;
  };
  commodities: {
    GOLD: MarketPrice;
    OIL: MarketPrice;
    SILVER: MarketPrice;
  };
};

export function MarketTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { data, isLoading } = useQuery<MarketData>({
    queryKey: ['/api/market-data'],
    refetchInterval: 60000 // Refresh every minute
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame: number;
    let startTime: number;
    const duration = 60000; // 60 seconds for one complete scroll (slower)
    const scrollWidth = container.scrollWidth;
    const viewportWidth = container.offsetWidth;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      // Only update scroll position if not paused
      if (!isPaused) {
        const progress = ((timestamp - startTime) % duration) / duration;
        const scrollPos = (scrollWidth + viewportWidth) * progress;
        container.scrollLeft = scrollPos % scrollWidth;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [data, isPaused]);

  if (isLoading || !data) {
    return (
      <div className="h-6 animate-pulse bg-gray-100 rounded"></div>
    );
  }

  const formatPrice = (price: number) => {
    return price >= 1000 
      ? price.toLocaleString('en-US', { maximumFractionDigits: 0 })
      : price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatChange = (change: number) => {
    return change.toFixed(2);
  };

  const renderMarketItem = (symbol: string, data: MarketPrice, category?: string) => (
    <div key={symbol} className="flex items-center gap-1 px-2 sm:px-4 border-r border-gray-200 last:border-r-0">
      {category && <span className="hidden sm:inline text-gray-400 mr-1">{category}</span>}
      <span className="font-medium text-xs sm:text-sm">{symbol}</span>
      <span className="text-xs sm:text-sm">{formatPrice(data.price)}</span>
      <span className={`flex items-center text-xs sm:text-sm ${data.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {data.change24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {formatChange(data.change24h)}%
      </span>
    </div>
  );

  return (
    <div 
      ref={containerRef} 
      className="flex overflow-x-hidden whitespace-nowrap text-sm scrollbar-hide"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`flex animate-marquee ${isPaused ? 'animate-pause' : ''}`}>
        {/* Crypto Section */}
        {Object.entries(data.crypto).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "Crypto")
        )}

        {/* US Stocks */}
        {Object.entries(data.stocks).slice(4).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "US")
        )}

        {/* Indices */}
        {Object.entries(data.indices).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "Index")
        )}

        {/* ID Stocks */}
        {Object.entries(data.stocks).slice(0, 4).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "ID")
        )}

        {/* Commodities */}
        {Object.entries(data.commodities).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "Commodity")
        )}
      </div>
    </div>
  );
}