import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface NewsItem {
  time: string;
  title: string;
  url?: string;
}

const formatTimeAgo = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (hours < 24) {
    return `${hours} HR AGO`;
  }
  return `${Math.floor(hours / 24)} DAY AGO`;
};

export function useLatestNews() {
  return useQuery({
    queryKey: ['latest-news'],
    queryFn: async (): Promise<NewsItem[]> => {
      try {
        const response = await axios.get('/api/news');
        return response.data.news.map((item: any) => ({
          time: formatTimeAgo(new Date(item.datetime).getTime()),
          title: item.headline,
          url: item.url
        }));
      } catch (error) {
        console.error('Failed to fetch news:', error);
        throw error;
      }
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 60 * 1000, // Consider data stale after 1 minute
  });
}
