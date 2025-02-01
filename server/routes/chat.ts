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

    const restrictedTerms = /\b(sql injection|xss|database schema|api endpoint|code syntax|programming language|compiler|runtime|debugging)\b/i;
    if (restrictedTerms.test(message)) {
      return res.json({
        status: 'success',
        reply: "I focus on business, market, and investment analysis. For coding-related questions, please consult programming-specific resources."
      });
    }

    console.log('Processing query:', message);

    const systemPrompt = `You are an expert financial and business analyst specializing in stock market analysis, investment research, and market insights. You have extensive knowledge of:

- Global financial markets and economic trends
- Company valuations and financial metrics (P/E, P/B, ROE, etc.)
- Technical and fundamental analysis
- Market sentiment and trading patterns
- Industry-specific growth drivers and risks
- Dividend analysis and yield projections
- Fair value estimation methods

Use your expertise to provide accurate, data-driven insights while maintaining flexibility in your response format based on the specific question asked. When analyzing stocks, consider both quantitative metrics and qualitative factors affecting market performance.`;

    console.log('Creating OpenAI client with Perplexity configuration');

    const client = new OpenAI({
      apiKey: process.env.PERPLEXITY_API_KEY,
      baseURL: "https://api.perplexity.ai"
    });

    console.log('Calling Perplexity API with configuration:', {
      model: "sonar",
      messageLength: message.length,
      hasSystemPrompt: true
    });

    const response = await client.chat.completions.create({
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
    });

    console.log('API Response received');

    if (!response.choices?.[0]?.message?.content) {
      console.error('Invalid API response format:', JSON.stringify(response));
      throw new Error('Invalid API response format');
    }

    const content = response.choices[0].message.content;

    res.json({
      status: 'success',
      reply: content.trim(),
      citations: response.citations || []
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