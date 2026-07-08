import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);

// Register Service Worker (browser-side CDN for static asset caching)
// Only register in production — in dev, stale cached JS causes React/react-leaflet mismatch errors
if ("serviceWorker" in navigator && !import.meta.env.DEV) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
} else if ("serviceWorker" in navigator && import.meta.env.DEV) {
  // Unregister any stale dev service workers and clear caches
  window.addEventListener("load", async () => {
    const regs = await navigator.serviceWorker.getRegistrations();
    for (const reg of regs) {
      await reg.unregister();
    }
    if (window.caches) {
      const keys = await window.caches.keys();
      for (const key of keys) {
        await window.caches.delete(key);
      }
    }
  });
}