import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const Vs2housesPage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-2houses')

  return (
    <ComparisonPage
      competitor="2houses"
      competitorPrice="€5.99/mo (~$78/yr)"
      competitorHardware="Web and mobile apps"
      honeydewAdvantages={[
        "AI agent with 27+ tools automates planning",
        "Voice input (96.3% accuracy) - speak while multitasking",
        "Multi-purpose: co-parenting PLUS everyday family life",
        "Two-way calendar sync with Google & Apple",
        "Photo recognition for school forms and documents",
        "US-based support and development"
      ]}
      competitorAdvantages={[
        "Purpose-built for co-parenting communication",
        "Built-in expense tracking and reimbursements",
        "Custody journal for documentation",
        "Established platform with 250k+ families",
        "Lower monthly cost for co-parenting-only needs"
      ]}
      features={[
        { feature: "Co-Parent Calendar", competitor: true, honeydew: true },
        { feature: "Expense Tracking", competitor: true, honeydew: "Via lists" },
        { feature: "Custody Journal", competitor: true, honeydew: "Via notes" },
        { feature: "AI Planning Assistant", competitor: false, honeydew: true },
        { feature: "Voice Input", competitor: false, honeydew: "96.3% accuracy" },
        { feature: "Photo Recognition (OCR)", competitor: false, honeydew: true },
        { feature: "Shopping Lists", competitor: false, honeydew: true },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Packing Lists", competitor: false, honeydew: true },
        { feature: "Two-Way Calendar Sync", competitor: false, honeydew: true },
        { feature: "Extended Family Support", competitor: "Limited", honeydew: "Unlimited groups" },
        { feature: "US-Based Support", competitor: "European HQ", honeydew: true },
        { feature: "Annual Cost", competitor: "~$78", honeydew: "$0-$99" }
      ]}
      bestFor={{
        honeydew: [
          "AI to reduce coordination stress between households",
          "Voice input while managing kids and driving",
          "Need a complete family organizer beyond co-parenting",
          "Want two-way sync with existing calendars",
          "Managing extended family (grandparents, new partners)",
          "Prefer US-based support and time zones"
        ],
        competitor: [
          "Primary need is expense tracking between co-parents",
          "Want a dedicated custody documentation journal",
          "Need established platform with co-parenting focus",
          "Located in Europe with local support preference",
          "Only need co-parenting features, nothing else"
        ]
      }}
      seo={{
        title: 'Honeydew vs 2houses – AI-Powered Co-Parenting That Does More',
        description:
          '2houses handles co-parent basics. Honeydew adds AI automation, voice input, and complete family organization—so you spend less time coordinating and more time with your kids.',
        keywords:
          'honeydew vs 2houses, 2houses alternative, ai co-parenting app, divorced parents calendar app, co-parenting app comparison, best app for divorced parents, custody calendar app',
        image: '/blog-images/honeydew-ai-agent.jpg',
        heroCopy:
          'Co-parenting involves enough coordination already. Honeydew\'s AI handles the logistics—schedules, handoffs, packing lists—so both households stay organized without constant back-and-forth.',
      }}
      stickyCta={{
        headline: 'Less coordination, more time with kids',
        subhead: 'Let AI handle the logistics between households',
        ctaLabel: 'Try Honeydew free',
      }}
      taskModules={[
        {
          title: 'AI-powered handoff planning',
          description:
            'Say "Pack for dad\'s house this weekend" and Honeydew creates a complete packing list based on the weather, activities planned, and what\'s already at each home. No more forgotten items.',
          stat: '73% fewer forgotten items reported',
        },
        {
          title: 'Unified calendar across households',
          description:
            'Two-way sync means both parents see the same schedule—school events, activities, appointments—updated in real-time on whatever calendar app each prefers.',
          example: 'Works with Google, Apple, and Outlook calendars',
        },
        {
          title: 'Voice capture during busy moments',
          description:
            'Driving kids to practice? Just say "Add soccer cleats to the exchange bag" and it\'s done. 96.3% voice accuracy means less frustration and more hands-free organization.',
        },
      ]}
      faq={[
        {
          question: 'Does Honeydew have expense tracking like 2houses?',
          answer:
            'Honeydew handles shared expenses through smart lists that both households can access. While it\'s not a dedicated expense tracker, families use it for shared costs alongside all their other organizational needs.',
        },
        {
          question: 'Can Honeydew document custody schedules for legal purposes?',
          answer:
            'Yes. Honeydew maintains calendar history and activity logs. For families who need formal documentation, many pair Honeydew\'s organization features with their preferred documentation tool.',
        },
        {
          question: 'How does Honeydew handle communication between co-parents?',
          answer:
            'Honeydew focuses on reducing the need for coordination rather than adding another messaging channel. Shared lists and calendars update automatically, so both parents stay informed without constant back-and-forth.',
        },
        {
          question: 'Can step-parents and grandparents have access?',
          answer:
            'Absolutely. Honeydew\'s multi-family architecture lets you grant specific access to new partners, grandparents, nannies, or anyone else involved in your kids\' lives—with privacy controls for each group.',
        },
        {
          question: 'Is Honeydew sensitive to the complexities of co-parenting?',
          answer:
            'Yes. Honeydew was designed with multi-household families in mind. Separate family groups maintain appropriate boundaries while still enabling the coordination that makes co-parenting smoother for everyone—especially the kids.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-calendar-hero.jpg',
        alt: 'Honeydew AI helping coordinate between two households on multiple devices',
        caption:
          'Honeydew keeps both households organized with AI automation—reducing the coordination burden so co-parents can focus on what matters: their kids.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default Vs2housesPage
