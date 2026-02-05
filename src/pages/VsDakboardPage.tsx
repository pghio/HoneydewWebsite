import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsDakboardPage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-dakboard')

  return (
    <ComparisonPage
      competitor="DAKboard"
      competitorPrice="$249-$399 or DIY ($50-200)"
      competitorHardware="Requires wall-mounted display hardware (pre-built or DIY)"
      honeydewAdvantages={[
        "AI agent with 27+ tools vs none",
        "Voice control (96.3% accuracy) vs no voice",
        "Works on all your devices - no hardware needed",
        "Mobile app for on-the-go access",
        "Two-way calendar sync (not display-only)",
        "Multiple family groups (divorced parents, extended family)",
        "Add tasks, not just view them"
      ]}
      competitorAdvantages={[
        "One-time hardware cost (no subscription)",
        "Highly customizable display layouts",
        "Works on any screen (old tablets, monitors)",
        "Open platform - integrate almost anything",
        "DIY option for tech-savvy families",
        "Great for visual dashboards and photos"
      ]}
      features={[
        { feature: "Family Calendar", competitor: true, honeydew: true },
        { feature: "Wall Display", competitor: true, honeydew: "Via any device" },
        { feature: "AI Planning", competitor: false, honeydew: "27+ tools" },
        { feature: "Voice Input", competitor: false, honeydew: "96.3% accuracy" },
        { feature: "Mobile App", competitor: false, honeydew: true },
        { feature: "Add Tasks/Events", competitor: false, honeydew: true },
        { feature: "Photo Recognition (OCR)", competitor: false, honeydew: true },
        { feature: "Shopping Lists", competitor: false, honeydew: true },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Multiple Family Groups", competitor: false, honeydew: true },
        { feature: "Calendar Sync", competitor: "Display-only", honeydew: "Two-way" },
        { feature: "Custom Layouts", competitor: true, honeydew: "Coming soon" },
        { feature: "Weather Widget", competitor: true, honeydew: true },
        { feature: "Works While Traveling", competitor: false, honeydew: true },
        { feature: "First Year Cost", competitor: "$50-$399", honeydew: "$0-$99" }
      ]}
      bestFor={{
        honeydew: [
          "AI to do the planning work for you",
          "Voice and photo input for hands-free adding",
          "Need to add tasks, not just view calendars",
          "Want lists and calendars in one place",
          "Manage multiple families or co-parenting",
          "Travel often and need access everywhere",
          "Don't want to set up or maintain hardware"
        ],
        competitor: [
          "Love DIY projects and tinkering",
          "Want a dedicated kitchen display",
          "Prefer one-time cost over subscriptions",
          "Need highly customizable dashboards",
          "Have old hardware to repurpose",
          "Only need to view calendars (not manage)"
        ]
      }}
      seo={{
        title: 'Honeydew Family App vs DAKboard – AI Family OS vs DIY Display',
        description:
          'DAKboard is a customizable display. Honeydew is an AI-powered family OS that plans, organizes, and syncs across all devices. Compare features, pricing, and why families choose Honeydew over display-only solutions.',
        keywords:
          'honeydew vs dakboard, dakboard alternative, ai family calendar, family organization app, digital family display, voice controlled family app, dakboard vs mobile app',
        image: '/blog-images/honeydew-ai-agent.jpg',
        heroCopy:
          'DAKboard shows your calendar on the wall. Honeydew is your AI assistant that plans meals, packs bags, manages multiple households—and works everywhere, not just the kitchen.',
      }}
      stickyCta={{
        headline: 'Skip the hardware project',
        subhead: 'Honeydew runs on every device you already own—with AI that actually helps',
        ctaLabel: 'Try Honeydew free',
      }}
      taskModules={[
        {
          title: 'AI meal planning that builds your grocery list',
          description:
            'Say "Plan dinners for the week" and Honeydew suggests meals based on your preferences, creates the shopping list, and adds it to your calendar. DAKboard just displays a static menu you have to create yourself.',
          stat: '3+ hours saved weekly on meal planning',
        },
        {
          title: 'Capture on the go, not just at the wall',
          description:
            'Voice capture while driving, snap a photo of school paperwork, or text a reminder to yourself. Honeydew processes it all into organized tasks. DAKboard only shows what you manually add elsewhere.',
          example: 'Works from car, office, or anywhere',
        },
        {
          title: 'Multi-family coordination built in',
          description:
            'Honeydew handles divorced parents, extended family, and roommates with separate but connected calendars. DAKboard shows one view—great for display, but not for complex family logistics.',
        },
      ]}
      faq={[
        {
          question: 'Can Honeydew replace DAKboard as a wall display?',
          answer:
            'Yes. Run Honeydew on an old tablet or spare laptop mounted in the kitchen. You get the wall display benefit plus AI planning, voice input, and mobile access. Unlike DAKboard, you can actually add and manage tasks from the display.',
        },
        {
          question: 'Is DAKboard better for tech-savvy families who like customization?',
          answer:
            'DAKboard is excellent for DIY enthusiasts who want full control over display layouts. But if you want AI to help with planning—not just displaying—Honeydew handles the mental load while DAKboard just shows what you already decided.',
        },
        {
          question: 'How does the cost compare long term?',
          answer:
            'DAKboard has no subscription if you DIY ($50-200 hardware) or $249-$399 pre-built. Honeydew is $99/year premium or free tier. After 2-3 years, costs are similar—but Honeydew includes AI planning, voice input, and mobile access.',
        },
        {
          question: 'Can DAKboard sync with Google Calendar like Honeydew?',
          answer:
            'DAKboard displays calendars from Google, Apple, and others—but it\'s one-way (view only). Honeydew syncs two-way, so changes you make in Honeydew appear in Google Calendar and vice versa. You can actually manage your schedule, not just view it.',
        },
        {
          question: 'What if I already have a DAKboard setup?',
          answer:
            'Keep DAKboard for the wall display if you like it, and add Honeydew as your mobile command center. Many families use both—DAKboard for the kitchen view, Honeydew for AI planning and on-the-go access.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-calendar-hero.jpg',
        alt: 'Honeydew AI family organizer on mobile devices compared to DAKboard wall display',
        caption:
          'DAKboard is a beautiful display. Honeydew is a planning assistant. Families who want AI to reduce their mental load—not just show their calendar—choose Honeydew.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsDakboardPage
