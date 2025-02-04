import { Card, CardContent } from "@/components/ui/card";

export default function MatrixChart() {
  // Assuming Figure_1.png is stored in the public directory
  return (
    <div className="w-full bg-[#FFF5E6] dark:bg-gray-900/50 p-4 rounded-lg">
      <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4 text-center">
        Indonesia Mineral Criticality Matrix
      </h3>
      <div className="w-full max-w-3xl mx-auto relative">
        <img 
          src="/Figure_1.png" 
          alt="Indonesia Mineral Criticality Matrix"
          className="w-full h-auto rounded-lg shadow-lg"
        />

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span>Exploration Potential</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>Advanced Mineral Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span>Produced and/or Processed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            <span>Processed Only</span>
          </div>
        </div>
      </div>
    </div>
  );
}