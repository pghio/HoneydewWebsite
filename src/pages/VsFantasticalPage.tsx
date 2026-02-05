import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsFantasticalPage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-fantastical')

  return (
    <ComparisonPage
      competitor="Fantastical"
      competitorPrice="$6.99/mo family (5 members)"
      competitorHardware="Apple-only (iOS, macOS, iPadOS, watchOS)"
      honeydewAdvantages={[
        "AI agent with 27+ tools vs natural language parsing",
        "Voice recognition 96.3% accurate vs Siri-dependent",
        "Cross-platform - Android, web, any device",
        "Family-first design vs adapted individual app",
        "Multi-family groups for divorced parents, extended family",
        "Integrated tasks, lists, meal planning - not calendar-only"
      ]}
      competitorAdvantages={[
        "Beautiful, award-winning design",
        "Natural language event creation",
        "Deep Apple ecosystem integration",
        "Conference call detection",
        "Power user calendar features"
      ]}
      features={[
        { feature: "Family Calendar", competitor: true, honeydew: true },
        { feature: "Cross-Platform", competitor: "Apple only", honeydew: "All devices" },
        { feature: "AI Agent", competitor: false, honeydew: "27+ tools" },
        { feature: "Natural Language", competitor: "Events only", honeydew: "Full planning" },
        { feature: "Voice Control", competitor: "Via Siri", honeydew: "96.3% accurate" },
        { feature: "Shopping Lists", competitor: false, honeydew: true },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Packing Lists", competitor: false, honeydew: true },
        { feature: "Photo Recognition", competitor: false, honeydew: true },
        { feature: "Multiple Family Groups", competitor: false, honeydew: true },
        { feature: "Calendar Sync", competitor: "Apple-focused", honeydew: "Two-way all" },
        { feature: "Family Coordination", competitor: "Shared calendars", honeydew: "Purpose-built" },
        { feature: "Yearly Cost (Family)", competitor: "$84/yr", honeydew: "$0-$99" }
      ]}
      bestFor={{
        honeydew: [
          "Need AI to plan trips, meals, and schedules",
          "Have Android users in your family",
          "Want lists, tasks, and calendar in one place",
          "Coordinate between multiple households",
          "Need hands-free voice capture while busy",
          "Family-first coordination, not adapted individual app"
        ],
        competitor: [
          "All-Apple household with no Android users",
          "Power users who want calendar-focused app",
          "Love beautiful design over functionality",
          "Don't need task lists or meal planning",
          "Want deep macOS menu bar integration",
          "Individual productivity over family coordination"
        ]
      }}
      seo={{
        title: 'Honeydew vs Fantastical – Family-First AI vs Beautiful Calendar (Cross-Platform)',
        description:
          'Fantastical is gorgeous but Apple-only and calendar-focused. Honeydew is the cross-platform AI family organizer with lists, meal planning, and multi-family coordination. Compare features, pricing, and which fits your family.',
        keywords:
          'honeydew vs fantastical, fantastical family alternative, cross-platform family calendar, ai family organizer, fantastical android alternative, family calendar not apple only',
        image: '/blog-images/honeydew-ai-agent.jpg',
        heroCopy:
          'Fantastical is a beautifully designed calendar—for individuals on Apple. Honeydew is a family operating system that works everywhere, with AI that actually plans your life.',
      }}
      stickyCta={{
        headline: 'Your family deserves AI, not just beauty',
        subhead: 'Honeydew works on every device—not just the ones with an Apple logo',
        ctaLabel: 'Try family-first planning',
      }}
      taskModules={[
        {
          title: 'AI that plans, not just parses',
          description:
            'Fantastical understands "dinner with mom at 7pm." Honeydew understands "plan our spring break trip" and creates the itinerary, packing list, and syncs everyone\'s schedules automatically.',
          stat: '27+ AI tools vs event parsing',
        },
        {
          title: 'One app for calendar, lists, and meals',
          description:
            'Fantastical is calendar-only. Honeydew combines calendar, shopping lists, packing lists, meal planning, and task management—so your family coordination lives in one place.',
          example: 'No more jumping between 4 different apps',
        },
        {
          title: 'Works for your whole family—even Android',
          description:
            'If anyone in your family uses Android (grandparents, teens, co-parents), Fantastical locks them out. Honeydew works on every platform, keeping everyone in sync.',
        },
      ]}
      faq={[
        {
          question: 'Is Fantastical really Apple-only?',
          answer:
            'Yes. Fantastical only works on iPhone, iPad, Mac, and Apple Watch. If your spouse, co-parent, or kids use Android, they can\'t participate. Honeydew works on iOS, Android, and web.',
        },
        {
          question: 'Fantastical has natural language—isn\'t that AI?',
          answer:
            'Fantastical\'s natural language creates calendar events from text like "lunch Tuesday at noon." That\'s parsing, not planning. Honeydew\'s AI agent creates complete trip plans, generates shopping lists from recipes, and coordinates multi-family schedules automatically.',
        },
        {
          question: 'How does pricing compare for families?',
          answer:
            'Fantastical\'s family plan is $6.99/month ($84/year) for up to 5 members. Honeydew Premium is $99/year with a free tier. Both are reasonable, but Honeydew includes AI planning, lists, and multi-family support that Fantastical lacks entirely.',
        },
        {
          question: 'We love Fantastical\'s design—will we miss it?',
          answer:
            'Fantastical is genuinely beautiful—we respect that. Honeydew prioritizes family functionality over pure aesthetics, but our interface is clean and intuitive. Most families find they prefer having AI do the work over having a prettier calendar to manage manually.',
        },
        {
          question: 'Can Honeydew handle divorced parents or blended families?',
          answer:
            'Yes—this is where Honeydew truly shines. Create separate family groups with customized sharing. Fantastical only offers shared calendars, with no way to manage multi-household coordination, custody schedules, or selective visibility.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-calendar-hero.jpg',
        alt: 'Honeydew AI family organizer compared to Fantastical calendar app',
        caption:
          'Fantastical is a beautiful calendar for Apple power users. Honeydew is a family operating system that works everywhere—with AI that does the planning for you.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsFantasticalPage
