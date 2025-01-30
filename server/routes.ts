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
    BBRI: MarketPrice;
    TLKM: MarketPrice;
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
        BBRI: { price: 0, change24h: 0 },
        TLKM: { price: 0, change24h: 0 }
      }
    }
  };

  private isFetching = false;

  async get(): Promise<MarketData> {
    const now = Date.now();
    const isStale = now - this.cache.timestamp > CACHE_DURATION;

    // Return cached data if it's fresh
    if (!isStale) {
      console.log('[Cache] Hit - Returning fresh cached data');
      return this.cache.data;
    }

    // If data is stale but another request is already fetching, return stale data
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

      // Return last successful fetch if available and not too stale
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

    // Format the data
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
        // Placeholder for stock data - we'll implement actual API later
        BBRI: {
          price: 4190,
          change24h: 2.5
        },
        TLKM: {
          price: 3820,
          change24h: -0.8
        }
      }
    };
  }
}

const marketDataCache = new MarketDataCache();

export function registerRoutes(app: Express): Server {
  // Market data endpoint with improved error handling
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