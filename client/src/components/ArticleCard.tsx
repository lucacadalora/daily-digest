import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { SiMarketo } from "react-icons/si";
import { TbChartBar } from "react-icons/tb";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { RiComputerLine } from "react-icons/ri";
import type { Article } from "@/types/newsletter";

const CategoryIcons = {
  Markets: SiMarketo,
  Economics: TbChartBar,
  Industries: HiOutlineOfficeBuilding,
  Tech: RiComputerLine,
};

export interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const Icon = CategoryIcons[article.category];

  return (
    <Link href={`/newsletters/${article.slug}`}>
      <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 group dark:border-gray-800 dark:bg-gray-800">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-center space-x-2 mb-3 text-gray-600 dark:text-gray-400">
            <Icon className="h-4 w-4" />
            <span className="text-xs font-medium">{article.source}</span>
            <span>•</span>
            <span className="text-xs font-medium">{article.category}</span>
          </div>
          <h3 className="font-serif text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors dark:group-hover:text-blue-400">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
            {article.description}
          </p>
          <div className="flex justify-between items-center mt-auto">
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