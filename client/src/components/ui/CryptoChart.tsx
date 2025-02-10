import React from 'react';

interface CryptoChartProps {
  imagePath: string;
  altText: string;
}

export const CryptoChart: React.FC<CryptoChartProps> = ({ imagePath, altText }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img 
        src={imagePath}
        alt={altText}
        className="w-full h-auto"
      />
    </div>
  );
};
