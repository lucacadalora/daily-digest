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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);