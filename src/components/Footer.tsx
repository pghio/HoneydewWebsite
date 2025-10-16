import { motion } from 'framer-motion'
import { Heart, Mail, Twitter, Github, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Use Cases', href: '#use-cases' },
      { name: 'Pricing', href: '#pricing' }
    ],
    Company: [
      { name: 'About Us', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' }
    ],
    Resources: [
      { name: 'Help Center', href: '/support' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Community', href: '/community' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Security', href: '/security' }
    ]
  }

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/gethoneydew', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/gethoneydew', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/gethoneydew', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:pete@gethoneydew.app', label: 'Email' }
  ]

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
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => {
                  const isInternalLink = link.href.startsWith('/') && !link.href.startsWith('/#')
                  const isHashLink = link.href.startsWith('#')
                  
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

        {/* Newsletter Signup */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay in the loop</h3>
              <p className="text-gray-400">
                Get the latest updates on new features, family organization tips, and AI innovations.
              </p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
              />
              <motion.button
                className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

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