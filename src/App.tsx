console.log('App.tsx loading...')

function App() {
  console.log('App component rendering...')
  
  return (
    <div style={{ 
      padding: '40px', 
      minHeight: '100vh',
      backgroundColor: '#f0f9ff',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          color: '#0ea5e9',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          🍯 Honeydew
        </h1>
        <h2 style={{ 
          fontSize: '24px', 
          color: '#374151',
          textAlign: 'center',
          marginBottom: '30px',
          fontWeight: 'normal'
        }}>
          Transform Your Family Life
        </h2>
        <div style={{ 
          backgroundColor: '#ecfdf5',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #10b981'
        }}>
          <p style={{ color: '#065f46', margin: 0, textAlign: 'center' }}>
            ✅ Website is working! React components are rendering successfully.
          </p>
        </div>
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button style={{
            backgroundColor: '#0ea5e9',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default App