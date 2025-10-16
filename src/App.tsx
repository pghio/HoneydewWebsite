import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AppPage from './pages/AppPage'
import BlogPostPage from './pages/BlogPostPage'
import SupportPage from './pages/SupportPage'
import PlaceholderPage from './pages/PlaceholderPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CookiePage from './pages/CookiePage'
import SecurityPage from './pages/SecurityPage'

function AppContent() {
  const location = useLocation()
  const isAppPage = location.pathname === '/app'
  const isBlogPage = location.pathname.startsWith('/blog')
  const isSupportPage = location.pathname === '/support'
  const isSpecialPage = ['/help', '/docs', '/api', '/community', '/privacy', '/terms', '/cookies', '/security'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-white">
      {!isAppPage && !isBlogPage && !isSupportPage && !isSpecialPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiePage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/help" element={<PlaceholderPage title="Help Center" description="Comprehensive guides and FAQs for getting the most out of Honeydew." />} />
          <Route path="/docs" element={<PlaceholderPage title="Documentation" description="Detailed technical documentation and API references for developers." />} />
          <Route path="/api" element={<PlaceholderPage title="API Reference" description="Complete API documentation for integrating with Honeydew." />} />
          <Route path="/community" element={<PlaceholderPage title="Community" description="Connect with other Honeydew users, share tips, and get inspired." />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App