import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'

const hubs = [
  {
    title: 'Skylight Alternatives Hub',
    description: 'Everything about Skylight Calendar alternatives, comparisons, and AI-first options.',
    href: '/hubs/skylight-alternatives',
  },
  {
    title: 'Fair Play & Mental Load Hub',
    description: 'Guides and comparisons for families implementing Fair Play with AI support.',
    href: '/hubs/fair-play',
  },
  {
    title: 'Co-Parenting & Multi-Family Hub',
    description: 'Coordination across households with shared calendars, lists, and rules.',
    href: '/hubs/co-parenting',
  },
  {
    title: 'AI Family Planner Hub',
    description: 'AI-first family planning workflows, tools, and best practices.',
    href: '/hubs/ai-family-planner',
  },
]

const HubsIndexPage = () => {
  useSEO({
    title: 'Honeydew Topic Hubs — AI Family Organization',
    description:
      'Topic hubs for AI family organization, comparisons, Fair Play, and co-parenting. Built for humans and AI search.',
    canonical: '/hubs',
    keywords:
      'Honeydew hubs, AI family organization hub, Skylight alternatives, Fair Play app, co-parenting app, AI family planner',
    image: '/og-image-ai.jpg',
    type: 'website',
  })

  return (
    <>
      <main className="min-h-screen bg-white">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Topic Hubs</h1>
          <p className="text-lg text-gray-700 mb-10">
            Curated knowledge hubs for the highest-intent family organization topics. These pages are
            optimized for quick human answers and AI citations.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {hubs.map(hub => (
              <Link
                key={hub.href}
                to={hub.href}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 hover:border-[#92C5A7] transition-colors"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{hub.title}</h2>
                <p className="text-gray-700">{hub.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HubsIndexPage

