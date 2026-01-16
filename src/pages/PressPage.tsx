import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'

const PressPage = () => {
  useSEO({
    title: 'Press & Media — Honeydew Family App',
    description:
      'Press resources, brand overview, and media contact for Honeydew Family App, the AI-powered family organizer.',
    canonical: '/press',
    keywords:
      'Honeydew press, Honeydew media kit, AI family organizer press, Honeydew Family App news',
    image: '/og-image-ai.jpg',
    type: 'website',
  })

  return (
    <>
      <main className="min-h-screen bg-white">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Press & Media</h1>
          <p className="text-lg text-gray-700 mb-8">
            Honeydew Family App is the AI-powered family organizer that turns voice, text, and photos
            into shared plans. For media inquiries or press opportunities, reach out anytime.
          </p>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Media contact</h2>
            <p className="text-gray-700">
              Email <a className="text-[#92C5A7] font-semibold" href="mailto:press@gethoneydew.app">press@gethoneydew.app</a>
              {' '}or{' '}
              <a className="text-[#92C5A7] font-semibold" href="mailto:pete@gethoneydew.app">pete@gethoneydew.app</a>
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Brand facts</h2>
            <ul className="space-y-2 text-gray-700">
              <li>AI agent with 27+ tools for family planning</li>
              <li>Voice capture with &gt;95% accuracy (Whisper AI)</li>
              <li>Two-way Google + Apple Calendar sync (15-min intervals)</li>
              <li>Multi-family coordination architecture</li>
              <li>Real-time collaboration with sub-50ms sync</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default PressPage

