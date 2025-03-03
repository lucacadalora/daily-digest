
import { QueryClient } from "@tanstack/react-query";

// Helper function to detect development environment in both Next.js and Vite
const isDevelopment = () => {
  // Check for Next.js environment variable
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV) {
    return process.env.NODE_ENV === 'development';
  }
  
  // Check for Vite environment variable as fallback (safely)
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env.DEV === true;
    }
  } catch (e) {
    // Ignore error if import.meta is not available
  }
  
  // Default to development if we're in a browser environment with no production flag
  if (typeof window !== 'undefined') {
    // Check if the URL contains localhost or a port in dev range
    const hostname = window.location.hostname;
    const port = parseInt(window.location.port, 10);
    if (hostname === 'localhost' || hostname === '0.0.0.0' || (port > 3000 && port < 5000)) {
      return true;
    }
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
          } : {}
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
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
    },
  },
});

// Safely handle HMR updates
if (typeof window !== 'undefined') {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.hot) {
      import.meta.hot.accept(() => {
        queryClient.clear();
      });
    }
  } catch (e) {
    // Ignore error if import.meta is not available
    console.debug('HMR not available for queryClient');
  }
}
