import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";

// Cache market data to avoid rate limits
let marketDataCache = {
  timestamp: 0,
  data: null
};

const CACHE_DURATION = 60000; // 1 minute cache

async function fetchMarketData() {
  if (marketDataCache.data && Date.now() - marketDataCache.timestamp < CACHE_DURATION) {
    return marketDataCache.data;
  }

  try {
    // Fetch crypto data from CoinGecko
    const cryptoResponse = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true'
    );

    // Format the data
    const marketData = {
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

    marketDataCache = {
      timestamp: Date.now(),
      data: marketData
    };

    return marketData;
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
}

export function registerRoutes(app: Express): Server {
  // Market data endpoint
  app.get('/api/market-data', async (req, res) => {
    try {
      const marketData = await fetchMarketData();
      res.json(marketData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch market data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}