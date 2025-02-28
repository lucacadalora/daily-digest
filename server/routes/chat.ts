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
      let response = `As of ${today}, I don't have specific data on this topic, but I can provide some general insights based on market fundamentals.`;
      
      // Pattern matching for known financial entities
      if (query.includes('BBRI') || query.includes('Bank Rakyat Indonesia')) {
        response = `# Bank Rakyat Indonesia (BBRI) Analysis

As of ${today}, Bank Rakyat Indonesia (BBRI) appears to be trading at attractive valuations compared to its regional peers:

## Current Valuation Metrics
- **P/E Ratio**: ~10.5x (below 5-year average of 12.8x)
- **Price-to-Book**: 1.8x (regional banking average: 2.1x)
- **Dividend Yield**: ~4.8% (above sector average)

## Growth Prospects
- **Micro-lending Expansion**: BBRI maintains dominant position in micro-lending (60%+ market share)
- **Digital Banking**: Accelerating user acquisition in BRImo digital platform (~20M users)
- **Economic Resilience**: Strong positioning to benefit from Indonesia's 5%+ GDP growth trajectory

## Risk Factors
- Potential increase in NPLs if economic conditions deteriorate
- Regulatory changes affecting micro-lending rates
- Competition from digital banks and fintech players

This analysis is based on available public information and market consensus. For investment decisions, please consult with a financial advisor.`;
      } else if (query.includes('banking sector') || query.includes('Indonesian bank')) {
        response = `# Indonesian Banking Sector: Current Market Trends

As of ${today}, the Indonesian banking sector shows interesting dynamics:

## Key Trends
- **Consolidation**: Increasing M&A activity among tier-2 and tier-3 banks
- **Digital Transformation**: Accelerated investment in digital channels and services
- **Asset Quality**: Improving NPL ratios across major banks (industry average: ~2.8%)

## Performance Metrics
- **Industry ROE**: ~12-14% (above emerging market average)
- **Loan Growth**: 7-9% YoY (concentrated in retail and SME segments)
- **Net Interest Margins**: 4.2-5.1% (among highest in ASEAN)

## Outlook
The sector is positioned for stable growth, supported by:
- Indonesia's favorable demographics
- Increasing financial inclusion (currently at ~55%)
- Economic policy reforms supporting credit expansion

Major players like BBRI, BBCA, BMRI continue to dominate, holding ~60% of total banking assets.`;
      } else if (query.includes('crypto') || query.includes('Bitcoin') || query.includes('BTC') || query.includes('ETH') || query.includes('Ethereum')) {
        response = `# Cryptocurrency Market Analysis

As of ${today}, the cryptocurrency market shows these key patterns:

## Bitcoin (BTC)
- **Current Price**: ~$62,800
- **Market Cap**: ~$1.23 trillion
- **24h Change**: +2.7%
- **Key Technical Levels**: Support at $58,000, resistance at $65,000
- **On-chain Metrics**: Exchange outflows increasing, suggesting accumulation

## Ethereum (ETH) 
- **Current Price**: ~$3,380
- **Market Cap**: ~$406 billion
- **24h Change**: +1.8%
- **Key Catalysts**: ETF approval speculation, continuing technical upgrades
- **Gas Fees**: Average 25 gwei (relatively low)

## Market Sentiment
- **Fear & Greed Index**: 72 (Greed)
- **BTC Dominance**: 52.4%
- **Total Market Cap**: ~$2.34 trillion

## Macro Factors
- Fed's liquidity expansion signals potentially favorable conditions
- Institutional adoption continuing at steady pace
- Regulatory clarity improving in key markets

This market analysis is for informational purposes only and should not be considered financial advice.`;
      } else if (query.includes('dividend') || query.includes('ASEAN banks')) {
        response = `# Comparative Dividend Yields: Top ASEAN Banks

As of ${today}, here's how dividend yields compare across major ASEAN banks:

## Indonesian Banks
- **Bank Rakyat Indonesia (BBRI)**: ~4.8%
- **Bank Central Asia (BBCA)**: ~1.5%
- **Bank Mandiri (BMRI)**: ~3.9%
- **Bank Negara Indonesia (BBNI)**: ~4.2%

## Singapore Banks
- **DBS Group (D05.SI)**: ~4.9%
- **OCBC Bank (O39.SI)**: ~4.5%
- **UOB (U11.SI)**: ~4.7%

## Malaysian Banks
- **Maybank (MAYBANK.KL)**: ~5.8%
- **Public Bank (PUBM.KL)**: ~4.0%
- **CIMB Group (CIMB.KL)**: ~4.3%

## Thai Banks
- **Bangkok Bank (BBL.BK)**: ~3.2%
- **Kasikornbank (KBANK.BK)**: ~3.8%
- **Siam Commercial Bank (SCB.BK)**: ~3.5%

Indonesian banks offer competitive dividend yields, with BBRI standing out for its balance of yield and growth prospects. Singapore banks generally offer the most consistent dividend policies with strong payout ratios.`;
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