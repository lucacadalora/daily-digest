import { Link } from "wouter";
import { Clock } from "lucide-react";
import type { Article } from "@/types/newsletter";

export interface LatestNewsCardProps {
  article: Article;
  compact?: boolean;
}

/**
 * A compact article card specifically designed for the Latest News section
 */
export const LatestNewsCard = ({ article, compact = false }: LatestNewsCardProps) => {
  // Use different path based on article category
  const articlePath = article.category === "Insight" 
    ? `/insights/${article.slug}` 
    : `/newsletter/${article.slug}`;

  return (
    <Link href={articlePath}>
      <div className="group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-lg p-3">
        <div className="flex gap-3">
          {/* Thumbnail/Image - only show if not compact view */}
          {!compact && article.previewImage && (
            <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
              <img 
                src={article.previewImage || "/placeholder-thumbnail.jpg"} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1">
            {/* Category and emoji */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                {article.category}
              </span>
              {article.previewEmoji && (
                <span className="text-base">{article.previewEmoji}</span>
              )}
            </div>
            
            {/* Title */}
            <h4 className="font-serif text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors dark:group-hover:text-blue-400">
              {article.title}
            </h4>
            
            {/* Date */}
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{article.date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};