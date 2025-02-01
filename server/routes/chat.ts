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

# Analysis Highlights
Brief overview of the key points

## Price Action
* Current stock price: [exact value]
* Recent trading range: [range]
* Volume trends: [description]

## Key Metrics
* Market Cap: [value]
* P/E Ratio: [value]
* Trading Volume: [value]
* Growth Rate: [value]

## Growth & Performance
* Historical performance metrics
* Market position details
* Competitive analysis
* Recent developments

## Expert Analysis
* Market sentiment overview
* Industry trends
* Strategic outlook
* Key challenges

## Investment Assessment
* Growth catalysts
* Risk factors
* Technical levels
* Price targets

Use markdown syntax for formatting:
- Use **bold** for important numbers and metrics
- Use *italic* for trends and directional terms
- Use \`code\` for exact values
- Use > for important quotes or highlights
- Use --- for section separators
- Use bullet points (*)
- Format numbers with appropriate units`;

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

    // Add emoji icons to headers while preserving markdown
    const formattedContent = content
      .replace(/# Analysis Highlights/g, '# 📊 Analysis Highlights')
      .replace(/## Price Action/g, '## 📈 Price Action')
      .replace(/## Key Metrics/g, '## 💡 Key Metrics')
      .replace(/## Growth & Performance/g, '## 📊 Growth & Performance')
      .replace(/## Expert Analysis/g, '## 🔍 Expert Analysis')
      .replace(/## Investment Assessment/g, '## 💰 Investment Assessment');

    res.json({
      status: 'success',
      reply: formattedContent.trim()
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