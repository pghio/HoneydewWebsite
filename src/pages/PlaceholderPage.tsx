import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'

interface PlaceholderPageProps {
  title: string
  description: string
  comingSoon?: boolean
}

const PlaceholderPage = ({ title, description, comingSoon = true }: PlaceholderPageProps) => {
  const location = useLocation()

  useSEO({
    title: `${title} | Honeydew Family App`,
    description: `${description} Stay tuned for the full Honeydew experience with AI-powered workflows and resources.`,
    canonical: location.pathname,
    keywords: `${title.toLowerCase()} honeydew, honeydew ${title.toLowerCase()} resources, honeydew coming soon`,
    image: '/blog-images/honeydew-ai-agent.jpg',
    type: 'website',
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Honeydew Family App: {title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {description}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {comingSoon ? (
            <>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
                <p className="text-lg opacity-90">
                  We're working hard to bring you comprehensive {title.toLowerCase()}.
                  Check back soon for detailed guides, tutorials, and resources.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  In the meantime...
                </h3>
                <p className="text-gray-600 mb-6">
                  Need help with Honeydew? Visit our support page for immediate assistance.
                </p>
                <Link
                  to="/support"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                >
                  <span>Get Support</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 rounded-xl p-8"
            >
              <p className="text-gray-600 mb-6">
                This page is currently under development. Please check back soon for complete content.
              </p>
              <Link
                to="/support"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
              >
                <span>Get Support</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}

export default PlaceholderPage

