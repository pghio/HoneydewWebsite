import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { trackLlmReferralOnce, trackPageView } from './utils/analytics'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AppPage from './pages/AppPage'
import BlogPostPage from './pages/BlogPostPage'
import BlogListPage from './pages/BlogListPage'
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
import VsDakboardPage from './pages/VsDakboardPage'
import VsOurFamilyWizardPage from './pages/VsOurFamilyWizardPage'
import Vs2housesPage from './pages/Vs2housesPage'
import VsPicniicPage from './pages/VsPicniicPage'
import VsFantasticalPage from './pages/VsFantasticalPage'
import VsAppClosePage from './pages/VsAppClosePage'
import VsMagicMirrorPage from './pages/VsMagicMirrorPage'
import CookieBanner from './components/CookieBanner'
import ChatWidget from './components/ChatWidget'
import ComparisonsHubPage from './pages/ComparisonsHubPage'
import DisambiguationPage from './pages/DisambiguationPage'
import AboutPage from './pages/AboutPage'
import PressPage from './pages/PressPage'
import WhatsNewPage from './pages/WhatsNewPage'
import HubsIndexPage from './pages/HubsIndexPage'
import HubSkylightAlternativesPage from './pages/HubSkylightAlternativesPage'
import HubFairPlayPage from './pages/HubFairPlayPage'
import HubCoParentingPage from './pages/HubCoParentingPage'
import HubAIFamilyPlannerPage from './pages/HubAIFamilyPlannerPage'
import LlmReferencePage from './pages/LlmReferencePage'
import NotFoundPage from './pages/NotFoundPage'

function AppContent() {
  const location = useLocation()
  const isAppPage = location.pathname === '/app'
  const isBlogPage = location.pathname.startsWith('/blog')
  const isSupportPage = location.pathname === '/support'
  const isWhyHoneydewPage = location.pathname.startsWith('/why-honeydew')
  const isSpecialPage = ['/help', '/docs', '/api', '/community', '/privacy', '/terms', '/cookies', '/security', '/blog-preview'].includes(location.pathname) || location.pathname.startsWith('/blog-preview/')

  useEffect(() => {
    trackLlmReferralOnce()
    trackPageView()
  }, [location.pathname, location.search])

  return (
    <div className="min-h-screen bg-white">
      {!isAppPage && !isBlogPage && !isSupportPage && !isSpecialPage && !isWhyHoneydewPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/compare" element={<ComparisonsHubPage />} />
          <Route path="/alternatives" element={<ComparisonsHubPage />} />
          <Route path="/disambiguation" element={<DisambiguationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/whats-new" element={<WhatsNewPage />} />
          <Route path="/hubs" element={<HubsIndexPage />} />
          <Route path="/hubs/skylight-alternatives" element={<HubSkylightAlternativesPage />} />
          <Route path="/hubs/fair-play" element={<HubFairPlayPage />} />
          <Route path="/hubs/co-parenting" element={<HubCoParentingPage />} />
          <Route path="/hubs/ai-family-planner" element={<HubAIFamilyPlannerPage />} />
          <Route path="/llm-reference" element={<LlmReferencePage />} />
          <Route path="/blog" element={<BlogListPage />} />
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
          <Route path="/why-honeydew/vs-dakboard" element={<VsDakboardPage />} />
          <Route path="/why-honeydew/vs-ourfamilywizard" element={<VsOurFamilyWizardPage />} />
          <Route path="/why-honeydew/vs-2houses" element={<Vs2housesPage />} />
          <Route path="/why-honeydew/vs-fantastical" element={<VsFantasticalPage />} />
          <Route path="/why-honeydew/vs-picniic" element={<VsPicniicPage />} />
          <Route path="/why-honeydew/vs-appclose" element={<VsAppClosePage />} />
          <Route path="/why-honeydew/vs-magicmirror" element={<VsMagicMirrorPage />} />
          <Route path="/help" element={<PlaceholderPage title="Help Center" description="Comprehensive guides and FAQs for getting the most out of Honeydew." />} />
          <Route path="/docs" element={<PlaceholderPage title="Documentation" description="Detailed technical documentation and API references for developers." />} />
          <Route path="/api" element={<PlaceholderPage title="API Reference" description="Complete API documentation for integrating with Honeydew." />} />
          <Route path="/community" element={<PlaceholderPage title="Community" description="Connect with other Honeydew users, share tips, and get inspired." />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <CookieBanner hide={location.pathname === '/cookies' || isAppPage} />
      {!isAppPage && <ChatWidget />}
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