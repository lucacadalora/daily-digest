import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

type MarketPrice = {
  price: number;
  change24h: number;
};

type MarketData = {
  us_markets: {
    NVDA: MarketPrice;
    TSLA: MarketPrice;
    BABA: MarketPrice;
    'S&P500': MarketPrice;
  };
  indonesia: {
    IHSG: MarketPrice;
    BBCA: MarketPrice;
    BBRI: MarketPrice;
    ASII: MarketPrice;
    UNTR: MarketPrice;
    ITMG: MarketPrice;
  };
  crypto: {
    BTC: MarketPrice;
    ETH: MarketPrice;
    SOL: MarketPrice;
  };
  commodities: {
    GOLD: MarketPrice;
    SILVER: MarketPrice;
    COAL: MarketPrice;
  };
};

const FALLBACK_DATA: MarketData = {
  us_markets: {
    NVDA: { price: 624.65, change24h: 3.45 },
    TSLA: { price: 182.63, change24h: -1.45 },
    BABA: { price: 73.42, change24h: 0.87 },
    'S&P500': { price: 4890.45, change24h: 0.70 }
  },
  indonesia: {
    IHSG: { price: 7258.15, change24h: 0.63 },
    BBCA: { price: 9250, change24h: 0.82 },
    BBRI: { price: 4190, change24h: 0.75 },
    ASII: { price: 5675, change24h: 1.25 },
    UNTR: { price: 21575, change24h: 2.15 },
    ITMG: { price: 31450, change24h: 1.85 }
  },
  crypto: {
    BTC: { price: 42156.78, change24h: 2.34 },
    ETH: { price: 2298.45, change24h: 1.89 },
    SOL: { price: 98.45, change24h: 4.23 }
  },
  commodities: {
    GOLD: { price: 2021.50, change24h: 0.45 },
    SILVER: { price: 22.85, change24h: 0.33 },
    COAL: { price: 165.75, change24h: -0.92 }
  }
};

async function fetchMarketData(): Promise<MarketData> {
  try {
    // Yahoo Finance API v8 endpoint
    const baseUrl = 'https://query2.finance.yahoo.com/v8/finance/chart/';
    const symbols = {
      us: ['NVDA', 'TSLA', 'BABA', '^GSPC'],  // ^GSPC is S&P 500
      id: ['^JKSE', 'BBCA.JK', 'BBRI.JK', 'ASII.JK', 'UNTR.JK', 'ITMG.JK'],
      crypto: ['BTC-USD', 'ETH-USD', 'SOL-USD'],
      commodities: ['GC=F', 'SI=F', 'MTF=F']  // Gold, Silver, Coal futures
    };

    const fetchSymbol = async (symbol: string) => {
      try {
        const response = await axios.get(`${baseUrl}${symbol}?interval=1d&range=1d`);
        const data = response.data.chart.result[0];
        const quote = data.meta;
        const price = quote.regularMarketPrice;
        const previousClose = quote.previousClose;
        const change24h = ((price - previousClose) / previousClose) * 100;

        return {
          price,
          change24h
        };
      } catch (error) {
        console.warn(`Error fetching ${symbol}:`, error);
        return null;
      }
    };

    // Fetch all symbols in parallel
    const allSymbols = [...symbols.us, ...symbols.id, ...symbols.crypto, ...symbols.commodities];
    const results = await Promise.all(allSymbols.map(fetchSymbol));

    const marketData: MarketData = {
      us_markets: {
        NVDA: { price: 0, change24h: 0 },
        TSLA: { price: 0, change24h: 0 },
        BABA: { price: 0, change24h: 0 },
        'S&P500': { price: 0, change24h: 0 }
      },
      indonesia: {
        IHSG: { price: 0, change24h: 0 },
        BBCA: { price: 0, change24h: 0 },
        BBRI: { price: 0, change24h: 0 },
        ASII: { price: 0, change24h: 0 },
        UNTR: { price: 0, change24h: 0 },
        ITMG: { price: 0, change24h: 0 }
      },
      crypto: {
        BTC: { price: 0, change24h: 0 },
        ETH: { price: 0, change24h: 0 },
        SOL: { price: 0, change24h: 0 }
      },
      commodities: {
        GOLD: { price: 0, change24h: 0 },
        SILVER: { price: 0, change24h: 0 },
        COAL: { price: 0, change24h: 0 }
      }
    };

    // Map results to market data structure
    allSymbols.forEach((symbol, index) => {
      const data = results[index];
      if (!data) return;

      if (symbol === 'NVDA') marketData.us_markets.NVDA = data;
      if (symbol === 'TSLA') marketData.us_markets.TSLA = data;
      if (symbol === 'BABA') marketData.us_markets.BABA = data;
      if (symbol === '^GSPC') marketData.us_markets['S&P500'] = data;

      if (symbol === '^JKSE') marketData.indonesia.IHSG = data;
      if (symbol === 'BBCA.JK') marketData.indonesia.BBCA = data;
      if (symbol === 'BBRI.JK') marketData.indonesia.BBRI = data;
      if (symbol === 'ASII.JK') marketData.indonesia.ASII = data;
      if (symbol === 'UNTR.JK') marketData.indonesia.UNTR = data;
      if (symbol === 'ITMG.JK') marketData.indonesia.ITMG = data;

      if (symbol === 'BTC-USD') marketData.crypto.BTC = data;
      if (symbol === 'ETH-USD') marketData.crypto.ETH = data;
      if (symbol === 'SOL-USD') marketData.crypto.SOL = data;

      if (symbol === 'GC=F') marketData.commodities.GOLD = data;
      if (symbol === 'SI=F') marketData.commodities.SILVER = data;
      if (symbol === 'MTF=F') marketData.commodities.COAL = data;
    });

    // If any section is completely empty, use fallback data
    if (Object.values(marketData.us_markets).every(item => item.price === 0)) {
      marketData.us_markets = FALLBACK_DATA.us_markets;
    }
    if (Object.values(marketData.indonesia).every(item => item.price === 0)) {
      marketData.indonesia = FALLBACK_DATA.indonesia;
    }
    if (Object.values(marketData.crypto).every(item => item.price === 0)) {
      marketData.crypto = FALLBACK_DATA.crypto;
    }
    if (Object.values(marketData.commodities).every(item => item.price === 0)) {
      marketData.commodities = FALLBACK_DATA.commodities;
    }

    return marketData;
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
    refetchInterval: 30000, // Refresh every 30 seconds
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
        {/* Indonesian Markets */}
        {Object.entries(data.indonesia).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "ID")
        )}

        {/* US Markets */}
        {Object.entries(data.us_markets).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "US")
        )}

        {/* Crypto */}
        {Object.entries(data.crypto).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "Crypto")
        )}

        {/* Commodities */}
        {Object.entries(data.commodities).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "Commodity")
        )}
      </div>
    </div>
  );
}