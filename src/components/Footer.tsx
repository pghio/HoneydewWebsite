import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { name: 'Features', href: '/#features' },
      { name: 'How It Works', href: '/#how-it-works' },
      { name: 'Use Cases', href: '/#use-cases' },
      { name: 'Case Studies', href: '/#case-studies' }
    ],
    Resources: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Topic Hubs', href: '/hubs' },
      { name: "What's New", href: '/whats-new' },
      { name: 'Press', href: '/press' },
      { name: 'Support', href: '/support' },
      { name: 'LLM Reference', href: '/llm-reference' },
      { name: 'Sitemap', href: '/sitemap.xml' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Security', href: '/security' }
    ]
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/logo.png"
                alt="Honeydew logo"
                className="w-8 h-8 rounded-lg"
                decoding="async"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold honeydew-text-gradient">Honeydew Family App</span>
            </motion.div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              AI planning that syncs calendars every 15 minutes and keeps family updates under 50ms.
              Built for multi-household coordination without the manual busywork.
            </p>
            
            {/* Contact */}
            <div className="flex items-center space-x-2 text-gray-400">
              <Mail className="w-5 h-5" />
              <a href="mailto:pete@gethoneydew.app" className="hover:text-white transition-colors">
                pete@gethoneydew.app
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4" id={`footer-${category.toLowerCase()}`}>{category}</h3>
              <ul className="space-y-3" role="list" aria-labelledby={`footer-${category.toLowerCase()}`}>
                {links.map((link) => {
                  const isInternalLink = link.href.startsWith('/') && !link.href.startsWith('/#')

                  return (
                    <li key={link.name}>
                      {isInternalLink ? (
                        <Link to={link.href}>
                          <motion.span
                            className="text-gray-400 hover:text-white transition-colors inline-block"
                            whileHover={{ x: 2 }}
                          >
                            {link.name}
                          </motion.span>
                        </Link>
                      ) : (
                        <motion.a
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors"
                          whileHover={{ x: 2 }}
                        >
                          {link.name}
                        </motion.a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 border border-gray-800 rounded-2xl bg-white/5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="text-base font-semibold text-white mb-1">🔒 Your data, protected</div>
              <p className="text-sm text-gray-400">
                End-to-end encryption • GDPR & CCPA compliant • SOC 2 Type II certified
              </p>
            </div>
            <div className="flex flex-wrap gap-3" role="navigation" aria-label="Legal and compliance links">
              <Link
                to="/privacy"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/20 text-sm font-semibold text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/20 text-sm font-semibold text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/20 text-sm font-semibold text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                Cookie Policy
              </Link>
              <Link
                to="/security"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/20 text-sm font-semibold text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                Security
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          Looking for the data platform? That&apos;s honeydew.ai. We&apos;re the Honeydew Family App—the AI family organizer for households.
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} Honeydew Family App. All rights reserved. Made with{' '}
            <motion.span
              className="inline-block text-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ❤️
            </motion.span>{' '}
            for families everywhere.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link to="/privacy" className="text-white font-semibold hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white font-semibold hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
              Support
            </Link>
            <a href="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors">
              Sitemap
            </a>
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer