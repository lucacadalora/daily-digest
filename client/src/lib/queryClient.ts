import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        // Add cache busting parameter for development
        const url = import.meta.env.DEV 
          ? `${queryKey[0]}${queryKey[0].includes('?') ? '&' : '?'}_t=${Date.now()}`
          : queryKey[0];

        const res = await fetch(url as string, {
          credentials: "include",
          headers: import.meta.env.DEV ? {
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
      refetchOnWindowFocus: import.meta.env.DEV ? true : false,
      staleTime: import.meta.env.DEV ? 0 : Infinity,
      retry: false,
      cacheTime: import.meta.env.DEV ? 0 : 300000, // 5 minutes in production
    },
    mutations: {
      retry: false,
    }
  },
});

// Reset cache on HMR updates
if (import.meta.env.DEV) {
  const hot = (import.meta as any).hot;
  if (hot) {
    hot.accept(() => {
      queryClient.clear();
    });
  }
}