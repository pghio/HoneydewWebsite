import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Family Management
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your{' '}
              <motion.span
                className="honeydew-text-gradient inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Family Life
              </motion.span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From chaos to coordination in seconds. Honeydew uses AI to help families organize lists, 
              manage schedules, and coordinate activities with intelligent suggestions that understand your life.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/app"
                className="bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-all duration-200 flex items-center justify-center gap-2 animate-pulse-glow inline-block"
              >
                Start Organizing Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.button
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-primary-300 hover:text-primary-600 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-4xl">
              {/* Main App Preview */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Lists Preview */}
                    <motion.div
                      className="bg-blue-50 p-4 rounded-lg"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    >
                      <h3 className="font-semibold text-blue-900 mb-2">Smart Lists</h3>
                      <div className="space-y-2">
                        <div className="bg-white p-2 rounded text-sm">🏖️ Beach Vacation</div>
                        <div className="bg-white p-2 rounded text-sm">🎂 Birthday Party</div>
                        <div className="bg-white p-2 rounded text-sm">🛒 Weekly Groceries</div>
                      </div>
                    </motion.div>

                    {/* Calendar Preview */}
                    <motion.div
                      className="bg-yellow-50 p-4 rounded-lg"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                    >
                      <h3 className="font-semibold text-yellow-900 mb-2">Calendar</h3>
                      <div className="space-y-2">
                        <div className="bg-white p-2 rounded text-sm">📅 Family Dinner</div>
                        <div className="bg-white p-2 rounded text-sm">⚽ Soccer Practice</div>
                        <div className="bg-white p-2 rounded text-sm">🏥 Doctor Appointment</div>
                      </div>
                    </motion.div>

                    {/* AI Assistant Preview */}
                    <motion.div
                      className="bg-green-50 p-4 rounded-lg"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                    >
                      <h3 className="font-semibold text-green-900 mb-2">AI Assistant</h3>
                      <div className="space-y-2">
                        <div className="bg-white p-2 rounded text-sm">🤖 "Plan my ski trip"</div>
                        <div className="bg-white p-2 rounded text-sm">✨ Smart suggestions</div>
                        <div className="bg-white p-2 rounded text-sm">🎯 Auto-organization</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -left-4 bg-primary-500 text-white p-3 rounded-lg shadow-lg"
                animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✨ AI Powered
              </motion.div>
              
              <motion.div
                className="absolute -top-4 -right-4 bg-secondary-500 text-white p-3 rounded-lg shadow-lg"
                animate={{ rotate: [0, -5, 0], y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                🚀 Smart Lists
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero