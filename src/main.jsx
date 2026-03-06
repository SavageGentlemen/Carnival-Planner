import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AffiliateProvider from './components/AffiliateProvider.jsx'
// Self-hosted Inter font — eliminates CLS from font loading
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AffiliateProvider>
      <App />
    </AffiliateProvider>
  </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration.scope);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}

//