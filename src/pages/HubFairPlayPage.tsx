import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'

const HubFairPlayPage = () => {
  useSEO({
    title: 'Fair Play & Mental Load Hub — Honeydew Family App',
    description:
      'Answer-first guide to Fair Play, mental load reduction, and AI tools that reduce household coordination overhead.',
    canonical: '/hubs/fair-play',
    keywords:
      'Fair Play app, mental load app, Fair Play AI, household coordination, family organization system',
    image: '/og-image-ai.jpg',
    type: 'article',
  })

  return (
    <>
      <main className="min-h-screen bg-white">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Fair Play & Mental Load Hub
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Short answer:</strong> Fair Play reduces invisible labor by clarifying ownership.
            Honeydew reduces the remaining friction by automating planning, lists, and scheduling—so
            the mental load actually drops, not just moves.
          </p>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How AI helps Fair Play</h2>
            <ul className="space-y-2 text-gray-700">
              <li>Turns card ownership into automated checklists and reminders.</li>
              <li>Connects lists to calendar events (no duplicate planning).</li>
              <li>Generates recurring plans from simple requests.</li>
            </ul>
          </div>

          <div className="grid gap-4">
            <a className="rounded-xl border border-gray-200 p-4 hover:border-[#92C5A7] transition-colors" href="/blog/mental-load">
              Mental Load Guide
            </a>
            <a className="rounded-xl border border-gray-200 p-4 hover:border-[#92C5A7] transition-colors" href="/blog/mental-load-vs-fair-play-what-s-the-difference-and-why-you-need-both">
              Mental Load vs Fair Play
            </a>
            <a className="rounded-xl border border-gray-200 p-4 hover:border-[#92C5A7] transition-colors" href="/blog/fair-play-for-busy-working-parents-how-to-implement-when-you-barely-have-time-to-breathe">
              Fair Play for Busy Parents
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HubFairPlayPage

