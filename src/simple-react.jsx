// Simple React without TypeScript to test
import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('Simple React loading...');

function SimpleHoneydew() {
  return React.createElement('div', {
    style: {
      padding: '40px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0ea5e9 0%, #facc15 100%)',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, 
  React.createElement('div', {
    style: {
      textAlign: 'center',
      background: 'rgba(255,255,255,0.95)',
      padding: '60px',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      maxWidth: '600px'
    }
  },
  React.createElement('h1', {
    style: { fontSize: '48px', margin: '0 0 20px 0', color: '#0ea5e9' }
  }, '🍯 Honeydew'),
  React.createElement('h2', {
    style: { fontSize: '28px', margin: '0 0 30px 0', color: '#374151', fontWeight: 'normal' }
  }, 'Transform Your Family Life'),
  React.createElement('p', {
    style: { fontSize: '18px', color: '#6b7280', lineHeight: '1.6', marginBottom: '40px' }
  }, 'AI-powered family management that brings families together through intelligent organization and seamless coordination.'),
  React.createElement('div', {
    style: { 
      background: '#10b981',
      color: 'white',
      padding: '15px 30px',
      borderRadius: '10px',
      display: 'inline-block',
      fontSize: '16px',
      fontWeight: '500'
    }
  }, 'React is Working! ✅')
  ));
}

console.log('About to render SimpleHoneydew...');
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(React.createElement(SimpleHoneydew));
  console.log('SimpleHoneydew rendered successfully!');
} else {
  console.error('Root element not found');
}