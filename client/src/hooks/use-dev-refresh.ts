import { useEffect } from 'react';

// Helper hook to force refresh components in development
export function useDevRefresh() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      const forceRefresh = () => {
        window.location.reload();
      };

      // Listen for Vite hot module reload
      const hot = (import.meta as any).hot;
      if (hot) {
        hot.accept(() => {
          forceRefresh();
        });
      }
    }
  }, []);
}
