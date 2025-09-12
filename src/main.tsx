import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './animation/gsapSetup'

// Native scroll for now to avoid scroll trapping; re-enable Lenis once sections are stable

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
