import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

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
  const [categories, setCategories] = useState({
    "market-analysis": true,
    "financial-news": true,
    "crypto-updates": false,
    "economic-trends": false,
  });
  
  // Handle keyboard events (Escape to close the modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isLoading]);

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
      
      // Call the subscription API
      await axios.post('/api/subscribe', {
        email,
        name: name || undefined, // Only send if provided
        categories: selectedCategories
      });

      setIsSuccess(true);
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
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
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      
      toast({
        title: "Subscription failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[440px] mx-auto bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg z-50 overflow-y-auto max-h-[90vh]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              disabled={isLoading}
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Content */}
            <div className="space-y-4 pt-2">
              <h2 id="dialog-title" className="text-3xl font-medium text-center">
                The best newsletter for{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  market insights
                </span>
              </h2>

              <p id="dialog-description" className="text-sm text-center text-gray-600 dark:text-gray-400">
                Subscribe to stay up to date with the latest stocks, crypto, tech and financial market analysis.
              </p>

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
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};