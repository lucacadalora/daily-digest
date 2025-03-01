import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMarketAnalysis } from "@/lib/perplexity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrendingUp, AlertCircle, BarChart3, BookOpen } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface MarketInsightsProps {
  query: string;
}

export function MarketInsights({ query }: MarketInsightsProps) {
  const { data: insight, isLoading, error, isFetching } = useQuery({
    queryKey: ["market-insight", query],
    queryFn: () => getMarketAnalysis(query),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2
  });

  // Determine the icon based on the query content
  const getQueryIcon = () => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('stock') || lowerQuery.includes('price') || lowerQuery.includes('market')) {
      return <TrendingUp className="h-5 w-5 text-blue-500" />;
    } else if (lowerQuery.includes('risk') || lowerQuery.includes('warning') || lowerQuery.includes('alert')) {
      return <AlertCircle className="h-5 w-5 text-orange-500" />;
    } else if (lowerQuery.includes('data') || lowerQuery.includes('chart') || lowerQuery.includes('statistics')) {
      return <BarChart3 className="h-5 w-5 text-green-500" />;
    } else {
      return <BookOpen className="h-5 w-5 text-purple-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            {getQueryIcon()}
            <span>Market Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm text-gray-500">Analyzing market data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span>Analysis Error</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
            <p className="text-red-700 dark:text-red-300">
              Unable to complete market analysis. Please try again later or refine your query.
            </p>
            <p className="text-sm text-red-500 dark:text-red-400 mt-2">
              {error instanceof Error ? error.message : "Unknown error occurred"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <CardTitle className="text-lg flex items-center gap-2">
          {getQueryIcon()}
          <span>Market Intelligence</span>
          {isFetching && <Loader2 className="h-4 w-4 animate-spin ml-2 text-gray-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>
            {insight || "No analysis available."}
          </ReactMarkdown>
        </div>
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between border-t pt-4">
          <div>AI-powered analysis using Perplexity</div>
          <div>Generated on {new Date().toLocaleDateString()}</div>
        </div>
      </CardContent>
    </Card>
  );
}
