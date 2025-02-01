import express from "express";
import axios from "axios";

const router = express.Router();

function formatResponse(text: string): string {
  // Split into sentences and trim
  const sentences = text.split(/[.!?]/).map(s => s.trim()).filter(s => s.length > 0);

  // Group sentences into categories
  let formattedResponse = "";

  // If text contains numbers/statistics, create a "Analysis Highlights" section
  const statsSection = sentences.filter(s => 
    /\b(\d+(\.\d+)?%?)|(\$[0-9,.]+)|(USD|IDR|EUR|JPY|GBP)\b/i.test(s)
  );
  if (statsSection.length > 0) {
    formattedResponse += "📊 Analysis Highlights:\n" + 
      statsSection.map(s => `• ${s}`).join("\n") + "\n\n";
  }

  // Create "Market Dynamics" section for trends and changes
  const trendSection = sentences.filter(s => 
    /\b(increase|decrease|grew|fell|rise|drop|trend|gain|loss|outperform|underperform|valuation|multiple|premium|discount)\b/i.test(s)
  );
  if (trendSection.length > 0) {
    formattedResponse += "📈 Market Dynamics:\n" + 
      trendSection.map(s => `• ${s}`).join("\n") + "\n\n";
  }

  // Create "Risk Assessment" section for risk-related content
  const riskSection = sentences.filter(s => 
    /\b(risk|threat|challenge|concern|volatility|uncertainty|exposure|downside|bearish)\b/i.test(s)
  );
  if (riskSection.length > 0) {
    formattedResponse += "⚠️ Risk Assessment:\n" + 
      riskSection.map(s => `• ${s}`).join("\n") + "\n\n";
  }

  // Remaining points go into "Investment Implications"
  const remainingPoints = sentences.filter(s => 
    !statsSection.includes(s) && 
    !trendSection.includes(s) && 
    !riskSection.includes(s)
  );
  if (remainingPoints.length > 0) {
    formattedResponse += "💡 Investment Implications:\n" + 
      remainingPoints.map(s => `• ${s}`).join("\n") + "\n\n";
  }

  // If the response is empty, return a default message
  if (!formattedResponse.trim()) {
    return "I apologize, but I couldn't extract meaningful financial insights from the response. Please try rephrasing your question focusing on specific market aspects, financial metrics, or investment considerations.";
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
            content: "You are an expert financial analyst specializing in market analysis and investment research. Structure your responses like a professional investment report with clear sections. Include these essential elements where relevant:\n\n1. Key valuation metrics (P/E, P/B, dividend yield)\n2. Growth drivers and market dynamics\n3. Risk factors and mitigation strategies\n4. Fundamental analysis with specific numbers\n5. Technical indicators and price trends\n6. Comparative analysis with peers\n7. Forward-looking projections\n\nProvide specific numbers and percentages. Keep the tone professional and analytical, similar to institutional research reports."
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