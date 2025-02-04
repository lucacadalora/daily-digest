import { Card, CardContent } from "@/components/ui/card";

export default function MatrixChart() {
  return (
    <div className="w-full bg-[#FFF5E6] dark:bg-gray-900/50 p-4 rounded-lg">
      <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4 text-center">
        Indonesia Mineral Criticality Matrix
      </h3>
      <div className="w-full max-w-4xl mx-auto relative">
        {/* Add a container with fixed aspect ratio */}
        <div className="relative w-full" style={{ paddingTop: '75%' }}>
          <img 
            src="/Figure_1.png" 
            alt="Indonesia Mineral Criticality Matrix"
            className="absolute top-0 left-0 w-full h-full object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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