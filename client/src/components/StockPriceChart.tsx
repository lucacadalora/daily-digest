import { useMemo } from 'react';
import {
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface StockChartData {
  date: string;
  price: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface StockPriceChartProps {
  data: StockChartData[];
  symbol: string;
}

export function StockPriceChart({ data, symbol }: StockPriceChartProps) {
  const formattedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      volumeBar: item.volume / 1000000, // Convert to millions for better visualization
    }));
  }, [data]);

  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-800 rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{symbol} Price Chart</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last {data.length} trading days
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis 
            dataKey="date"
            scale="band"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#666' }}
          />
          <YAxis 
            yAxisId="left"
            orientation="left"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#666' }}
            domain={['auto', 'auto']}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#666' }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg shadow-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{data.date}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Open: {data.open.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">High: {data.high.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Low: {data.low.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Close: {data.close.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Volume: {(data.volume / 1000000).toFixed(2)}M
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar
            yAxisId="right"
            dataKey="volumeBar"
            fill="#6b7280"
            opacity={0.3}
            name="Volume (M)"
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.1}
            name="Price"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="close"
            stroke="#2563eb"
            dot={false}
            name="Close"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
