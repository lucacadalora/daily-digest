
import { QueryClient } from "@tanstack/react-query";

// Helper function to detect development environment in both Next.js and Vite
const isDevelopment = () => {
  // Check for Next.js environment variable
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV) {
    return process.env.NODE_ENV === 'development';
  }
  
  // Check for Vite environment variable as fallback
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.DEV === true;
  }
  
  // Default to production if cannot detect
  return false;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        // Add cache busting parameter for development
        const isDevMode = isDevelopment();
        const url = isDevMode 
          ? `${queryKey[0]}${queryKey[0].includes('?') ? '&' : '?'}_t=${Date.now()}`
          : queryKey[0];

        const res = await fetch(url as string, {
          credentials: "include",
          headers: isDevMode ? {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          } : undefined
        });

        if (!res.ok) {
          if (res.status >= 500) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }

          throw new Error(`${res.status}: ${await res.text()}`);
        }

        return res.json();
      },
      refetchInterval: false,
      refetchOnWindowFocus: isDevelopment(),
      staleTime: isDevelopment() ? 0 : Infinity,
      retry: false,
      cacheTime: isDevelopment() ? 0 : 300000, // 5 minutes in production
    },
    mutations: {
      retry: false,
    }
  },
});

// Reset cache on HMR updates
if (typeof import.meta !== 'undefined' && import.meta.hot) {
  import.meta.hot.accept(() => {
    queryClient.clear();
  });
}
