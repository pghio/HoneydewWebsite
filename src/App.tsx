import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import UseCaseShowcase from './components/UseCaseShowcase'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import AppView from './components/AppView'

function App() {
  const [currentView, setCurrentView] = useState<'website' | 'app'>('website')

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {currentView === 'website' ? (
          <div key="website">
            <Navbar onUseApp={() => setCurrentView('app')} />
            <Hero onUseApp={() => setCurrentView('app')} />
            <UseCaseShowcase />
            <Features />
            <HowItWorks />
            <CallToAction onUseApp={() => setCurrentView('app')} />
            <Footer />
          </div>
        ) : (
          <AppView key="app" onBackToWebsite={() => setCurrentView('website')} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App