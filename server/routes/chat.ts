import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: "You are an expert financial and market analyst with real-time web browsing capabilities. Leverage current market data and news to provide insights about market trends, stocks, and economic conditions. When analyzing market information, always try to provide the most up-to-date data and cite your sources. Be concise and data-driven in your responses."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    res.json({ 
      reply: response.data.choices[0].message.content,
      status: 'success' 
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      status: 'error'
    });
  }
});

export default router;