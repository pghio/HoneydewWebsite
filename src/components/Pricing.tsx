import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { trackLinkClick } from '../utils/analytics'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out Honeydew',
    features: [
      '1 family group',
      'Basic AI features',
      'Up to 5 lists',
      'Calendar sync',
      'Mobile & web apps'
    ],
    cta: 'Start Free',
    href: 'https://app.gethoneydew.app/?utm_source=website&utm_medium=pricing&utm_campaign=pricing_grid&utm_content=plan-free',
    highlighted: false
  },
  {
    name: 'Honeydew More',
    price: '$7.99',
    period: '/month',
    description: 'Everything you need for family organization',
    features: [
      'Unlimited family groups',
      'Full AI Agent (27 tools)',
      'Unlimited lists & tasks',
      'Voice & image input',
      'Priority support',
      'Advanced calendar features',
      'Multi-family coordination'
    ],
    cta: 'Try 14 Days Free',
    href: 'https://app.gethoneydew.app/?utm_source=website&utm_medium=pricing&utm_campaign=pricing_grid&utm_content=plan-honeydew-more',
    highlighted: true,
    badge: 'Most Popular'
  },
  {
    name: 'Honeydew All',
    price: 'Coming Soon',
    period: '',
    description: 'Advanced features for power users',
    features: [
      'Everything in Honeydew More',
      'Advanced AI capabilities',
      'Premium integrations',
      'Family insights & analytics',
      'Dedicated account support'
    ],
    cta: 'Join Waitlist',
    href: 'https://app.gethoneydew.app/?utm_source=website&utm_medium=pricing&utm_campaign=pricing_grid&utm_content=plan-honeydew-all',
    highlighted: false
  }
]

const Pricing = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple Pricing for{' '}
            <span className="honeydew-text-gradient">Families</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free, upgrade when you're ready. All plans include 14-day money-back guarantee.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className={`rounded-2xl p-8 h-full flex flex-col ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-500 shadow-xl'
                  : 'bg-white border-2 border-gray-200 shadow-lg'
              }`}>
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'text-purple-600' : 'text-green-600'
                      }`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.a
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 text-center block ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg'
                      : 'border-2 border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    trackLinkClick({
                      href: plan.href,
                      source: 'pricing',
                      variant: plan.name,
                      medium: 'page_section',
                      additionalParams: {
                        pricing_plan: plan.name,
                        pricing_highlighted: plan.highlighted,
                      },
                    })
                  }
                >
                  {plan.cta}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 max-w-3xl mx-auto border border-green-200">
            <p className="text-green-800 font-semibold text-lg mb-2">
              💡 Families save 3-5 hours weekly on coordination
            </p>
            <p className="text-green-700">
              At $7.99/month (less than a single coffee), that's over $100 of time value every month. 
              <span className="font-medium"> The ROI is 30-50x.</span>
            </p>
          </div>
          <p className="text-gray-600 text-lg">
            All plans include 14-day money-back guarantee • No credit card required for free plan • Cancel anytime
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Need help choosing? <a href="/support" className="text-purple-600 hover:text-purple-700 underline">Contact our team</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing

