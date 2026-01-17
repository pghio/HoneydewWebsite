import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Check, X, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'
import { useLocation } from 'react-router-dom'
import { trackLinkClick } from '../utils/analytics'

interface TaskModule {
  title: string
  description: string
  stat?: string
  example?: string
}

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
  seo?: {
    title?: string
    description?: string
    keywords?: string
    image?: string
    heroCopy?: string
  }
  stickyCta?: {
    headline?: string
    subhead?: string
    ctaLabel?: string
    href?: string
  }
  taskModules?: TaskModule[]
  faq?: Array<{
    question: string
    answer: string
  }>
  proof?: {
    src: string
    alt: string
    caption?: string
  }
  relatedLinks?: Array<{
    label: string
    href: string
  }>
}

const getWebpSource = (src?: string) => {
  if (!src) return null
  const normalized = src.toLowerCase()
  if (!normalized.startsWith('/blog-images/')) return null
  if (normalized.endsWith('.webp')) return src
  if (/\.(jpg|jpeg|png)$/.test(normalized)) {
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  }
  return null
}

const ComparisonPage = ({
  competitor,
  competitorPrice,
  competitorHardware,
  honeydewAdvantages,
  competitorAdvantages,
  features,
  bestFor,
  seo,
  stickyCta,
  taskModules,
  faq,
  proof,
  relatedLinks,
}: ComparisonPageProps) => {
  const location = useLocation()
  const [showStickyCTA, setShowStickyCTA] = useState(false)

  const competitorSlug = competitor.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'comparison'
  const comparisonCtaHref = `https://app.gethoneydew.app/?utm_source=website&utm_medium=why_honeydew&utm_campaign=comparison_page&utm_content=${encodeURIComponent(competitorSlug)}`
  const midCtaHref = stickyCta?.href ?? comparisonCtaHref

  const seoDefaults = useMemo(() => {
    const baseKeywords = [
      `honeydew vs ${competitor.toLowerCase()}`,
      `${competitor.toLowerCase()} alternative`,
      'ai family planner',
      'family coordination app',
      'automation for families',
    ]

    return {
      title: `Honeydew Family App vs ${competitor} – 2025 Family Planner Breakdown`,
      description: `See how Honeydew automates what ${competitor} leaves manual: AI-built lists, two-way Apple & Google Calendar sync, and real-time coordination for busy families. Pricing, features, and migration tips inside.`,
      keywords: seo?.keywords ?? baseKeywords.join(', '),
      image: seo?.image ?? '/og-image-ai.jpg',
    }
  }, [competitor, seo?.image, seo?.keywords])

  useSEO({
    title: seo?.title ?? seoDefaults.title,
    description: seo?.description ?? seoDefaults.description,
    canonical: location.pathname,
    keywords: seoDefaults.keywords,
    image: seoDefaults.image,
    type: 'website',
  })

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return
      setShowStickyCTA(window.scrollY > 420)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!faq || faq.length === 0) return

    const identifier = `comparison-${competitorSlug}-faq`
    const existingScript = document.querySelector(`script[data-faq-schema="${identifier}"]`)
    if (existingScript) {
      existingScript.remove()
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.slice(0, 10).map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-faq-schema', identifier)
    script.textContent = JSON.stringify(faqSchema)
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [competitorSlug, faq])

  const heroCopy =
    seo?.heroCopy ??
    `Families switching from ${competitor} cut manual entry with AI-built lists, real-time calendar sync, and workflows built for multi-household coordination.`

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
              Honeydew Family App vs. {competitor}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{heroCopy}</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{competitor}</h2>
              <div className="text-4xl font-bold text-gray-900 mb-2">{competitorPrice}</div>
              {competitorHardware && (
                <p className="text-gray-600 mb-6">{competitorHardware}</p>
              )}
              <div className="space-y-3">
                {competitorAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Honeydew Card */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-purple-900 px-4 py-1 rounded-bl-lg text-sm font-bold">
                RECOMMENDED
              </div>
              <h2 className="text-2xl font-bold mb-4">Honeydew</h2>
              <div className="text-4xl font-bold mb-2">Free–$99/yr</div>
              <p className="text-purple-100 mb-6">No hardware required</p>
              <div className="space-y-3">
                {honeydewAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white leading-relaxed">{advantage}</span>
                  </div>
                ))}
              </div>
              {taskModules && taskModules.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-white/90">Automations families rave about</h3>
                  <div className="grid gap-4">
                    {taskModules.map((module, idx) => (
                      <div key={idx} className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
                        <p className="font-semibold text-white mb-2">{module.title}</p>
                        <p className="text-sm text-white/80 leading-relaxed">{module.description}</p>
                        {(module.stat || module.example) && (
                          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-white/70">
                            {module.stat && <span className="bg-white/20 rounded-full px-3 py-1">{module.stat}</span>}
                            {module.example && <span className="bg-white/10 rounded-full px-3 py-1">{module.example}</span>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <motion.a
                href={stickyCta?.href ?? comparisonCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-all duration-200 flex items-center justify-center gap-2 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  trackLinkClick({
                    href: stickyCta?.href ?? comparisonCtaHref,
                    source: 'why_honeydew',
                    variant: 'compare-card',
                    medium: 'page_section',
                    additionalParams: { competitor },
                  })
                }
              >
                {stickyCta?.ctaLabel ?? 'Try Honeydew Free'}
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
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-2xl font-bold text-white">Feature Comparison</h2>
              <p className="text-white/80 text-sm max-w-2xl">
                Every Honeydew workflow combines AI planning + two-way sync + automation. {competitor} relies on manual entry for the same outcomes.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-8 text-gray-700 font-semibold">Capability</th>
                    <th className="text-center py-4 px-8 text-gray-700 font-semibold">{competitor}</th>
                    <th className="text-center py-4 px-8 text-gray-700 font-semibold">Honeydew</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-8 text-gray-900">{item.feature}</td>
                      <td className="py-4 px-8 text-center">
                        {typeof item.competitor === 'boolean' ? (
                          item.competitor ? (
                            <Check className="w-6 h-6 text-green-600 mx-auto" aria-label={`${competitor} supports ${item.feature}`} />
                          ) : (
                            <X className="w-6 h-6 text-gray-300 mx-auto" aria-label={`${competitor} lacks ${item.feature}`} />
                          )
                        ) : (
                          <span className="text-gray-700">{item.competitor}</span>
                        )}
                      </td>
                      <td className="py-4 px-8 text-center">
                        {typeof item.honeydew === 'boolean' ? (
                          item.honeydew ? (
                            <Check className="w-6 h-6 text-green-600 mx-auto" aria-label={`Honeydew supports ${item.feature}`} />
                          ) : (
                            <X className="w-6 h-6 text-gray-300 mx-auto" aria-label={`Honeydew lacks ${item.feature}`} />
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

          {/* Mid-page CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-16 rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-blue-50 p-10 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to replace {competitor} with AI-powered planning?
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Try Honeydew free and get lists, calendar sync, and family hand-offs handled for you in minutes.
            </p>
            <motion.a
              href={midCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white font-semibold hover:bg-purple-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                trackLinkClick({
                  href: midCtaHref,
                  source: 'why_honeydew',
                  variant: 'mid-cta',
                  medium: 'page_section',
                  additionalParams: { competitor },
                })
              }
            >
              {stickyCta?.ctaLabel ?? 'Try Honeydew Free'}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
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
                    <span className="text-gray-700 leading-relaxed">{item}</span>
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
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {proof && (
            <motion.figure
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-20 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <picture>
                {getWebpSource(proof.src) && (
                  <source srcSet={getWebpSource(proof.src) ?? undefined} type="image/webp" />
                )}
                <img
                  src={proof.src}
                  alt={proof.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
              </picture>
              {proof.caption && (
                <figcaption className="p-6 text-sm text-gray-600 bg-gray-50 border-t border-gray-200">
                  {proof.caption}
                </figcaption>
              )}
            </motion.figure>
          )}

          {faq && faq.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-20"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Honeydew vs {competitor}: FAQs</h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Straight answers to the questions families ask before switching from {competitor}.
                  </p>
                </div>
                <div className="space-y-6">
                  {faq.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
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
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-50 transition-all duration-200 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600"
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

          {relatedLinks && relatedLinks.length > 0 && (
            <div className="mt-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Compare Honeydew with other family planners</h3>
              <p className="text-gray-600 mb-6">
                Exploring multiple options? These deep dives benchmark Honeydew against the most common tools families ask about.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {relatedLinks.map(link => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl px-4 py-3 text-gray-700 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                    whileHover={{ x: 4 }}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {showStickyCTA && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-4 left-4 right-4 md:right-6 md:left-auto md:w-96 z-40 drop-shadow-2xl"
        >
          <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white border border-white/10 backdrop-blur-md">
            <div className="p-5">
              <p className="text-sm uppercase tracking-wide text-white/80 mb-1">
                {stickyCta?.headline ?? 'Switch in under 10 minutes'}
              </p>
              <h4 className="text-lg font-semibold mb-2">
                {stickyCta?.subhead ?? `Import your ${competitor.replace(/calendar|app/gi, '').trim()} workflows without losing history`}
              </h4>
              <motion.a
                href={stickyCta?.href ?? comparisonCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white text-purple-600 font-semibold px-4 py-3 hover:bg-yellow-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  trackLinkClick({
                    href: stickyCta?.href ?? comparisonCtaHref,
                    source: 'why_honeydew',
                    variant: 'sticky-cta',
                    medium: 'page_section',
                    additionalParams: { competitor },
                  })
                }
              >
                {stickyCta?.ctaLabel ?? 'Start free trial'}
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ComparisonPage

