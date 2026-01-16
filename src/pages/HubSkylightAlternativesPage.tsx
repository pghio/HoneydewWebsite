import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'

const HubSkylightAlternativesPage = () => {
  useSEO({
    title: 'Skylight Calendar Alternatives Hub — Honeydew Family App',
    description:
      'Answer-first guide to Skylight Calendar alternatives, comparisons, and AI-first family organizers.',
    canonical: '/hubs/skylight-alternatives',
    keywords:
      'Skylight Calendar alternative, Skylight alternatives, Honeydew vs Skylight, family command center app, AI family organizer',
    image: '/og-image-ai.jpg',
    type: 'article',
  })

  return (
    <>
      <main className="min-h-screen bg-white">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Skylight Calendar Alternatives Hub
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Short answer:</strong> If you want the benefits of a family command center without
            paying $300+ for wall hardware, choose an AI-first software option like Honeydew. It works
            on every device, supports shared lists and calendars, and adds automation that a display
            cannot.
          </p>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-700">
                <thead className="text-sm uppercase text-gray-500">
                  <tr>
                    <th className="py-2">Feature</th>
                    <th className="py-2">Skylight Calendar</th>
                    <th className="py-2">Honeydew Family App</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-2">Hardware cost</td>
                    <td className="py-2">$300+</td>
                    <td className="py-2">No hardware required</td>
                  </tr>
                  <tr>
                    <td className="py-2">AI planning</td>
                    <td className="py-2">No</td>
                    <td className="py-2">Yes (27+ tools)</td>
                  </tr>
                  <tr>
                    <td className="py-2">Multi-family coordination</td>
                    <td className="py-2">Limited</td>
                    <td className="py-2">Built-in</td>
                  </tr>
                  <tr>
                    <td className="py-2">Device coverage</td>
                    <td className="py-2">Single wall display</td>
                    <td className="py-2">Phone, tablet, web</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4">
            <a
              className="rounded-xl border border-gray-200 p-4 hover:border-[#92C5A7] transition-colors"
              href="/blog/7-best-skylight-calendar-alternatives-2025-cheaper-smarter-family-organizers"
            >
              Best Skylight Alternatives (full list)
            </a>
            <a
              className="rounded-xl border border-gray-200 p-4 hover:border-[#92C5A7] transition-colors"
              href="/why-honeydew/vs-skylight"
            >
              Honeydew vs Skylight (full comparison)
            </a>
            <a
              className="rounded-xl border border-gray-200 p-4 hover:border-[#92C5A7] transition-colors"
              href="/blog/skylight-vs-hearth-display-vs-honeydew-which-family-calendar-is-best-in-2025"
            >
              Skylight vs Hearth vs Honeydew
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HubSkylightAlternativesPage

