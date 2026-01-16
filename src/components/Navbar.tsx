import { motion } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { trackLinkClick } from '../utils/analytics'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWhyHoneydewOpen, setIsWhyHoneydewOpen] = useState(false)
  const location = useLocation()

  const isHomePage = location.pathname === '/'
  const featuresHref = isHomePage ? '#features' : '/#features'
  const demoHref = isHomePage ? '#multimodal-demo' : '/#multimodal-demo'
  const howItWorksHref = isHomePage ? '#how-it-works' : '/#how-it-works'

  const whyHoneydewLinks = [
    { title: 'All comparisons', href: '/compare' },
    { title: 'vs. Skylight Calendar', href: '/why-honeydew/vs-skylight' },
    { title: 'vs. Cozi', href: '/why-honeydew/vs-cozi' },
    { title: 'vs. TimeTree', href: '/why-honeydew/vs-timetree' },
    { title: 'vs. Hearth Display', href: '/why-honeydew/vs-hearth' },
    { title: 'vs. FamilyWall', href: '/why-honeydew/vs-familywall' },
    { title: 'vs. Echo Show', href: '/why-honeydew/vs-echoshow' },
    { title: 'vs. Google Calendar', href: '/why-honeydew/vs-google' },
    { title: 'vs. Mango Display', href: '/why-honeydew/vs-mango' },
  ]

  const navCtaHref = 'https://app.gethoneydew.app/?utm_source=website&utm_medium=nav&utm_campaign=primary_cta'

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <a href="/" className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Honeydew logo"
                className="w-8 h-8 rounded-lg"
                decoding="async"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold honeydew-text-gradient">Honeydew Family App</span>
            </a>
          </motion.div>

          {/* Desktop Navigation (centered) */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center space-x-8">
              <a href={featuresHref} className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
              <a href={demoHref} className="text-gray-600 hover:text-primary-600 transition-colors">AI Demo</a>
              
              {/* Why Honeydew Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsWhyHoneydewOpen(true)}
                onMouseLeave={() => setIsWhyHoneydewOpen(false)}
              >
                <button className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1">
                  Why Honeydew
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isWhyHoneydewOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 pt-2"
                  >
                    <div className="w-72 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      {whyHoneydewLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-primary-600 transition-colors"
                        >
                          {link.title}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <a href="/blog" className="text-gray-600 hover:text-primary-600 transition-colors">Blog</a>
              <a href="/hubs" className="text-gray-600 hover:text-primary-600 transition-colors">Hubs</a>
              <a href="/about" className="text-gray-600 hover:text-primary-600 transition-colors">About</a>
              <a href={howItWorksHref} className="text-gray-600 hover:text-primary-600 transition-colors">How It Works</a>
            </div>
          </div>

          {/* Desktop CTA (right-aligned) */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={navCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors inline-block"
                onClick={() =>
                  trackLinkClick({
                    href: navCtaHref,
                    source: 'navbar',
                    variant: 'desktop',
                    medium: 'navigation',
                  })
                }
              >
                Try Honeydew
              </a>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            <div className="flex flex-col space-y-4">
              <a href={featuresHref} className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
              <a href={demoHref} className="text-gray-600 hover:text-primary-600 transition-colors">AI Demo</a>
              
              {/* Why Honeydew - Mobile Expandable */}
              <div>
                <button 
                  onClick={() => setIsWhyHoneydewOpen(!isWhyHoneydewOpen)}
                  className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1 w-full"
                >
                  Why Honeydew
                  <ChevronDown className={`w-4 h-4 transition-transform ${isWhyHoneydewOpen ? 'rotate-180' : ''}`} />
                </button>
                {isWhyHoneydewOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {whyHoneydewLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="block text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="/blog" className="text-gray-600 hover:text-primary-600 transition-colors">Blog</a>
              <a href="/hubs" className="text-gray-600 hover:text-primary-600 transition-colors">Hubs</a>
              <a href="/about" className="text-gray-600 hover:text-primary-600 transition-colors">About</a>
              <a href={howItWorksHref} className="text-gray-600 hover:text-primary-600 transition-colors">How It Works</a>
              <a
                href={navCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors w-full inline-block text-center"
                onClick={() =>
                  trackLinkClick({
                    href: navCtaHref,
                    source: 'navbar',
                    variant: 'mobile',
                    medium: 'navigation',
                  })
                }
              >
                Try Honeydew
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar