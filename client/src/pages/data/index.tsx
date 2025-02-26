import React from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { ChevronRight, Database, Scale, FileText, BarChart3, BookText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface DataCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  isActive: boolean;
}

const dataCategories: DataCategory[] = [
  {
    id: "explorer",
    title: "Data Explorer",
    description: "Interactive tools to explore and visualize our financial datasets",
    icon: BarChart3,
    path: "/data/explorer",
    isActive: false
  },
  {
    id: "methodology",
    title: "Our Methodology",
    description: "Learn about our data collection and analysis methodology",
    icon: Database,
    path: "/data/methodology",
    isActive: false
  },
  {
    id: "law",
    title: "Law",
    description: "Access to Indonesian laws and regulations with analysis",
    icon: Scale,
    path: "/data/law",
    isActive: true
  },
  {
    id: "research",
    title: "Research",
    description: "Comprehensive research papers on global trade, economic policies, and market impacts",
    icon: BookText,
    path: "/data/research-index",
    isActive: true
  },
  {
    id: "documents",
    title: "Official Documents",
    description: "Government and corporate official documents archive",
    icon: FileText,
    path: "/data/documents",
    isActive: false
  }
];

export default function DataPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-800 dark:text-gray-200">Data</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Data Resources</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mb-8">
            Access our comprehensive datasets, interactive tools, and analysis resources to gain deeper insights into financial markets, economic trends, and regulatory frameworks.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataCategories.map((category) => (
              <Link key={category.id} href={category.path}>
                <Card className={`h-full hover:shadow-md transition-shadow cursor-pointer ${category.isActive ? 'border-blue-500 dark:border-blue-400' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <category.icon className={`h-6 w-6 ${category.isActive ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400'}`} />
                    </div>
                    <CardDescription className="mt-1">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`flex items-center text-sm ${category.isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {category.isActive ? (
                        <>Explore now <ChevronRight className="h-4 w-4 ml-1" /></>
                      ) : (
                        <>Coming soon</>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}