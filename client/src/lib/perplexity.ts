import { z } from "zod";

export const perplexityResponseSchema = z.object({
  id: z.string(),
  model: z.string(),
  object: z.string(),
  created: z.number(),
  citations: z.array(z.string()),
  choices: z.array(z.object({
    index: z.number(),
    finish_reason: z.string(),
    message: z.object({
      role: z.string(),
      content: z.string()
    }),
    delta: z.object({
      role: z.string(),
      content: z.string()
    })
  })),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number()
  })
});

export type PerplexityResponse = z.infer<typeof perplexityResponseSchema>;

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function getMarketAnalysis(query: string): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: "You are a market analyst providing concise, data-driven insights about global markets, economics, and technology trends. Focus on key metrics and actionable insights."
    },
    {
      role: "user",
      content: query
    }
  ];

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-huge-128k-online",
        messages,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 500,
        frequency_penalty: 1,
        search_domain_filter: ["perplexity.ai"],
        return_images: false,
        return_related_questions: false,
        search_recency_filter: "month"
      })
    });

    if (!response.ok) {
      throw new Error("Failed to get market analysis");
    }

    const data = await response.json();
    const validatedData = perplexityResponseSchema.parse(data);
    return validatedData.choices[0].message.content;
  } catch (error) {
    console.error("Error getting market analysis:", error);
    throw error;
  }
}
