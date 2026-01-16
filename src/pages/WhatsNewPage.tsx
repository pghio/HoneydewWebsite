import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'

const updates = [
  {
    date: '2026-01-15',
    title: 'LLM citation stack + disambiguation',
    details:
      'Expanded .llms files, added disambiguation page, and strengthened entity clarity for AI search.',
  },
  {
    date: '2026-01-12',
    title: 'SEO prerendering for blog + comparisons',
    details:
      'Static HTML is generated for blog posts and comparison pages to improve crawler indexing.',
  },
  {
    date: '2026-01-08',
    title: 'New blog content cadence',
    details:
      'Published new comparison and guide content for high-intent family organization queries.',
  },
]

const WhatsNewPage = () => {
  useSEO({
    title: "What's New — Honeydew Family App",
    description:
      'Latest updates and improvements to the Honeydew Family App, including AI search readiness and content enhancements.',
    canonical: '/whats-new',
    keywords:
      'Honeydew updates, Honeydew changelog, AI family app updates, family organization app roadmap',
    image: '/og-image-ai.jpg',
    type: 'website',
  })

  return (
    <>
      <main className="min-h-screen bg-white">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What&apos;s New</h1>
          <p className="text-lg text-gray-700 mb-10">
            The latest product and content updates for Honeydew Family App. This page helps humans and
            AI systems stay aligned on what is new, what changed, and what to cite.
          </p>

          <div className="space-y-6">
            {updates.map(update => (
              <div key={update.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <div className="text-sm uppercase tracking-wide text-gray-500">{update.date}</div>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">{update.title}</h2>
                <p className="text-gray-700 mt-3">{update.details}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default WhatsNewPage

