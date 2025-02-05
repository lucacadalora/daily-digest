import express from "express";
import OpenAI from "openai";
import type { APIError } from "openai";

const router = express.Router();

// Helper function to send SSE messages
function sendSSE(res: express.Response, data: any) {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const apiKey = process.env.PERPLEXITY_API_KEY?.trim();
    console.log('Environment check:', {
      hasApiKey: !!apiKey,
      keyLength: apiKey?.length,
      nodeEnv: process.env.NODE_ENV
    });

    if (!apiKey || typeof apiKey !== 'string' || apiKey.length < 10) {
      console.error('API Key validation failed:', { hasKey: !!apiKey, keyLength: apiKey?.length });

      if (!res.headersSent) {
        return res.status(500).json({
          status: 'error',
          error: 'Missing or invalid API key. Please check your environment configuration.',
        });
      }
    }

    // Detect off-topic queries (programming, gaming, etc.)
    const nonMarketTerms = /\b(code|programming|typescript|javascript|python|game|gaming|maze|algorithm|compiler|database|API|endpoint)\b/i;
    if (nonMarketTerms.test(message)) {
      return res.json({
        status: 'error',
        error: 'This AI assistant specializes in financial markets and investment analysis. For programming or other topics, please use appropriate specialized resources.',
      });
    }

    // Match stock tickers: Traditional (AAPL), Indonesian (.JK), Indices (^GSPC)
    const stockTickerPattern = /\b[A-Z]{1,5}(\.[A-Z]{2})?\b|\^[A-Z]+\b/g;
    const hasStockTicker = stockTickerPattern.test(message);

    console.log('Processing query:', message);
    console.log('Has stock ticker:', hasStockTicker);

    // Set up SSE headers
    if (req.headers.accept === 'text/event-stream') {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders();

      // Send initial status
      sendSSE(res, { 
        status: 'start',
        message: 'Analyzing market data...'
      });
    }

    const basePrompt = `You are an expert financial and business analyst specializing in market analysis and investment research. Provide clear, concise, and accurate information based on your extensive knowledge of global financial markets, company valuations, and investment analysis.

Important: Only answer questions related to financial markets, investments, economic trends, and business analysis. If the question is outside these domains, inform the user that you can only assist with market-related queries.`;

    const detailedStockPrompt = `You are an expert financial and business analyst specializing in market analysis and investment research. Format your response using markdown syntax:

# 📊 Market Context
Provide a concise overview of the current market landscape, focusing on recent significant developments, positioning, and broader macroeconomic trends. Use market-specific terminology and insights for the latest developments.

## 💡 Key Metrics
* **Current Stock Price:** [Retrieve the latest stock price using a real-time financial data API]
* **Price-to-Earnings (P/E):** [Value, with comparison to industry peers and historical trends]
* **Discount to Peers:** [Value, comparison to regional peers or sector average]
* **Market Capitalization:** [Total market cap, with comparison to industry average or historical trends]
* **Earnings Growth (YoY/Quarterly):** [Latest earnings growth, with comparison to peers or historical growth]
* **Price-to-Book (P/B):** [Current P/B ratio with relevant context]
* **Debt-to-Equity Ratio:** [Ratio indicating leverage, with comparison to sector average]

## 💰 Dividend Outlook
2025 Projections: Dividend Yield: [X%] (estimated final dividend of IDR [value] per share)

## 💸 Fair Value Estimates
💡 **Peter Lynch Fair Value:** [Fair Value IDR, implying X% upside from the current price]
💸 **Analyst Consensus:** [Target prices range from IDR X to IDR Y, offering Z% upside]`;

    console.log('Creating OpenAI client with Perplexity configuration');

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.perplexity.ai"
    });

    console.log('OpenAI client initialized with Perplexity configuration');

    if (req.headers.accept === 'text/event-stream') {
      try {
        const stream = await client.chat.completions.create({
          model: "llama-3.1-sonar-small-128k-online",
          messages: [
            {
              role: "system",
              content: hasStockTicker ? detailedStockPrompt : basePrompt
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          stream: true
        });

        let fullContent = '';

        for await (const chunk of stream) {
          if (chunk.choices[0]?.delta?.content) {
            const content = chunk.choices[0].delta.content;
            fullContent += content;

            sendSSE(res, {
              status: 'chunk',
              content: content
            });
          }
        }

        // Send completion message
        sendSSE(res, {
          status: 'complete',
          content: fullContent
        });

        res.end();
        return;
      } catch (error) {
        console.error('Streaming Error:', error);
        if (!res.headersSent) {
          sendSSE(res, {
            status: 'error',
            error: 'An error occurred while processing your request. Please try again.'
          });
          res.end();
        }
        return;
      }
    }

    // Non-streaming fallback
    console.log('Using non-streaming API call');
    const response = await client.chat.completions.create({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "system",
          content: hasStockTicker ? detailedStockPrompt : basePrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.2,
      top_p: 0.9
    });

    if (!response?.choices?.[0]?.message?.content) {
      console.error('Invalid API response format:', JSON.stringify(response));
      throw new Error('Invalid API response format');
    }

    const content = response.choices[0].message.content;
    const citations = response && typeof response === 'object' && 'citations' in response ? 
      (response as any).citations || [] : [];

    res.json({
      status: 'success',
      reply: content.trim(),
      citations: citations
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (req.headers.accept === 'text/event-stream' && !res.headersSent) {
      sendSSE(res, {
        status: 'error',
        error: 'An error occurred while processing your request. Please try again.'
      });
      res.end();
    } else if (!res.headersSent) {
      res.status(500).json({
        status: 'error',
        error: 'An error occurred while processing your request. Please try again.',
      });
    }
  }
});

export default router;