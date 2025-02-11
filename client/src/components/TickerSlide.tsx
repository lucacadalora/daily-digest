import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockQuote {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
}

const fetchStockData = async () => {
  const options = {
    method: 'GET',
    url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes',
    params: {
      ticker: 'AAPL,MSFT,^SPX,^NYA,BBCA.JK,BBRI.JK,ASII.JK,TLKM.JK'
    },
    headers: {
      'X-RapidAPI-Key': '3619a370a9msh2bf6825a1ba553bp1f0815jsn5490a3e2c230',
      'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
    }
  };

  const response = await axios.request(options);
  return response.data;
};

export const TickerSlide: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['stockData'],
    queryFn: fetchStockData,
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <Card className="w-full p-2 bg-muted/50">
        <div className="animate-pulse flex space-x-4">
          <div className="h-4 bg-muted-foreground/20 rounded w-full"></div>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full p-2">
        <p className="text-sm text-destructive">Error loading market data</p>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <motion.div
        className="flex space-x-8 p-2"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {data?.data?.map((quote: StockQuote) => (
          <div key={quote.symbol} className="flex items-center space-x-2 whitespace-nowrap">
            <span className="font-medium">{quote.symbol}</span>
            <span>{quote.regularMarketPrice.toFixed(2)}</span>
            <span 
              className={`flex items-center ${
                quote.regularMarketChangePercent >= 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}
            >
              {quote.regularMarketChangePercent >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(quote.regularMarketChangePercent).toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>
    </Card>
  );
};

export default TickerSlide;
