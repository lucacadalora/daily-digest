import { useState, useEffect } from "react";
import { Loader2, CheckCircle, Wifi, WifiOff, ServerOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscribeModal = ({ isOpen, onClose }: SubscribeModalProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'checking' | 'error' | null>(null);
  const [categories, setCategories] = useState({
    "market-analysis": true,
    "financial-news": true,
    "crypto-updates": false,
    "economic-trends": false,
  });
  
  // Check database connectivity on modal open
  useEffect(() => {
    if (isOpen) {
      const checkDatabaseConnection = async () => {
        try {
          setConnectionStatus('checking');
          // Simple ping request to verify API is available
          const response = await axios.get('/api/market-data', { timeout: 3000 });
          if (response.status === 200) {
            setConnectionStatus('connected');
          } else {
            setConnectionStatus('error');
          }
        } catch (error) {
          console.error('Error checking API connection:', error);
          setConnectionStatus('error');
        }
      };
      
      checkDatabaseConnection();
    }
  }, [isOpen]);

  const handleCategoryChange = (category: string) => {
    setCategories(prev => ({
      ...prev,
      [category]: !prev[category as keyof typeof prev]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // Get selected categories as array
      const selectedCategories = Object.entries(categories)
        .filter(([_, isSelected]) => isSelected)
        .map(([category]) => category);
      
      // Call the subscription API with timeout and retry
      const subscribeWithRetry = async (retries = 2) => {
        try {
          return await axios.post('/api/subscribe', {
            email,
            name: name || undefined, // Only send if provided
            categories: selectedCategories
          }, {
            timeout: 5000 // 5 seconds timeout
          });
        } catch (err) {
          if (retries > 0 && axios.isAxiosError(err) && (err.code === 'ECONNABORTED' || !err.response)) {
            // Network error or timeout, retry
            console.log(`Retrying subscription request, ${retries} attempts left`);
            return subscribeWithRetry(retries - 1);
          }
          throw err;
        }
      };
      
      const response = await subscribeWithRetry();
      
      // Check if successfully subscribed or updated
      const status = response?.data?.status;
      const isNewSubscription = status === 'created';
      
      setIsSuccess(true);
      
      toast({
        title: isNewSubscription ? "Subscription successful!" : "Subscription updated!",
        description: isNewSubscription 
          ? "Thank you for subscribing to our newsletter." 
          : "Your newsletter preferences have been updated.",
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setEmail("");
        setName("");
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Subscription error:", error);
      
      let errorMessage = "Failed to subscribe. Please try again.";
      let errorDetail = "";
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          errorMessage = "Request timed out. Please try again.";
        } else if (error.response) {
          // Server responded with an error
          errorMessage = error.response.data.message || errorMessage;
          errorDetail = error.response.data.error || "";
          
          // Special case for validation errors
          if (error.response.status === 400 && error.response.data.details) {
            errorDetail = "Please check your email format.";
          }
        } else if (error.request) {
          // Request was made but no response received
          errorMessage = "No response from server. Please check your connection.";
        }
      }
      
      toast({
        title: "Subscription failed",
        description: errorDetail ? `${errorMessage} ${errorDetail}` : errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95%] max-w-[440px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-medium text-center">
            The best newsletter for{" "}
            <span className="text-blue-600 dark:text-blue-400">
              market insights
            </span>
          </DialogTitle>
          <DialogDescription className="text-sm text-center">
            Subscribe to stay up to date with the latest stocks, crypto, tech and financial market analysis.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
              disabled={isLoading || isSuccess}
            />
          </div>
          
          {/* Name field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name (Optional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              disabled={isLoading || isSuccess}
            />
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Topics you're interested in:</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="market-analysis"
                  checked={categories["market-analysis"]} 
                  onCheckedChange={() => handleCategoryChange("market-analysis")}
                  disabled={isLoading || isSuccess}
                />
                <Label htmlFor="market-analysis" className="text-sm cursor-pointer">Market Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="financial-news"
                  checked={categories["financial-news"]} 
                  onCheckedChange={() => handleCategoryChange("financial-news")}
                  disabled={isLoading || isSuccess}
                />
                <Label htmlFor="financial-news" className="text-sm cursor-pointer">Financial News</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="crypto-updates"
                  checked={categories["crypto-updates"]} 
                  onCheckedChange={() => handleCategoryChange("crypto-updates")}
                  disabled={isLoading || isSuccess}
                />
                <Label htmlFor="crypto-updates" className="text-sm cursor-pointer">Crypto Updates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="economic-trends"
                  checked={categories["economic-trends"]} 
                  onCheckedChange={() => handleCategoryChange("economic-trends")}
                  disabled={isLoading || isSuccess}
                />
                <Label htmlFor="economic-trends" className="text-sm cursor-pointer">Economic Trends</Label>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading || isSuccess || !email}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isSuccess ? (
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Subscribed!</span>
              </div>
            ) : (
              <span>Subscribe to Newsletter</span>
            )}
          </button>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            We respect your privacy and will never share your email address with third parties.
          </p>
          
          {/* Connection status indicator */}
          <div className="flex items-center justify-center mt-2">
            {connectionStatus === 'checking' && (
              <Badge variant="outline" className="text-xs py-1 gap-1 bg-gray-100 dark:bg-gray-800">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Checking connection...</span>
              </Badge>
            )}
            
            {connectionStatus === 'connected' && (
              <Badge variant="outline" className="text-xs py-1 gap-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                <Wifi className="h-3 w-3" />
                <span>Connected to server</span>
              </Badge>
            )}
            
            {connectionStatus === 'error' && (
              <Badge variant="outline" className="text-xs py-1 gap-1 bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                <ServerOff className="h-3 w-3" />
                <span>Connection issues, retry may be needed</span>
              </Badge>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};