import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'

const HubAIFamilyPlannerPage = () => {
  useSEO({
    title: 'AI Family Planner Hub — Honeydew Family App',
    description:
      'Answer-first guide to AI family planning, voice-first capture, and automation for calendars and lists.',
    canonical: '/hubs/ai-family-planner',
    keywords:
      'AI family planner, AI family calendar app, voice controlled family app, AI meal planning, family organization AI',
    image: '/og-image-ai.jpg',
    type: 'article',
  })

  return (
    <>
      <main className="min-h-screen bg-white">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Family Planner Hub
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Short answer:</strong> The most effective AI family planners accept natural
            language and automatically generate lists, schedules, and reminders. Honeydew does this
            with 27+ AI tools, voice capture, and photo OCR.
          </p>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">AI family planner checklist</h2>
            <ul className="space-y-2 text-gray-700">
              <li>Voice-first capture with accurate transcription</li>
              <li>Two-way calendar sync with Google + Apple</li>
              <li>AI-generated checklists for common family tasks</li>
            </ul>
          </div>

          <div className="grid gap-4">
            <a className="rounded-xl border border-gray-200 p-4 hover:border-[#92C5A7] transition-colors" href="/blog/best-ai-calendar-apps-for-families-2025">
              Best AI Calendar Apps for Families
            </a>
            <a className="rounded-xl border border-gray-200 p-4 hover:border-[#92C5A7] transition-colors" href="/blog/how-ai-family-assistants-actually-work-real-examples-that-ll-make-you-say-wait-what">
              How AI Family Assistants Work
            </a>
            <a className="rounded-xl border border-gray-200 p-4 hover:border-[#92C5A7] transition-colors" href="/blog/how-ai-transforms-family-organization">
              How AI Transforms Family Organization
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HubAIFamilyPlannerPage

