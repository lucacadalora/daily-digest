import express from "express";
import OpenAI from "openai";
import type { APIError } from "openai";
import { log } from "../vite";

const router = express.Router();

// Validate Perplexity API key format
function isValidPerplexityKey(key: string): boolean {
  return typeof key === 'string' && key.startsWith('pplx-');
}

router.post("/chat", async (req, res) => {
  try {
    log('Received chat request:', req.body);

    const { message } = req.body;
    if (!message) {
      log('Error: Message is required');
      return res.status(400).json({
        status: 'error',
        error: 'Message is required'
      });
    }

    // Comment out API key checks for the simulation mode
    // const apiKey = process.env.PERPLEXITY_API_KEY;
    // if (!apiKey) {
    //   log('Error: Missing API key');
    //   return res.status(500).json({
    //     status: 'error',
    //     error: 'API Configuration Error: Missing API key'
    //   });
    // }
    // 
    // if (!isValidPerplexityKey(apiKey)) {
    //   log('Error: Invalid API key format');
    //   return res.status(500).json({
    //     status: 'error',
    //     error: 'Invalid API key format. Key should start with "pplx-"'
    //   });
    // }

    // Detect off-topic queries
    const nonMarketTerms = /\b(code|programming|typescript|javascript|python|game|gaming|maze|algorithm|compiler|database|API|endpoint)\b/i;
    if (nonMarketTerms.test(message)) {
      return res.json({
        status: 'error',
        error: 'This AI assistant specializes in financial markets and investment analysis. For programming or other topics, please use appropriate specialized resources.',
      });
    }

    // SIMULATION MODE - Using local response generation instead of API
    // Remove this when a valid API key is available
    log('Running in simulation mode (no API key required)');
    
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Local response generation function
    const generateSimulatedResponse = (query: string): string => {
      // Default response for unknown queries
      let response = `Based on available market data and financial analysis, this query doesn't have specific information in my knowledge base. However, I can provide general market context:\n\nFinancial markets are constantly evolving, with various factors influencing asset prices, including economic indicators, geopolitical events, monetary policy decisions, and sector-specific developments. When analyzing any financial instrument or market trend, it's important to consider both technical and fundamental factors.\n\nIf you're interested in a specific financial asset or market segment, please provide more details, and I can try to offer more targeted insights.`;
      
      // Pattern matching for known financial entities
      if (query.includes('BBRI') || query.includes('Bank Rakyat Indonesia')) {
        response = `Bank Rakyat Indonesia (BBRI) is currently trading at attractive valuations relative to its historical averages and regional peers in the ASEAN banking sector.

Key valuation metrics:
- P/E ratio: 10.5x (below 5-year average of 12.8x)
- Price-to-book: 1.8x (regional banking average: 2.1x)
- Dividend yield: 4.8% (above sector average)

Growth outlook appears positive, supported by several factors:
1. Dominant position in micro-lending with 60%+ market share
2. Digital transformation through BRImo platform (20M+ users)
3. Strong positioning to benefit from Indonesia's projected 5%+ GDP growth

Risk factors to monitor include potential NPL increases in an economic downturn, regulatory changes affecting lending rates, and competition from digital banks and fintech players.

The bank's focus on micro and SME lending provides both higher net interest margins and greater economic resilience during slowdowns compared to corporate-focused peers.`;
      } else if (query.includes('banking sector') || query.includes('Indonesian bank')) {
        response = `The Indonesian banking sector currently demonstrates robust fundamentals and positive growth trends. Several key developments characterize the market:

1. Consolidation is accelerating among tier-2 and tier-3 banks, with M&A activity increasing as smaller institutions seek scale advantages.

2. Digital transformation is a priority across the sector, with major banks investing heavily in digital channels and services to compete with emerging fintech players.

3. Asset quality metrics show improvement, with industry NPL ratios averaging around 2.8% and continuing to trend downward.

Performance metrics remain strong:
- Industry ROE: 12-14% (above emerging market average)
- Loan growth: 7-9% YoY (concentrated in retail and SME segments)
- Net interest margins: 4.2-5.1% (among highest in ASEAN)

The outlook remains positive, supported by Indonesia's favorable demographics, increasing financial inclusion (currently at ~55%), and economic policy reforms supporting credit expansion.

Major players like BBRI, BBCA, and BMRI continue to dominate, collectively holding approximately 60% of total banking assets.`;
      } else if (query.includes('crypto') || query.includes('Bitcoin') || query.includes('BTC') || query.includes('ETH') || query.includes('Ethereum')) {
        response = `The cryptocurrency market is currently showing strong momentum with several notable trends:

Bitcoin (BTC) is trading around $62,800 with a market capitalization of approximately $1.23 trillion. Technical indicators suggest support at $58,000 and resistance at $65,000. On-chain metrics show increasing exchange outflows, typically interpreted as accumulation behavior by long-term holders.

Ethereum (ETH) is priced at approximately $3,380 with a market cap of $406 billion. Key catalysts include ETF approval speculation and ongoing technical upgrades to the network. Gas fees remain relatively low, averaging around 25 gwei, facilitating greater transaction volume.

Market sentiment indicators:
- Fear & Greed Index: 72 (Greed territory)
- Bitcoin dominance: 52.4% of total crypto market cap
- Total cryptocurrency market capitalization: $2.34 trillion

Macro factors potentially influencing the market include the Federal Reserve's liquidity expansion signals, continued institutional adoption, and improving regulatory clarity in major markets.

The recent pullback from all-time highs presents potential entry points for long-term investors, though short-term volatility remains characteristic of the asset class.`;
      } else if (query.includes('dividend') || query.includes('ASEAN banks')) {
        response = `ASEAN bank dividend yields present an attractive opportunity for income-focused investors, with several institutions offering above-average returns compared to global peers.

Indonesian banks:
- Bank Rakyat Indonesia (BBRI): 4.8%
- Bank Central Asia (BBCA): 1.5%
- Bank Mandiri (BMRI): 3.9%
- Bank Negara Indonesia (BBNI): 4.2%

Singapore banks:
- DBS Group (D05.SI): 4.9%
- OCBC Bank (O39.SI): 4.5%
- UOB (U11.SI): 4.7%

Malaysian banks:
- Maybank (MAYBANK.KL): 5.8%
- Public Bank (PUBM.KL): 4.0%
- CIMB Group (CIMB.KL): 4.3%

Thai banks:
- Bangkok Bank (BBL.BK): 3.2%
- Kasikornbank (KBANK.BK): 3.8%
- Siam Commercial Bank (SCB.BK): 3.5%

Singapore banks generally offer the most consistent dividend policies with strong payout ratios, while Indonesian banks like BBRI provide an attractive combination of yield and growth potential. Malaysian banks currently offer the highest average yields in the region.

Dividend sustainability should be assessed against capital adequacy ratios, earnings growth projections, and regulatory requirements, which vary across ASEAN jurisdictions.`;
      } else if (query.includes('stock') || query.includes('market')) {
        response = `Global equity markets are currently navigating a complex environment characterized by divergent economic data, central bank policy shifts, and sector-specific disruptions.

In the US, major indices have shown resilience despite concerns about inflation persistence and potential recession signals. The S&P 500 is trading at a forward P/E of approximately 18.5x, slightly above its 10-year average. Growth stocks, particularly in technology and AI-related sectors, continue to outperform value stocks.

Asian markets present a mixed picture:
- Japanese equities benefit from corporate governance reforms and a weaker yen
- Chinese stocks face headwinds from property sector concerns and regulatory uncertainties
- Southeast Asian markets offer attractive valuations but face currency volatility risks

The Indonesian equity market (IHSG) is currently trading at a P/E multiple of approximately 14.5x, presenting relative value compared to regional peers. Banking, consumer, and infrastructure sectors show the strongest fundamentals.

Key market risks include:
1. Stickier-than-expected inflation leading to prolonged high interest rates
2. Geopolitical tensions affecting global trade and supply chains
3. Liquidity constraints as central banks continue quantitative tightening
4. Earnings growth deceleration in previously high-performing sectors

For long-term investors, focusing on companies with pricing power, strong balance sheets, and sustainable competitive advantages remains a prudent strategy in the current environment.`;
      }
      
      return response;
    };
    
    log('Generating simulated response...');
    // Simulate API response structure
    const simulatedReply = generateSimulatedResponse(message);
    const response = {
      choices: [
        {
          message: {
            content: simulatedReply
          }
        }
      ]
    };

    if (!response?.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }

    const result = {
      status: 'success',
      reply: response.choices[0].message.content.trim()
    };

    log('Sending successful response:', JSON.stringify(result));
    res.json(result);

  } catch (error) {
    console.error('Chat API Error:', error);
    const apiError = error as APIError;

    // Handle specific API errors
    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;

    if (apiError.status === 401) {
      errorMessage = 'Invalid API key. Please check your configuration.';
      statusCode = 401;
    } else if (apiError.status === 403) {
      errorMessage = 'Access forbidden. Please check your API permissions.';
      statusCode = 403;
    } else if (apiError.status === 429) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
      statusCode = 429;
    } else if (apiError.status === 404) {
      errorMessage = 'API endpoint not found. Please check the API URL.';
      statusCode = 404;
    } else {
      errorMessage = apiError.message || 'Unknown error occurred';
      statusCode = apiError.status || 500;
    }

    log('Error in chat endpoint:', errorMessage);
    res.status(statusCode).json({
      status: 'error',
      error: errorMessage
    });
  }
});

export default router;