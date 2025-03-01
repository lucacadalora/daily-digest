import axios from 'axios';

// Define types for stock data
export interface StockPrice {
  price: number | null;
  change: number | null;
  name: string | null;
  symbol: string;
}

/**
 * Get real-time stock price from Yahoo Finance API
 */
export async function getYahooFinanceStockPrice(symbol: string): Promise<StockPrice> {
  try {
    // If the symbol doesn't have a suffix for Indonesian stocks, add .JK
    const querySymbol = symbol.includes('.') ? symbol : 
                      ['BBRI', 'TLKM', 'ASII', 'BBCA', 'BMRI', 'UNVR', 'PGAS', 'INDF', 'ICBP'].includes(symbol) 
                      ? `${symbol}.JK` : symbol;
    
    const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/quote`, {
      params: {
        symbols: querySymbol,
        fields: 'regularMarketPrice,regularMarketChange,regularMarketChangePercent,shortName,longName',
        region: 'US',
        lang: 'en-US',
        corsDomain: 'finance.yahoo.com'
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://finance.yahoo.com',
        'Referer': 'https://finance.yahoo.com/',
        'Cache-Control': 'no-cache',
      },
      timeout: 5000,
    });

    if (response.data?.quoteResponse?.result?.[0]) {
      const data = response.data.quoteResponse.result[0];
      return {
        symbol,
        price: data.regularMarketPrice || null,
        change: data.regularMarketChangePercent || null,
        name: data.shortName || data.longName || null
      };
    }
    
    // Try with a different API if the first one failed
    const alternativeResponse = await axios.get(`https://query2.finance.yahoo.com/v8/finance/quote`, {
      params: {
        symbols: querySymbol,
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
      },
      timeout: 5000,
    });

    if (alternativeResponse.data?.quoteResponse?.result?.[0]) {
      const data = alternativeResponse.data.quoteResponse.result[0];
      return {
        symbol,
        price: data.regularMarketPrice || null,
        change: data.regularMarketChangePercent || null,
        name: data.shortName || data.longName || null
      };
    }

    return { symbol, price: null, change: null, name: null };
  } catch (error) {
    console.error(`Failed to fetch stock price for ${symbol}:`, error);
    return { symbol, price: null, change: null, name: null };
  }
}

/**
 * Extract stock symbols from message text
 */
export function extractStockSymbols(message: string): string[] {
  // Common Indonesian stock patterns
  const patterns = [
    // Match standalone stock tickers like BBRI, TLKM, etc.
    /\b[A-Z]{4}\b/g,
    // Match tickers followed by .JK
    /\b[A-Z]{4}\.JK\b/g,
    // Match common abbreviations with period
    /\bBBRI\b|\bTLKM\b|\bBBCA\b|\bBMRI\b|\bUNVR\b|\bASII\b|\bPGAS\b|\bINDF\b|\bICBP\b/gi,
  ];

  const symbols = new Set<string>();
  
  // Extract using each pattern
  patterns.forEach(pattern => {
    const matches = message.match(pattern);
    if (matches) {
      matches.forEach(match => symbols.add(match.toUpperCase()));
    }
  });
  
  // Also check for specific stock names in message
  const stockNameMap: Record<string, string> = {
    'bank rakyat': 'BBRI',
    'bri': 'BBRI',
    'telkom': 'TLKM',
    'telekomunikasi': 'TLKM',
    'astra': 'ASII',
    'unilever': 'UNVR',
    'bank central asia': 'BBCA',
    'bca': 'BBCA',
    'mandiri': 'BMRI',
    'bank mandiri': 'BMRI',
    'perusahaan gas': 'PGAS',
    'pgn': 'PGAS',
    'indofood': 'INDF',
    'indofood cbp': 'ICBP'
  };
  
  Object.entries(stockNameMap).forEach(([name, symbol]) => {
    if (message.toLowerCase().includes(name.toLowerCase())) {
      symbols.add(symbol);
    }
  });
  
  return Array.from(symbols);
}

/**
 * Format stock price data in a user-friendly way
 */
export function formatStockPrice(stock: StockPrice, isIndonesian: boolean = false): {
  priceFormatted: string;
  changeFormatted: string;
  changeDirection: string;
} {
  // Default values in case price or change is null
  if (stock.price === null || stock.change === null) {
    return {
      priceFormatted: 'Price not available',
      changeFormatted: '0.00%',
      changeDirection: '🔄'
    };
  }

  // Format based on stock type
  const priceFormatted = isIndonesian
    ? `IDR ${stock.price.toLocaleString('id-ID')}`
    : `$${stock.price.toLocaleString('en-US')}`;
  
  // Format the change
  const changeDirection = stock.change >= 0 ? '📈' : '📉';
  const changeFormatted = `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%`;
  
  return {
    priceFormatted,
    changeFormatted,
    changeDirection
  };
}

/**
 * Fetch stock data for multiple symbols in parallel
 */
export async function fetchMultipleStockPrices(symbols: string[]): Promise<StockPrice[]> {
  if (symbols.length === 0) {
    return [];
  }
  
  try {
    // Fetch data for each symbol in parallel
    const stockDataPromises = symbols.map(symbol => getYahooFinanceStockPrice(symbol));
    const stockData = await Promise.all(stockDataPromises);
    
    // Filter out stocks where we couldn't get price data
    return stockData.filter(data => data.price !== null);
  } catch (error) {
    console.error('Error fetching multiple stock prices:', error);
    return [];
  }
}

/**
 * Generate a markdown-formatted stock data section for use in prompts
 */
export function generateStockDataSection(stockData: StockPrice[]): string {
  if (stockData.length === 0) {
    return '';
  }
  
  let section = '\n\n## Latest Real-Time Stock Data (from Yahoo Finance):\n';
  
  stockData.forEach(stock => {
    const isIndonesianStock = ['BBRI', 'TLKM', 'ASII', 'BBCA', 'BMRI', 'UNVR', 'PGAS', 'INDF', 'ICBP'].includes(stock.symbol);
    const { priceFormatted, changeFormatted, changeDirection } = formatStockPrice(stock, isIndonesianStock);
    
    section += `- ${stock.name || stock.symbol} (${stock.symbol}): ${priceFormatted}, Change: ${changeFormatted} ${changeDirection}\n`;
  });
  
  section += '\nPlease incorporate this latest data in your analysis.';
  return section;
}