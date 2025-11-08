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
import { trackLinkClick } from '../utils/analytics'

const features = [
  {
    icon: Brain,
    title: 'AI That Actually Plans',
    description: 'Tell it "camping trip next month" and watch it build your packing list, check weather, and remind you to grab the tent the night before. Like having your most organized friend on speed dial.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    gradient: 'from-purple-500 to-purple-600',
    highlight: true
  },
  {
    icon: Users,
    title: 'Multiple Family Groups',
    description: 'Perfect for divorced parents managing two households, extended family coordination, or friend groups. Switch between families instantly and keep everyone in sync.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: Calendar,
    title: 'Works With Your Calendar',
    description: 'Two-way sync with Google Calendar and Apple Calendar. Changes flow both ways every 15 minutes. Lists attach directly to calendar events so everything you need is in one place.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    gradient: 'from-green-500 to-green-600'
  },
  {
    icon: Smartphone,
    title: 'Voice & Photo Input',
    description: 'Hands full while cooking? Just say "add milk to groceries." Got a handwritten recipe? Take a photo and Honeydew extracts the ingredients. Works how you work.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    icon: Cloud,
    title: 'Learns Your Routines',
    description: 'After a few uses, Honeydew remembers that "soccer practice" means cleats, water bottle, and healthy snack. Gets smarter every time you use it.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    gradient: 'from-cyan-500 to-cyan-600'
  },
  {
    icon: Zap,
    title: 'Updates Instantly',
    description: 'Mom adds something to the list while Dad is at the store—he sees it instantly on his phone. Everyone stays in sync automatically.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Shield,
    title: 'Smart Reminders',
    description: 'Get reminded to pack soccer gear the night before, not the morning of. Honeydew knows when you need to see things, not just when events happen.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    gradient: 'from-red-500 to-red-600'
  },
  {
    icon: Sparkles,
    title: 'Photo Recognition',
    description: 'Snap a picture of your kid handwritten homework list or a recipe from a cookbook. Honeydew reads it, extracts what matters, and organizes it automatically.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    gradient: 'from-pink-500 to-pink-600'
  }
]

const Features = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const featuresCtaHref =
    'https://app.gethoneydew.app/?utm_source=website&utm_medium=features&utm_campaign=secondary_cta'

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
            Features That Actually{' '}
            <span className="honeydew-text-gradient">Save You Time</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature is designed around one goal: get you organized faster so you can spend more time with your family.
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
                    MOST POPULAR
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
              Ready to Save 2+ Hours Per Week?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join 2,400+ families who use Honeydew to handle the mental load. From "plan vacation" to "organize dinner"—just tell it what you need.
            </p>
            <motion.a
              href={featuresCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                trackLinkClick({
                  href: featuresCtaHref,
                  source: 'features',
                  medium: 'page_section',
                })
              }
            >
              Try Honeydew Free
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features