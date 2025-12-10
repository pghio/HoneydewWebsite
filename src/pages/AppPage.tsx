import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { trackLinkClick } from '../utils/analytics'
import useSEO from '../utils/useSEO'

const AppPage = () => {
  const appLaunchHref = 'https://app.gethoneydew.app/?utm_source=website&utm_medium=app_preview&utm_campaign=app_launch'

  useSEO({
    title: 'Honeydew Family App Preview – AI Lists, Calendar Sync, and Family Workflows',
    description:
      'Tour the Honeydew web app experience. See AI-built lists, voice capture, two-way Google & Apple Calendar sync, and real-time family coordination before you launch the full product.',
    canonical: '/app',
    keywords:
      'honeydew app preview, ai family planner demo, honeydew web app, honeydew calendar sync, family coordination software',
    image: '/blog-images/honeydew-app-screenshot.jpg',
    type: 'website',
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex flex-col"
    >
      {/* App Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div
            whileHover={{ x: -2 }}
          >
            <Link 
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Website</span>
            </Link>
          </motion.div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 honeydew-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">Honeydew Family App</span>
          </div>

          <motion.a
            href={appLaunchHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              trackLinkClick({
                href: appLaunchHref,
                source: 'app_page',
                medium: 'page_section',
              })
            }
          >
            <span>Open Full App</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </header>

      {/* App Content */}
      <div className="flex-1 relative">
        {/* Loading State */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute inset-0 bg-white flex items-center justify-center z-10"
        >
          <div className="text-center">
            <motion.div
              className="w-16 h-16 honeydew-gradient rounded-2xl flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-white font-bold text-xl">H</span>
            </motion.div>
            <div className="text-lg font-medium text-gray-900 mb-2">Loading the Honeydew Family App...</div>
            <div className="text-gray-600">Preparing your family workspace</div>
          </div>
        </motion.div>

        {/* Iframe Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="w-full h-full"
        >
          {/* Demo App Interface - Replace this with your actual app iframe */}
          <div className="w-full h-full bg-white p-6">
            <div className="max-w-6xl mx-auto h-full">
              {/* Demo Content */}
              <div className="bg-gray-50 rounded-xl p-8 h-full flex items-center justify-center">
                <div className="text-center max-w-2xl">
                  <motion.div
                    className="w-24 h-24 honeydew-gradient rounded-3xl flex items-center justify-center mx-auto mb-6"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white font-bold text-3xl">H</span>
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome to the Honeydew Family App Demo
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    This is a demo view of the Honeydew app. To integrate your actual app, 
                    replace this content with an iframe pointing to your app's URL.
                  </p>

                  {/* Example of how to embed your actual app */}
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-8">
                    <h4 className="font-semibold text-blue-900 mb-2">To embed your actual app:</h4>
                    <div className="text-left text-blue-800 text-sm">
                      <p className="mb-2">Replace the demo content above with:</p>
                      <code className="bg-blue-100 px-2 py-1 rounded text-xs block">
                        {`<iframe 
  src="https://your-honeydew-app.com" 
  className="w-full h-full border-0 rounded-lg"
  title="Honeydew App"
/>`}
                      </code>
                    </div>
                  </div>

                  {/* Demo Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                      className="bg-white rounded-lg p-6 shadow-sm"
                      whileHover={{ y: -2 }}
                    >
                      <div className="text-2xl mb-3">📝</div>
                      <h3 className="font-semibold text-gray-900 mb-2">Smart Lists</h3>
                      <p className="text-gray-600 text-sm">AI-powered list creation with natural language</p>
                    </motion.div>

                    <motion.div
                      className="bg-white rounded-lg p-6 shadow-sm"
                      whileHover={{ y: -2 }}
                    >
                      <div className="text-2xl mb-3">📅</div>
                      <h3 className="font-semibold text-gray-900 mb-2">Calendar Views</h3>
                      <p className="text-gray-600 text-sm">Month, week, and day views with event sync</p>
                    </motion.div>

                    <motion.div
                      className="bg-white rounded-lg p-6 shadow-sm"
                      whileHover={{ y: -2 }}
                    >
                      <div className="text-2xl mb-3">👨‍👩‍👧‍👦</div>
                      <h3 className="font-semibold text-gray-900 mb-2">Family Sync</h3>
                      <p className="text-gray-600 text-sm">Real-time collaboration and coordination</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AppPage
