import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DevTools() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch('/api/dev/refresh', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Refresh failed');
      }

      toast({
        title: "Environment Refresh",
        description: "Successfully refreshed the development environment.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh the development environment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900">
      <Header simplified />
      
      {/* Header spacing */}
      <div className="h-36 sm:h-32"></div>

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Development Tools</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Environment Refresh</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Clear all caches, rebuild the project, and restart the development server.
              </p>
              <Button 
                onClick={handleRefresh} 
                disabled={isRefreshing}
                className="w-full"
              >
                {isRefreshing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isRefreshing ? 'Refreshing...' : 'Refresh Environment'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
