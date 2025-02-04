import { Link } from "wouter";
import { MarketTicker } from "@/components/MarketTicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
            </nav>
          ) : (
            <div className="w-10 md:hidden"></div>
          )}

          {/* Center Logo - Changed to Daily | Digest */}
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="px-6 py-8">
                  {/* Newsletter Link */}
                  <div className="mb-8">
                    <Link href="/newsletter" className="flex items-center justify-between text-lg font-medium hover:text-blue-600 transition-colors">
                      Newsletter
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Categories */}
                  <nav className="space-y-4 mb-8">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Categories</h3>
                    <Link href="/newsletter/category/Markets" className="block text-base hover:text-blue-600 transition-colors">Markets</Link>
                    <Link href="/newsletter/category/Economics" className="block text-base hover:text-blue-600 transition-colors">Economics</Link>
                    <Link href="/newsletter/category/Industries" className="block text-base hover:text-blue-600 transition-colors">Industries</Link>
                    <Link href="/newsletter/category/Tech" className="block text-base hover:text-blue-600 transition-colors">Tech</Link>
                  </nav>

                  {/* Subscribe Form */}
                  <div className="mt-8">
                    <div className="bg-blue-600 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Sign up for our newsletter!</h3>
                      <p className="text-white/90 text-sm mb-4">
                        Subscribe to stay up to date with the latest market insights and trends.
                      </p>
                      <form onSubmit={form.handleSubmit((data) => console.log(data))} className="relative">
                        <Input
                          type="email"
                          placeholder="Your Email"
                          {...form.register("email")}
                          className="w-full bg-white/90 dark:bg-white border-0 pr-12 placeholder:text-gray-500"
                        />
                        <Button 
                          type="submit" 
                          size="icon"
                          className="absolute right-1 top-1 bottom-1 bg-blue-500 hover:bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center p-0"
                        >
                          <ArrowRight className="h-4 w-4 text-white" />
                        </Button>
                      </form>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Subscribe Button */}
            <div className="hidden md:block">
              {!simplified && onSubscribe && (
                <Button
                  onClick={onSubscribe}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                >
                  Subscribe
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};