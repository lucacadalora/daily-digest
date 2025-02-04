
import { Card, CardContent } from "@/components/ui/card";

export default function MatrixChart() {
  return (
    <div className="w-full bg-[#FFF5E6] p-4 rounded-lg">
      <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4 text-center">
        Indonesia Mineral Criticality Matrix
      </h3>
      <div className="w-full max-w-3xl mx-auto">
        <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-lg p-4">
          {/* Y-axis label */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-medium">
            Supply Chain Risk
          </div>
          
          {/* X-axis label */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm font-medium">
            Economic & Strategic Importance
          </div>
          
          {/* Quadrant grid */}
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-2">
            {/* Top Left */}
            <Card className="bg-orange-50 dark:bg-orange-950/20">
              <CardContent className="p-2">
                <div className="text-xs">High Risk, Low Impact</div>
              </CardContent>
            </Card>
            
            {/* Top Right */}
            <Card className="bg-red-50 dark:bg-red-950/20">
              <CardContent className="p-2">
                <div className="text-xs">High Risk, High Impact</div>
              </CardContent>
            </Card>
            
            {/* Bottom Left */}
            <Card className="bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-2">
                <div className="text-xs">Low Risk, Low Impact</div>
              </CardContent>
            </Card>
            
            {/* Bottom Right */}
            <Card className="bg-blue-50 dark:bg-blue-950/20">
              <CardContent className="p-2">
                <div className="text-xs">Low Risk, High Impact</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
