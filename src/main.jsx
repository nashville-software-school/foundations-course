import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { CoreProvider } from "@nss-workshops/nss-core";

const config = {
  oauthClientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
  proxyDomain: import.meta.env.VITE_PROXY_DOMAIN,
  baseUrl: import.meta.env.BASE_URL,
  learningPlatformApi:
    import.meta.env.VITE_LEARNING_PLATFORM_API,
};

// Create root and render
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CoreProvider config={config}>
      <App />
    </CoreProvider>,
  </React.StrictMode>
)
