import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Clock } from 'lucide-react';
import type { ExternalNews } from '@/types/external-news';

interface ExternalNewsCardProps {
  article: ExternalNews;
  compact?: boolean;
  showSource?: boolean;
}

export const ExternalNewsCard: React.FC<ExternalNewsCardProps> = ({ 
  article, 
  compact = false,
  showSource = true
}) => {
  // Format the timestamp to show relative time (e.g., "2 hours ago")
  const getRelativeTime = (timestamp?: number) => {
    if (!timestamp) return article.publishedDate;
    
    const now = Date.now();
    const diff = now - timestamp;
    
    // Convert to minutes
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    // Convert to hours
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    // Convert to days
    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
    
    // Just return the date for older articles
    return article.publishedDate;
  };

  // For compact layout, we'll use a side-by-side design
  if (compact && article.imageUrl) {
    return (
      <Link href={article.url || '#'}>
        <div className="group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-lg p-3">
          <div className="flex gap-3">
            {/* Thumbnail for compact view */}
            <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden relative">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute right-1 bottom-1 bg-white rounded-full p-1 shadow-sm group-hover:scale-110 transition-transform">
                <ArrowRight className="h-3 w-3 text-blue-600" />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              {/* Category */}
              <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                {article.category || (showSource ? article.source : '')}
              </div>
              
              {/* Title */}
              <h4 className="font-serif text-sm font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors dark:group-hover:text-blue-400">
                {article.title}
              </h4>
              
              {/* Time */}
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{getRelativeTime(article.timestamp)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Full card layout (default)
  return (
    <Link href={article.url || '#'}>
      <div className="group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-lg p-3">
        <div className="relative">
          {/* New design based on reference */}
          {article.imageUrl && (
            <div className="relative w-full rounded-lg overflow-hidden mb-3">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-40 object-cover"
              />
              {/* Arrow button overlay */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md group-hover:scale-110 transition-transform">
                <ArrowRight className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          )}
          
          {/* Category */}
          <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">
            {article.category || (showSource ? article.source : '')}
          </div>
          
          {/* Title */}
          <h4 className="font-serif text-base font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors dark:group-hover:text-blue-400 mb-2">
            {article.title}
          </h4>
          
          {/* Footer info */}
          <div className="flex items-center justify-between text-xs">
            <div className="text-gray-500 dark:text-gray-400">
              By {article.author}
            </div>
            <div className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{getRelativeTime(article.timestamp)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};