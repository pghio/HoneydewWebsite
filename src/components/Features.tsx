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
    title: 'AI-Powered Intelligence',
    description: 'Natural language processing transforms "plan my ski trip" into organized lists with smart suggestions.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    icon: Users,
    title: 'Family Coordination',
    description: 'Real-time collaboration keeps everyone in sync with shared lists, calendars, and notifications.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: Calendar,
    title: 'Smart Calendar Views',
    description: 'Month, week, and day views with automatic event creation from your lists and due dates.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    gradient: 'from-green-500 to-green-600'
  },
  {
    icon: Smartphone,
    title: 'Cross-Platform Sync',
    description: 'Access your organized life anywhere with seamless sync across all your devices.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    icon: Cloud,
    title: 'Offline-First Design',
    description: 'Continue organizing even without internet. Changes sync automatically when connected.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    gradient: 'from-cyan-500 to-cyan-600'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built for speed with instant responses and smooth animations that make organizing feel effortless.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Shield,
    title: 'Privacy-First',
    description: 'Your family data stays secure with end-to-end encryption and privacy-focused AI processing.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    gradient: 'from-red-500 to-red-600'
  },
  {
    icon: Sparkles,
    title: 'Smart Suggestions',
    description: 'Learn from your patterns to suggest relevant items, optimal timing, and helpful reminders.',
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
            Powerful Features for{' '}
            <span className="honeydew-text-gradient">Modern Families</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to transform chaos into coordination, built with cutting-edge technology and thoughtful design.
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
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
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
                  className="mt-4 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to experience the future of family organization?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join thousands of families who have transformed their daily lives with Honeydew's intelligent organization system.
            </p>
            <motion.button
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features