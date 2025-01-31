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

// Yahoo Finance symbols mapping
const SYMBOLS = {
  crypto: {
    BTC: 'BTC-USD',
    ETH: 'ETH-USD'
  },
  stocks: {
    BBRI: 'BBRI.JK',
    TLKM: 'TLKM.JK',
    ASII: 'ASII.JK',
    BBCA: 'BBCA.JK',
    AAPL: 'AAPL',
    MSFT: 'MSFT',
    GOOGL: 'GOOGL',
    TSLA: 'TSLA'
  },
  indices: {
    IHSG: '^JKSE',
    'S&P500': '^GSPC',
    NASDAQ: '^IXIC',
    DJI: '^DJI',
    NIKKEI: '^N225',
    HSI: '^HSI'
  },
  forex: {
    'USD/IDR': 'IDR=X'
  }
};

async function fetchMarketData(): Promise<MarketData> {
  try {
    // Create a flat list of all symbols
    const allSymbols = [
      ...Object.values(SYMBOLS.crypto),
      ...Object.values(SYMBOLS.stocks),
      ...Object.values(SYMBOLS.indices),
      ...Object.values(SYMBOLS.forex)
    ].join(',');

    // Yahoo Finance API endpoint
    const response = await axios.get(`https://query1.finance.yahoo.com/v7/finance/quote`, {
      params: {
        symbols: allSymbols,
        fields: 'regularMarketPrice,regularMarketChangePercent'
      }
    });

    const quotes = response.data.quoteResponse.result;
    const quoteMap = new Map(quotes.map((quote: any) => [quote.symbol, quote]));

    // Transform the data into our format
    const marketData: MarketData = {
      crypto: {
        BTC: mapYahooQuote(quoteMap.get(SYMBOLS.crypto.BTC)),
        ETH: mapYahooQuote(quoteMap.get(SYMBOLS.crypto.ETH))
      },
      stocks: {
        BBRI: mapYahooQuote(quoteMap.get(SYMBOLS.stocks.BBRI)),
        TLKM: mapYahooQuote(quoteMap.get(SYMBOLS.stocks.TLKM)),
        ASII: mapYahooQuote(quoteMap.get(SYMBOLS.stocks.ASII)),
        BBCA: mapYahooQuote(quoteMap.get(SYMBOLS.stocks.BBCA)),
        AAPL: mapYahooQuote(quoteMap.get(SYMBOLS.stocks.AAPL)),
        MSFT: mapYahooQuote(quoteMap.get(SYMBOLS.stocks.MSFT)),
        GOOGL: mapYahooQuote(quoteMap.get(SYMBOLS.stocks.GOOGL)),
        TSLA: mapYahooQuote(quoteMap.get(SYMBOLS.stocks.TSLA))
      },
      indices: {
        IHSG: mapYahooQuote(quoteMap.get(SYMBOLS.indices.IHSG)),
        'S&P500': mapYahooQuote(quoteMap.get(SYMBOLS.indices['S&P500'])),
        NASDAQ: mapYahooQuote(quoteMap.get(SYMBOLS.indices.NASDAQ)),
        DJI: mapYahooQuote(quoteMap.get(SYMBOLS.indices.DJI)),
        NIKKEI: mapYahooQuote(quoteMap.get(SYMBOLS.indices.NIKKEI)),
        HSI: mapYahooQuote(quoteMap.get(SYMBOLS.indices.HSI))
      },
      forex: {
        'USD/IDR': mapYahooQuote(quoteMap.get(SYMBOLS.forex['USD/IDR']))
      }
    };

    return marketData;
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
}

function mapYahooQuote(quote: any): MarketPrice {
  if (!quote) {
    return { price: 0, change24h: 0 };
  }
  return {
    price: quote.regularMarketPrice || 0,
    change24h: quote.regularMarketChangePercent || 0
  };
}

export function MarketTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { data, isLoading } = useQuery<MarketData>({
    queryKey: ['market-data'],
    queryFn: fetchMarketData,
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3
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

        {/* Forex */}
        {Object.entries(data.forex).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "Forex")
        )}

        {/* Indices */}
        {Object.entries(data.indices).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "Index")
        )}

        {/* US Stocks */}
        {Object.entries(data.stocks).slice(4).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "US")
        )}

        {/* ID Stocks */}
        {Object.entries(data.stocks).slice(0, 4).map(([symbol, price]) => 
          renderMarketItem(symbol, price, "ID")
        )}
      </div>
    </div>
  );
}