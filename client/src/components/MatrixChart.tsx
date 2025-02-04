import { Card } from "@/components/ui/card";

export default function MatrixChart() {
  return (
    <div className="w-full bg-[#FFF5E6] dark:bg-gray-900/50 p-4 rounded-lg">
      <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4 text-center">
        Indonesia Mineral Criticality Matrix
      </h3>
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4">
        <img 
          src="/Figure_1.png" 
          alt="Indonesia Mineral Criticality Matrix"
          className="w-full h-auto"
        />
      </Card>
    </div>
  );
}