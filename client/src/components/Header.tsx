import { Link } from "wouter";
import { MarketTicker } from "@/components/MarketTicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onSubscribe?: () => void;
  showCategories?: boolean;
  simplified?: boolean;
}

export const Header = ({ onSubscribe, showCategories = true, simplified = false }: HeaderProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const handleChatClick = () => {
    setIsSheetOpen(false);
    setTimeout(() => {
      const chatElement = document.querySelector('#chat');
      const mobileChatElement = document.querySelector('#mobile-chat');
      const elementToScroll = window.innerWidth >= 768 ? chatElement : mobileChatElement;

      if (elementToScroll) {
        elementToScroll.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 z-50">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Market Ticker */}
        <div className="py-2 overflow-hidden border-b border-gray-100 dark:border-gray-800">
          <MarketTicker />
        </div>

        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Left Categories */}
          {showCategories ? (
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
              <Link href="/newsletter/category/Markets" className="hover:text-blue-600 transition-colors">Markets</Link>
              <Link href="/newsletter/category/Economics" className="hover:text-blue-600 transition-colors">Economics</Link>
              <Link href="/newsletter/category/Industries" className="hover:text-blue-600 transition-colors">Industries</Link>
              <Link href="/newsletter/category/Tech" className="hover:text-blue-600 transition-colors">Tech</Link>
              <Link href="/insights" className="hover:text-blue-600 transition-colors">Insights</Link>
            </nav>
          ) : (
            <div className="w-10 md:hidden"></div>
          )}

          {/* Center Logo */}
          <Link 
            href="/" 
            className={`${showCategories ? 'md:absolute md:left-1/2 md:-translate-x-1/2' : ''} mx-auto flex-1 md:flex-none text-center`}
          >
            <h1 className="text-xl font-['Georgia'] font-bold cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-blue-600">Daily</span>{" "}|{" "}
              <span className="text-gray-900 dark:text-white">Digest</span>
            </h1>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Desktop Data Dropdown, About and Subscribe Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="hover:text-blue-600 group"
                    >
                    <span className="flex items-center">
                      DATA
                      <ExternalLink className="ml-1 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-[-2px]" />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[300px] p-4 max-h-[calc(100vh-100px)] overflow-y-auto">
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Access Daily | Digest database</h3>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="mt-2 mb-1">
                    <p className="text-xs text-gray-500 uppercase font-medium">EXPLORE OUR DATA</p>
                  </div>
                  <DropdownMenuItem className="py-2 cursor-pointer">
                    <Link href="/data/explorer" className="w-full">
                      <span className="text-sm font-medium">Data Explorer</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2 cursor-pointer">
                    <Link href="/data/methodology" className="w-full">
                      <span className="text-sm font-medium">Our Methodology</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                  >
                    <Link href="/data/law" className="w-full">
                      <span className="text-sm font-medium">Law</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                  >
                    <Link href="/data/research-index" className="w-full">
                      <span className="text-sm font-medium">Research</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link href="/about">
                <Button variant="ghost" className="hover:text-blue-600">
                  About
                </Button>
              </Link>
              {!simplified && onSubscribe && (
                <Button
                  onClick={onSubscribe}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                >
                  Subscribe
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="px-6 py-8 max-h-[90vh] overflow-y-auto">
                  <div className="max-h-full overflow-y-auto">
                    {/* Categories */}
                    <nav className="space-y-4 mb-8">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Categories</h3>
                      <Link href="/newsletter/category/Markets" className="block text-base hover:text-blue-600 transition-colors">Markets</Link>
                      <Link href="/newsletter/category/Economics" className="block text-base hover:text-blue-600 transition-colors">Economics</Link>
                      <Link href="/newsletter/category/Industries" className="block text-base hover:text-blue-600 transition-colors">Industries</Link>
                      <Link href="/newsletter/category/Tech" className="block text-base hover:text-blue-600 transition-colors">Tech</Link>
                      <Link href="/insights" className="block text-base hover:text-blue-600 transition-colors">Insights</Link>
                    </nav>

                    {/* Data Links */}
                    <div className="mb-8">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Data</h3>
                      <Link href="/data/explorer" className="block text-base hover:text-blue-600 transition-colors py-2">Data Explorer</Link>
                      <Link href="/data/methodology" className="block text-base hover:text-blue-600 transition-colors py-2">Our Methodology</Link>
                      <Link href="/data/law" className="block text-base hover:text-blue-600 transition-colors py-2">Law</Link>
                      <Link href="/data/research-index" className="block text-base hover:text-blue-600 transition-colors py-2">Research</Link>
                    </div>

                    {/* About Link */}
                    <div className="mb-8">
                      <Link href="/about" className="flex items-center justify-between text-lg font-medium hover:text-blue-600 transition-colors">
                        About
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Subscribe Button */}
                    <div className="mt-8 pb-4">
                      <div className="bg-blue-600 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Sign up for our newsletter!</h3>
                        <p className="text-white/90 text-sm mb-4">
                          Subscribe to stay up to date with the latest market insights and trends.
                        </p>
                        <Button 
                          onClick={() => {
                            setIsSheetOpen(false); // Close the mobile menu
                            if (onSubscribe) onSubscribe(); // Open the subscription modal
                          }}
                          className="w-full bg-white hover:bg-gray-100 text-blue-600 rounded-lg h-10 flex items-center justify-center"
                        >
                          Subscribe Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};