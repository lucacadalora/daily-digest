import { useQuery } from "@tanstack/react-query";
import { getMarketAnalysis } from "@/lib/perplexity";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface MarketInsightsProps {
  query: string;
}

export function MarketInsights({ query }: MarketInsightsProps) {
  const { data: insight, isLoading, error } = useQuery({
    queryKey: ["market-insight", query],
    queryFn: () => getMarketAnalysis(query),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to load market insights. Please try again later.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 prose dark:prose-invert max-w-none">
        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {insight}
        </div>
      </CardContent>
    </Card>
  );
}
