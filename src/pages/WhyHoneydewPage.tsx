import { motion } from 'framer-motion'
import { Check, X, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'
import { useLocation } from 'react-router-dom'
import { trackLinkClick } from '../utils/analytics'

interface ComparisonPageProps {
  competitor: string
  competitorPrice: string
  competitorHardware?: string
  honeydewAdvantages: string[]
  competitorAdvantages: string[]
  features: {
    feature: string
    competitor: string | boolean
    honeydew: string | boolean
  }[]
  bestFor: {
    honeydew: string[]
    competitor: string[]
  }
}

const ComparisonPage = ({
  competitor,
  competitorPrice,
  competitorHardware,
  honeydewAdvantages,
  competitorAdvantages,
  features,
  bestFor
}: ComparisonPageProps) => {
  const location = useLocation()
  
  useSEO({
    title: `Honeydew vs ${competitor} - Comparison & Review 2025`,
    description: `Compare Honeydew and ${competitor}. See features, pricing, and why families are switching to Honeydew's AI-powered family organization. ${competitor} ${competitorPrice} vs Honeydew Free-$99/yr.`,
    canonical: location.pathname,
    keywords: `honeydew vs ${competitor.toLowerCase()}, ${competitor.toLowerCase()} alternative, best family organization app, AI family planner, family coordination app`,
    image: '/og-image-ai.jpg',
    type: 'website'
  })

  const competitorSlug = competitor.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'comparison'
  const comparisonCtaHref = `https://app.gethoneydew.app/?utm_source=website&utm_medium=why_honeydew&utm_campaign=comparison_page&utm_content=${encodeURIComponent(competitorSlug)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Honeydew vs. {competitor}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare features, pricing, and see why families choose Honeydew for smarter organization
            </p>
          </motion.div>

          {/* Price Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            {/* Competitor Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{competitor}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">{competitorPrice}</div>
              {competitorHardware && (
                <p className="text-gray-600 mb-6">{competitorHardware}</p>
              )}
              <div className="space-y-3">
                {competitorAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Honeydew Card */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-purple-900 px-4 py-1 rounded-bl-lg text-sm font-bold">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold mb-4">Honeydew</h3>
              <div className="text-4xl font-bold mb-2">Free–$99/yr</div>
              <p className="text-purple-100 mb-6">No hardware required</p>
              <div className="space-y-3">
                {honeydewAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white">{advantage}</span>
                  </div>
                ))}
              </div>
              <motion.a
                href={comparisonCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-all duration-200 flex items-center justify-center gap-2 w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  trackLinkClick({
                    href: comparisonCtaHref,
                    source: 'why_honeydew',
                    variant: 'compare-card',
                    medium: 'page_section',
                    additionalParams: { competitor },
                  })
                }
              >
                Try Honeydew Free
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Feature Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-16"
          >
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4">
              <h2 className="text-2xl font-bold text-white">Feature Comparison</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-8 text-gray-700 font-semibold">Feature</th>
                    <th className="text-center py-4 px-8 text-gray-700 font-semibold">{competitor}</th>
                    <th className="text-center py-4 px-8 text-gray-700 font-semibold">Honeydew</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-8 text-gray-900">{item.feature}</td>
                      <td className="py-4 px-8 text-center">
                        {typeof item.competitor === 'boolean' ? (
                          item.competitor ? (
                            <Check className="w-6 h-6 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-700">{item.competitor}</span>
                        )}
                      </td>
                      <td className="py-4 px-8 text-center">
                        {typeof item.honeydew === 'boolean' ? (
                          item.honeydew ? (
                            <Check className="w-6 h-6 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-700">{item.honeydew}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Who Should Choose */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-200">
              <h3 className="text-2xl font-bold text-purple-900 mb-6">Choose Honeydew if you want:</h3>
              <div className="space-y-3">
                {bestFor.honeydew.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose {competitor} if you want:</h3>
              <div className="space-y-3">
                {bestFor.competitor.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Organized Smarter?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of families using Honeydew's AI to save hours every week on planning and coordination.
            </p>
            <motion.a
              href={comparisonCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-50 transition-all duration-200 inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                trackLinkClick({
                  href: comparisonCtaHref,
                  source: 'why_honeydew',
                  variant: 'final-cta',
                  medium: 'page_section',
                  additionalParams: { competitor },
                })
              }
            >
              Try Honeydew Free
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <p className="text-purple-100 text-sm mt-4">No credit card required • Free forever plan available</p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ComparisonPage

