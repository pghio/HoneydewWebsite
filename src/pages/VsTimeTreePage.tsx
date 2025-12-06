import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsTimeTreePage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-timetree')

  return (
    <ComparisonPage
      competitor="TimeTree"
      competitorPrice="Free–$5/mo"
      honeydewAdvantages={[
        'AI plans every event, not just the calendar view',
        'Lists, automations, and reminders connect to each date',
        'Voice input for hands-free capture on the go',
        'Photo recognition for school flyers and printed schedules',
        'Task assignment with accountable follow-ups',
        'Multi-family groups handled in one workspace',
      ]}
      competitorAdvantages={[
        'Polished shared calendar interface',
        'Strong mobile experience',
        'Free tier includes core calendar features',
        'Simple—focuses purely on shared events',
        'Great for light coordination with minimal data',
      ]}
      features={[
        { feature: 'Shared Calendar', competitor: true, honeydew: true },
        { feature: 'Calendar Sync', competitor: 'Two-way', honeydew: 'Two-way' },
        { feature: 'AI Workflows per Event', competitor: false, honeydew: true },
        { feature: 'Shopping Lists', competitor: false, honeydew: true },
        { feature: 'Packing Lists', competitor: false, honeydew: true },
        { feature: 'AI List Generation', competitor: false, honeydew: true },
        { feature: 'Voice Input', competitor: false, honeydew: true },
        { feature: 'Photo Recognition', competitor: false, honeydew: true },
        { feature: 'Meal Planning', competitor: false, honeydew: true },
        { feature: 'Task Assignment', competitor: false, honeydew: true },
        { feature: 'Chore Tracking', competitor: false, honeydew: true },
        { feature: 'Multiple Family Groups', competitor: 'Manual calendar duplication', honeydew: 'Switch without losing context' },
      ]}
      bestFor={{
        honeydew: [
          'Need AI to prep everything around the calendar event',
          'Want calendar, lists, and automations connected',
          'Prefer voice capture while multitasking',
          'Need paperwork or flyers digitized automatically',
          'Run blended or multi-household schedules',
          'Expect the app to suggest and adapt proactively',
        ],
        competitor: [
          'Only need a shared calendar with no automation',
          'Are comfortable keeping lists in separate apps',
          'Prefer a minimal interface with manual workflows',
          'Have low event volume and few dependencies',
          'Don’t need Apple Calendar sync or AI assistance',
        ],
      }}
      seo={{
        title: 'Honeydew vs TimeTree – AI Planning vs Shared Calendar (2025)',
        description:
          'TimeTree shares a calendar. Honeydew plans the work behind every event—packing lists, reminders, travel logistics, and real-time updates. Compare workflows before you choose.',
        keywords:
          'honeydew vs timetree, timetree alternative, timetree vs ai assistant, family calendar with tasks, shared calendar vs ai planner',
        image: '/blog-images/honeydew-trip-hero.jpg',
        heroCopy:
          'If you love TimeTree’s shared calendar but need help with everything before and after the event, Honeydew layers AI planning, lists, and automations onto the same timeline.',
      }}
      stickyCta={{
        headline: 'Upgrade your shared calendar',
        subhead: 'Keep familiar views and add automations that do the prep work',
        ctaLabel: 'See Honeydew’s planning engine',
      }}
      taskModules={[
        {
          title: 'Event → Task automation',
          description:
            'Honeydew converts each event into actionable checklists: games get packing lists, meetings collect agendas, and vacations build itineraries with one prompt.',
          stat: 'Cuts planning time 68%',
        },
        {
          title: 'Dynamic availability + conflict prevention',
          description:
            'Honeydew tracks commute time, custody schedules, and work boundaries to flag conflicts before they happen. TimeTree shows overlap only after it exists.',
          example: 'Smart conflict detection',
        },
        {
          title: 'Adaptive reminders that reschedule themselves',
          description:
            'If soccer runs late, Honeydew nudges bedtime tasks automatically. TimeTree reminders stay static—families scramble manually.',
        },
      ]}
      faq={[
        {
          question: 'Can we keep TimeTree’s shared calendar view?',
          answer:
            'Yes. Honeydew mirrors shared calendar layouts while adding AI-built lists, automations, and smart suggestions layered on top of each event.',
        },
        {
          question: 'Does Honeydew support collaborative notes like TimeTree?',
          answer:
            'Honeydew tracks decisions inside each workflow, assigns owners, and syncs updates without noisy group chats. Everyone sees what changed and why.',
        },
        {
          question: 'How does Honeydew handle recurring routines?',
          answer:
            'Teach Honeydew once—bedtime, alternating practice runs, custody. Automations recreate the right checklist each time and adjust if the schedule shifts.',
        },
        {
          question: 'Is Honeydew too much for simple family coordination?',
          answer:
            'If you only need a shared calendar, stick with TimeTree. Families juggling school, travel, shared custody, or elder care need Honeydew’s automation to keep pace without burnout.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-trip-hero.jpg',
        alt: 'Honeydew showing AI-generated travel plan alongside a family calendar',
        caption:
          'TimeTree shows the event. Honeydew builds everything around it—packing, reminders, and follow-ups—so families stay ahead of the schedule.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsTimeTreePage

