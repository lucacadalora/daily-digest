import express from "express";
import Together from "together-ai";

const router = express.Router();
const together = new Together(process.env.TOGETHER_API_KEY);

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await together.chat.completions.create({
      model: "deepseek-ai/DeepSeek-R1",
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
    });

    res.json({ 
      reply: response.choices[0].message.content,
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