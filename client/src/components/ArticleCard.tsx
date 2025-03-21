import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { SiMarketo } from "react-icons/si"; // Markets
import { TbChartBar } from "react-icons/tb"; // Economics
import { HiOutlineOfficeBuilding } from "react-icons/hi"; // Industries
import { RiComputerLine } from "react-icons/ri"; // Tech
import { LuLightbulb } from "react-icons/lu"; // Insight
import type { Article } from "@/types/newsletter";

const CategoryIcons = {
  Markets: SiMarketo,
  Economics: TbChartBar,
  Industries: HiOutlineOfficeBuilding,
  Tech: RiComputerLine,
  Insight: LuLightbulb,
};

export interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const Icon = CategoryIcons[article.category];
  
  // Use different path based on article category
  const articlePath = article.category === "Insight" 
    ? `/insights/${article.slug}` 
    : `/newsletter/${article.slug}`;

  return (
    <Link href={articlePath}>
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group dark:border-gray-800 dark:bg-gray-800">
        <CardContent className="p-4">
          {/* Header with emoji and category */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Icon className="h-4 w-4" />
              <span className="text-xs font-medium">{article.source}</span>
              <span>•</span>
              <span className="text-xs font-medium">{article.category}</span>
            </div>
            {article.previewEmoji && (
              <span className="text-xl">{article.previewEmoji}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors dark:group-hover:text-blue-400">
            {article.title}
          </h3>

          {/* Preview Metrics */}
          {article.previewMetrics && (
            <div className="grid grid-cols-3 gap-2 mb-3 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
              {article.previewMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="font-bold text-blue-600 dark:text-blue-400">
                    {metric.value}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {article.description}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>{article.date}</span>
            </div>
            <div className="overflow-hidden border border-blue-600 text-blue-600 px-4 py-1.5 rounded-full flex items-center gap-2 read-button-gradient group-hover:text-white group-hover:border-transparent transition-all duration-500 dark:border-blue-400 dark:text-blue-400 dark:group-hover:text-white dark:group-hover:border-transparent">
              <span className="text-sm font-medium relative z-10">Read</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};