
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

// Create a new query client for each request
export function render() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        retry: false,
        cacheTime: 300000, // 5 minutes
      },
      mutations: {
        retry: false,
      }
    },
  });

  const html = ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  // Get dehydrated state from query client
  const dehydratedState = JSON.stringify(
    queryClient.getQueryCache().getAll().reduce((result, query) => {
      // @ts-ignore - simplifying for this implementation
      result[query.queryKey[0]] = query.state.data;
      return result;
    }, {})
  );

  return { html, dehydratedState };
}
