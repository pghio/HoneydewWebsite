import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Brain, 
  Users, 
  Calendar, 
  Smartphone,
  Cloud,
  Zap,
  Shield,
  Sparkles
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Agent with 27+ Tools',
    description: 'Natural language processing with multimodal input - type, speak, or photograph requests. Handles complex workflows like "plan camping trip and add to calendar" in seconds.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    gradient: 'from-purple-500 to-purple-600',
    highlight: true
  },
  {
    icon: Users,
    title: 'Multi-Family Architecture',
    description: 'Join multiple family groups (household, extended family, friend groups) with seamless switching and role-based access controls.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: Calendar,
    title: 'Advanced Calendar Integration',
    description: 'Two-way sync with Google Calendar and Apple Calendar integration. Attach lists directly to events with 15-minute auto-sync.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    gradient: 'from-green-500 to-green-600'
  },
  {
    icon: Smartphone,
    title: 'Voice Input & Streaming',
    description: 'Industry-leading Whisper AI transcription with real-time streaming responses. Perfect for hands-free family coordination.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    icon: Cloud,
    title: 'Knowledge Graph Learning',
    description: '80% cache hit rate for instant responses. Learns your family patterns and gets smarter with every use - sub-500ms for cached requests.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    gradient: 'from-cyan-500 to-cyan-600'
  },
  {
    icon: Zap,
    title: 'Real-Time Collaboration',
    description: 'WebSocket updates with <50ms latency. See changes instantly across all devices with automatic conflict resolution.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Shield,
    title: 'Smart Notifications',
    description: 'Intelligent reminders for events, task assignments, and family updates. Customizable preferences with in-app notification center.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    gradient: 'from-red-500 to-red-600'
  },
  {
    icon: Sparkles,
    title: 'Image Processing & OCR',
    description: 'Photograph handwritten lists, recipes, or documents. OCR extracts text and AI organizes into structured lists automatically.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    gradient: 'from-pink-500 to-pink-600'
  }
]

const Features = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Revolutionary AI Features for{' '}
            <span className="honeydew-text-gradient">Smart Families</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From natural language understanding to intelligent automation, discover why Honeydew is the most advanced family assistant ever built.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className={`bg-white rounded-2xl p-6 shadow-lg border transition-all duration-300 h-full ${
                feature.highlight
                  ? 'border-purple-300 shadow-purple-100 ring-2 ring-purple-100'
                  : 'border-gray-100 hover:shadow-xl'
              }`}>
                {/* Highlight Badge for AI Agent */}
                {feature.highlight && (
                  <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                    <Sparkles className="w-3 h-3 mr-1" />
                    FLAGSHIP FEATURE
                  </div>
                )}

                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className={`text-xl font-bold ${feature.color} mb-3`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className={`mt-4 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    feature.highlight ? 'via-purple-200' : 'via-gray-200'
                  }`}
                  initial={false}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Meet Your AI Family Assistant?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join thousands of families who have discovered the power of AI-driven organization. From "plan my vacation" to "organize dinner" - just tell Honeydew what you need.
            </p>
            <motion.button
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try the AI Agent Free
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features