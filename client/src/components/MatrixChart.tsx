import { Card } from '@/components/ui/card';

export default function MatrixChart() {
  return (
    <div className="w-full bg-[#FFF5E6] p-4 rounded-lg">
      <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4 text-center">
        Indonesia Mineral Criticality Matrix
      </h3>
      <div className="w-full max-w-3xl mx-auto">
        <img 
          src="Figure_1.png" 
          alt="Indonesia Mineral Criticality Matrix"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}