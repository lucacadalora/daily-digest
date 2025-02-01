import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscribeModal = ({ isOpen, onClose }: SubscribeModalProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle newsletter subscription
    console.log("Subscribe:", email);
    onClose();
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
              <h2 className="text-2xl font-medium text-center">
                The best newsletter for{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  stock investors
                </span>
              </h2>

              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Subscribe to stay up to date with the latest stocks, crypto, tech and future industries.
              </p>

              <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-10 rounded-md border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <Button
                    type="submit"
                    className="h-10 bg-red-700 hover:bg-red-800 text-white rounded-md px-6 transition-colors"
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};