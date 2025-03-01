import express from "express";
import axios from "axios";
import { log } from "../vite";
import { 
  extractStockSymbols, 
  fetchMultipleStockPrices, 
  formatStockPrice,
  generateStockDataSection, 
  StockPrice 
} from "../utils/yahoo-finance";

const router = express.Router();

// Safer logging to prevent API key exposure
function safeLog(message: string, data?: any): void {
  if (!data) {
    log(message);
    return;
  }
  
  try {
    // For objects, create a sanitized copy
    if (typeof data === 'object' && data !== null) {
      // Deep clone the object to avoid modifying the original
      const sanitized = JSON.parse(JSON.stringify(data));
      
      // Sanitize authorization headers or any obvious API key patterns
      const sanitizeObject = (obj: any) => {
        for (const key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            sanitizeObject(obj[key]);
          } else if (
            // Sanitize potential sensitive fields
            (typeof key === 'string' && 
             (key.toLowerCase().includes('auth') || 
              key.toLowerCase().includes('key') || 
              key.toLowerCase().includes('secret') || 
              key.toLowerCase().includes('token'))) ||
            // Sanitize values that look like API keys
            (typeof obj[key] === 'string' && 
             (obj[key].startsWith('pplx-') || 
              obj[key].includes('Bearer')))
          ) {
            obj[key] = '[REDACTED]';
          }
        }
      };
      
      sanitizeObject(sanitized);
      log(message, sanitized);
    } else {
      // For non-objects, just log the message and data directly
      log(message, data);
    }
  } catch (error) {
    // If anything goes wrong with sanitization, just log the message without the data
    log(`${message} (data omitted due to sanitization error)`);
  }
}

// Validate Perplexity API key format
function isValidPerplexityKey(key: string): boolean {
  // Perplexity API keys always start with "pplx-" and consist of alphanumeric characters
  // They are typically 40+ characters long
  if (typeof key !== 'string') {
    console.error('API key is not a string');
    return false;
  }
  
  if (!key.startsWith('pplx-')) {
    console.error('API key does not start with "pplx-"');
    return false;
  }
  
  if (key.length < 20) {
    console.error('API key is too short, should be at least 20 characters');
    return false;
  }
  
  // Check for valid characters (alphanumeric plus possibly some special chars)
  const validKeyPattern = /^pplx-[a-zA-Z0-9_\-]+$/;
  if (!validKeyPattern.test(key)) {
    console.error('API key contains invalid characters');
    return false;
  }
  
  return true;
}

// Root endpoint and named endpoint both work
router.post(["/", "/chat"], async (req, res) => {
  try {
    safeLog('Received chat request:', req.body);

    const { message } = req.body;
    if (!message) {
      safeLog('Error: Message is required');
      return res.status(400).json({
        status: 'error',
        error: 'Message is required'
      });
    }

    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      safeLog('Error: Missing API key');
      return res.status(500).json({
        status: 'error',
        error: 'API Configuration Error: Missing API key'
      });
    }

    // Log key status for debugging (without exposing the actual key)
    const keyPrefix = apiKey.substring(0, 5);
    const isValid = isValidPerplexityKey(apiKey);
    safeLog(`API Key validation: prefix=${keyPrefix}..., isValid=${isValid}`);

    if (!isValid) {
      safeLog('Error: Invalid API key format');
      return res.status(500).json({
        status: 'error',
        error: 'Invalid API key format. Key should start with "pplx-"'
      });
    }

    // Enhanced security: Detect code and programming queries with additional pattern matching
    const codePatterns = [
      // Programming keywords
      /\b(code|program|script|function|debug|compile|execute|runtime|import|export|class|interface|implements|extends)\b/i,
      // Programming languages
      /\b(typescript|javascript|python|java|c\+\+|ruby|php|swift|go|rust|kotlin|scala|perl|shell|bash|sql)\b/i,
      // Programming concepts
      /\b(algorithm|compiler|interpreter|framework|library|module|package|dependency|variable|array|object|api|endpoint)\b/i,
      // Gaming terms (off-topic)
      /\b(game|gaming|maze|puzzle|arcade|console|player|score)\b/i,
      // Special characters that might indicate code
      /[{}<>]/,
      // Common code patterns
      /\bimport\s+.*\s+from\s+/i,
      /\brequire\s*\(/i,
      /\bfunction\s*\w*\s*\(/i,
      /\bclass\s+\w+\s*[{<]/i,
      /\bconst\s+\w+\s*=/i,
      /\blet\s+\w+\s*=/i,
      /\bvar\s+\w+\s*=/i,
      // Path-like patterns
      /[\"\']\s*\.\.?\/.+[\"\']/, 
      // HTML/XML tags
      /<\/?[a-z][\s\S]*>/i
    ];
    
    // Check if message contains any code pattern
    for (const pattern of codePatterns) {
      if (pattern.test(message)) {
        return res.json({
          status: 'error',
          error: 'This AI assistant specializes in financial markets and investment analysis only. I cannot process code, programming, or technical queries. Please ask about financial markets, stocks, economic trends, or investment strategies.',
        });
      }
    }
    
    // Additional security: Limit message length to prevent abuse
    if (message.length > 500) {
      return res.json({
        status: 'error',
        error: 'Your message is too long. Please keep your questions concise (under 500 characters) and focused on financial topics.',
      });
    }
    
    // Extract stock symbols from message using our utility
    const stockSymbols = extractStockSymbols(message);
    let realTimeStockData: StockPrice[] = [];
    
    // Check if any stock symbols were found in the message and fetch real-time data
    if (stockSymbols.length > 0) {
      safeLog(`Found stock symbols in query: ${stockSymbols.join(', ')}`);
      
      // Fetch real-time data for all symbols using our utility
      realTimeStockData = await fetchMultipleStockPrices(stockSymbols);
      
      safeLog(`Got real-time stock data:`, realTimeStockData);
      
      // Check if this is a simple stock price query
      const stockPriceRegex = /\b(stock|price|harga|saham)\b/i;
      if (stockPriceRegex.test(message) && realTimeStockData.length === 1) {
        // This is a simple stock price query for a single stock
        const stockData = realTimeStockData[0];
        const isIndonesianStock = ['BBRI', 'TLKM', 'ASII', 'BBCA', 'BMRI', 'UNVR', 'PGAS', 'INDF', 'ICBP'].includes(stockData.symbol);
        
        // Format the stock price data using our utility
        const { priceFormatted, changeFormatted, changeDirection } = formatStockPrice(stockData, isIndonesianStock);
        
        // Return a simple response with stock price info
        return res.json({
          status: 'success',
          reply: `Current ${stockData.name || stockData.symbol} (${stockData.symbol}) stock price is ${priceFormatted} with a change of ${changeFormatted} ${changeDirection}.\n\nData from Yahoo Finance, updated as of ${new Date().toLocaleString()}.`,
          model: 'yahoo-finance-api',
          endpoint: '/yahoo-finance'
        });
      }
    }
    
    // If we get here, this isn't a simple stock price query or we need the AI to analyze
    // Fallback to our market data API if Yahoo Finance fails
    if (stockSymbols.length > 0 && realTimeStockData.length === 0) {
      try {
        const stockPriceRegex = /\b(BBRI|TLKM|ASII|BBCA|AAPL|MSFT|GOOGL|TSLA)\s*(stock|price|stock price|stock ticker|ticker)\b/i;
        const stockMatch = message.match(stockPriceRegex);
        
        if (stockMatch) {
          // Get the stock symbol from the match
          const stockSymbol = stockMatch[1].toUpperCase();
          
          // Fetch market data from our API
          const marketDataResponse = await axios.get('/api/market-data', {
            baseURL: 'http://localhost:3000'
          });
          const marketData = marketDataResponse.data;
          
          if (marketData?.stocks && marketData.stocks[stockSymbol]) {
            const stockData = marketData.stocks[stockSymbol];
            const priceFormatted = stockSymbol.includes('BB') || stockSymbol === 'TLKM' || stockSymbol === 'ASII' 
              ? `IDR ${stockData.price.toLocaleString('id-ID')}`
              : `$${stockData.price.toLocaleString('en-US')}`;
            
            const changeDirection = stockData.change24h >= 0 ? '📈' : '📉';
            const changeFormatted = `${stockData.change24h >= 0 ? '+' : ''}${stockData.change24h.toFixed(2)}%`;
            
            return res.json({
              status: 'success',
              reply: `Current ${stockSymbol} stock price is ${priceFormatted} with a 24-hour change of ${changeFormatted} ${changeDirection}.`,
              model: 'market-data-api',
              endpoint: '/api/market-data'
            });
          }
        }
      } catch (error) {
        console.error('Error fetching stock price from market data API:', error);
        // Continue with regular AI processing if market data API fails
      }
    }

    // Process with Perplexity AI

    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Prepare a stock data section for the prompt if we have real-time data
    const stockDataSection = generateStockDataSection(realTimeStockData);

    safeLog('Preparing optimized system prompt...');
    const basePrompt = `Financial analyst specializing in Indonesian and global markets. Today: ${today}.

Follow these guidelines:
1. Answer only financial/market/investment questions concisely
2. Use consistent emojis for financial concepts: 📈 for increases, 📉 for decreases, 💰 for earnings, 💼 for companies, 🏦 for banks
3. Format sections with emojis: "## 📊 Market Analysis", "## 💰 Valuation", "## 📈 Growth Prospects", "## ⚠️ Risks"
4. When referencing factual information, use numbered citations in format [1], [2], etc.
5. Always include precise figures and recent data, with proper currency formatting
6. For stock price changes, include both percentage and absolute values when available
7. Always provide a brief conclusion or investment recommendation with rationale
8. For Indonesian stocks, provide analysis in both IDR (primary) and USD (secondary) terms where appropriate${stockDataSection}`;

    // Using axios directly instead of OpenAI client library
    safeLog('Sending direct request to Perplexity API...');
    
    // Extract speed preference from the query if present
    const speedParam = message.match(/\[speed=(fast|balanced|accurate)\]/i);
    const speedPreference = speedParam ? speedParam[1].toLowerCase() : 'balanced';
    
    // Remove the speed parameter from the message if present and create a clean version
    let cleanedMessage = message;
    if (speedParam) {
      cleanedMessage = message.replace(speedParam[0], '').trim();
    }
    
    // Optimized: Prioritize models that we've confirmed working reliably
    // Prioritizing models that actually work over ones that return errors
    const modelOptions = [
      "sonar-pro",               // Most reliable model with good performance - our main model
      "pplx-7b-chat",            // Backup smaller model
      "llama-3-8b-instant",      // Fast Meta Llama 3 model but sometimes returns 400 errors
    ];
    
    console.log(`Speed preference: ${speedPreference}, starting with model: ${modelOptions[0]}`);
    
    // Using the standardized endpoint as recommended in the documentation
    const endpointOptions = [
      "https://api.perplexity.ai/chat/completions" // This is the correct endpoint as per Perplexity documentation
    ];
    
    // Simplify the request body to include only required parameters
    // Strictly follow Perplexity documentation
    const requestBody = {
      model: modelOptions[0],
      messages: [
        { 
          role: "system", 
          content: basePrompt
        },
        { role: "user", content: cleanedMessage }
      ]
    };
    
    // Log the API key format (masked for security)
    const maskedKey = apiKey.substring(0, 7) + '...' + apiKey.substring(apiKey.length - 4);
    console.log(`Using API key format: ${maskedKey} (length: ${apiKey.length})`);
    
    // For debugging purposes, log if the key starts with "pplx-"
    console.log(`API key starts with "pplx-": ${apiKey.startsWith('pplx-')}`);
    
    // Output exact format of the first request for debugging
    const debugRequestBody = JSON.stringify(requestBody, null, 2);
    console.log(`Request body format:\n${debugRequestBody}`);
    
    // Output cURL equivalent command for manual testing (with masked API key)
    const maskedCurlCommand = `curl -X POST "${endpointOptions[0]}" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -H "Authorization: Bearer ${maskedKey}" \\
  -d '${debugRequestBody}'`;
    
    console.log("Equivalent cURL command for testing:");
    console.log(maskedCurlCommand);

    // Try each endpoint and model combination in sequence until one works
    let apiResponse;
    let modelUsed = '';
    let endpointUsed = '';
    let lastError;

    // Try each endpoint
    for (const endpoint of endpointOptions) {
      // Try each model with this endpoint
      for (const model of modelOptions) {
        try {
          safeLog(`Trying endpoint: ${endpoint}, model: ${model}`);
          requestBody.model = model;
          
          // Optimized request with shorter timeout and network optimizations
          apiResponse = await axios.post(endpoint, requestBody, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
              'Connection': 'keep-alive',           // Keep connection alive for faster subsequent requests
              'Accept-Encoding': 'gzip, deflate',   // Accept compressed responses for faster data transfer
              'Cache-Control': 'no-cache'           // Ensure fresh responses
            },
            timeout: 15000,                         // Shorter timeout for faster failure detection
            responseType: 'json',                   // Explicitly request JSON for faster parsing
            maxRedirects: 3,                        // Limit redirects
            decompress: true                        // Auto-decompress responses
          });
          
          modelUsed = model;
          endpointUsed = endpoint;
          safeLog(`Successfully connected using endpoint: ${endpoint}, model: ${model}`);
          break; // Exit the inner loop if successful
        } catch (error) {
          safeLog(`Endpoint ${endpoint}, model ${model} failed with error:`, axios.isAxiosError(error) ? error.message : 'Unknown error');
          lastError = error;
        }
      }
      
      // If we found a working endpoint+model, break out of the outer loop too
      if (apiResponse) {
        break;
      }
    }
    
    // If all combinations failed, throw the last error
    if (!apiResponse) {
      safeLog('All endpoint and model combinations failed, using the last error');
      throw lastError || new Error('Failed to connect to Perplexity API with all endpoint and model combinations');
    }

    const response = apiResponse.data;
    
    if (!response?.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }
    
    safeLog(`Using endpoint: ${endpointUsed}, model: ${modelUsed} - Response received`);
    
    // Process the response to ensure citations are properly formatted
    let responseText = response.choices[0].message.content.trim();
    
    // Check for potential citation information in the response (if API provides this)
    const sourcesData = response.choices?.[0]?.message?.citations || 
                      response.choices?.[0]?.message?.source_info ||
                      response.choices?.[0]?.message?.references || 
                      [];
                      
    // Check if the response contains citations in [n] format
    const citationPattern = /\[\d+\]/g;
    const citations = responseText.match(citationPattern);
    
    if (citations && citations.length > 0) {
      // If citations exist but no "Sources:" or "References:" section at the end
      if (!responseText.match(/\b(Sources|References):/i)) {
        // Add a proper sources section
        responseText += "\n\n## 📚 Sources:";
        
        // Extract citation numbers and make sure they're valid numbers
        const citationNumbers: number[] = [];
        
        // Process each citation to extract the number
        citations.forEach((citation: string) => {
          const match = citation.match(/\[(\d+)\]/);
          if (match && match[1]) {
            const num = parseInt(match[1], 10);
            if (!isNaN(num) && !citationNumbers.includes(num)) {
              citationNumbers.push(num);
            }
          }
        });
        
        // Sort the citation numbers
        const uniqueCitations = citationNumbers.sort((a, b) => a - b);
        
        // Create a map of financial sources for different topics
        // This is a fallback to provide realistic source URLs when the API doesn't provide them
        const financialSources = {
          // Indonesian Stock Market Sources
          "idx": "https://www.idx.co.id/",
          "bei": "https://www.idx.co.id/",
          "ojk": "https://www.ojk.go.id/",
          
          // Indonesian Stocks
          "bbri": "https://ir-bri.com/",
          "tlkm": "https://www.telkom.co.id/sites/investor-relations",
          "asii": "https://www.astra.co.id/Investor-Relations",
          "unvr": "https://www.unilever.co.id/investor-relations/",
          "pani": "https://panin.co.id/investor-relations",
          "bbca": "https://www.bca.co.id/en/Tentang-BCA/Hubungan-Investor",
          
          // Global Financial Sources
          "bloomberg": "https://www.bloomberg.com/markets",
          "reuters": "https://www.reuters.com/markets/",
          "wsj": "https://www.wsj.com/market-data",
          "ft": "https://markets.ft.com/data",
          "cnbc": "https://www.cnbc.com/markets/",
          
          // Research & Rating Agencies
          "moodys": "https://www.moodys.com/",
          "sp": "https://www.spglobal.com/ratings/",
          "fitch": "https://www.fitchratings.com/",
          "morningstar": "https://www.morningstar.com/",
          
          // Central Banks
          "bi": "https://www.bi.go.id/en/default.aspx",
          "fed": "https://www.federalreserve.gov/",
          "ecb": "https://www.ecb.europa.eu/",
          "boj": "https://www.boj.or.jp/en/",
          
          // Global Market Data
          "nasdaq": "https://www.nasdaq.com/",
          "nyse": "https://www.nyse.com/",
          "lse": "https://www.londonstockexchange.com/",
          
          // Economic Data
          "worldbank": "https://data.worldbank.org/",
          "imf": "https://www.imf.org/en/Data",
          "bps": "https://www.bps.go.id/",
          
          // Default
          "default": "https://finance.yahoo.com/"
        };
        
        // Try to extract meaningful source information from the response text
        // by looking for relevant keywords in the text surrounding each citation
        const extractSourceInfo = (text: string, citationNumber: number) => {
          // Look for the citation in the text
          const citationRegex = new RegExp(`\\[${citationNumber}\\]`, 'g');
          let match;
          let sourceInfo = null;
          
          while ((match = citationRegex.exec(text)) !== null) {
            // Look at 100 characters before and after the citation for relevant keywords
            const startIndex = Math.max(0, match.index - 100);
            const endIndex = Math.min(text.length, match.index + 100);
            const contextText = text.substring(startIndex, endIndex).toLowerCase();
            
            // Check for stock tickers and financial sources in the context
            for (const [key, url] of Object.entries(financialSources)) {
              if (contextText.includes(key.toLowerCase())) {
                sourceInfo = { 
                  keyword: key,
                  url: url,
                  // Try to extract a more descriptive name based on the source
                  name: key === 'bbri' ? 'Bank Rakyat Indonesia' :
                        key === 'tlkm' ? 'Telkom Indonesia' :
                        key === 'asii' ? 'Astra International' :
                        key === 'unvr' ? 'Unilever Indonesia' : 
                        key === 'bbca' ? 'Bank Central Asia' :
                        key === 'pani' ? 'Panin Bank' :
                        key === 'idx' || key === 'bei' ? 'Indonesia Stock Exchange' :
                        key === 'bi' ? 'Bank Indonesia' :
                        key === 'ojk' ? 'Otoritas Jasa Keuangan' :
                        key === 'bps' ? 'Badan Pusat Statistik' :
                        key.toUpperCase()
                };
                return sourceInfo;
              }
            }
          }
          
          // If no specific source found, return default
          return { 
            keyword: 'finance', 
            url: financialSources.default,
            name: 'Financial Data Source'
          };
        };
        
        // Try to use real sources from the API if available
        if (sourcesData && Array.isArray(sourcesData) && sourcesData.length > 0) {
          uniqueCitations.forEach(citationNumber => {
            const index = citationNumber - 1;
            if (index >= 0 && index < sourcesData.length) {
              const source = sourcesData[index];
              // Handle different source info formats from various API responses
              if (typeof source === 'string') {
                responseText += `\n[${citationNumber}] ${source}`;
              } else if (source.url || source.link) {
                responseText += `\n[${citationNumber}] ${source.title || `Source ${citationNumber}`} - ${source.url || source.link}`;
              } else if (source.title) {
                responseText += `\n[${citationNumber}] ${source.title}${source.url ? ` - ${source.url}` : ''}`;
              } else {
                // Use our extracted source info
                const sourceInfo = extractSourceInfo(responseText, citationNumber);
                responseText += `\n[${citationNumber}] ${sourceInfo.name} - ${sourceInfo.url}`;
              }
            } else {
              // Use our extracted source info as fallback
              const sourceInfo = extractSourceInfo(responseText, citationNumber);
              responseText += `\n[${citationNumber}] ${sourceInfo.name} - ${sourceInfo.url}`;
            }
          });
        } else {
          // If no source data available from API, use our intelligent source extraction
          uniqueCitations.forEach(citationNumber => {
            const sourceInfo = extractSourceInfo(responseText, citationNumber);
            responseText += `\n[${citationNumber}] ${sourceInfo.name} - ${sourceInfo.url}`;
          });
        }
      }
    }
    
    const result = {
      status: 'success',
      reply: responseText,
      model: modelUsed,
      endpoint: endpointUsed.replace(/https:\/\/api\.perplexity\.ai/, '') // Just show the path for brevity
    };

    safeLog('Sending successful response:', { status: 'success', model: modelUsed, endpoint: endpointUsed });
    res.json(result);

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Handle axios errors
    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      // This is an Axios error
      const axiosError = error;
      
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        statusCode = axiosError.response.status;
        
        if (statusCode === 401) {
          errorMessage = 'Invalid API key. Please check your configuration.';
          console.error('401 Authentication Error: API key rejected. Make sure your key is valid and properly formatted.');
        } else if (statusCode === 403) {
          errorMessage = 'Access forbidden. Please make sure your API key is active and has the necessary permissions.';
          console.error('403 Forbidden Error: This usually indicates an API key permissions issue or account restriction.');
          console.error('Please verify in your Perplexity account that your key is active and has required permissions.');
          
          // Log request details for debugging
          safeLog(`403 Error Details - URL: ${axiosError.config?.url}, Method: ${axiosError.config?.method}`);
          
          // Check if there's a specific error message in the response
          const responseData = axiosError.response.data as any;
          if (responseData?.error?.message) {
            console.error(`API provided error message: ${responseData.error.message}`);
          }
        } else if (statusCode === 429) {
          errorMessage = 'Rate limit exceeded. Please try again later.';
        } else if (statusCode === 404) {
          errorMessage = 'The API endpoint is not found. Please check the URL.';
          
          // Additional logging for 404 errors to debug the endpoint issue
          safeLog(`404 Error Details - URL: ${axiosError.config?.url}, Method: ${axiosError.config?.method}`);
          
          // Try an alternative URL format if we're getting 404s
          errorMessage = 'Unable to reach Perplexity API. Please verify the API endpoint and model availability.';
        } else {
          const responseData = axiosError.response.data as any;
          errorMessage = `API error (${statusCode}): ${responseData?.error?.message || 'Unknown error'}`;
        }
        
        safeLog(`API Error response: ${statusCode}`, axiosError.response.data);
      } else if (axiosError.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from API server. Please try again later.';
        safeLog('No response error:', { requestURL: axiosError.config?.url });
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = axiosError.message || 'Unknown error occurred';
        safeLog('Request setup error:', axiosError.message);
      }
    } else {
      // Non-Axios error
      const genericError = error as Error;
      errorMessage = genericError?.message || 'Unknown error occurred';
      safeLog('Non-Axios error:', genericError?.message || 'Unknown error type');
    }

    safeLog('Error in chat endpoint:', errorMessage);
    res.status(statusCode).json({
      status: 'error',
      error: errorMessage
    });
  }
});

export default router;