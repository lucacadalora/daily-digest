import { Card } from "@/components/ui/card";

export default function MatrixChart() {
  return (
    <div className="w-full bg-[#FFF5E6] dark:bg-gray-900/50 p-4 rounded-lg">
      <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4 text-center">
        Indonesia Mineral Criticality Matrix
      </h3>
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="relative" style={{ paddingBottom: '75%' }}>
            <img 
              src="../../attached_assets/Figure_1.png"
              alt="Indonesia Mineral Criticality Matrix"
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}