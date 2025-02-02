import React from 'react';
import { TrendingDown, AlertCircle, Shield, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Article } from "@/types/newsletter";

interface TradeWarContentProps {
  article: Article;
}

const MetricCard = ({ icon: Icon, title, mainValue, subtitle, iconColor }: {
  icon: any;
  title: string;
  mainValue: string;
  subtitle: string;
  iconColor: string;
}) => {
  return (
    <Card className="bg-gray-50 dark:bg-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{mainValue}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export function TradeWarContent({ article }: TradeWarContentProps) {
  return (
    <div className="py-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">Weekly Special</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
          <span className="font-bold uppercase">Market Strategy</span>
          <span>•</span>
          <span>February 3-7, 2025</span>
        </div>
      </div>

      <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
        {article.title}
      </h1>

      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{article.date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4" />
          <span>JAKARTA</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        {/* Strategic Takeaway Card */}
        <MetricCard
          icon={TrendingDown}
          title="IHSG Support Level"
          mainValue="6,900-6,956"
          subtitle="Critical psychological support zone"
          iconColor="text-blue-600"
        />

        {/* Most Impacted Sectors Card */}
        <MetricCard
          icon={AlertCircle}
          title="Most Impacted Sectors"
          mainValue="Cyclicals & Basic Ind"
          subtitle="Direct trade war exposure"
          iconColor="text-orange-600"
        />

        {/* Defensive Opportunities Card */}
        <MetricCard
          icon={Shield}
          title="Defensive Opportunities"
          mainValue="Non-Cyclicals & Finance"
          subtitle="Domestic demand shield"
          iconColor="text-green-600"
        />
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300">
          {article.description}
        </p>
      </div>
    </div>
  );
}