import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Users, Zap } from 'lucide-react'
import DownloadCTA from './DownloadCTA'

const CallToAction = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { icon: Zap, value: '77', label: 'AI Tools Built for Families' },
    { icon: Star, value: '3s', label: 'Average Planning Time' },
    { icon: Users, value: '2', label: 'Calendars Synced (Google + Apple)' }
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
              Tell Honeydew what your family needs — grocery lists, trip plans, weekly schedules — and
              watch AI organize it in seconds. Start on the App Store, then keep everyone in sync across devices.
            </p>

            {/* Primary CTA */}
            <motion.div
              className="flex flex-col gap-5 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <DownloadCTA
                  source="cta_section"
                  medium="cta_section"
                  campaign="primary_cta"
                  content="bottom_section"
                  storeCampaign="cta_section"
                  primaryLabel="Get Honeydew on the App Store"
                  secondaryLabel="Or try the web app if you want to explore first."
                  size="md"
                  layout="stacked"
                  align="center"
                  buttonClassName="group bg-white text-primary-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all duration-300 shadow-xl inline-flex items-center justify-center min-h-12"
                  secondaryClassName="text-sm text-white/85 hover:text-white transition-colors"
                  badgesClassName="justify-center"
                />
                <div className="text-center sm:text-left">
                  <div className="text-sm opacity-75 mb-1">🎉 No credit card required</div>
                  <div className="text-sm opacity-75">✨ Available on iPhone now, Android-ready next</div>
                </div>
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

          {/* Built by Parents Callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-4xl mx-auto border border-white/20"
          >
            <div className="text-center">
              <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
                Built by a parent who was tired of juggling Google Calendar, shared Notes,
                grocery list apps, and group texts just to keep the family on the same page.
                Honeydew replaces all of it with one AI that actually understands your family.
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-lg">Pete Ghiorse</div>
                  <div className="opacity-75">Founder & Dad</div>
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
                New and growing — be among the first families to try Honeydew
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction