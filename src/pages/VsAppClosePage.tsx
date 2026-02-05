import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsAppClosePage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-appclose')

  return (
    <ComparisonPage
      competitor="AppClose"
      competitorPrice="$8.99/mo per parent"
      competitorHardware='Requires both parents to have paid subscriptions'
      honeydewAdvantages={[
        "63% cheaper ($79/year vs ~$215/year for two parents)",
        "AI agent with 27+ tools vs no AI assistance",
        "Voice input at 96.3% accuracy - hands-free while parenting",
        "Multi-purpose family organizer (not limited to co-parenting)",
        "Two-way calendar sync with Google & Apple",
        "Collaborative design instead of adversarial legal focus"
      ]}
      competitorAdvantages={[
        "Court-recognized and court-ordered documentation",
        "Encrypted messaging accepted as legal evidence",
        "15 custody schedule templates built-in",
        "2.4M downloads - established in family court systems",
        "Expense tracking designed for child support documentation"
      ]}
      features={[
        { feature: "Shared Family Calendar", competitor: true, honeydew: true },
        { feature: "Court-Admissible Messaging", competitor: true, honeydew: false },
        { feature: "AI Planning Assistant", competitor: false, honeydew: "27+ tools" },
        { feature: "Voice Input", competitor: false, honeydew: "96.3% accuracy" },
        { feature: "Photo Recognition (OCR)", competitor: false, honeydew: true },
        { feature: "Custody Schedule Templates", competitor: "15 templates", honeydew: "Flexible" },
        { feature: "Expense Tracking", competitor: true, honeydew: true },
        { feature: "Works Beyond Co-Parenting", competitor: false, honeydew: true },
        { feature: "Shopping & Packing Lists", competitor: false, honeydew: true },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Calendar Sync", competitor: "One-way", honeydew: "Two-way" },
        { feature: "Extended Family Access", competitor: "Limited", honeydew: "Unlimited" },
        { feature: "Annual Cost (2 parents)", competitor: "~$215", honeydew: "$79" }
      ]}
      bestFor={{
        honeydew: [
          "Co-parents with a cooperative relationship",
          "Families who need more than just custody coordination",
          "Those who want AI help with planning and logistics",
          "Parents managing multiple family groups or stepfamilies",
          "Budget-conscious families (63% cost savings)",
          "Anyone who prefers collaboration over documentation"
        ],
        competitor: [
          "Court-ordered documentation requirements",
          "High-conflict custody situations needing legal records",
          "Parents who need encrypted, admissible messaging",
          "Situations where an attorney recommends evidence tracking",
          "Those specifically required to use AppClose by court order"
        ]
      }}
      seo={{
        title: 'Honeydew vs AppClose – Collaborative Family Organizer vs Court Documentation App',
        description:
          'AppClose is built for court-ordered co-parenting documentation. Honeydew is an AI-powered family organizer for cooperative co-parenting and beyond. Compare features, pricing ($79 vs $215/year), and find the right fit for your family situation.',
        keywords:
          'honeydew vs appclose, appclose alternative, co-parenting app comparison, divorced parents app, custody schedule app, family organization app divorce, collaborative co-parenting app',
        image: '/blog-images/honeydew-ai-agent.jpg',
        heroCopy:
          'AppClose documents. Honeydew organizes. If your co-parenting relationship allows for collaboration, Honeydew gives you AI-powered planning, voice control, and full family organization—at 63% less cost.',
      }}
      stickyCta={{
        headline: 'Organize your family, not your legal files',
        subhead: 'Honeydew helps co-parents collaborate—not just document',
        ctaLabel: 'Try Honeydew free',
      }}
      taskModules={[
        {
          title: 'AI-powered custody transitions',
          description:
            'Say "What does Emma need for dad\'s house this weekend?" and Honeydew generates a packing list based on the custody schedule, weather forecast, and upcoming activities—no manual tracking required.',
          stat: '15 minutes saved per transition',
        },
        {
          title: 'Collaborative scheduling without the legal overhead',
          description:
            'Honeydew\'s shared calendar syncs with both parents\' Google or Apple calendars. Request schedule changes, add activities, and coordinate pickups without the formal documentation trail of court apps.',
          example: 'Works for cooperative co-parenting relationships',
        },
        {
          title: 'Beyond custody: a complete family organizer',
          description:
            'Unlike AppClose, Honeydew handles everything families need: meal planning, grocery lists, school schedules, extracurricular activities, and coordination with grandparents, stepparents, or nannies.',
        },
      ]}
      faq={[
        {
          question: 'Should I use AppClose or Honeydew for co-parenting?',
          answer:
            'It depends on your situation. If you need court-admissible documentation or have been ordered by a court to use a specific app, AppClose is designed for that purpose. If you have a cooperative co-parenting relationship and want an AI-powered family organizer that goes beyond custody coordination, Honeydew is the better fit—at 63% less cost.',
        },
        {
          question: 'Can Honeydew replace AppClose for custody scheduling?',
          answer:
            'For day-to-day scheduling and coordination, yes. Honeydew offers shared calendars, two-way sync, and multi-family support. However, Honeydew is not designed as legal documentation software—if you need encrypted, court-admissible messaging records, AppClose remains the appropriate choice.',
        },
        {
          question: 'How much do I save switching from AppClose to Honeydew?',
          answer:
            'AppClose costs $8.99/month per parent, totaling approximately $215/year for two parents. Honeydew Premium is $79/year for the entire family, saving you 63%. Plus, Honeydew has a generous free tier if you\'re just getting started.',
        },
        {
          question: 'Does Honeydew work for blended families and stepparents?',
          answer:
            'Yes—this is where Honeydew excels. Unlike AppClose which focuses on two-parent co-parenting, Honeydew supports unlimited family members across multiple households: stepparents, grandparents, nannies, and extended family can all be included in relevant calendars and lists.',
        },
        {
          question: 'What if we start with Honeydew but need court documentation later?',
          answer:
            'You can use both apps for different purposes. Many families use AppClose specifically for documented communication when needed, while using Honeydew for actual day-to-day family organization, meal planning, and logistics. The apps serve different needs.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-calendar-hero.jpg',
        alt: 'Honeydew AI family organizer showing collaborative calendar and task management',
        caption:
          'Honeydew is designed for families who want to work together—with AI help for the planning, not just documentation of who said what.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsAppClosePage
