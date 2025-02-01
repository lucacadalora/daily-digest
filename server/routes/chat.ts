import express from "express";
import OpenAI from "openai";

const router = express.Router();

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.PERPLEXITY_API_KEY) {
      console.error('API Key missing');
      throw new Error('Missing PERPLEXITY_API_KEY');
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
💸 **Analyst Consensus:** [Target prices range from IDR X to IDR Y, offering Z% upside]

## 📈 Detailed Analysis
Provide an in-depth analysis of the company's financial standing, including profit growth, asset quality, capital buffers, and key market catalysts. Highlight the company's competitive positioning and growth trajectory, particularly in areas such as market penetration and broader macroeconomic factors.

## 🎯 Expert Perspective
> "[Insert relevant expert quote with specific metrics or insights]"
— [Expert Name], [Organization]

## 💫 Growth Opportunities
* [Growth drivers like rate cuts, new market penetration, or product innovation]
* [Possible new revenue streams such as cross-selling services or expanding into new regions]
* [Competitive advantage over peers, such as improved operational efficiency or strong loan book quality]

## ⚠️ Risk Factors
* [Primary risks such as macroeconomic sensitivity, interest rate changes, and currency fluctuations]
* [Challenges with asset quality, such as rising NPLs or economic downturn impacts]
* [Regulatory or political risks, particularly with state ownership or directed lending]

## 📝 Bottom Line
Summarize key takeaways with actionable insights, focusing on investment opportunities. Provide a concise view of the potential total returns, including dividends and growth, along with risks to monitor. Offer a strategic recommendation based on the company's fundamentals and market outlook.`;

    console.log('Creating OpenAI client with Perplexity configuration');

    const client = new OpenAI({
      apiKey: process.env.PERPLEXITY_API_KEY,
      baseURL: "https://api.perplexity.ai"
    });

    console.log('Calling Perplexity API with configuration:', {
      model: "llama-3.1-sonar-small-128k-online",
      messageLength: message.length,
      hasSystemPrompt: true,
      hasStockTicker
    });

    let response;
    try {
      response = await client.chat.completions.create({
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

      console.log('API Response succeeded:', {
        status: 'success',
        modelUsed: response.model,
        tokensUsed: response.usage?.total_tokens
      });

    } catch (apiError) {
      console.error('Perplexity API Error:', apiError);
      throw new Error(`Failed to get response from Perplexity API: ${apiError.message}`);
    }

    if (!response?.choices?.[0]?.message?.content) {
      console.error('Invalid API response format:', JSON.stringify(response));
      throw new Error('Invalid API response format');
    }

    const content = response.choices[0].message.content;
    const citations = Array.isArray(response['citations']) ? response['citations'] : [];

    res.json({
      status: 'success',
      reply: content.trim(),
      citations: citations
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);

    res.status(500).json({
      status: 'error',
      error: errorMessage,
      details: 'An error occurred while processing your request. Please try again.'
    });
  }
});

export default router;