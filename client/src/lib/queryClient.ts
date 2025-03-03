import { QueryClient } from '@tanstack/react-query';

/**
 * Helper function to detect development environment
 * Works across Node.js, Vite, and Next.js
 */
function isDevelopment() {
  // First check Node.js environment variable
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NODE_ENV === 'development';
  }

  // Safely check for browser environment
  if (typeof window !== 'undefined') {
    // Check for development-specific hostnames
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '0.0.0.0' || hostname.includes('replit.dev')) {
      return true;
    }

    // Check for development ports
    const port = parseInt(window.location.port, 10);
    if (!isNaN(port) && port >= 3000 && port < 5000) {
      return true;
    }
  }

  // Default to production
  return false;
}

// Create a new QueryClient instance with custom configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: isDevelopment() ? false : true,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnMount: true,
      refetchOnReconnect: true,
      suspense: false,
      useErrorBoundary: false,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      onError: (err) => {
        console.error('Query error:', err);
      },
    },
    mutations: {
      retry: false,
      onError: (err) => {
        console.error('Mutation error:', err);
      },
    },
  },
});

// Handle HMR safely
if (typeof window !== 'undefined') {
  try {
    // Create a safe wrapper for module hot reloading
    const moduleHot = typeof module !== 'undefined' && module.hot;
    if (moduleHot) {
      moduleHot.accept(() => {
        queryClient.clear();
      });
    }
  } catch (e) {
    console.debug('HMR not available for queryClient');
  }
}