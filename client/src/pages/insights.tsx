import { Link } from "wouter";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { LuLightbulb } from "react-icons/lu";
import { Clock, ChevronRight, MapPin } from "lucide-react";
import { sampleArticles } from "@/types/newsletter";

export default function Insights() {
  const insightArticles = sampleArticles.filter(article => article.category === "Insight");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-800 dark:text-gray-200">Insights</span>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-4">
              <LuLightbulb className="w-6 h-6 text-blue-700 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Insights</h1>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Analisis dan pembahasan mendalam tentang kebijakan, regulasi, dan trend penting yang memengaruhi pasar Indonesia.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insightArticles.map((article, index) => (
            <Link key={index} href={`/insights/${article.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-gray-200 dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <LuLightbulb className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">{article.category}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{article.title}</h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    
                    <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                      <span>Baca selengkapnya</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {insightArticles.length === 0 && (
          <div className="text-center py-12">
            <LuLightbulb className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Belum ada insight</h3>
            <p className="text-gray-600 dark:text-gray-400">Insight akan segera hadir.</p>
          </div>
        )}
      </main>
    </div>
  );
}