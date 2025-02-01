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

    const systemPrompt = `You are an expert financial analyst specializing in Indonesian market analysis and investment research. Format your response exactly as follows:

Analysis Highlights:
[Brief overview of the key points]

Price Action:
• Current stock price: [exact value]
• Recent trading range: [range]
• Volume trends: [description]

Key Metrics:
• Market Cap: [value]
• P/E Ratio: [value]
• Trading Volume: [value]
• Growth Rate: [value]

Growth & Performance:
• Historical performance metrics
• Market position details
• Competitive analysis
• Recent developments

Expert Analysis:
• Market sentiment overview
• Industry trends
• Strategic outlook
• Key challenges

Investment Assessment:
• Growth catalysts
• Risk factors
• Technical levels
• Price targets

Use bullet points and exact numbers throughout your analysis.`;

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: "llama-2-70b-chat",
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

    const rawContent = response.data.choices[0].message.content;
    console.log('Raw content:', rawContent);

    // Simple formatting to preserve structure and add emojis
    const formattedContent = rawContent
      .split('\n')
      .map(line => {
        if (line.includes('Analysis Highlights:')) {
          return '📊 Analysis Highlights:\n';
        }
        if (line.includes('Price Action:')) {
          return '📈 Price Action:\n';
        }
        if (line.includes('Key Metrics:')) {
          return '💡 Key Metrics:\n';
        }
        if (line.includes('Growth & Performance:')) {
          return '📊 Growth & Performance:\n';
        }
        if (line.includes('Expert Analysis:')) {
          return '🔍 Expert Analysis:\n';
        }
        if (line.includes('Investment Assessment:')) {
          return '💰 Investment Assessment:\n';
        }
        if (line.trim().startsWith('•')) {
          return line;
        }
        return line;
      })
      .join('\n');

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