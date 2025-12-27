import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'
import comparisonLinks from '../utils/comparisonLinks'

const ComparisonsHubPage = () => {
  useSEO({
    title: 'Honeydew Comparisons – Alternatives to Cozi, Skylight, TimeTree, and more',
    description:
      'Compare Honeydew with the most common family calendar and organization apps. Pricing, AI capabilities, calendar sync, multi-family coordination, and which option is best for your household.',
    canonical: '/compare',
    keywords:
      'honeydew vs cozi, honeydew vs skylight calendar, honeydew vs timetree, family calendar alternatives, cozi alternative, skylight alternative, ai family organizer comparison',
    image: '/og-image-ai.jpg',
    type: 'website',
  })

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#92C5A7]/10 via-white to-white">
        <header className="pt-28 pb-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center bg-[#92C5A7]/10 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[#92C5A7]/20">
                <Sparkles className="w-4 h-4 mr-2 text-[#92C5A7]" />
                Honeydew Comparisons & Alternatives
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Compare Honeydew with the apps families actually use
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
                Fast, practical breakdowns of AI capabilities, two-way calendar sync, multi-family coordination, and total
                cost (including hardware).
              </p>
            </motion.div>
          </div>
        </header>

        <main className="pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-[#92C5A7]/15 to-[#78E6AF]/10">
                <h2 className="text-2xl font-bold text-gray-900">Why Honeydew comparisons</h2>
                <p className="text-gray-600 mt-2">
                  If you’re deciding between tools, start here. Each page includes a feature matrix and “best for” guidance.
                </p>
              </div>

              <div className="p-6 grid gap-4 md:grid-cols-2">
                {comparisonLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                  >
                    <Link
                      to={link.href}
                      className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 hover:border-[#92C5A7] hover:shadow-sm transition-all"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-[#2F3C36]">{link.label}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Pricing, hardware, AI workflows, calendar sync, and migration tips.
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#92C5A7] group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900">Prefer blog-style deep dives?</h3>
                <p className="text-gray-600 mt-2">
                  Our blog posts include hands-on advice, setup checklists, and “what to choose if…” scenarios.
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 mt-5 rounded-xl bg-white border border-gray-200 px-4 py-3 font-semibold text-gray-900 hover:border-[#92C5A7] transition-colors"
                >
                  Browse the blog
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </Link>
              </div>

              <div className="bg-gradient-to-br from-[#92C5A7] to-[#78E6AF] rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold">Want the “done-for-you” version?</h3>
                <p className="text-white/90 mt-2">
                  Use Honeydew’s AI to turn voice, text, or photos into lists + calendar events in seconds. No hardware required.
                </p>
                <a
                  href="https://app.gethoneydew.app/?utm_source=website&utm_medium=compare_hub&utm_campaign=primary_cta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 rounded-xl bg-white text-gray-900 px-4 py-3 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Try Honeydew Free
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default ComparisonsHubPage

