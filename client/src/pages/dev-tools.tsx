import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { useState } from "react";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RefreshStatus {
  cache: 'idle' | 'loading' | 'success' | 'error';
  dependencies: 'idle' | 'loading' | 'success' | 'error';
  build: 'idle' | 'loading' | 'success' | 'error';
  server: 'idle' | 'loading' | 'success' | 'error';
}

export default function DevTools() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [status, setStatus] = useState<RefreshStatus>({
    cache: 'idle',
    dependencies: 'idle',
    build: 'idle',
    server: 'idle'
  });
  const { toast } = useToast();

  const StatusIcon = ({ status }: { status: 'idle' | 'loading' | 'success' | 'error' }) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);

      // Clear cache
      setStatus(prev => ({ ...prev, cache: 'loading' }));
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate step
      setStatus(prev => ({ ...prev, cache: 'success' }));

      // Update dependencies
      setStatus(prev => ({ ...prev, dependencies: 'loading' }));
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate step
      setStatus(prev => ({ ...prev, dependencies: 'success' }));

      // Build project
      setStatus(prev => ({ ...prev, build: 'loading' }));
      const response = await fetch('/api/dev/refresh', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Refresh failed');
      }

      setStatus(prev => ({ ...prev, build: 'success' }));

      // Restart server
      setStatus(prev => ({ ...prev, server: 'loading' }));
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate step
      setStatus(prev => ({ ...prev, server: 'success' }));

      toast({
        title: "Environment Refresh",
        description: "Successfully refreshed the development environment.",
      });
    } catch (error) {
      // Mark current step as failed
      const currentStep = Object.entries(status).find(([_, value]) => value === 'loading');
      if (currentStep) {
        setStatus(prev => ({ ...prev, [currentStep[0]]: 'error' }));
      }

      toast({
        title: "Refresh Failed",
        description: "Failed to refresh the development environment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const steps = [
    { key: 'cache' as const, label: 'Clear Cache', description: 'Clearing build cache and temporary files' },
    { key: 'dependencies' as const, label: 'Dependencies', description: 'Verifying and updating project dependencies' },
    { key: 'build' as const, label: 'Build', description: 'Rebuilding the project from scratch' },
    { key: 'server' as const, label: 'Server', description: 'Restarting development server' },
  ];

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900">
      <Header simplified />

      {/* Header spacing */}
      <div className="h-36 sm:h-32"></div>

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Development Tools</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Environment Refresh</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Clear all caches, rebuild the project, and restart the development server to ensure your environment is in sync.
              </p>

              <div className="space-y-4 mb-6">
                {steps.map(({ key, label, description }) => (
                  <div key={key} className="flex items-start gap-4">
                    <div className="pt-1">
                      <StatusIcon status={status[key]} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleRefresh} 
                disabled={isRefreshing}
                className="w-full"
              >
                {isRefreshing ? 'Refreshing Environment...' : 'Refresh Environment'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Environment Info</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Node Version</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">v20.x</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Environment</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Development</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Refresh</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}