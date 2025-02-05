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

    const apiKey = process.env.PERPLEXITY_API_KEY;

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

    // Detect off-topic queries (programming, gaming, etc.)
    const nonMarketTerms = /\b(code|programming|typescript|javascript|python|game|gaming|maze|algorithm|compiler|database|API|endpoint)\b/i;
    if (nonMarketTerms.test(message)) {
      return res.json({
        status: 'error',
        error: 'This AI assistant specializes in financial markets and investment analysis. For programming or other topics, please use appropriate specialized resources.'
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

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.perplexity.ai",
      defaultHeaders: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      dangerouslyAllowBrowser: true
    });

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
      const citations = response && typeof response === 'object' && 'citations' in response ? 
        (response as any).citations || [] : [];

      return res.json({
        status: 'success',
        reply: content.trim(),
        citations: citations
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

    if (!res.headersSent) {
      const errorResponse = {
        status: 'error',
        error: 'An error occurred while processing your request. Please try again.'
      };

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