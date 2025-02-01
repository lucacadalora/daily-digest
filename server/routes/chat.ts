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

    // Only restrict highly technical programming queries
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
[Provide a concise market context about the topic, focusing on recent significant developments and current positioning]

## 💡 Key Metrics
* **[Key Metric 1]:** [Value with comparison to peers or historical data]
* **[Key Metric 2]:** [Value with relevant context]
* **[Key Metric 3]:** [Value with growth or trend information]

## 📈 Detailed Analysis
[Comprehensive analysis of current situation, market position, and growth trajectory]

## 🎯 Expert Perspective
> "[Insert relevant expert quote with specific metrics or insights]"
— [Expert Name], [Organization]

## 💫 Growth Opportunities
* [Key growth catalyst]
* [Market expansion possibility]
* [Competitive advantage]

## ⚠️ Risk Factors
* [Primary risk]
* [Market challenge]
* [Operational concern]

## 📝 Bottom Line
[Concise conclusion summarizing key points and actionable insights]

Use markdown for formatting:
- **Bold** for key metrics and numbers
- *Italic* for trends
- \`code\` for exact values
- > for expert quotes
- Links for citations [text](url)
- Numbers should include proper units and contexts`;

    console.log('Calling Perplexity API with configuration:', {
      model: "sonar-pro-online",
      messageLength: message.length,
      hasSystemPrompt: true
    });

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: "sonar-pro-online",  // Updated to use pro model
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