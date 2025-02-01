import { Link } from "wouter";
import { MarketTicker } from "@/components/MarketTicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSubscribe?: () => void;
  showCategories?: boolean;
  simplified?: boolean;
}

export const Header = ({ onSubscribe, showCategories = true, simplified = false }: HeaderProps) => {
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
          {showCategories && (
            <nav className="hidden sm:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
              <Link href="/newsletter/category/Markets" className="hover:text-blue-600 transition-colors">Markets</Link>
              <Link href="/newsletter/category/Economics" className="hover:text-blue-600 transition-colors">Economics</Link>
              <Link href="/newsletter/category/Industries" className="hover:text-blue-600 transition-colors">Industries</Link>
              <Link href="/newsletter/category/Tech" className="hover:text-blue-600 transition-colors">Tech</Link>
            </nav>
          )}

          {/* Center Logo */}
          <Link href="/" className={showCategories ? "absolute left-1/2 -translate-x-1/2" : ""}>
            <h1 className="text-xl font-['Georgia'] font-bold dark:text-white cursor-pointer hover:opacity-80 transition-opacity">
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">Daily</span>
              <span className="font-light mx-1">|</span>
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Digest</span>
            </h1>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {!simplified && onSubscribe && (
              <Button
                onClick={onSubscribe}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
              >
                Subscribe
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
