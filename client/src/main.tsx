import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import "./index.css";

// Initialize theme
const theme = localStorage.getItem('theme') || 'light';
if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Enhanced HMR debugging
if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', (data) => {
    console.log('[HMR] About to update with:', data);
  });

  import.meta.hot.on('vite:afterUpdate', (data) => {
    console.log('[HMR] Updated with:', data);
  });

  import.meta.hot.on('vite:error', (err) => {
    console.error('[HMR] Error during update:', err);
  });

  import.meta.hot.on('vite:beforeFullReload', () => {
    console.log('[HMR] About to do full reload');
  });

  import.meta.hot.on('vite:beforePrune', (data) => {
    console.log('[HMR] About to prune modules:', data);
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);