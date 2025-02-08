import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscribeModal = ({ isOpen, onClose }: SubscribeModalProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          categories: ['market-analysis', 'financial-news']
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }

      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });

      // Close modal after a short delay
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail("");
        setName("");
      }, 2000);

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to subscribe",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg z-50"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content */}
            <div className="space-y-4 pt-2">
              <h2 className="text-3xl font-medium text-center">
                The best newsletter for{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  stock investors
                </span>
              </h2>

              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Subscribe to stay up to date with the latest stocks, crypto, tech and future industries.
              </p>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your Name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 pl-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 pl-4 pr-12 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-blue-500"
                      required
                      disabled={isSubmitting || isSuccess}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || isSuccess}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 ${
                        isSuccess 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white rounded-full transition-colors disabled:opacity-50`}
                    >
                      {isSuccess ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};