import { useState } from "react";
import { Send, Search, Globe, Maximize2, Minimize2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

const EXAMPLE_PROMPTS = [
  "Analyze BBRI's current valuation and growth prospects",
  "What's the latest market trend for Indonesian banking sector?",
  "Compare dividend yields of top ASEAN banks",
  "Analyze recent developments in digital banking adoption",
  "Evaluate impact of Indonesia's coal exports policy on mining stocks",
  "How will Fed policy changes affect emerging markets in 2025?",
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isSearching?: boolean;
  isStreaming?: boolean;
}

// Enhanced formatter for financial analysis responses
const formatMarketAnalysis = (content: string) => {
  // Process specific sections if present
  if (content.includes('MARKET_CONTEXT')) {
    const parts = content.split('MARKET_CONTEXT');
    const [beforeContext, afterContext] = parts;

    const formattedContext = afterContext
      .replace(/📈 Latest Market Data:/g, '📈 Market Context\n')
      .replace(/Current Price: (IDR \d+([,\.]\d+)*)/g, '💰 Current Price: 💵$1')
      .replace(/Change: ([+-]\d+(\.\d{1,2})?%)/g, '📊 Change: $1')
      .replace(/Fair Value Estimates:/g, '\n💡 Fair Value Estimates\n')
      .replace(/Peter Lynch Fair Value:/g, '🎯 Peter Lynch Fair Value:')
      .replace(/Analyst Consensus:/g, '👥 Analyst Consensus:')
      .replace(/Dividend Outlook:/g, '\n💰 Dividend Outlook\n')
      .replace(/(\d+(\.\d{1,2})?%)/g, '📝 $1')
      .replace(/(IDR \d+([,\.]\d+)*)/g, '💵 $1')
      .replace(/upside potential/g, '📈 upside potential')
      .replace(/downside risk/g, '📉 downside risk');

    return beforeContext + formattedContext;
  }

  // General formatting for all financial content
  let formatted = content;
  
  // Headers and sections
  formatted = formatted
    .replace(/## Current Valuation/g, '## 💼 Current Valuation')
    .replace(/## Growth Prospects/g, '## 📈 Growth Prospects')
    .replace(/## Financial Performance/g, '## 📊 Financial Performance')
    .replace(/## Key Metrics/g, '## 🔑 Key Metrics')
    .replace(/## Market Position/g, '## 🌍 Market Position')
    .replace(/## Risks/g, '## ⚠️ Risks')
    .replace(/## Outlook/g, '## 🔮 Outlook')
    .replace(/## Recommendation/g, '## 🎯 Recommendation')
    .replace(/## Summary/g, '## ✅ Summary');
  
  // Price and financial metrics
  formatted = formatted
    .replace(/Market Context:/g, '📈 Market Context\n')
    .replace(/current stock price is ([\$|IDR|Rp|€|£])([0-9,\.]+)/gi, 'current stock price is $1$2 💵')
    .replace(/P\/E ratio of ([0-9\.]+)/g, 'P/E ratio of $1 📊')
    .replace(/dividend yield of ([0-9\.]+)%/g, 'dividend yield of $1% 💰')
    .replace(/ROE of ([0-9\.]+)%/g, 'ROE of $1% 📈')
    .replace(/growth rate of ([0-9\.]+)%/g, 'growth rate of $1% 📈')
    .replace(/dropped by ([0-9\.]+)%/g, 'dropped by $1% 📉')
    .replace(/increased by ([0-9\.]+)%/g, 'increased by $1% 📈')
    .replace(/(\+[0-9\.]+%)/g, '$1 📈')
    .replace(/(\-[0-9\.]+%)/g, '$1 📉')
    .replace(/(\d+(\.\d{1,2})?%)/g, '$1')
    .replace(/(IDR \d+([,\.]\d+)*)/g, '$1 💵')
    .replace(/(\$\d+([,\.]\d+)*)/g, '$1 💵');
  
  // Market sentiment
  formatted = formatted
    .replace(/bullish/g, 'bullish 🚀')
    .replace(/bearish/g, 'bearish 🐻')
    .replace(/undervalued/g, 'undervalued ⭐')
    .replace(/overvalued/g, 'overvalued ⚠️');
  
  return formatted;
};

export const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClear = () => {
    setMessages([]);
    setInput('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Add searching message with loading animation
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: 'Analyzing market data...', 
      isSearching: true 
    }]);

    try {
      console.log('Sending chat request:', userMessage);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      console.log('Received chat response:', data);

      if (data.status === 'error') {
        throw new Error(data.error || 'Failed to get response');
      }

      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isSearching);
        return [...filtered, { 
          role: 'assistant', 
          content: data.reply
        }];
      });
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.';
      setError(errorMessage);
      setMessages(prev => prev.filter(msg => !msg.isSearching));
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message: Message) => {
    if (message.isSearching) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 animate-spin" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Analyzing market data
              <motion.span
                animate={{
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  times: [0, 0.25, 0.5, 0.75, 1]
                }}
              >
                .
              </motion.span>
              <motion.span
                animate={{
                  opacity: [0, 0, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  times: [0, 0.25, 0.5, 0.75, 1]
                }}
              >
                .
              </motion.span>
              <motion.span
                animate={{
                  opacity: [0, 0, 0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  times: [0, 0.25, 0.5, 0.75, 1]
                }}
              >
                .
              </motion.span>
            </span>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-0.5 bg-gradient-to-r from-blue-500 to-transparent"
          />
        </motion.div>
      );
    }

    const formattedContent = formatMarketAnalysis(message.content);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="prose prose-sm dark:prose-invert max-w-none"
      >
        {message.isStreaming ? (
          <div className="relative">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-semibold mb-2">{children}</h3>,
                p: ({ children }) => (
                  <div className="mb-2 leading-relaxed">
                    {children}
                    {message.isStreaming && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.3, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                        className="inline-block ml-0.5 w-0.5 h-4 bg-blue-500 translate-y-1"
                      />
                    )}
                  </div>
                ),
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                strong: ({ children }) => (
                  <motion.strong 
                    initial={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    animate={{ backgroundColor: "rgba(59, 130, 246, 0)" }}
                    transition={{ duration: 1 }}
                    className="font-semibold text-blue-600 dark:text-blue-400"
                  >
                    {children}
                  </motion.strong>
                ),
                em: ({ children }) => <em className="italic text-gray-600 dark:text-gray-400">{children}</em>,
                code: ({ children }) => (
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{children}</code>
                ),
                blockquote: ({ children }) => (
                  <motion.blockquote 
                    initial={{ borderLeftColor: "rgba(59, 130, 246, 0.5)" }}
                    animate={{ borderLeftColor: "rgba(59, 130, 246, 1)" }}
                    transition={{ duration: 0.5 }}
                    className="border-l-4 pl-4 italic bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r"
                  >
                    {children}
                  </motion.blockquote>
                ),
              }}
            >
              {formattedContent}
            </ReactMarkdown>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-semibold mb-2">{children}</h3>,
                p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-blue-600 dark:text-blue-400">{children}</strong>,
                em: ({ children }) => <em className="italic text-gray-600 dark:text-gray-400">{children}</em>,
                code: ({ children }) => (
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{children}</code>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {formattedContent}
            </ReactMarkdown>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const chatContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
              <div className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></div>
            </div>
            <span className="text-sm text-gray-500">Online</span>
            <div className="h-4 w-px bg-gray-300 mx-2" />
            <Globe className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleExpand}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <h2 className="text-sm font-medium mt-2 text-gray-700 dark:text-gray-300">
          Market Analysis Assistant powered by Perplexity AI
        </h2>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800"
        >
          <p className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        </motion.div>
      )}

      {/* Example Prompts - Only show when no messages */}
      {messages.length === 0 && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((prompt, index) => (
              <button
                key={index}
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setInput(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-50 text-gray-900 dark:bg-blue-900/20 dark:text-white'
                    : 'bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100'
                }`}
              >
                {renderMessage(message)}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={error ? "Please try again..." : "Ask about market insights..."}
            disabled={isLoading}
            className={`flex-1 ${error ? 'border-red-300 dark:border-red-700' : ''}`}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={false}
        animate={isExpanded ? {
          position: 'fixed',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          width: '80vw',
          height: '80vh',
          zIndex: 50,
        } : {
          position: 'relative',
          top: 0,
          left: 0,
          x: 0,
          y: 0,
          width: '100%',
          height: messages.length > 0 ? 'calc(100vh - 9rem)' : 'auto',
          zIndex: 20,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 25,
          mass: 1
        }}
        layout
      >
        <Card className={`h-full bg-white dark:bg-gray-900 shadow-md overflow-hidden ${
          isExpanded ? 'rounded-lg' : ''
        }`}>
          {chatContent}
        </Card>
      </motion.div>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleExpand}
        />
      )}
    </AnimatePresence>
  );
};