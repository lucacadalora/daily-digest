
import { useEffect } from 'react';

export function useDevRefresh() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      const hot = (import.meta as any).hot;
      
      if (hot) {
        hot.accept((mod: any) => {
          if (mod) {
            window.location.reload();
          }
        });
      }

      return () => {
        if (hot && hot.dispose) {
          hot.dispose();
        }
      };
    }
  }, []);
}
