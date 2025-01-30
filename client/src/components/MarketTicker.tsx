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
    const baseUrl = 'https://query1.finance.yahoo.com/v6/finance/quote';
    const symbols = [
      'NVDA', 'TSLA', 'BABA', '^GSPC',  // US Markets
      '^JKSE', 'BBCA.JK', 'BBRI.JK', 'ASII.JK', 'UNTR.JK', 'ITMG.JK',  // ID Markets
      'BTC-USD', 'ETH-USD', 'SOL-USD',  // Crypto
      'GC=F', 'SI=F', 'MTF=F'  // Commodities
    ];

    const response = await axios.get(baseUrl, {
      params: {
        symbols: symbols.join(','),
        fields: 'regularMarketPrice,regularMarketChangePercent,shortName'
      }
    });

    if (!response.data?.quoteResponse?.result) {
      console.warn('Invalid response from Yahoo Finance API');
      return FALLBACK_DATA;
    }

    const quotes = response.data.quoteResponse.result;
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

    quotes.forEach((quote: any) => {
      const data = {
        price: quote.regularMarketPrice,
        change24h: quote.regularMarketChangePercent
      };

      switch (quote.symbol) {
        // US Markets
        case 'NVDA': marketData.us_markets.NVDA = data; break;
        case 'TSLA': marketData.us_markets.TSLA = data; break;
        case 'BABA': marketData.us_markets.BABA = data; break;
        case '^GSPC': marketData.us_markets['S&P500'] = data; break;

        // Indonesian Markets
        case '^JKSE': marketData.indonesia.IHSG = data; break;
        case 'BBCA.JK': marketData.indonesia.BBCA = data; break;
        case 'BBRI.JK': marketData.indonesia.BBRI = data; break;
        case 'ASII.JK': marketData.indonesia.ASII = data; break;
        case 'UNTR.JK': marketData.indonesia.UNTR = data; break;
        case 'ITMG.JK': marketData.indonesia.ITMG = data; break;

        // Crypto
        case 'BTC-USD': marketData.crypto.BTC = data; break;
        case 'ETH-USD': marketData.crypto.ETH = data; break;
        case 'SOL-USD': marketData.crypto.SOL = data; break;

        // Commodities
        case 'GC=F': marketData.commodities.GOLD = data; break;
        case 'SI=F': marketData.commodities.SILVER = data; break;
        case 'MTF=F': marketData.commodities.COAL = data; break;
      }
    });

    // Use fallback data for empty sections
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