import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsSkylightPage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-skylight')

  return (
    <ComparisonPage
      competitor="Skylight Calendar"
      competitorPrice="$300 + $79/yr"
      competitorHardware='Requires wall-mounted display hardware'
      honeydewAdvantages={[
        "AI planning creates lists in seconds",
        "Voice input - speak while driving or cooking",
        "Photograph handwritten lists automatically",
        "Works on all your devices - no new hardware",
        "Two-way calendar sync with Google & Apple",
        "Multiple family groups (divorced parents, extended family)"
      ]}
      competitorAdvantages={[
        "Dedicated wall display for kitchen",
        "Visual presence everyone walks by",
        "Simple calendar viewing",
        "Physical touchscreen interface"
      ]}
      features={[
        { feature: "Family Calendar", competitor: true, honeydew: true },
        { feature: "Wall Display", competitor: true, honeydew: false },
        { feature: "Works on Your Devices", competitor: "Via app", honeydew: "All devices" },
        { feature: "AI Planning", competitor: false, honeydew: true },
        { feature: "Voice Input", competitor: false, honeydew: true },
        { feature: "Photo Recognition", competitor: false, honeydew: true },
        { feature: "Shopping Lists", competitor: false, honeydew: true },
        { feature: "Packing Lists", competitor: false, honeydew: true },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Multiple Family Groups", competitor: false, honeydew: true },
        { feature: "Calendar Sync", competitor: "One-way", honeydew: "Two-way" },
        { feature: "Works While Traveling", competitor: false, honeydew: true },
        { feature: "First Year Cost", competitor: "$379", honeydew: "$0-$99" }
      ]}
      bestFor={{
        honeydew: [
          "AI to do the planning work for you",
          "Voice and photo input for hands-free adding",
          "Save money - no hardware to buy",
          "Need lists and calendars together",
          "Manage multiple families",
          "Travel often and need organizer everywhere"
        ],
        competitor: [
          "Want a dedicated wall display in your kitchen",
          "Like the visual presence of calendar on wall",
          "Don't need planning help - just viewing",
          "Have the budget for hardware",
          "Only need calendar viewing"
        ]
      }}
      seo={{
        title: 'Honeydew vs Skylight Calendar – AI-First, Mobile Command Center (No Hardware)',
        description:
          'Skylight needs a wall display. Honeydew is the AI-first family OS that runs on every device—no hardware. Compare automation, pricing, and how Honeydew handles voice capture, meal planning, and multi-family sync.',
        keywords:
          'honeydew vs skylight, no hardware family calendar, ai family command center, skylight calendar alternative, voice-controlled family app, ai meal planning for families',
        image: '/blog-images/honeydew-ai-agent.jpg',
        heroCopy:
          'Skylight gives you a glowing wall calendar. Honeydew gives you automation: AI plans travel, meal prep, and custody hand-offs across every phone, tablet, and laptop you already own.',
      }}
      stickyCta={{
        headline: 'Keep your hardware',
        subhead: 'Run Honeydew on every screen you own—no new device required',
        ctaLabel: 'See Honeydew on my devices',
      }}
      taskModules={[
        {
          title: 'AI trip planning with logistics',
          description:
            'Say “Plan spring break in Denver” and Honeydew drafts a full itinerary, packing list, and schedule—then syncs it with your travel companions.',
          stat: '12+ hours saved per trip',
        },
        {
          title: 'Household command center without the wall mount',
          description:
            'Honeydew’s dashboard updates across TVs, tablets, phones, and laptops with a live status board, so you don’t have to walk back to the kitchen to know what changed.',
          example: 'Works in-car, on the couch, or at work',
        },
        {
          title: 'Hands-free capture with voice + camera',
          description:
            'Voice capture while driving or upload a photo of a school flyer. Honeydew understands the content and updates tasks instantly—Skylight still needs you to tap letters on glass.',
        },
      ]}
      faq={[
        {
          question: 'Can Honeydew replace the visual presence of Skylight?',
          answer:
            'Yes. Families pin Honeydew’s live board to iPads, smart TVs, or a spare laptop. You get a “wall view” plus the benefit of AI automation and mobile access everywhere else.',
        },
        {
          question: 'Do we lose anything by ditching Skylight hardware?',
          answer:
            'You keep the shared calendar experience but gain automation, voice capture, OCR for paperwork, and multi-family support. Honeydew works offline and travels with you.',
        },
        {
          question: 'How does pricing compare long term?',
          answer:
            'Skylight costs $300-$500 upfront plus $79/year. Honeydew’s premium is $99/year with a free tier available—no hardware refresh cycles or replacement screens required.',
        },
        {
          question: 'Can Honeydew handle multiple households or blended families?',
          answer:
            'Yes. Honeydew was designed for multi-home coordination and co-parenting. You can grant access to specific lists, calendars, and automations per household without exposing everything.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-calendar-hero.jpg',
        alt: 'Honeydew AI dashboard on tablet and phone compared to Skylight wall calendar',
        caption:
          'Honeydew stays with you—phones, tablets, laptops—while Skylight only lives on the wall. Families prefer a command center that travels with their schedule.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsSkylightPage


