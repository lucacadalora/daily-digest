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
  // Initialize a set to store unique stock symbols
  const symbols = new Set<string>();
  
  // ===== STEP 1: Prepare different message formats for matching =====
  // Basic normalization - lowercase and remove extra spaces
  const basicNormalizedMsg = message.toLowerCase().replace(/\s+/g, ' ');
  
  // Create a version without time-related words for better matching
  const msgWithoutTimeWords = basicNormalizedMsg
    .replace(/latest|current|recent|today\'s|now|real-?time/g, '')
    .trim();
  
  // ===== STEP 2: Direct regex pattern matching =====
  const patterns = [
    // Indonesian stock tickers
    /\b(?:BBRI|TLKM|BBCA|BMRI|UNVR|ASII|PGAS|INDF|ICBP|ANTM|WIFI|GOTO|BREN|BBNI)\b/gi,
    // Match tickers followed by .JK (Indonesian stock exchange suffix)
    /\b[A-Z]{4}\.JK\b/gi,
    // General 4-letter stock symbol pattern often used in IDX
    /\b[A-Z]{4}\b/g,
    // US stock patterns
    /\b(?:AAPL|MSFT|GOOGL|GOOG|AMZN|TSLA|META|NFLX|NVDA)\b/gi,
    // Detect stock symbols in analysis context
    /(?:analyze|analysis|saham|stock)\s+([A-Z]{1,5})\b/gi,
    // Detect stock keywords in other formats
    /\b(?:ticker|symbol)\s*:\s*([A-Z]{1,5})\b/gi,
  ];

  // Process regex patterns on the basic normalized message
  patterns.forEach(pattern => {
    const matches = basicNormalizedMsg.match(pattern);
    if (matches) {
      matches.forEach(match => {
        // Clean up the match to extract just the symbol part
        const cleanMatch = match.replace(/analyze|analysis|saham|stock|ticker|symbol|:|\.jk/gi, '').trim().toUpperCase();
        if (cleanMatch.length >= 2 && cleanMatch.length <= 5) {
          symbols.add(cleanMatch);
        }
      });
    }
  });
  
  // ===== STEP 3: Name-to-Symbol mapping for company names =====
  const stockNameMap: Record<string, string> = {
    // Indonesian banks
    'bank rakyat': 'BBRI',
    'bri': 'BBRI',
    'bank bri': 'BBRI',
    'bank central asia': 'BBCA',
    'bca': 'BBCA',
    'bank mandiri': 'BMRI',
    'mandiri': 'BMRI',
    'bank negara indonesia': 'BBNI',
    'bni': 'BBNI',
    
    // Telecoms
    'telkom': 'TLKM',
    'telekomunikasi': 'TLKM',
    'telekomunikasi indonesia': 'TLKM',
    'wifi': 'WIFI',
    'smartfren': 'WIFI',
    
    // Consumer goods
    'unilever': 'UNVR',
    'unilever indonesia': 'UNVR',
    'indofood': 'INDF',
    'indofood cbp': 'ICBP',
    
    // Industrials
    'astra': 'ASII',
    'astra international': 'ASII',
    
    // Energy & Mining
    'perusahaan gas': 'PGAS',
    'pgn': 'PGAS',
    'aneka tambang': 'ANTM',
    'antam': 'ANTM',
    
    // Tech
    'goto': 'GOTO',
    'gojek': 'GOTO',
    'tokopedia': 'GOTO',
    'gojek tokopedia': 'GOTO',
    'barito renewables': 'BREN',
    'bren': 'BREN',
    
    // US tech
    'apple': 'AAPL',
    'microsoft': 'MSFT',
    'google': 'GOOGL',
    'amazon': 'AMZN',
    'tesla': 'TSLA',
    'meta': 'META',
    'facebook': 'META',
    'netflix': 'NFLX',
    'nvidia': 'NVDA',
  };
  
  // ===== STEP 4: Process company names in all message formats =====
  // Check original message
  Object.entries(stockNameMap).forEach(([name, symbol]) => {
    if (message.toLowerCase().includes(name.toLowerCase())) {
      symbols.add(symbol);
    }
  });
  
  // Also check the version without time words (to catch "latest BBRI" etc.)
  if (msgWithoutTimeWords !== basicNormalizedMsg) {
    Object.entries(stockNameMap).forEach(([name, symbol]) => {
      if (msgWithoutTimeWords.includes(name.toLowerCase())) {
        symbols.add(symbol);
      }
    });
  }
  
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
  
  // Create a more prominent section to ensure the AI model emphasizes this data
  let section = '\n\n## 📊 REAL-TIME STOCK DATA (YAHOO FINANCE):\n';
  section += '**Important: Always cite this data with [Source: Yahoo Finance] in your analysis**\n\n';
  
  stockData.forEach(stock => {
    const isIndonesianStock = ['BBRI', 'TLKM', 'ASII', 'BBCA', 'BMRI', 'UNVR', 'PGAS', 'INDF', 'ICBP'].includes(stock.symbol);
    const { priceFormatted, changeFormatted, changeDirection } = formatStockPrice(stock, isIndonesianStock);
    
    const timestamp = new Date().toLocaleString();
    // Add more details and make the formatting more prominent
    section += `### ${stock.name || stock.symbol} (${stock.symbol}):\n`;
    section += `- **Current Price:** ${priceFormatted} ${changeDirection}\n`;
    section += `- **Change:** ${changeFormatted}\n`;
    section += `- **Last Updated:** ${timestamp}\n`;
    section += `- **Citation:** When referencing this data, cite as [Source: Yahoo Finance, ${timestamp}]\n\n`;
  });
  
  section += '\nPlease incorporate this latest data in your analysis.';
  return section;
}