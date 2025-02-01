import { 
  Panel as ResizablePanel,
  PanelGroup as ResizablePanelGroup,
  PanelResizeHandle as ResizableHandle
} from "react-resizable-panels";
import { useState } from "react";
import { Send, Search, Globe, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

const EXAMPLE_PROMPTS = [
  "Analyze BBRI's current valuation and growth prospects",
  "What's the latest market trend for Indonesian banking sector?",
  "Compare dividend yields of top ASEAN banks",
  "Analyze recent developments in digital banking adoption",
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isSearching?: boolean;
  citations?: string[];
}

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [height, setHeight] = useState(600);

  const handleClear = () => {
    setMessages([]);
    setInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const restrictedTerms = /\b(sql|html|css|javascript|python|code|programming|script|database|api|endpoint)\b/i;
    if (restrictedTerms.test(input)) {
      setMessages(prev => [...prev, 
        { role: 'user', content: input },
        { role: 'assistant', content: "I focus on business, market, and investment analysis. For coding-related questions, please consult programming-specific resources." }
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
          return [...filtered, { 
            role: 'assistant', 
            content: response.data.reply,
            citations: response.data.citations 
          }];
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

  const renderMessage = (message: Message) => {
    if (message.isSearching) {
      return (
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 animate-spin" />
          <span>{message.content}</span>
        </div>
      );
    }

    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-base font-semibold mb-2">{children}</h3>,
            p: ({ children }) => <p className="mb-2">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{children}</code>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                {children}
              </a>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
        {message.citations && message.citations.length > 0 && (
          <div className="mt-4 text-sm border-t border-gray-200 dark:border-gray-700 pt-2">
            <p className="font-semibold mb-1">Sources:</p>
            <ul className="list-none space-y-1">
              {message.citations.map((citation, index) => (
                <li key={index}>
                  <a 
                    href={citation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                  >
                    [{index + 1}] {new URL(citation).hostname}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <ResizablePanelGroup
        direction="vertical"
        onLayout={(sizes: number[]) => {
          const newHeight = Math.max(400, Math.min(1000, window.innerHeight * sizes[0] / 100));
          setHeight(newHeight);
        }}
      >
        <ResizablePanel defaultSize={75} minSize={30}>
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

            <ScrollArea className={`h-[${height}px] pr-4 mb-4`}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-lg p-4 ${
                        message.role === 'user'
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white ml-4'
                          : 'bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 mr-4'
                      }`}
                    >
                      {renderMessage(message)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <ResizableHandle className="h-2 w-full hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-row-resize flex items-center justify-center">
              <GripVertical className="h-4 w-4 text-gray-400" />
            </ResizableHandle>

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
        </ResizablePanel>
      </ResizablePanelGroup>
    </Card>
  );
}

export default ChatBox;