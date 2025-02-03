import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
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
            <div className="space-y-4 pt-2" aria-describedby="subscribe-modal-description">
              <h2 className="text-3xl font-medium text-center">
                <span id="subscribe-modal-description">Subscribe to Newsletter</span>
              </h2>
              <h2 className="text-3xl font-medium text-center">
                The best newsletter for{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  stock investors
                </span>
              </h2>

              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Subscribe to stay up to date with the latest stocks, crypto, tech and future industries.
              </p>

              <form onSubmit={handleSubmit} className="mt-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};