import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.PERPLEXITY_API_KEY) {
      console.error('API Key missing');
      throw new Error('Missing PERPLEXITY_API_KEY');
    }

    const restrictedTerms = /\b(sql injection|xss|database schema|api endpoint|code syntax|programming language|compiler|runtime|debugging)\b/i;
    if (restrictedTerms.test(message)) {
      return res.json({
        status: 'success',
        reply: "I focus on business, market, and investment analysis. For coding-related questions, please consult programming-specific resources."
      });
    }

    console.log('Processing query:', message);

    const systemPrompt = `You are an expert financial and business analyst specializing in market analysis and investment research. Format your response using markdown syntax:

# 📊 Market Context
Provide a concise overview of the current market landscape, focusing on recent significant developments, positioning, and broader macroeconomic trends. Use market-specific terminology and insights for the latest developments.

## 💡 Key Metrics
* **Current Stock Price:** [Retrieve the latest stock price using a real-time financial data API]
* **Price-to-Earnings (P/E):** [Value, with comparison to industry peers and historical trends]
* **Loan Growth (Digital/Traditional):** [Year-over-year or quarterly growth rate]
* **Discount to Peers:** [Value, comparison to regional peers]

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

    console.log('Calling Perplexity API with configuration:', {
      model: "sonar",
      messageLength: message.length,
      hasSystemPrompt: true
    });

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: "sonar",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        timeout: 30000
      }
    );

    console.log('API Response status:', response.status);
    console.log('API Response headers:', response.headers);

    if (!response.data?.choices?.[0]?.message?.content) {
      console.error('Invalid API response format:', JSON.stringify(response.data));
      throw new Error('Invalid API response format');
    }

    const content = response.data.choices[0].message.content;
    const citations = response.data.citations || [];

    res.json({
      status: 'success',
      reply: content.trim(),
      citations: citations
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);

    if (axios.isAxiosError(error)) {
      console.error('API Error Response:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
    }

    res.status(500).json({
      status: 'error',
      error: 'Failed to get response from AI',
      details: errorMessage
    });
  }
});

export default router;