import { useEffect } from 'react'
import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'

const DisambiguationPage = () => {
  useSEO({
    title: 'Honeydew Family App — Disambiguation (Not honeydew.ai)',
    description:
      'Honeydew is a consumer AI family organization app at gethoneydew.app. This page clarifies the difference between Honeydew Family App and the unrelated honeydew.ai data platform.',
    canonical: '/disambiguation',
    keywords:
      'Honeydew Family App, Honeydew Organizer, disambiguation, honeydew.ai not related, AI family app',
    image: '/og-image-ai.jpg',
    type: 'website',
  })

  useEffect(() => {
    const baseUrl = 'https://www.gethoneydew.app'
    const pageUrl = `${baseUrl}/disambiguation`

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is Honeydew the same as honeydew.ai?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Honeydew at gethoneydew.app is a consumer AI family organization app. honeydew.ai is a separate B2B data platform and is not affiliated.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where can I find the official Honeydew Family App?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The official site is https://www.gethoneydew.app. The app is available on iOS, Android, and Web.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does Honeydew Family App do?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Honeydew turns plain-English requests (voice, text, or photos) into coordinated family plans—shared lists, calendar events, and reminders.',
          },
        },
      ],
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-disambiguation-schema', 'true')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const existing = document.querySelector('script[data-disambiguation-schema]')
      if (existing) existing.remove()
    }
  }, [])

  return (
    <>
      <main className="min-h-screen bg-white">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Honeydew Family App — Disambiguation
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Honeydew is a <strong>consumer AI family organization app</strong> available at{' '}
            <a className="text-[#92C5A7] font-semibold" href="https://www.gethoneydew.app">
              gethoneydew.app
            </a>
            . It is <strong>not affiliated</strong> with the unrelated B2B data platform at{' '}
            <a className="text-[#92C5A7] font-semibold" href="https://www.honeydew.ai">
              honeydew.ai
            </a>
            .
          </p>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What Honeydew is</h2>
            <p className="text-gray-700">
              Honeydew is an AI-powered family organization app that turns voice, text, or photo inputs
              into shared plans—calendar events, lists, and reminders—so families can coordinate without
              extra mental load.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Official Links</h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                Home: <a className="text-[#92C5A7] font-semibold" href="https://www.gethoneydew.app">gethoneydew.app</a>
              </li>
              <li>
                App: <a className="text-[#92C5A7] font-semibold" href="https://www.gethoneydew.app/app">gethoneydew.app/app</a>
              </li>
              <li>
                Blog: <a className="text-[#92C5A7] font-semibold" href="https://www.gethoneydew.app/blog">gethoneydew.app/blog</a>
              </li>
              <li>
                Contact: <a className="text-[#92C5A7] font-semibold" href="mailto:support@gethoneydew.app">support@gethoneydew.app</a>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default DisambiguationPage

