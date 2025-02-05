import express from "express";
import OpenAI from "openai";
import type { APIError } from "openai";

const router = express.Router();

const basePrompt = `You are an expert financial and business analyst specializing in market analysis and investment research. Provide clear, concise, and accurate information based on your extensive knowledge of global financial markets, company valuations, and investment analysis.

Important: Only answer questions related to financial markets, investments, economic trends, and business analysis. If the question is outside these domains, inform the user that you can only assist with market-related queries.`;

const detailedStockPrompt = `You are an expert financial and business analyst specializing in market analysis and investment research. Format your response using markdown syntax:

# 📊 Market Context
Provide a concise overview of the current market landscape, focusing on recent significant developments, positioning, and broader macroeconomic trends. Use market-specific terminology and insights for the latest developments.

## 💡 Key Metrics
* **Current Stock Price:** [Latest market price]
* **Price-to-Earnings (P/E):** [Value, with comparison to industry peers]
* **Market Capitalization:** [Total market cap]
* **Earnings Growth:** [Latest earnings growth]

## 💰 Dividend Outlook
Expected Dividend Yield and Projections

## 💸 Fair Value Analysis
Current valuation metrics and potential growth scenarios`;

// Helper function to send SSE messages
function sendSSE(res: express.Response, data: any) {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        status: 'error',
        error: 'Message is required'
      });
    }

    const apiKey = process.env.PERPLEXITY_API_KEY?.trim();

    if (!apiKey) {
      return res.status(500).json({
        status: 'error',
        error: 'Missing API key. Please add PERPLEXITY_API_KEY to your Secrets.'
      });
    }

    if (apiKey.length < 10) {
      return res.status(500).json({
        status: 'error', 
        error: 'Invalid API key format. Please check your PERPLEXITY_API_KEY in Secrets.'
      });
    }

    // Detect off-topic queries
    const nonMarketTerms = /\b(code|programming|typescript|javascript|python|game|gaming|maze|algorithm|compiler|database|API|endpoint)\b/i;
    if (nonMarketTerms.test(message)) {
      return res.status(400).json({
        status: 'error',
        error: 'This AI assistant specializes in financial markets and investment analysis. For programming or other topics, please use appropriate specialized resources.'
      });
    }

    // Match stock tickers
    const stockTickerPattern = /\b[A-Z]{1,5}(\.[A-Z]{2})?\b|\^[A-Z]+\b/g;
    const hasStockTicker = stockTickerPattern.test(message);

    // Set up SSE headers if streaming is requested
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

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.perplexity.ai",
      defaultHeaders: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    // Handle streaming response
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
        sendSSE(res, {
          status: 'error',
          error: 'An error occurred while processing your request. Please try again.'
        });
        res.end();
        return;
      }
    }

    // Non-streaming fallback
    try {
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
        throw new Error('Invalid API response format');
      }

      const content = response.choices[0].message.content;
      return res.json({
        status: 'success',
        reply: content.trim()
      });
    } catch (error) {
      console.error('Non-streaming Error:', error);
      return res.status(500).json({
        status: 'error',
        error: 'An error occurred while processing your request. Please try again.'
      });
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    const errorResponse = {
      status: 'error',
      error: 'An error occurred while processing your request. Please try again.'
    };

    if (!res.headersSent) {
      if (req.headers.accept === 'text/event-stream') {
        sendSSE(res, errorResponse);
        res.end();
      } else {
        res.status(500).json(errorResponse);
      }
    }
  }
});

export default router;