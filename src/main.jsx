import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx' // Note: Make sure your app file is exactly named app.jsx (case-sensitive!)
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
