import express from "express";
import axios from "axios";

const router = express.Router();

function formatResponse(text: string): string {
  // Pre-process to fix number formatting
  text = text.replace(/\[\d+\]/g, ''); // Remove all citations
  text = text.replace(/(\d+)\s*[•.-]\s*(\d+)(x?)/g, '$1.$2$3'); // Fix split numbers
  text = text.replace(/\s+/g, ' ').trim(); // Clean up extra spaces

  // Split into paragraphs
  const paragraphs = text.split('\n').map(p => p.trim()).filter(p => p.length > 0);

  let formattedResponse = "";
  let currentSection = "";

  paragraphs.forEach(paragraph => {
    if (/^1\.\s*Key\s*Metrics/i.test(paragraph)) {
      formattedResponse += "\n**1. Key Metrics** 📊\n";
      currentSection = "metrics";
    }
    else if (/^2\.\s*Growth/i.test(paragraph)) {
      formattedResponse += "\n**2. Growth & Performance** 📈\n";
      currentSection = "growth";
    }
    else if (/^3\.\s*Expert/i.test(paragraph)) {
      formattedResponse += "\n**3. Expert Analysis** 💬\n";
      currentSection = "expert";
    }
    else if (/^4\.\s*Investment/i.test(paragraph)) {
      formattedResponse += "\n**4. Investment Assessment** 💡\n";
      currentSection = "investment";
    }
    // Format analyst quotes
    else if (/^[""].*[""].*—.*$/i.test(paragraph)) {
      formattedResponse += `${paragraph}\n`;
    }
    // Format key points with appropriate emoji based on content
    else if (currentSection === "metrics" && /^[-•]/.test(paragraph)) {
      formattedResponse += `💎 ${paragraph.replace(/^[-•]\s*/, '')}\n`;
    }
    else if (currentSection === "growth" && /^[-•]/.test(paragraph)) {
      formattedResponse += `🚀 ${paragraph.replace(/^[-•]\s*/, '')}\n`;
    }
    else if (currentSection === "investment" && /Risk|Warning|Caution/i.test(paragraph)) {
      formattedResponse += `⚠️ ${paragraph}\n`;
    }
    else if (/^[-•]/.test(paragraph)) {
      formattedResponse += `• ${paragraph.replace(/^[-•]\s*/, '')}\n`;
    }
    else if (paragraph.length > 0) {
      formattedResponse += `${paragraph}\n`;
    }
  });

  return formattedResponse.trim();
}

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Enhanced financial terms regex
    const financialTerms = /\b(market|stock|index|trade|invest|dividend|price|trend|economy|sector|analysis|forecast|growth|earning|revenue|profit|rate|bank|finance|currency|valuation|fundamental|technical|PE|EPS|ROE|asset|equity|bond|ETF|fund|mining|coal|commodity|volume)\b|\b[A-Z]{4}\.JK\b|\b[A-Z]{3,4}\b|\bIDX:\s*[A-Z]+\b/i;

    if (!financialTerms.test(message)) {
      return res.json({
        reply: "I'm specialized in financial market analysis. Please ask questions about stocks, market trends, company valuations, or investment insights. For example:\n\n• Analyze BBRI's current valuation and dividend outlook\n• What's the investment thesis for ADRO in 2025?\n• How is TLKM performing compared to its peers?\n• Assess ASII's growth prospects",
        status: 'success'
      });
    }

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: `You are an expert financial analyst specializing in Indonesian market analysis and investment research. Structure your responses in exactly this format:

1. Key Metrics
- Current Price: [value]
- P/E Ratio: [value]
- Dividend Yield: [value]
- Market Cap: [value]
- Trading Volume: [value]
- Other key metrics as relevant

2. Growth & Performance
- List key growth metrics and YoY comparisons
- Market share and competitive position
- Operating performance highlights
- Digital transformation metrics

3. Expert Analysis
Include 1-2 relevant analyst quotes in this format:
"[Quote text]" — [Analyst Name], [Firm]

4. Investment Assessment
- Growth catalysts and opportunities
- Risk factors and challenges
- Technical support/resistance levels
- Price targets and recommendations

Guidelines:
- Start each section with the number and title
- Use bullet points for all metrics and insights
- Keep points concise and focused
- Include specific numbers and percentages
- Do not use citations or references
- Format numbers consistently (e.g., "4.9x" not "4.9 x")`
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