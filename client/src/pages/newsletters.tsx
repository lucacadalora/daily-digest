import { ArticleCard } from "@/components/ArticleCard";
import { sampleArticles } from "@/types/newsletter";
import type { Category } from "@/types/newsletter";
import { useLocation } from "wouter";

export default function Newsletters() {
  const [location] = useLocation();
  const category = location.split("/").pop() as Category | undefined;
  
  const filteredArticles = category 
    ? sampleArticles.filter(article => article.category === category)
    : sampleArticles;

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Header spacing for fixed navbar */}
      <div className="h-24"></div>
      
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {category ? `${category} Articles` : 'All Articles'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
}
