import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

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
    NIKKEI: MarketPrice;
    HSI: MarketPrice;
  };
  forex: {
    'USD/IDR': MarketPrice;
  };
};

async function fetchMarketData(): Promise<MarketData> {
  const response = await axios.get('/api/market-data');
  return response.data;
}

export function MarketTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { data, isLoading, error } = useQuery<MarketData>({
    queryKey: ['market-data'],
    queryFn: fetchMarketData,
    refetchInterval: 30000,
    retry: 3
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame: number;
    let startTime: number;
    const duration = 60000;
    const scrollWidth = container.scrollWidth;
    const viewportWidth = container.offsetWidth;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

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
      <div className="h-6 animate-pulse bg-gray-100 rounded dark:bg-gray-800"></div>
    );
  }

  if (error) {
    console.error('Error fetching market data:', error);
    return (
      <div className="text-sm text-red-500 dark:text-red-400">Unable to load market data</div>
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

  const renderMarketItem = (symbol: string, data: MarketPrice | undefined, category?: string) => {
    if (!data) return null;

    return (
      <div key={symbol} className="flex items-center gap-1 px-2 sm:px-4 border-r border-gray-200 dark:border-gray-700 last:border-r-0">
        {category && <span className="hidden sm:inline text-gray-400 mr-1">{category}</span>}
        <span className="font-medium text-xs sm:text-sm">{symbol}</span>
        <span className="text-xs sm:text-sm">{formatPrice(data.price)}</span>
        <span className={`flex items-center text-xs sm:text-sm ${data.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {data.change24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {formatChange(data.change24h)}%
        </span>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className="flex overflow-x-auto whitespace-nowrap text-sm scrollbar-hide"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`flex animate-marquee ${isPaused ? 'animate-pause' : ''}`}>
        {data.crypto && Object.entries(data.crypto).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "Crypto")
        )}

        {data.forex && Object.entries(data.forex).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "Forex")
        )}

        {data.indices && Object.entries(data.indices).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "Index")
        )}

        {data.stocks && Object.entries(data.stocks).slice(4).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "US")
        )}

        {data.stocks && Object.entries(data.stocks).slice(0, 4).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "ID")
        )}
      </div>
    </div>
  );
}