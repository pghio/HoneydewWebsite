import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsGoogleCalendarPage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-google')

  return (
    <ComparisonPage
      competitor="Google Calendar"
      competitorPrice="Free"
      honeydewAdvantages={[
        'AI planning builds lists and routines around events automatically',
        'Single workspace for calendar, tasks, meal plans, and automations',
        'Native voice + photo capture without juggling extra Google apps',
        'Two-way sync with Google AND Apple Calendar out of the box',
        'Automations assign owners, follow-up, and keep everyone accountable',
        'Purpose-built for families instead of adapting workplace tools',
      ]}
      competitorAdvantages={[
        'Completely free and already part of your Google account',
        'Familiar interface across web and mobile',
        'Excellent reliability and lightning-fast sync',
        'Deep integration with Gmail, Meet, Drive, and Tasks',
        'Great for individuals or light coordination',
      ]}
      features={[
        { feature: 'Family Calendar', competitor: true, honeydew: true },
        { feature: 'Cost', competitor: 'Free', honeydew: 'Free or $99/yr' },
        { feature: 'AI Planning & Automations', competitor: false, honeydew: true },
        { feature: 'Voice Input', competitor: '"Hey Google" limited to Google Assistant', honeydew: 'Built-in everywhere' },
        { feature: 'Photo Recognition', competitor: 'Requires Google Lens + manual entry', honeydew: 'Integrated, auto-parses' },
        { feature: 'Shopping / Packing Lists', competitor: 'Google Keep (separate)', honeydew: 'Attached directly to events' },
        { feature: 'Task Assignment', competitor: 'Manual via Google Tasks', honeydew: 'Automated with notifications' },
        { feature: 'Meal Planning', competitor: false, honeydew: true },
        { feature: 'Multi-Family Support', competitor: 'Basic calendar sharing', honeydew: 'Granular permissions per household' },
        { feature: 'Travel & Logistics Automation', competitor: false, honeydew: true },
        { feature: 'Context-Aware Reminders', competitor: 'Time-based only', honeydew: 'Based on travel, routines, and status' },
      ]}
      bestFor={{
        honeydew: [
          'Families who need more than a blank calendar grid',
          'People who want AI to prep lists, reminders, and logistics automatically',
          'Co-parents and multi-home families needing selective sharing',
          'Parents juggling extracurriculars, meal prep, and travel',
          'Users tired of hopping between Google Calendar, Keep, Tasks, and Sheets',
        ],
        competitor: [
          'Families with simple schedules and low coordination complexity',
          'People who prefer free tools and manual workflows',
          'Households comfortable piecing together multiple Google apps',
          'Users already deep in Google Workspace with light family needs',
        ],
      }}
      seo={{
        title: 'Honeydew Family App vs Google Calendar – When to Add AI Planning (2025)',
        description:
          'Google Calendar is great for scheduling. Honeydew adds AI-generated lists, routines, and family automations that Google still leaves manual. See when to layer Honeydew on top.',
        keywords:
          'honeydew vs google calendar, google calendar alternative for families, ai planner vs google calendar, family organizer with google sync',
        image: '/blog-images/honeydew-ai-agent.jpg',
        heroCopy:
          'Google Calendar shows what’s happening. Honeydew handles the “what now?”—AI planning, multi-home coordination, and lists that keep everyone ready.',
      }}
      stickyCta={{
        headline: 'Keep Google, add AI',
        subhead: 'Honeydew layers on top of your existing Google account with two-way sync',
        ctaLabel: 'Connect Honeydew to Google Calendar',
      }}
      taskModules={[
        {
          title: 'From email to executed plan',
          description:
            'Forward the school newsletter to Honeydew. It extracts events, deadlines, and tasks, assigns owners, and syncs to the calendar automatically.',
          stat: 'Zero manual copy/paste',
        },
        {
          title: 'Smart routines & automations',
          description:
            'Teach Honeydew recurring routines once. It rebuilds them weekly, adjusts for conflicts, and pings the right person at the right time.',
          example: 'Bedtime, practice, or carpool ready-made',
        },
        {
          title: 'AI meal planning + grocery hand-off',
          description:
            'Honeydew creates meal plans from preferences, fills a grocery list, and notifies whoever is near the store—no juggling Google Keep or Sheets.',
        },
      ]}
      faq={[
        {
          question: 'Does Honeydew replace Google Calendar?',
          answer:
            'No. Honeydew connects to your Google account, keeps two-way sync running every 15 minutes, and adds AI planning on top. You can still view events in Google Calendar anytime.',
        },
        {
          question: 'Why pay when Google Calendar is free?',
          answer:
            'Google shows events. Honeydew handles the work around them—packing lists, reminders, routines, and automations. Families save hours weekly and avoid costly mistakes.',
        },
        {
          question: 'Will Honeydew work if only one partner is Google-first?',
          answer:
            'Yes. Honeydew syncs with Google and Apple simultaneously, so each partner uses the apps they like while Honeydew keeps everything coordinated.',
        },
        {
          question: 'How hard is it to migrate from Google?',
          answer:
            'Connect your Google account, and Honeydew imports existing calendars instantly. You can keep using Google Calendar alongside Honeydew without missing a beat.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-ai-agent.jpg',
        alt: 'Honeydew AI assistant generating tasks alongside Google Calendar events',
        caption:
          'Google Calendar keeps the schedule. Honeydew’s AI fills in the work—lists, reminders, and assignments families usually manage manually.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsGoogleCalendarPage

