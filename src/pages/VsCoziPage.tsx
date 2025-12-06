import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsCoziPage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-cozi')

  return (
    <ComparisonPage
      competitor="Cozi"
      competitorPrice="Free–$30/yr"
      honeydewAdvantages={[
        "AI generates lists automatically in seconds",
        "Voice input - speak items hands-free",
        "Photograph handwritten lists",
        "Two-way Apple Calendar sync (not just Google)",
        "Multiple family groups for divorced parents",
        "Lists attach to calendar events automatically"
      ]}
      competitorAdvantages={[
        "Simple, familiar interface",
        "Lower cost - $30/year vs $99/year",
        "Proven tool used for years",
        "Free version works for basic needs"
      ]}
      features={[
        { feature: "Family Calendar", competitor: true, honeydew: true },
        { feature: "AI List Generation", competitor: false, honeydew: true },
        { feature: "Voice Input", competitor: false, honeydew: true },
        { feature: "Photo Recognition", competitor: false, honeydew: true },
        { feature: "Shopping Lists", competitor: "Manual", honeydew: "AI or Manual" },
        { feature: "Packing Lists", competitor: "Manual", honeydew: "AI Generated" },
        { feature: "Meal Planning", competitor: "Manual", honeydew: "AI + Auto Grocery" },
        { feature: "Google Calendar Sync", competitor: "One-way", honeydew: "Two-way" },
        { feature: "Apple Calendar Sync", competitor: false, honeydew: true },
        { feature: "Multiple Family Groups", competitor: false, honeydew: true },
        { feature: "Attach Lists to Events", competitor: false, honeydew: true },
        { feature: "Premium Cost", competitor: "$30/yr", honeydew: "$99/yr" }
      ]}
      bestFor={{
        honeydew: [
          "Save hours per month with AI planning",
          "Use voice often while driving or cooking",
          "Take photos of lists and school papers",
          "Use Apple Calendar and need two-way sync",
          "Manage multiple families (divorced parents)",
          "Want calendar + lists connected"
        ],
        competitor: [
          "Want simple and familiar tools",
          "Don't mind manual entry for everything",
          "Have a tight budget ($30/yr is cheaper)",
          "Only manage one household",
          "Prefer basic tools without AI"
        ]
      }}
      seo={{
        title: 'Honeydew vs Cozi – AI-First, Mobile Family OS (2025)',
        description:
          'Cozi is a manual calendar; Honeydew is the AI-first, no-hardware family OS. Compare AI-generated lists, two-way Google & Apple sync, voice capture, and multi-family workflows that remove manual entry.',
        keywords:
          'honeydew vs cozi, ai family command center, no hardware family planner, cozi alternative, voice-controlled family app, apple calendar two-way sync',
        image: '/blog-images/honeydew-vs-cozi.jpg',
        heroCopy:
          'Families tired of retyping the same chores into Cozi switch to Honeydew for AI-built lists, live Apple + Google calendar sync, and automations that keep everyone aligned.',
      }}
      stickyCta={{
        headline: 'Fast Cozi import',
        subhead: 'Sync your Cozi lists & calendar, keep family permissions intact',
        ctaLabel: 'Move off Cozi in minutes',
      }}
      taskModules={[
        {
          title: 'Packing lists that build themselves',
          description:
            'Say “Pack for our 4th grade overnight trip” and Honeydew drafts a complete list, assigns owners, and attaches it to the event in 3 seconds.',
          stat: 'Saves ~2 hr/week',
          example: 'Voice → List → Calendar',
        },
        {
          title: 'Meal plan to grocery hand-off',
          description:
            'Honeydew creates a balanced weekly meal plan, pushes ingredients into a shared grocery list, and notifies whoever is at the store right now.',
          stat: 'Cuts food waste 42%',
        },
        {
          title: 'Hands-free capture from the kitchen',
          description:
            'Use Whisper-quality voice capture or snap a photo of a handwritten note. Honeydew understands and updates the right task or list immediately.',
          example: 'Works when your hands are full',
        },
      ]}
      faq={[
        {
          question: 'Does Honeydew support two-way Apple and Google Calendar sync?',
          answer:
            'Yes. Honeydew keeps Google and Apple calendars in full two-way sync every 15 minutes. Cozi only offers one-way Google sync and no Apple integration, which means manual fixes.',
        },
        {
          question: 'How do Cozi lists migrate into Honeydew?',
          answer:
            'Connect your Cozi account and invite Honeydew’s import assistant. Lists, color labels, and family permissions are replicated automatically. You can start assigning AI automations right away.',
        },
        {
          question: 'Is Honeydew more expensive than Cozi?',
          answer:
            'Honeydew has a free tier and premium at $99/year per household. Most families recoup the difference in the first month with avoided mistakes, automated planning time, and built-in grocery coordination.',
        },
        {
          question: 'What AI tools do families actually use week-to-week?',
          answer:
            'The most used tools are vacation planning, automated meal plans, auto-generated chore rotations, and the “teach me our routine” memory graph—things Cozi still requires manual effort for.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-vs-cozi.jpg',
        alt: 'Screenshot of Honeydew generating a family packing list automatically compared to manual entry in Cozi',
        caption:
          'Honeydew auto-builds multi-step workflows—Cozi keeps tasks separate and manual. Families upgrading see the difference the first weekend.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsCoziPage


