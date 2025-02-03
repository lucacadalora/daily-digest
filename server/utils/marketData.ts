import axios from 'axios';
import type { MarketData, MarketPrice } from '../types';

export class MarketDataCache {
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
    if (process.env.NODE_ENV === 'development') {
      throw new Error('Using mock data in development');
    }

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
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site'
        }
      });

      const quotes = response.data?.quoteResponse?.result || [];
      const quoteMap = new Map(quotes.map((quote: any) => [quote.symbol, quote]));

      return this.mapQuotesToMarketData(quoteMap);
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  }

  private mapQuotesToMarketData(quoteMap: Map<string, any>): MarketData {
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
  }
}
