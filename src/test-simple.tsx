import ReactDOM from 'react-dom/client'

const SimpleTest = () => {
  return <div style={{ padding: '20px', fontSize: '24px' }}>Hello World - React is working!</div>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<SimpleTest />)