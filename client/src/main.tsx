import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import "./index.css";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient'; // Assuming this file exists and is correctly configured


// Initialize theme
const theme = localStorage.getItem('theme') || 'light';
if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Force refresh in development mode
if (import.meta.env.DEV) {
  const timestamp = Date.now();
  console.log(`Development build initialized at: ${timestamp}`);

  // Clear any cached data
  localStorage.removeItem('app-cache');
  sessionStorage.clear();

  // Force reload if stale
  const lastUpdate = sessionStorage.getItem('last-update');
  if (lastUpdate && Date.now() - parseInt(lastUpdate) > 5000) {
    window.location.reload();
  }
  sessionStorage.setItem('last-update', timestamp.toString());
}

// Check if the window has been rehydrated
const shouldHydrate = window.__PRELOADED_STATE__ !== undefined;

if (!shouldHydrate) {
  // Standard CSR render if no SSR data exists
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
    </StrictMode>,
  );
}

// NOTE: If shouldHydrate is true, entry-client.tsx handles the hydration