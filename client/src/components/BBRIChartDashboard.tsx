import React from 'react';
import { ComposedChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

const BBRIChartDashboard = () => {
  // Main metrics data remains the same
  const combinedData = [
    {
      year: '2022',
      dividendYield: 7.1,
      eps: null,
      capitalGain: null,
      pbv: null,
      pe: null
    },
    {
      year: '2023',
      dividendYield: 8.2,
      eps: null,
      capitalGain: null,
      pbv: 1.5,
      pe: 9.3
    },
    {
      year: '2024F',
      dividendYield: 8.8,
      eps: 8.5,
      capitalGain: 20,
      pbv: null,
      pe: null
    },
    {
      year: '2025F',
      dividendYield: 7.5,
      eps: 11.4,
      capitalGain: 30,
      pbv: null,
      pe: null
    },
    {
      year: '2026F',
      dividendYield: null,
      eps: 25.3,
      capitalGain: null,
      pbv: null,
      pe: null
    }
  ];

  // Enhanced valuation data
  const currentPrice = 4190;
  const valuationData = [
    { 
      name: 'Peter Lynch Value',
      price: 8905,
      upside: ((8905 - currentPrice) / currentPrice * 100).toFixed(1),
      color: '#2ecc71'
    },
    { 
      name: 'Analyst High',
      price: 6200,
      upside: ((6200 - currentPrice) / currentPrice * 100).toFixed(1),
      color: '#3498db'
    },
    { 
      name: 'Analyst Low',
      price: 5500,
      upside: ((5500 - currentPrice) / currentPrice * 100).toFixed(1),
      color: '#95a5a6'
    },
    { 
      name: 'Current Price',
      price: currentPrice,
      upside: 0,
      color: '#e74c3c'
    }
  ];

  const PriceCard = ({ title, price, upside, color }: { title: string, price: number, upside: string, color: string }) => (
    <div className="p-4 bg-gray-50 rounded-lg border-l-4" style={{ borderLeftColor: color }}>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-xl font-bold">IDR {price.toLocaleString()}</p>
      {Number(upside) > 0 && (
        <p className="text-green-600 font-medium">
          +{upside}% upside potential
        </p>
      )}
    </div>
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border">
          <p className="font-semibold">{data.name}</p>
          <p>Price: IDR {data.price.toLocaleString()}</p>
          {Number(data.upside) > 0 && (
            <p className="text-green-600">Upside: +{data.upside}%</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-serif font-bold mb-6 text-gray-800">BBRI Comprehensive Analysis</h2>
      
      <div className="space-y-6">
        {/* Main metrics chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Combined Performance Metrics</h3>
          <div className="h-[500px] w-full">
            <ResponsiveContainer>
              <ComposedChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis 
                  yAxisId="left"
                  label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  label={{ value: 'Ratios', angle: 90, position: 'insideRight' }}
                />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="eps" fill="#3a7ca5" name="EPS Growth (%)" />
                <Bar yAxisId="left" dataKey="capitalGain" fill="#f0ad4e" name="Capital Gain (%)" />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="dividendYield" 
                  stroke="#2e5b8a" 
                  strokeWidth={2}
                  name="Dividend Yield (%)"
                  dot={{ fill: '#2e5b8a' }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="pbv" 
                  stroke="#d35400" 
                  strokeWidth={2}
                  name="P/BV Ratio"
                  dot={{ fill: '#d35400' }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="pe" 
                  stroke="#27ae60" 
                  strokeWidth={2}
                  name="P/E Ratio"
                  dot={{ fill: '#27ae60' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enhanced valuation estimates section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-6">Fair Value Estimates</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Enhanced price visualization */}
            <div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold">Price Range Comparison</h4>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer>
                  <BarChart 
                    data={valuationData} 
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 10000]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine x={currentPrice} stroke="#e74c3c" strokeDasharray="3 3" label="Current Price" />
                    <Bar dataKey="price" maxBarSize={40}>
                      {valuationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed price cards */}
            <div className="space-y-4">
              {valuationData.map((item, index) => (
                <PriceCard 
                  key={index}
                  title={item.name}
                  price={item.price}
                  upside={item.upside}
                  color={item.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BBRIChartDashboard;
