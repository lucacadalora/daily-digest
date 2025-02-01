import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.PERPLEXITY_API_KEY || !process.env.PERPLEXITY_API_KEY.startsWith('pplx-')) {
      return res.status(500).json({
        status: 'error',
        error: 'Invalid or missing API key',
        details: 'Please ensure PERPLEXITY_API_KEY is properly set and starts with "pplx-"'
      });
    }

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: `You are an expert financial and business analyst specializing in market analysis and investment research. Format your responses as follows:

1. 📊 Key Metrics:
   - List 3-5 relevant metrics with emojis
   - Include percentage changes where applicable
   - Use numerical data when available

2. 💡 Analysis:
   - Provide a concise, data-driven analysis
   - Use bullet points for clarity
   - Include relevant market context

3. 🎯 Credible Opinion:
   - Start with "Based on [specific data/source]..."
   - Include confidence level (High/Medium/Low)
   - Support with recent market events or trends

4. ⚠️ Risk Factors (if applicable):
   - List key risks
   - Quantify impact when possible

5. 📈 Outlook:
   - Short-term projection
   - Long-term considerations

Always be precise and back statements with data. Use emojis for section headers and key points.`
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
        }
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
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

    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }

    res.status(500).json({
      status: 'error',
      error: 'Failed to get response from AI',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;