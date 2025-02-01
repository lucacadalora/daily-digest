import { Link } from "wouter";
import { MarketTicker } from "@/components/MarketTicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSubscribe?: () => void;
  showCategories?: boolean;
  simplified?: boolean;
}

export const Header = ({ onSubscribe, showCategories = true, simplified = false }: HeaderProps) => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 z-50">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Market Ticker */}
        <div className="py-2 overflow-hidden border-b border-gray-100 dark:border-gray-800 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-gray-800/20 animate-pulse"></div>
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

          {/* Center Logo */}
          <Link 
            href="/" 
            className={`${showCategories ? 'md:absolute md:left-1/2 md:-translate-x-1/2' : ''} mx-auto flex-1 md:flex-none text-center`}
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-gray-600/20 blur-sm rounded-lg"></div>
              <h1 className="relative text-xl font-['Georgia'] font-bold dark:text-white cursor-pointer hover:opacity-80 transition-opacity">
                <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">Daily</span>
                <span className="font-light mx-1">|</span>
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Digest</span>
              </h1>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle - Always visible */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh] px-6 py-8">
                  {/* Categories with decorative elements */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/30 rounded-xl"></div>
                    <nav className="relative flex flex-col gap-6 text-base font-medium text-gray-600 dark:text-gray-300">
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">Categories</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Link href="/newsletter/category/Markets" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          Markets
                        </Link>
                        <Link href="/newsletter/category/Economics" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          Economics
                        </Link>
                        <Link href="/newsletter/category/Industries" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                          Industries
                        </Link>
                        <Link href="/newsletter/category/Tech" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                          Tech
                        </Link>
                      </div>
                    </nav>
                  </div>

                  {/* Subscribe Form with enhanced styling */}
                  {!simplified && (
                    <div className="mt-12">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-800/30 rounded-xl"></div>
                        <div className="relative">
                          <h3 className="text-lg font-semibold mb-4">Get Daily Insights</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            Subscribe to receive the latest market analysis and expert opinions.
                          </p>
                          <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-4">
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...form.register("email")}
                              className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                            />
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                              Subscribe
                            </Button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
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