import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.PERPLEXITY_API_KEY) {
      throw new Error('Missing PERPLEXITY_API_KEY');
    }

    // Enhanced financial terms regex
    const financialTerms = /\b(market|stock|index|trade|invest|dividend|price|trend|economy|sector|analysis|forecast|growth|earning|revenue|profit|rate|bank|finance|currency|valuation|fundamental|technical|PE|EPS|ROE|asset|equity|bond|ETF|fund|mining|coal|commodity|volume)\b|\b[A-Z]{4}\.JK\b|\b[A-Z]{3,4}\b|\bIDX:\s*[A-Z]+\b/i;

    if (!financialTerms.test(message)) {
      return res.json({
        status: 'success',
        reply: "I apologize, but I can only assist with questions related to financial markets, economic analysis, and investment insights. Please ask questions within these domains."
      });
    }

    console.log('Processing financial query:', message);

    const systemPrompt = `You are an expert financial analyst specializing in Indonesian market analysis and investment research. Format your response using markdown syntax:

# 📊 Analysis Highlights:
[Provide a concise market context about the stock/topic, focusing on recent significant developments and current market positioning]

## 💡 Key Metrics at a Glance:
* **Valuation:** [P/E ratio and comparison to peers]
* **Yield Projection:** [Current/projected dividend yield]
* **Growth Highlight:** [Key growth metric or recent positive development]

## 📈 Detailed Analysis
[Comprehensive analysis of current situation, market position, and growth trajectory]

## 🎯 Expert Perspective
> "[Insert relevant expert quote with specific metrics or insights]"
— [Expert Name], [Organization]

## 💫 Growth Opportunities
* [Bullet points of key growth catalysts]
* [Market expansion possibilities]
* [Technological/operational advantages]

## ⚠️ Risk Factors
* [Key risk factors]
* [Market challenges]
* [Operational concerns]

## 📝 Bottom Line
[Concise conclusion summarizing investment thesis and key action points]

Use markdown for formatting:
- **Bold** for key metrics and numbers
- *Italic* for trends
- \`code\` for exact values
- > for expert quotes
- --- for section breaks`;

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    console.log('Raw API Response:', JSON.stringify(response.data, null, 2));

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }

    const content = response.data.choices[0].message.content;

    res.json({
      status: 'success',
      reply: content.trim()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);

    res.status(500).json({
      status: 'error',
      error: 'Failed to get response from AI',
      details: errorMessage
    });
  }
});

export default router;