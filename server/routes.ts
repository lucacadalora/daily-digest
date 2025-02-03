import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { execFile } from "child_process";
import { join } from "path";
import { MarketDataCache } from './utils/marketData';
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
}

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


const marketDataCache = new MarketDataCache();

export function registerRoutes(app: Express): Server {
  app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
    next();
  });

  app.use((req, res, next) => {
    const requestStart = Date.now();
    const originalEnd = res.end;
    const chunks: Buffer[] = [];

    res.end = function (chunk: any) {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }
      const responseTime = Date.now() - requestStart;
      const contentLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);

      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} (${responseTime}ms, ${contentLength} bytes)`);

      // @ts-ignore
      return originalEnd.apply(res, arguments);
    };

    next();
  });

  app.get('/api/market-data', async (req, res) => {
    try {
      const marketData = await marketDataCache.get();
      res.json(marketData);
    } catch (error) {
      console.error('Error in /api/market-data:', error);

      if (process.env.NODE_ENV === 'development') {
        const mockData = {
          crypto: {
            BTC: { price: 43250.50, change24h: 2.5 },
            ETH: { price: 2304.75, change24h: 1.8 }
          },
          stocks: {
            BBRI: { price: 5525, change24h: 0.5 },
            TLKM: { price: 3890, change24h: -0.3 },
            ASII: { price: 5975, change24h: 1.2 },
            BBCA: { price: 9250, change24h: 0.8 },
            AAPL: { price: 185.85, change24h: 1.5 },
            MSFT: { price: 405.75, change24h: 2.1 },
            GOOGL: { price: 142.50, change24h: 0.9 },
            TSLA: { price: 187.75, change24h: -1.2 }
          },
          indices: {
            IHSG: { price: 7120.5, change24h: 0.7 },
            'S&P500': { price: 4975.25, change24h: 1.1 },
            NASDAQ: { price: 15680.75, change24h: 1.8 },
            DJI: { price: 38450.50, change24h: 0.9 },
            NIKKEI: { price: 36250.75, change24h: 1.2 },
            HSI: { price: 15890.25, change24h: -0.8 }
          },
          forex: {
            'USD/IDR': { price: 15750, change24h: -0.2 }
          }
        };
        return res.json(mockData);
      }

      res.status(500).json({ 
        error: 'Failed to fetch market data',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post('/api/dev/refresh', async (req, res) => {
    console.log('Starting environment refresh...');

    try {
      const refreshScriptPath = join(__dirname, '..', 'scripts', 'refresh.js');

      execFile('node', [refreshScriptPath], (error, stdout, stderr) => {
        if (error) {
          console.error('Error running refresh script:', error);
          return res.status(500).json({ 
            error: 'Failed to refresh environment',
            message: error.message,
            details: {
              stdout,
              stderr
            }
          });
        }

        if (stderr) {
          console.warn('Refresh script warnings:', stderr);
        }

        console.log('Refresh script output:', stdout);
        res.json({ 
          message: 'Environment refresh completed successfully',
          details: {
            stdout,
            stderr: stderr || null
          }
        });
      });
    } catch (error) {
      console.error('Error in /api/dev/refresh:', error);
      res.status(500).json({ 
        error: 'Failed to refresh environment',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}