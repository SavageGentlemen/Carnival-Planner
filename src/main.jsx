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

// Guarantee latest client bundle by unregistering legacy service workers and purging stale caches
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  }).catch(() => {});

  if ('caches' in window) {
    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    }).catch(() => {});
  }
}