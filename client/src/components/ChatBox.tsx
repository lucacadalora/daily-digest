import { useState } from "react";
import { Send, Search, Globe } from "lucide-react";
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

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Market Insights Chat</h2>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Globe className="h-4 w-4 mr-2" />
            <p>Ask questions about market trends and get AI-powered insights with real-time web search</p>
          </div>
        </div>

        <ScrollArea className="h-[400px] pr-4 mb-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white dark:text-primary-foreground ml-4'
                      : 'bg-secondary/50 dark:bg-secondary text-gray-900 dark:text-gray-100 mr-4'
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