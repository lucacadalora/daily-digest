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

  // Process each paragraph
  paragraphs.forEach(paragraph => {
    // Format key metrics with consistent emoji
    if (/^(Current Price|P\/?E Ratio|Price[- ]to[- ]Book|Dividend Yield|Market Cap|EPS|ROE|Payout Ratio):/i.test(paragraph)) {
      if (currentSection !== "metrics") {
        formattedResponse += "⚡ Key Metrics:\n";
        currentSection = "metrics";
      }
      formattedResponse += `📊 ${paragraph}\n`;
    }
    // Format trading metrics
    else if (/^(Trading Volume|Support Level|Resistance Level|52[- ]Week|Moving Average):/i.test(paragraph)) {
      if (currentSection !== "trading") {
        formattedResponse += "\n📈 Trading Information:\n";
        currentSection = "trading";
      }
      formattedResponse += `💫 ${paragraph}\n`;
    }
    // Format growth metrics
    else if (/^(Revenue Growth|Profit Growth|CAGR|Growth Rate):/i.test(paragraph)) {
      if (currentSection !== "growth") {
        formattedResponse += "\n🚀 Growth Metrics:\n";
        currentSection = "growth";
      }
      formattedResponse += `📈 ${paragraph}\n`;
    }
    // Format analyst quotes
    else if (/^[""].*[""].*—.*$/i.test(paragraph)) {
      formattedResponse += `\n💬 Expert Analysis:\n${paragraph}\n`;
      currentSection = "quote";
    }
    // Format risk factors
    else if (/^Risk|Warning|Caution/i.test(paragraph)) {
      formattedResponse += `\n⚠️ ${paragraph}\n`;
      currentSection = "risks";
    }
    // Format investment insights
    else if (/^(Investment|Strategy|Recommendation|Outlook|Summary)/i.test(paragraph)) {
      formattedResponse += `\n💡 ${paragraph}\n`;
      currentSection = "insights";
    }
    // Format regular paragraphs with bullet points for key insights
    else if (paragraph.length > 0) {
      if (/\b(key|major|significant|critical|important)\b/i.test(paragraph) || 
          /^(•|-)\s/.test(paragraph)) {
        formattedResponse += `• ${paragraph.replace(/^(•|-)\s/, '')}\n`;
      } else {
        formattedResponse += `${paragraph}\n`;
      }
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
            content: `You are an expert financial analyst specializing in Indonesian market analysis and investment research. Structure your responses in this format:

1. Key Metrics (Always start with these):
   - Current market price
   - P/E ratio and valuation metrics
   - Dividend yield and payout ratio
   - Market capitalization
   - Trading volume and momentum

2. Growth & Performance:
   - YoY revenue/profit growth
   - Key business metrics
   - Market share data

3. Expert Analysis:
   - Include relevant analyst quotes
   - Format as "Quote" — Analyst Name, Firm

4. Investment Assessment:
   - Growth catalysts
   - Risk factors
   - Technical levels
   - Price targets

Guidelines:
- Present metrics clearly (e.g., "P/E Ratio: 15.2x")
- Use bullet points for key insights
- Include specific numbers and growth rates
- Focus on material information
- Do not use citations
- Keep sections concise and focused`
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