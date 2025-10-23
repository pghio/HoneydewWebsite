import { motion } from 'framer-motion'
import { Heart, Mail } from 'lucide-react'
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
      { name: 'Support', href: '/support' }
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
              <div className="w-8 h-8 honeydew-gradient rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold honeydew-text-gradient">Honeydew</span>
            </motion.div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming family organization through AI-powered intelligence. 
              Making coordination effortless and bringing families closer together.
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
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
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

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} Honeydew. All rights reserved. Made with{' '}
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