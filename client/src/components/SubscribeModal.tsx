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

  const handleSubmit = (e: React.FormEvent) => {
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
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,480px)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50"
          >
            <div className="relative px-6 py-8 sm:px-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>

              {/* Content */}
              <div className="text-center space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                  The best newsletter for{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    stock investors
                  </span>
                </h2>

                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Subscribe to stay up to date with the latest stocks, crypto, tech and future industries.
                </p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-4">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-4 pr-[120px] py-3 h-12 rounded-full text-base"
                      required
                    />
                    <Button
                      type="submit"
                      className="absolute right-1 top-1 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6"
                    >
                      Subscribe
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};