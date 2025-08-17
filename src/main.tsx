import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing React...')
  
  const root = document.getElementById('root')
  console.log('Root element:', root)
  
  if (!root) {
    console.error('Root element not found!')
    document.body.innerHTML = `
      <div style="padding: 40px; font-family: Arial, sans-serif; background: #fee;">
        <h1 style="color: red;">Root Element Not Found</h1>
        <p>The #root div is missing from the HTML.</p>
      </div>
    `
    return
  }
  
  try {
    console.log('Creating React app...')
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    console.log('React app rendered successfully!')
  } catch (error) {
    console.error('React rendering error:', error)
    root.innerHTML = `
      <div style="padding: 40px; font-family: Arial, sans-serif; background: #fef2f2;">
        <h1 style="color: #dc2626;">React Rendering Error</h1>
        <p>Error: ${error}</p>
        <p>Check browser console for details.</p>
      </div>
    `
  }
})

// Fallback if DOMContentLoaded already fired
if (document.readyState === 'loading') {
  console.log('DOM is loading...')
} else {
  console.log('DOM already ready, initializing immediately...')
  document.dispatchEvent(new Event('DOMContentLoaded'))
}