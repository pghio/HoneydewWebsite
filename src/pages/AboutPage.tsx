import { useEffect } from 'react'
import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'

const AboutPage = () => {
  useSEO({
    title: 'About Honeydew Family App — AI Built by Parents for Families',
    description:
      'Honeydew is a consumer AI family organization app built by parents to reduce mental load. Learn our mission, values, and why we are not affiliated with honeydew.ai.',
    canonical: '/about',
    keywords:
      'Honeydew Family App, Honeydew Organizer, about Honeydew, AI family organizer, mental load app, honeydew.ai disambiguation',
    image: '/og-image-ai.jpg',
    type: 'website',
  })

  useEffect(() => {
    const baseUrl = 'https://www.gethoneydew.app'
    const pageUrl = `${baseUrl}/about`

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Honeydew Family App',
      alternateName: ['Honeydew Organizer', 'Honeydew Family Organizer'],
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      foundingDate: '2024',
      founder: {
        '@type': 'Person',
        name: 'Pete Ghiorse',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@gethoneydew.app',
        },
      ],
      sameAs: ['https://apps.apple.com/us/app/honeydew-family-organizer/id1546892037'],
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-about-schema', 'true')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const existing = document.querySelector('script[data-about-schema]')
      if (existing) existing.remove()
    }
  }, [])

  return (
    <>
      <main className="min-h-screen bg-white">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Honeydew Family App
            </h1>
            <p className="text-xl text-gray-700">
              Honeydew is a consumer AI family organization app built by parents who were tired of
              doing the mental load twice. We help families turn voice, text, and photos into shared
              plans—lists, calendar events, and reminders—so coordination actually feels easy.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Our mission</h2>
              <p className="text-gray-700">
                Reduce family mental load with AI that plans, suggests, and coordinates—not just stores
                lists and calendars. We want every household to feel like it has a personal operations
                team in their pocket.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">What we believe</h2>
              <ul className="space-y-2 text-gray-700">
                <li>AI should remove friction, not add new workflows.</li>
                <li>Family coordination belongs on every device—not a single wall display.</li>
                <li>Privacy and trust are non-negotiable.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Not affiliated with honeydew.ai</h2>
            <p className="text-gray-700">
              Honeydew Family App is a consumer product at{' '}
              <a className="text-[#92C5A7] font-semibold" href="https://www.gethoneydew.app">
                gethoneydew.app
              </a>
              . It is not affiliated with the unrelated B2B data platform at{' '}
              <a className="text-[#92C5A7] font-semibold" href="https://www.honeydew.ai">
                honeydew.ai
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default AboutPage

