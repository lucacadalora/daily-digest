import { useState } from "react";
import { Send, Search, Globe, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isSearching?: boolean;
}

const EXAMPLE_PROMPTS = [
  "Analyze BBRI's current valuation and dividend outlook",
  "What's the investment thesis for ADRO in 2025?",
  "Provide a technical analysis of TLKM stock",
  "Assess ASII's growth prospects and market position",
];

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClear = () => {
    setMessages([]);
    setInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Check if the query is related to financial markets/analysis
    const financialTerms = /\b(market|stock|index|trade|invest|dividend|price|trend|economy|sector|analysis|forecast|growth|earning|revenue|profit|rate|bank|finance|currency)\b/i;
    if (!financialTerms.test(input)) {
      setMessages(prev => [...prev, 
        { role: 'user', content: input },
        { role: 'assistant', content: "I apologize, but I can only assist with questions related to financial markets, economic analysis, and investment insights. Please ask questions within these domains." }
      ]);
      setInput('');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: 'Analyzing market data...', 
      isSearching: true 
    }]);

    try {
      const response = await axios.post('/api/chat', { message: userMessage });
      if (response.data.status === 'success') {
        setMessages(prev => {
          const filtered = prev.filter(msg => !msg.isSearching);
          return [...filtered, { role: 'assistant', content: response.data.reply }];
        });
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isSearching);
        return [...filtered, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.'
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormattedMessage = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('📊') || line.startsWith('📈') || line.startsWith('💡') || line.startsWith('⚠️')) {
        return (
          <div key={index} className="font-serif text-lg font-bold mb-3 text-gray-900 dark:text-white">
            {line}
          </div>
        );
      } else if (line.startsWith('•')) {
        return (
          <div key={index} className="ml-4 mb-2 text-gray-700 dark:text-gray-300">
            {line}
          </div>
        );
      }
      return <div key={index} className="mb-2 text-gray-700 dark:text-gray-300">{line}</div>;
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Market Insights Chat</h2>
              <div className="flex items-center">
                <div className="relative">
                  <div className="absolute h-2 w-2 rounded-full bg-green-500 animate-ping opacity-75" />
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">Online</span>
              </div>
            </div>
            {messages.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClear}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            <Globe className="h-4 w-4 mr-2" />
            <p>Ask questions about market trends and get AI-powered insights with real-time web search</p>
          </div>

          {/* Example prompts - only show when no messages */}
          {messages.length === 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    className="text-sm px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => {
                      setInput(prompt);
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <ScrollArea className="h-[400px] pr-4 mb-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white ml-4'
                      : 'bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 mr-4'
                  }`}
                >
                  {message.isSearching ? (
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 animate-spin" />
                      <span>{message.content}</span>
                    </div>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {renderFormattedMessage(message.content)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about market insights..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}

export default ChatBox;