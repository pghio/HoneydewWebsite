import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Loading Honeydew app...')

try {
  const root = document.getElementById('root')
  if (!root) {
    throw new Error('Root element not found')
  }
  
  console.log('Root found, creating React app...')
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  console.log('React app rendered successfully')
} catch (error) {
  console.error('Error rendering app:', error)
  document.body.innerHTML = `
    <div style="padding: 40px; font-family: Arial, sans-serif;">
      <h1 style="color: red;">Error Loading Honeydew</h1>
      <p>Error: ${error}</p>
      <p>Check the browser console for more details.</p>
    </div>
  `
}