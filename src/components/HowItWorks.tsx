import { motion, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { MessageSquare, Sparkles, Share2, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Speak Naturally',
    description: 'Just tell Honeydew what you need: "Plan my daughter\'s birthday party" or "Organize our ski trip to Colorado"',
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    example: '"Plan my daughter\'s birthday party"'
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'AI Works Magic',
    description: 'Our AI understands context and creates intelligent lists with relevant items, sections, and suggestions',
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600',
    example: 'Creates: Decorations, Food & Cake, Entertainment, Guest List...'
  },
  {
    number: '03',
    icon: Share2,
    title: 'Collaborate Seamlessly',
    description: 'Share with family members, assign tasks, and watch as everyone stays synchronized in real-time',
    color: 'text-green-600',
    gradient: 'from-green-500 to-green-600',
    example: 'Mom handles decorations, Dad gets the cake, kids help with setup'
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Achieve Together',
    description: 'Check off completed items, celebrate progress, and enjoy the satisfaction of organized success',
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-orange-600',
    example: 'Perfect party executed flawlessly with zero stress'
  }
]

const HowItWorks = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // HowTo schema for the homepage "How it works" section (helps audits + rich results).
  useEffect(() => {
    const identifier = 'home-how-it-works'
    const existing = document.querySelector(`script[data-howto-schema="${identifier}"]`)
    if (existing) existing.remove()

    const howtoSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How Honeydew Works',
      description:
        'From thought to organized action in four steps: speak naturally, let AI plan, collaborate, and execute together.',
      step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.title,
        text: step.description,
      })),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-howto-schema', identifier)
    script.textContent = JSON.stringify(howtoSchema)
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Honeydew{' '}
            <span className="honeydew-text-gradient">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From thought to organized action in four simple steps. See how AI transforms your ideas into coordinated family success.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <svg className="w-full h-2" viewBox="0 0 100 2" fill="none">
              <motion.path
                d="M0 1L100 1"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="0 1"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="33%" stopColor="#8b5cf6" />
                  <stop offset="66%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center relative z-10">
                  {/* Step Number */}
                  <div className="relative mb-4">
                    <motion.div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-gray-100">
                      <span className={`text-sm font-bold ${step.color}`}>
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold ${step.color} mb-3`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Example */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700 italic">
                      {step.example}
                    </p>
                  </div>
                </div>

                {/* Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-8 -right-4 z-20"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: (index * 0.2) + 0.3 }}
                  >
                    <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-4 border-l-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              See It In Action
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch how a simple request transforms into an organized, collaborative family project
            </p>
          </div>

          {/* Demo Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-blue-50 rounded-xl p-6"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            >
              <div className="text-2xl mb-2">🗣️</div>
              <h4 className="font-semibold text-blue-900 mb-2">You Say</h4>
              <p className="text-blue-800 text-sm italic">
                "Plan our family camping trip to Yellowstone"
              </p>
            </motion.div>

            <motion.div
              className="bg-purple-50 rounded-xl p-6"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
            >
              <div className="text-2xl mb-2">🤖</div>
              <h4 className="font-semibold text-purple-900 mb-2">AI Creates</h4>
              <div className="text-purple-800 text-sm space-y-1">
                <div>🏕️ Camping Equipment</div>
                <div>🍖 Food & Cooking</div>
                <div>🧭 Activities & Routes</div>
                <div>📋 Safety Checklist</div>
              </div>
            </motion.div>

            <motion.div
              className="bg-green-50 rounded-xl p-6"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
            >
              <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
              <h4 className="font-semibold text-green-900 mb-2">Family Collaborates</h4>
              <div className="text-green-800 text-sm space-y-1">
                <div>✅ Dad: Tent & gear</div>
                <div>✅ Mom: Food planning</div>
                <div>✅ Kids: Activity research</div>
                <div>🎯 Trip perfectly organized!</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks