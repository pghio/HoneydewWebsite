import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-[#5DADE2] via-white to-[#F7DC6F]/60">
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
              className="inline-flex items-center bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              🤖 Your AI-Powered Family Assistant
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Just Tell Honeydew{' '}
              <motion.span
                className="honeydew-text-gradient inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                What You Need
              </motion.span>
            </h1>

            <p className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
              The family organizer that thinks.
            </p>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              In just three seconds Honeydew turns one sentence into 25-40 organized items, with calendars, smart lists,
              and reminders linked automatically. Type it, say it, or photograph it—our AI understands your family and keeps everyone in sync.
            </p>

            {/* Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-2xl mx-auto mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">AI Agent Demo</span>
                </div>
                <span className="text-sm text-gray-500">Try it yourself →</span>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="text-sm text-gray-600 mb-2">You:</div>
                <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500 italic text-gray-700">
                  "Create a packing list for our camping trip next weekend and add it to the calendar"
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-sm text-green-600 mb-2">Honeydew AI Agent (3 seconds):</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-green-700 mb-1">✅ Complete List</div>
                    <div className="text-gray-600">25+ items organized by category</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-green-700 mb-1">✅ Calendar Event</div>
                    <div className="text-gray-600">Added to family calendar</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-green-700 mb-1">✅ Smart Sharing</div>
                    <div className="text-gray-600">Notified family members</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="https://app.gethoneydew.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#92C5A7] text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#86b89b] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl inline-block"
              >
                Start Organizing Better
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>

            <motion.a
              href="#multimodal-demo"
              className="border-2 border-[#92C5A7] text-[#2F3C36] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#92C5A7]/10 transition-all duration-200 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Voice & Image Demo
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="inline-flex items-center bg-white/80 px-5 py-3 rounded-full shadow-sm border border-[#E2E8F0] text-sm font-medium text-gray-700"
          >
            <img src="/assets/honeydew-heart-icon.svg" alt="Honeydew heart icon" className="w-6 h-6 mr-2" />
            Trusted by thousands of families every week
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
                    {/* AI Assistant - Primary Feature */}
                    <motion.div
                      className="md:col-span-2 bg-gradient-to-br from-[#B794F6]/30 via-white to-[#A992FA]/30 p-6 rounded-xl border-2 border-[#B794F6]/40 relative overflow-hidden"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    >
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-bl-lg text-xs font-semibold">
                        ⭐ FLAGSHIP FEATURE
                      </div>
                      <h3 className="font-bold text-purple-900 mb-3 text-lg">🤖 AI Agent with 27+ Tools</h3>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="text-sm font-medium text-gray-800 mb-1">Natural Language Understanding</div>
                          <div className="text-xs text-gray-600">Just tell it what you need in plain English</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="text-sm font-medium text-gray-800 mb-1">Multimodal Input</div>
                          <div className="text-xs text-gray-600">Type, speak, or photograph requests</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="text-sm font-medium text-gray-800 mb-1">Knowledge Graph Learning</div>
                          <div className="text-xs text-gray-600">Gets smarter with every use (80% cache hit)</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Integration Features */}
                    <motion.div
                      className="bg-[#9DC3FF]/30 p-4 rounded-lg border border-[#63B3ED]/40"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                    >
                      <h3 className="font-semibold text-green-900 mb-2">🔗 Smart Integration</h3>
                      <div className="space-y-2">
                        <div className="bg-white p-2 rounded text-sm flex items-center space-x-2">
                          <span className="text-lg">📅</span>
                          <span>Google Calendar</span>
                        </div>
                        <div className="bg-white p-2 rounded text-sm flex items-center space-x-2">
                          <span className="text-lg">📱</span>
                          <span>Apple Calendar</span>
                        </div>
                        <div className="bg-white p-2 rounded text-sm flex items-center space-x-2">
                          <span className="text-lg">⚡</span>
                          <span>Real-time Sync</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.img
                src="/assets/honeydew-heart-icon.svg"
                alt="Honeydew AI agent"
                className="absolute -top-4 -left-4 w-16 h-16 drop-shadow-lg"
                animate={{ rotate: [0, 6, 0], y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <motion.img
                src="/assets/honeydew-logo-with-wordmark.svg"
                alt="Honeydew logo"
                className="absolute -top-6 -right-10 w-28 drop-shadow-lg"
                animate={{ rotate: [0, -6, 0], y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />

              <motion.img
                src="/assets/honeydew-heart-green.svg"
                alt="Honeydew image processing"
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 drop-shadow-lg"
                animate={{ rotate: [0, 4, 0], y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero