import ReactDOM from 'react-dom/client'

console.log('Debug: Script is loading...')

const SimpleApp = () => {
  console.log('Debug: SimpleApp is rendering...')
  return (
    <div style={{ 
      padding: '40px', 
      fontSize: '24px', 
      backgroundColor: '#f0f9ff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#0ea5e9', marginBottom: '20px' }}>
        🎉 Honeydew Website Working!
      </h1>
      <p style={{ color: '#374151', lineHeight: '1.6' }}>
        React is successfully loading and rendering components.
        The server is running on port 4173.
      </p>
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        Status: All systems working ✅
      </div>
    </div>
  )
}

console.log('Debug: About to render...')
const root = document.getElementById('root')
if (root) {
  console.log('Debug: Root element found, rendering...')
  ReactDOM.createRoot(root).render(<SimpleApp />)
} else {
  console.error('Debug: Root element not found!')
}