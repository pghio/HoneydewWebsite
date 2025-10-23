import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AppPage from './pages/AppPage'
import BlogPostPage from './pages/BlogPostPage'
import BlogPreviewPage from './pages/BlogPreviewPage'
import BlogPostPreviewPage from './pages/BlogPostPreviewPage'
import SupportPage from './pages/SupportPage'
import PlaceholderPage from './pages/PlaceholderPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CookiePage from './pages/CookiePage'
import SecurityPage from './pages/SecurityPage'
import VsSkylightPage from './pages/VsSkylightPage'
import VsCoziPage from './pages/VsCoziPage'
import VsTimeTreePage from './pages/VsTimeTreePage'
import VsHearthPage from './pages/VsHearthPage'
import VsFamilyWallPage from './pages/VsFamilyWallPage'
import VsEchoShowPage from './pages/VsEchoShowPage'
import VsGoogleCalendarPage from './pages/VsGoogleCalendarPage'
import VsMangoPage from './pages/VsMangoPage'

function AppContent() {
  const location = useLocation()
  const isAppPage = location.pathname === '/app'
  const isBlogPage = location.pathname.startsWith('/blog')
  const isSupportPage = location.pathname === '/support'
  const isWhyHoneydewPage = location.pathname.startsWith('/why-honeydew')
  const isSpecialPage = ['/help', '/docs', '/api', '/community', '/privacy', '/terms', '/cookies', '/security', '/blog-preview'].includes(location.pathname) || location.pathname.startsWith('/blog-preview/')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag

    if (gtag) {
      gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title
      })
    }
  }, [location.pathname, location.search])

  return (
    <div className="min-h-screen bg-white">
      {!isAppPage && !isBlogPage && !isSupportPage && !isSpecialPage && !isWhyHoneydewPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/blog-preview" element={<BlogPreviewPage />} />
          <Route path="/blog-preview/:slug" element={<BlogPostPreviewPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiePage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/why-honeydew/vs-skylight" element={<VsSkylightPage />} />
          <Route path="/why-honeydew/vs-cozi" element={<VsCoziPage />} />
          <Route path="/why-honeydew/vs-timetree" element={<VsTimeTreePage />} />
          <Route path="/why-honeydew/vs-hearth" element={<VsHearthPage />} />
          <Route path="/why-honeydew/vs-familywall" element={<VsFamilyWallPage />} />
          <Route path="/why-honeydew/vs-echoshow" element={<VsEchoShowPage />} />
          <Route path="/why-honeydew/vs-google" element={<VsGoogleCalendarPage />} />
          <Route path="/why-honeydew/vs-mango" element={<VsMangoPage />} />
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