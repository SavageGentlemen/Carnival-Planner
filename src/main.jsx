import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import AffiliateProvider from './components/AffiliateProvider.jsx'
import { ThirdwebProvider } from 'thirdweb/react'
// Self-hosted Inter font — eliminates CLS from font loading
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AffiliateProvider>
        <ThirdwebProvider>
          <App />
        </ThirdwebProvider>
      </AffiliateProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// ── Smart PWA Update Strategy ──
// Preserves offline caching for Road Mode while ensuring users get fresh code after deploys.
// When a new service worker is detected, it activates automatically (skipWaiting is set in vite.config.js).
// We listen for the 'controllerchange' event to reload once the new SW takes control.
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}