import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Check,
  X,
  Smartphone,
  Zap,
  Brain,
  Cloud,
  DollarSign,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import comparisonLinks from '../utils/comparisonLinks'

interface ComparisonFeature {
  feature: string
  honeydew: boolean | string
  skylight: boolean | string
  cozi: boolean | string
  icon?: any
}

const features: ComparisonFeature[] = [
  {
    feature: 'AI Agent with 27+ Specialized Tools',
    honeydew: 'Natural language processing + multimodal input (text, voice, images)',
    skylight: false,
    cozi: false,
    icon: Brain
  },
  {
    feature: 'Knowledge Graph Learning System',
    honeydew: '80% cache hit rate, learns family patterns',
    skylight: false,
    cozi: false,
    icon: Sparkles
  },
  {
    feature: 'Works on All Devices',
    honeydew: 'iPhone, Android, iPad, laptop, desktop',
    skylight: 'Single wall-mounted display only',
    cozi: true,
    icon: Smartphone
  },
  {
    feature: 'Offline Functionality',
    honeydew: 'Offline-first design',
    skylight: 'Requires WiFi',
    cozi: 'Limited',
    icon: Cloud
  },
  {
    feature: 'Intelligent List Generation',
    honeydew: 'AI creates comprehensive lists automatically',
    skylight: false,
    cozi: 'Manual entry required',
    icon: Zap
  },
  {
    feature: 'Complex Event Planning',
    honeydew: 'Vacation plans, parties, trips with AI',
    skylight: false,
    cozi: 'Basic lists only',
    icon: Sparkles
  },
  {
    feature: 'Voice Input & Image Processing',
    honeydew: 'Whisper AI transcription + OCR technology',
    skylight: false,
    cozi: false,
    icon: Smartphone
  },
  {
    feature: 'Conflict Prevention',
    honeydew: 'AI suggests optimal timing',
    skylight: 'Manual calendar only',
    cozi: 'Manual calendar only',
    icon: Zap
  },
  {
    feature: 'On-the-Go Organization',
    honeydew: 'Organize anywhere',
    skylight: 'Fixed location only',
    cozi: true,
    icon: Smartphone
  },
  {
    feature: 'Annual Cost',
    honeydew: 'Less than Skylight hardware',
    skylight: '$300-500 upfront + no software updates',
    cozi: '$30/year (limited features)',
    icon: DollarSign
  }
]

const CompetitorComparison = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const renderValue = (value: boolean | string, isHoneydew: boolean = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className={`w-6 h-6 ${isHoneydew ? 'text-green-500' : 'text-gray-400'}`} />
      ) : (
        <X className="w-6 h-6 text-red-400" />
      )
    }
    return (
      <span className={`text-sm ${isHoneydew ? 'text-primary-700 font-semibold' : 'text-gray-600'}`}>
        {value}
      </span>
    )
  }

  return (
    <section id="comparison" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Why Families Choose Honeydew
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Only{' '}
            <span className="honeydew-text-gradient">AI-Powered Family Assistant</span>
            {' '}vs Traditional Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Traditional family apps require manual entry. Honeydew's AI agent understands natural language,
            learns your patterns, and handles complex requests in seconds. Here's why families choose intelligence over basic tools.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {comparisonLinks.slice(0, 5).map(link => (
              <Link
                key={link.slug}
                to={link.href}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                {link.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
        >
          {/* Header Row */}
          <div className="grid grid-cols-4 gap-4 p-6 bg-gray-100 border-b-2 border-gray-200">
            <div className="text-left font-semibold text-gray-700">
              Feature
            </div>
            <div className="text-center">
              <div className="inline-flex flex-col items-center">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg font-bold text-lg mb-1">
                  Honeydew
                </div>
                <span className="text-xs text-primary-600 font-semibold">AI-Powered Software</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex flex-col items-center">
                <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-lg mb-1">
                  Skylight
                </div>
                <span className="text-xs text-gray-500">Wall Display</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex flex-col items-center">
                <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-lg mb-1">
                  Cozi
                </div>
                <span className="text-xs text-gray-500">Basic App</span>
              </div>
            </div>
          </div>

          {/* Feature Rows */}
          <div className="divide-y divide-gray-200">
            {features.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="grid grid-cols-4 gap-4 p-6 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {Icon && (
                      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary-600" />
                      </div>
                    )}
                    <span className="font-medium text-gray-900 text-sm">{item.feature}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    {renderValue(item.honeydew, true)}
                  </div>
                  <div className="flex items-center justify-center">
                    {renderValue(item.skylight)}
                  </div>
                  <div className="flex items-center justify-center">
                    {renderValue(item.cozi)}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Key Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              AI That Actually Plans
            </h3>
            <p className="text-blue-700 leading-relaxed">
              Skylight shows calendars. Honeydew's AI generates comprehensive plans from "plan our vacation" - 
              packing lists, itineraries, coordination, everything you'd forget.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-3">
              Organize Anywhere
            </h3>
            <p className="text-purple-700 leading-relaxed">
              Skylight stays on your wall. Honeydew goes with you - grocery store, 
              soccer practice, vacation planning on the couch. Organization wherever life happens.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-900 mb-3">
              Premium Software, Better Value
            </h3>
            <p className="text-green-700 leading-relaxed">
              Skylight costs $300-500 for one display. Honeydew premium costs less annually 
              and works on unlimited devices for your whole family with continuous AI improvements.
            </p>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the AI-First Difference
            </h3>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Join families who chose intelligent software over hardware limitations. 
              Get AI-powered organization that actually reduces mental load, works everywhere, 
              and costs less than a single Skylight display.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://app.gethoneydew.app/?utm_source=website&utm_medium=competitor_comparison&utm_campaign=primary_cta"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5" />
                Start Free Trial
              </motion.a>
              <motion.a
                href="#how-it-works"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See AI in Action
              </motion.a>
            </div>
            <p className="mt-6 text-sm opacity-75">
              No credit card required • Works on all your devices • Unlimited AI planning
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CompetitorComparison

