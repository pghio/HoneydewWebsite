import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'

const HubCoParentingPage = () => {
  useSEO({
    title: 'Co-Parenting & Multi-Family Coordination Hub — Honeydew',
    description:
      'Answer-first guide to co-parenting coordination, shared schedules, and multi-family workflows with AI support.',
    canonical: '/hubs/co-parenting',
    keywords:
      'co-parenting app, divorced parents app, shared custody calendar, multi-family coordination, co-parenting schedule changes',
    image: '/og-image-ai.jpg',
    type: 'article',
  })

  return (
    <>
      <main className="min-h-screen bg-white">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Co-Parenting & Multi-Family Coordination Hub
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Short answer:</strong> The best co-parenting workflows combine shared calendars,
            neutral language templates, and clear ownership. Honeydew adds AI so schedule changes,
            lists, and reminders happen without back-and-forth.
          </p>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What to look for</h2>
            <ul className="space-y-2 text-gray-700">
              <li>Shared custody calendars with two-way sync</li>
              <li>Multi-family groups for extended households</li>
              <li>Templates for requests and schedule changes</li>
            </ul>
          </div>

          <div className="grid gap-4">
            <a className="rounded-xl border border-gray-200 p-4 hover:border-[#92C5A7] transition-colors" href="/blog/best-family-apps-divorced-parents-2025">
              Best Apps for Divorced Parents
            </a>
            <a className="rounded-xl border border-gray-200 p-4 hover:border-[#92C5A7] transition-colors" href="/blog/best-apps-for-coordinating-multi-family-groups-2025">
              Multi-Family Coordination Guide
            </a>
            <a className="rounded-xl border border-gray-200 p-4 hover:border-[#92C5A7] transition-colors" href="/blog/co-parenting-schedule-changes-without-conflict-2025-templates-rules-and-app-setup">
              Co-Parenting Schedule Changes (templates)
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HubCoParentingPage

