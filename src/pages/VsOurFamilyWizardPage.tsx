import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsOurFamilyWizardPage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-ourfamilywizard')

  return (
    <ComparisonPage
      competitor="OurFamilyWizard"
      competitorPrice="$149.99/yr per parent"
      competitorHardware="$300/year total for both parents"
      honeydewAdvantages={[
        "74% cheaper – $79/yr vs $300/yr for two parents",
        "AI planning with 27+ tools vs no AI",
        "Voice input at 96.3% accuracy – hands-free organizing",
        "Multi-purpose: calendars, lists, meals, travel – not just co-parenting",
        "Collaborative design – built for partnership, not documentation",
        "Photo recognition for school flyers and schedules",
        "Works for all family types – co-parents, grandparents, caregivers"
      ]}
      competitorAdvantages={[
        "Court-recognized documentation and messaging records",
        "Built-in expense tracking with reimbursement requests",
        "Legal-grade message archive for high-conflict situations",
        "Established platform with attorney and mediator integrations",
        "ToneMeter helps reduce hostile communication"
      ]}
      features={[
        { feature: "Shared Family Calendar", competitor: true, honeydew: true },
        { feature: "AI Planning Assistant", competitor: false, honeydew: "27+ tools" },
        { feature: "Voice Input", competitor: false, honeydew: "96.3% accuracy" },
        { feature: "Court-Recognized Records", competitor: true, honeydew: false },
        { feature: "Expense Tracking", competitor: true, honeydew: "Via lists" },
        { feature: "Shopping Lists", competitor: false, honeydew: true },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Packing Lists", competitor: false, honeydew: true },
        { feature: "Photo Recognition (OCR)", competitor: false, honeydew: true },
        { feature: "Multiple Family Groups", competitor: "Co-parents only", honeydew: "Unlimited" },
        { feature: "Two-Way Calendar Sync", competitor: "One-way", honeydew: "Google & Apple" },
        { feature: "Works for Non-Divorce Families", competitor: false, honeydew: true },
        { feature: "Annual Cost (2 parents)", competitor: "$300", honeydew: "$79-$99" }
      ]}
      bestFor={{
        honeydew: [
          "Co-parents who communicate well and want to stay organized",
          "Families who need more than just custody coordination",
          "Budget-conscious parents ($220/year savings)",
          "Voice input while driving kids between homes",
          "Managing school, activities, and custody in one place",
          "Extended family involvement (grandparents, step-parents)",
          "Families who want AI to reduce planning burden"
        ],
        competitor: [
          "High-conflict custody situations requiring legal documentation",
          "Court-ordered communication tools",
          "Detailed expense tracking for child support",
          "Need attorney or mediator access to records",
          "Situations where message accountability is essential"
        ]
      }}
      seo={{
        title: 'Honeydew vs OurFamilyWizard – Co-Parenting App Comparison 2025',
        description:
          'Compare Honeydew and OurFamilyWizard for co-parenting. OFW offers court documentation at $300/year. Honeydew provides AI planning, voice input, and full family organization for 74% less. See which fits your situation.',
        keywords:
          'honeydew vs ourfamilywizard, ourfamilywizard alternative, co-parenting app comparison, divorced parents calendar app, custody calendar app, ofw alternative cheaper',
        image: '/blog-images/honeydew-ai-agent.jpg',
        heroCopy:
          'OurFamilyWizard documents conflict. Honeydew helps you coordinate. If your co-parenting relationship allows collaboration, save $220/year and get AI planning, voice input, and tools for your whole family life.',
      }}
      stickyCta={{
        headline: 'Coordinate, don\'t just document',
        subhead: 'AI-powered family organization for co-parents who want to work together',
        ctaLabel: 'Try Honeydew free',
      }}
      taskModules={[
        {
          title: 'Custody handoffs without the friction',
          description:
            'Honeydew\'s shared calendar shows custody schedules, school events, and activities in one view. Voice input lets you add items while driving between homes—no typing required.',
          stat: '96.3% voice accuracy',
        },
        {
          title: 'More than custody coordination',
          description:
            'OFW handles co-parenting communication. Honeydew handles everything: meal planning, packing lists for each home, school forms, grocery runs, and travel planning. One app for your whole family life.',
          example: '"Pack for Dad\'s house" generates a custom list',
        },
        {
          title: 'AI reduces the mental load',
          description:
            'Tell Honeydew "Plan the kids\' birthday party at Mom\'s" and get a complete checklist, timeline, and shopping list. OFW documents what happened—Honeydew helps you plan what\'s next.',
          stat: '27+ AI planning tools',
        },
      ]}
      faq={[
        {
          question: 'Is Honeydew suitable for high-conflict custody situations?',
          answer:
            'Honeydew is designed for collaborative family coordination, not legal documentation. If you need court-recognized message records, attorney access, or are in a high-conflict situation, OurFamilyWizard may be more appropriate. Honeydew works best when co-parents can communicate constructively.',
        },
        {
          question: 'How does Honeydew handle custody schedules?',
          answer:
            'Honeydew supports shared calendars with two-way Google and Apple sync. You can create custody schedule events, share with specific family members, and manage multiple households. However, it doesn\'t have built-in custody schedule templates like OFW.',
        },
        {
          question: 'Can both parents use Honeydew without paying twice?',
          answer:
            'Yes. Honeydew\'s family plan covers multiple users at one price ($79-$99/year total). OurFamilyWizard charges each parent separately ($149.99/year each = $300/year total), making Honeydew 74% more affordable for families.',
        },
        {
          question: 'Does Honeydew track shared expenses?',
          answer:
            'Honeydew can track expenses through shared lists but doesn\'t have OFW\'s formal expense tracking with reimbursement requests and payment history. If detailed expense documentation is essential, OFW offers more robust tools for this specific need.',
        },
        {
          question: 'What if our situation changes and we need documentation later?',
          answer:
            'You can use both apps if your situation changes. Some families use OFW for legal documentation while using Honeydew for day-to-day family organization. There\'s no lock-in, and you can export Honeydew data anytime.',
        },
        {
          question: 'How does Honeydew help with the logistics of two-home families?',
          answer:
            'Honeydew excels at the practical side: packing lists for each home, tracking what\'s at which house, coordinating school pickups, managing activities across both parents\' calendars, and meal planning for custody weeks. Voice input makes adding items hands-free while you\'re on the go.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-calendar-hero.jpg',
        alt: 'Honeydew family calendar and AI planning features for co-parents',
        caption:
          'Honeydew helps co-parents coordinate the logistics of two-home life—calendars, packing lists, school events, and meal planning—with AI that reduces the mental load for everyone.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsOurFamilyWizardPage
