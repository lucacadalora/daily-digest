import React from 'react';
import { Link } from 'wouter';
import { Clock } from 'lucide-react';
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

  return (
    <Link href={article.url || '#'}>
      <div className="group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-lg p-3">
        <div className="flex gap-3">
          {/* Image thumbnail - only show if not compact view */}
          {!compact && article.imageUrl && (
            <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1">
            {/* Source/Category and timestamp */}
            <div className="flex items-center justify-between mb-1 text-xs">
              <div className="font-medium text-blue-600 dark:text-blue-400 uppercase">
                {showSource ? article.source : article.category}
              </div>
              <div className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{getRelativeTime(article.timestamp)}</span>
              </div>
            </div>
            
            {/* Title */}
            <h4 className="font-serif text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors dark:group-hover:text-blue-400">
              {article.title}
            </h4>
            
            {/* Author */}
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              By {article.author}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};