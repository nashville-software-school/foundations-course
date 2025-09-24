import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { CoreProvider } from "@nss-workshops/nss-core";
import config from './config';

// Create root and render
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CoreProvider 
      config={config} 
      courseName={config.courseName} 
      doAuth={config.doAuth}>
        <App />
    </CoreProvider>
  </React.StrictMode>,
)
