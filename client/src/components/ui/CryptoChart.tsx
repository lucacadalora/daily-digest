import React from 'react';

interface CryptoChartProps {
  src: string;
  alt: string;
}

export const CryptoChart: React.FC<CryptoChartProps> = ({ src, alt }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img 
        src={src}
        alt={alt}
        className="w-full h-auto"
      />
    </div>
  );
};