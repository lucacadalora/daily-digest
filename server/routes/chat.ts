import express from "express";
import axios from "axios";

const router = express.Router();

function formatResponse(text: string): string {
  // Split into sentences and trim
  const sentences = text.split(/[.!?]/).map(s => s.trim()).filter(s => s.length > 0);

  // Group sentences into categories
  let formattedResponse = "";

  // If text contains numbers/statistics, create a "Key Figures" section
  const statsSection = sentences.filter(s => /\d/.test(s));
  if (statsSection.length > 0) {
    formattedResponse += "📊 Key Figures:\n" + 
      statsSection.map(s => `• ${s}`).join("\n") + "\n\n";
  }

  // If text mentions trends/changes, create a "Market Trends" section
  const trendSection = sentences.filter(s => 
    /\b(increase|decrease|grew|fell|rise|drop|trend)\b/i.test(s)
  );
  if (trendSection.length > 0) {
    formattedResponse += "📈 Market Trends:\n" + 
      trendSection.map(s => `• ${s}`).join("\n") + "\n\n";
  }

  // Remaining points go into "Additional Insights"
  const remainingPoints = sentences.filter(s => 
    !statsSection.includes(s) && !trendSection.includes(s)
  );
  if (remainingPoints.length > 0) {
    formattedResponse += "💡 Additional Insights:\n" + 
      remainingPoints.map(s => `• ${s}`).join("\n") + "\n\n";
  }

  return formattedResponse.trim();
}

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
            content: "You are an expert financial and market analyst. Provide insights in a clear, structured format. Focus on key statistics, trends, and actionable insights. Use precise numbers and percentages when available. Keep responses concise and data-driven."
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

    // Format the response before sending
    const formattedReply = formatResponse(response.data.choices[0].message.content);

    res.json({ 
      reply: formattedReply,
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