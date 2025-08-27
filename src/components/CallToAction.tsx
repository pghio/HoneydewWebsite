import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Star, Users, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { icon: Users, value: '50K+', label: 'Families Organized' },
    { icon: Star, value: '4.9', label: 'App Store Rating' },
    { icon: Zap, value: '2M+', label: 'Lists Created' }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-60 h-60 bg-white/5 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10">
          {/* Main CTA Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your{' '}
              <motion.span
                className="inline-block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Family Life?
              </motion.span>
            </h2>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
              Join thousands of families who have discovered the joy of effortless organization. 
              Your journey to coordinated harmony starts with a single click.
            </p>

            {/* Primary CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/app"
                  className="group bg-white text-primary-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-3 shadow-xl inline-block"
                >
                  Start Your Free Trial
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </Link>
              </motion.div>
              
              <div className="text-center sm:text-left">
                <div className="text-sm opacity-75 mb-1">🎉 No credit card required</div>
                <div className="text-sm opacity-75">✨ 30-day free trial</div>
              </div>
            </motion.div>

            {/* Social Proof Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 mr-2 opacity-75" />
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </div>
                  <div className="text-sm opacity-75">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-4xl mx-auto border border-white/20"
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.2 + (i * 0.1) }}
                  >
                    <Star className="w-6 h-6 fill-current text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
                "Honeydew transformed our chaotic family life into organized harmony. 
                The AI understands exactly what we need, and coordinating with my husband 
                and kids has never been easier. This app is pure magic!"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-lg">Sarah Chen</div>
                  <div className="opacity-75">Mother of 3, San Francisco</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Urgency Element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-3 backdrop-blur-md border border-white/20">
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full mr-3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium">
                Join 1,247 families who started organizing this week
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction