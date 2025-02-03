
import { useEffect } from 'react';

export function useDevRefresh() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      const hot = (import.meta as any).hot;
      
      if (hot) {
        hot.accept(() => {
          // Only reload if it's a component update
          if (hot.data && hot.data.type === 'update') {
            window.location.reload();
          }
        });

        hot.dispose(() => {
          hot.data = { type: 'update' };
        });
      }
    }
  }, []);
}
