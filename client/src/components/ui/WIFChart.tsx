import React from 'react';

export const WIFChart: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img 
        src="/wif-chart.png"
        alt="WIF Strategic Price Targets"
        className="w-full h-auto"
      />
    </div>
  );
};