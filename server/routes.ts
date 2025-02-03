import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { execFile } from "child_process";
import { join } from "path";

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

class MarketDataCache {
  private cache: {
    timestamp: number;
    data: MarketData;
  };

  constructor() {
    this.cache = {
      timestamp: 0,
      data: this.getInitialData()
    };
  }

  private getInitialData(): MarketData {
    const defaultPrice = { price: 0, change24h: 0 };
    return {
      crypto: {
        BTC: defaultPrice,
        ETH: defaultPrice
      },
      stocks: {
        BBRI: defaultPrice,
        TLKM: defaultPrice,
        ASII: defaultPrice,
        BBCA: defaultPrice,
        AAPL: defaultPrice,
        MSFT: defaultPrice,
        GOOGL: defaultPrice,
        TSLA: defaultPrice
      },
      indices: {
        IHSG: defaultPrice,
        'S&P500': defaultPrice,
        NASDAQ: defaultPrice,
        DJI: defaultPrice,
        NIKKEI: defaultPrice,
        HSI: defaultPrice
      },
      forex: {
        'USD/IDR': defaultPrice
      }
    };
  }

  async get(): Promise<MarketData> {
    const now = Date.now();
    if (now - this.cache.timestamp < 30000) { // 30 second cache
      return this.cache.data;
    }

    try {
      const data = await this.fetchFreshData();
      this.cache = {
        timestamp: now,
        data
      };
      return data;
    } catch (error) {
      console.error('Error fetching market data:', error);
      if (this.cache.data) {
        return this.cache.data; // Return stale data if available
      }
      throw error;
    }
  }

  private async fetchFreshData(): Promise<MarketData> {
    const allSymbols = [
      ...Object.values(SYMBOLS.crypto),
      ...Object.values(SYMBOLS.stocks),
      ...Object.values(SYMBOLS.indices),
      ...Object.values(SYMBOLS.forex)
    ].join(',');

    try {
      const response = await axios.get('https://query2.finance.yahoo.com/v8/finance/quote', {
        params: {
          symbols: allSymbols,
          fields: 'regularMarketPrice,regularMarketChangePercent'
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      console.log('Yahoo Finance API Response:', {
        status: response.status,
        dataLength: response.data?.quoteResponse?.result?.length || 0
      });

      const quotes = response.data?.quoteResponse?.result || [];
      const quoteMap = new Map(quotes.map((quote: any) => [quote.symbol, quote]));

      const mapQuote = (symbol: string): MarketPrice => {
        const quote = quoteMap.get(symbol);
        if (!quote) {
          console.warn(`No data available for symbol: ${symbol}`);
          return { price: 0, change24h: 0 };
        }
        return {
          price: Number(quote.regularMarketPrice) || 0,
          change24h: Number(quote.regularMarketChangePercent) || 0
        };
      };

      return {
        crypto: {
          BTC: mapQuote(SYMBOLS.crypto.BTC),
          ETH: mapQuote(SYMBOLS.crypto.ETH)
        },
        stocks: {
          BBRI: mapQuote(SYMBOLS.stocks.BBRI),
          TLKM: mapQuote(SYMBOLS.stocks.TLKM),
          ASII: mapQuote(SYMBOLS.stocks.ASII),
          BBCA: mapQuote(SYMBOLS.stocks.BBCA),
          AAPL: mapQuote(SYMBOLS.stocks.AAPL),
          MSFT: mapQuote(SYMBOLS.stocks.MSFT),
          GOOGL: mapQuote(SYMBOLS.stocks.GOOGL),
          TSLA: mapQuote(SYMBOLS.stocks.TSLA)
        },
        indices: {
          IHSG: mapQuote(SYMBOLS.indices.IHSG),
          'S&P500': mapQuote(SYMBOLS.indices['S&P500']),
          NASDAQ: mapQuote(SYMBOLS.indices.NASDAQ),
          DJI: mapQuote(SYMBOLS.indices.DJI),
          NIKKEI: mapQuote(SYMBOLS.indices.NIKKEI),
          HSI: mapQuote(SYMBOLS.indices.HSI)
        },
        forex: {
          'USD/IDR': mapQuote(SYMBOLS.forex['USD/IDR'])
        }
      };
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  }
}

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