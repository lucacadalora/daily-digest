import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown } from "lucide-react";

type MarketData = {
  crypto: {
    BTC: { price: number; change24h: number };
    ETH: { price: number; change24h: number };
  };
  stocks: {
    BBRI: { price: number; change24h: number };
    TLKM: { price: number; change24h: number };
  };
};

export function MarketTicker() {
  const { data, isLoading } = useQuery<MarketData>({
    queryKey: ['/api/market-data'],
    refetchInterval: 60000 // Refresh every minute
  });

  if (isLoading || !data) {
    return (
      <div className="flex gap-4 text-sm text-gray-500 animate-pulse">
        <div>Loading market data...</div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return price >= 1000 
      ? price.toLocaleString('en-US', { maximumFractionDigits: 0 })
      : price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatChange = (change: number) => {
    return change.toFixed(2);
  };

  return (
    <div className="flex gap-4 overflow-x-auto whitespace-nowrap text-sm scrollbar-hide">
      {Object.entries(data.crypto).map(([symbol, data]) => (
        <div key={symbol} className="flex items-center gap-1">
          <span className="font-medium">{symbol}</span>
          <span>${formatPrice(data.price)}</span>
          <span className={`flex items-center ${data.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {data.change24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {formatChange(data.change24h)}%
          </span>
        </div>
      ))}
      {Object.entries(data.stocks).map(([symbol, data]) => (
        <div key={symbol} className="flex items-center gap-1">
          <span className="font-medium">{symbol}</span>
          <span>{formatPrice(data.price)}</span>
          <span className={`flex items-center ${data.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {data.change24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {formatChange(data.change24h)}%
          </span>
        </div>
      ))}
    </div>
  );
}
