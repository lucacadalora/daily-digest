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
  };
  commodities: {
    GOLD: MarketPrice;
    OIL: MarketPrice;
    SILVER: MarketPrice;
  };
};

const FALLBACK_DATA: MarketData = {
  crypto: {
    BTC: { price: 42156.78, change24h: 2.34 },
    ETH: { price: 2298.45, change24h: 1.89 }
  },
  stocks: {
    BBRI: { price: 4190, change24h: 0.75 },
    TLKM: { price: 3850, change24h: -0.52 },
    ASII: { price: 5675, change24h: 1.25 },
    BBCA: { price: 9250, change24h: 0.82 },
    AAPL: { price: 188.45, change24h: -0.34 },
    MSFT: { price: 402.56, change24h: 1.23 },
    GOOGL: { price: 142.89, change24h: 0.95 },
    TSLA: { price: 182.63, change24h: -1.45 }
  },
  indices: {
    IHSG: { price: 7258.15, change24h: 0.63 },
    'S&P500': { price: 4890.45, change24h: 0.70 },
    NASDAQ: { price: 15628.73, change24h: 0.89 },
    DJI: { price: 38150.82, change24h: 0.52 }
  },
  commodities: {
    GOLD: { price: 2021.50, change24h: 0.45 },
    OIL: { price: 78.25, change24h: -0.82 },
    SILVER: { price: 22.85, change24h: 0.33 }
  }
};

async function fetchMarketData(): Promise<MarketData> {
  try {
    // Primary data source for IHSG
    const ihsgResponse = await axios.get('https://api.idx.co.id/api/v1/indices/IHSG');
    const ihsgData = ihsgResponse.data;

    // Secondary data source for other markets
    const marketResponse = await axios.get('/api/market-data');
    const marketData = marketResponse.data;

    return {
      ...marketData,
      indices: {
        ...marketData.indices,
        IHSG: {
          price: ihsgData.lastPrice,
          change24h: ihsgData.percentageChange
        }
      }
    };
  } catch (error) {
    console.warn('Error fetching market data, using fallback:', error);
    return FALLBACK_DATA;
  }
}

export function MarketTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { data, isLoading } = useQuery<MarketData>({
    queryKey: ['/api/market-data'],
    queryFn: fetchMarketData,
    refetchInterval: 60000, // Refresh every minute
    initialData: FALLBACK_DATA
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame: number;
    let startTime: number;
    const duration = 60000; // 60 seconds for one complete scroll
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
      className="flex overflow-x-auto whitespace-nowrap text-sm scrollbar-hide"
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