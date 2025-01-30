import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";

interface MarketPrice {
  price: number;
  change24h: number;
}

interface MarketData {
  crypto: {
    BTC: MarketPrice;
    ETH: MarketPrice;
  };
  stocks: {
    // Indonesian Stocks
    BBRI: MarketPrice;
    TLKM: MarketPrice;
    ASII: MarketPrice;
    BBCA: MarketPrice;
    // US Stocks
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
}

interface CacheEntry {
  timestamp: number;
  data: MarketData;
  lastSuccessfulFetch?: MarketData;
}

const CACHE_DURATION = 60000; // 1 minute cache
const STALE_WHILE_REVALIDATE = 300000; // 5 minutes before cache is considered stale

class MarketDataCache {
  private cache: CacheEntry = {
    timestamp: 0,
    data: {
      crypto: {
        BTC: { price: 0, change24h: 0 },
        ETH: { price: 0, change24h: 0 }
      },
      stocks: {
        // Indonesian Stocks
        BBRI: { price: 0, change24h: 0 },
        TLKM: { price: 0, change24h: 0 },
        ASII: { price: 0, change24h: 0 },
        BBCA: { price: 0, change24h: 0 },
        // US Stocks
        AAPL: { price: 0, change24h: 0 },
        MSFT: { price: 0, change24h: 0 },
        GOOGL: { price: 0, change24h: 0 },
        TSLA: { price: 0, change24h: 0 }
      },
      indices: {
        IHSG: { price: 0, change24h: 0 },
        'S&P500': { price: 0, change24h: 0 },
        NASDAQ: { price: 0, change24h: 0 },
        DJI: { price: 0, change24h: 0 }
      },
      commodities: {
        GOLD: { price: 0, change24h: 0 },
        OIL: { price: 0, change24h: 0 },
        SILVER: { price: 0, change24h: 0 }
      }
    }
  };

  private isFetching = false;

  async get(): Promise<MarketData> {
    const now = Date.now();
    const isStale = now - this.cache.timestamp > CACHE_DURATION;

    if (!isStale) {
      console.log('[Cache] Hit - Returning fresh cached data');
      return this.cache.data;
    }

    if (this.isFetching) {
      console.log('[Cache] Hit - Returning stale data while revalidating');
      return this.cache.data;
    }

    try {
      this.isFetching = true;
      const newData = await this.fetchFreshData();

      this.cache = {
        timestamp: now,
        data: newData,
        lastSuccessfulFetch: newData
      };

      console.log('[Cache] Updated with fresh data');
      return newData;
    } catch (error) {
      console.error('[Cache] Error fetching fresh data:', error);

      if (this.cache.lastSuccessfulFetch && 
          now - this.cache.timestamp < STALE_WHILE_REVALIDATE) {
        console.log('[Cache] Returning stale data due to fetch error');
        return this.cache.lastSuccessfulFetch;
      }

      throw error;
    } finally {
      this.isFetching = false;
    }
  }

  private async fetchFreshData(): Promise<MarketData> {
    // Fetch crypto data from CoinGecko
    const cryptoResponse = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true'
    );

    // Format the data with simulated values for stocks, indices and commodities
    // In production, these would come from actual market data APIs
    return {
      crypto: {
        BTC: {
          price: cryptoResponse.data.bitcoin.usd,
          change24h: cryptoResponse.data.bitcoin.usd_24h_change
        },
        ETH: {
          price: cryptoResponse.data.ethereum.usd,
          change24h: cryptoResponse.data.ethereum.usd_24h_change
        }
      },
      stocks: {
        // Indonesian Stocks (simulated data)
        BBRI: { price: 4190, change24h: 2.5 },
        TLKM: { price: 3820, change24h: -0.8 },
        ASII: { price: 5650, change24h: 1.2 },
        BBCA: { price: 9100, change24h: 0.5 },
        // US Stocks (simulated data)
        AAPL: { price: 185.85, change24h: 1.2 },
        MSFT: { price: 405.12, change24h: 0.8 },
        GOOGL: { price: 142.65, change24h: -0.5 },
        TSLA: { price: 191.25, change24h: -2.1 }
      },
      indices: {
        IHSG: { price: 7250, change24h: 0.3 },
        'S&P500': { price: 4890, change24h: 0.7 },
        NASDAQ: { price: 15455, change24h: 0.9 },
        DJI: { price: 38150, change24h: 0.4 }
      },
      commodities: {
        GOLD: { price: 2020.50, change24h: 0.3 },
        OIL: { price: 78.25, change24h: -1.2 },
        SILVER: { price: 22.85, change24h: 0.1 }
      }
    };
  }
}

const marketDataCache = new MarketDataCache();

export function registerRoutes(app: Express): Server {
  app.get('/api/market-data', async (req, res) => {
    try {
      const marketData = await marketDataCache.get();
      res.json(marketData);
    } catch (error) {
      console.error('Error in /api/market-data:', error);
      res.status(500).json({ 
        error: 'Failed to fetch market data',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}