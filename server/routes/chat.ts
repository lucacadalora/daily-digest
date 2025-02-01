import express from "express";
import axios from "axios";

const router = express.Router();

function formatResponse(text: string): string {
  // Pre-process to fix number formatting
  text = text.replace(/\[\d+\]/g, ''); // Remove citations
  text = text.replace(/(\d+)\s*[•.-]\s*(\d+)(x?)/g, '$1.$2$3'); // Fix split numbers
  text = text.replace(/\s+/g, ' ').trim(); // Clean up spaces

  const paragraphs = text.split('\n').map(p => p.trim()).filter(p => p.length > 0);
  let formattedResponse = "";
  let currentSection = "";
  let sectionContent = [];

  paragraphs.forEach(paragraph => {
    // Handle section headers
    if (/^1\.\s*Key\s*Metrics/i.test(paragraph)) {
      formattedResponse += "\n⚡ **Key Metrics**\n\n";
      currentSection = "metrics";
    }
    else if (/^2\.\s*Growth/i.test(paragraph)) {
      if (sectionContent.length) {
        formattedResponse += sectionContent.join('\n') + '\n\n';
        sectionContent = [];
      }
      formattedResponse += "🚀 **Growth & Performance**\n\n";
      currentSection = "growth";
    }
    else if (/^3\.\s*Expert/i.test(paragraph)) {
      if (sectionContent.length) {
        formattedResponse += sectionContent.join('\n') + '\n\n';
        sectionContent = [];
      }
      formattedResponse += "💬 **Expert Analysis**\n\n";
      currentSection = "expert";
    }
    else if (/^4\.\s*Investment/i.test(paragraph)) {
      if (sectionContent.length) {
        formattedResponse += sectionContent.join('\n') + '\n\n';
        sectionContent = [];
      }
      formattedResponse += "💡 **Investment Assessment**\n\n";
      currentSection = "investment";
    }
    // Handle content based on section type
    else if (currentSection === "metrics") {
      if (/^[-•]\s*(.+):\s*(.+)$/i.test(paragraph)) {
        const formatted = paragraph.replace(/^[-•]\s*/, '');
        sectionContent.push(`📊 ${formatted}`);
      } else {
        sectionContent.push(paragraph);
      }
    }
    else if (currentSection === "growth") {
      if (/^[-•]/.test(paragraph)) {
        sectionContent.push(`📈 ${paragraph.replace(/^[-•]\s*/, '')}`);
      } else {
        sectionContent.push(paragraph);
      }
    }
    else if (currentSection === "expert") {
      if (/^[""].*[""].*—.*$/i.test(paragraph)) {
        sectionContent.push(`${paragraph}`);
      } else if (/^[-•]/.test(paragraph)) {
        sectionContent.push(`💎 ${paragraph.replace(/^[-•]\s*/, '')}`);
      } else {
        sectionContent.push(paragraph);
      }
    }
    else if (currentSection === "investment") {
      if (/Risk|Warning|Caution/i.test(paragraph)) {
        sectionContent.push(`⚠️ ${paragraph}`);
      } else if (/^[-•]/.test(paragraph)) {
        sectionContent.push(`💡 ${paragraph.replace(/^[-•]\s*/, '')}`);
      } else {
        sectionContent.push(paragraph);
      }
    }
  });

  // Add any remaining section content
  if (sectionContent.length) {
    formattedResponse += sectionContent.join('\n') + '\n';
  }

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
            content: `You are an expert financial analyst specializing in Indonesian market analysis and investment research. Follow this exact format for your response:

1. Key Metrics
• Current Price: [value]
• P/E Ratio: [value]
• Dividend Yield: [value]
• Market Cap: [value]
• Trading Volume: [value]
[Add other relevant metrics with bullet points]

2. Growth & Performance
• YoY Revenue Growth: [value]
• Market Share: [details]
• Key Performance Highlights
[List key operational metrics with bullet points]

3. Expert Analysis
[Include 1-2 relevant analyst quotes exactly in this format:]
"[Quote text]" — [Analyst Name], [Firm]
[Add key analyst insights with bullet points]

4. Investment Assessment
• Growth Catalysts: [key points]
• Risk Factors: [key points]
• Technical Levels: [support/resistance]
• Price Targets: [range and consensus]

Guidelines:
- Use bullet points consistently
- Present exact numbers and percentages
- Keep insights concise and focused
- Format numbers as "4.9x" not "4.9 x"
- Don't use citations or references`
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