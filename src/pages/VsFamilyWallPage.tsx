import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsFamilyWallPage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-familywall')

  return (
    <ComparisonPage
      competitor="FamilyWall"
      competitorPrice="Free–$60/yr"
      honeydewAdvantages={[
        'AI-generated routines and lists in seconds',
        'Hands-free capture with voice and camera',
        'Full Apple + Google Calendar two-way sync',
        'Automated workflows for custody schedules',
        'Real-time automations instead of manual checklists',
        'Advanced permissions for multi-household teams',
      ]}
      competitorAdvantages={[
        'Built-in family chat and messaging thread',
        'Integrated location sharing for pickups',
        'Emergency contacts panel',
        'Lower subscription price—$60/yr',
      ]}
      features={[
        { feature: 'Family Calendar', competitor: true, honeydew: true },
        { feature: 'AI List Generation', competitor: false, honeydew: true },
        { feature: 'Voice Input', competitor: false, honeydew: true },
        { feature: 'Photo Recognition/OCR', competitor: false, honeydew: true },
        { feature: 'Chore Tracking', competitor: true, honeydew: true },
        { feature: 'Family Messaging', competitor: true, honeydew: 'Action-oriented comments' },
        { feature: 'Location Sharing', competitor: true, honeydew: 'Integrates via existing tools' },
        { feature: 'Google Calendar Sync', competitor: 'One-way', honeydew: 'Two-way' },
        { feature: 'Apple Calendar Sync', competitor: 'Limited', honeydew: 'Two-way' },
        { feature: 'Multiple Family Groups', competitor: false, honeydew: true },
        { feature: 'Attach Lists to Events', competitor: false, honeydew: true },
        { feature: 'Automation Library', competitor: false, honeydew: true },
      ]}
      bestFor={{
        honeydew: [
          'Need AI to handle the workload around events and chores',
          'Prefer voice capture while driving or cooking',
          'Want custody schedules and multi-home logistics automated',
          'Use Apple Calendar and expect two-way sync',
          'Need lists tied to events for accountability',
          'Value proactive suggestions over manual coordination',
        ],
        competitor: [
          'Want an all-in-one messaging hub built into the app',
          'Need simple location sharing without third-party tools',
          'Prefer a lower cost even if features stay manual',
          'Don’t need AI assistance or advanced automations',
          'Have a single-household setup with minimal complexity',
        ],
      }}
      seo={{
        title: 'Honeydew vs FamilyWall – Automation for Blended Families (2025)',
        description:
          'FamilyWall offers chat and location sharing. Honeydew adds AI planning, two-way Apple sync, and multi-household automations that keep divorced or blended families on track.',
        keywords:
          'honeydew vs familywall, familywall alternative, custody schedule app, blended family organizer, ai family planner vs familywall',
        image: '/blog-images/multi-family-coordination.jpg',
        heroCopy:
          'FamilyWall is great for messaging. Honeydew is the upgrade when you need real automation—co-parenting workflows, two-way calendar sync, and AI-built lists that prevent “who grabbed it?” texts.',
      }}
      stickyCta={{
        headline: 'Co-parenting upgrade',
        subhead: 'Automate pickups, packing lists, and custody exchanges without the back-and-forth texting',
        ctaLabel: 'See Honeydew’s co-parenting hub',
      }}
      taskModules={[
        {
          title: 'Custody change checklist',
          description:
            'Honeydew auto-preps a “switch households” list, reminds the right parent, and tracks hand-off confirmations—no more forgotten cleats or inhalers.',
          stat: 'Zero missed hand-off items',
        },
        {
          title: 'Shared grocery intelligence',
          description:
            'AI keeps pantry, Costco, and specialty lists in sync across households, and sends the latest list to whoever is currently near the store.',
          example: 'Real-time context awareness',
        },
        {
          title: 'Voice-in — everything organized',
          description:
            'Speak “Add dentist follow-up in Dad’s week” and Honeydew logs the appointment, reminders, and necessary paperwork across both households.',
        },
      ]}
      faq={[
        {
          question: 'How does Honeydew handle messaging compared to FamilyWall?',
          answer:
            'Instead of freeform chats, Honeydew keeps context inside each workflow. Comments, assignments, and updates live with the task so nothing gets lost in a long thread.',
        },
        {
          question: 'Can Honeydew mirror FamilyWall’s location sharing?',
          answer:
            'Most families connect their existing life360/FindMy setups. Honeydew focuses on coordination intelligence—who needs to leave when, what to bring, and automatic notifications.',
        },
        {
          question: 'Does Honeydew cost more than FamilyWall?',
          answer:
            'Yes—Honeydew premium is $99/year, but families save hours each week in automation and avoid duplicate spend on other planning tools. There’s also a free tier to get started.',
        },
        {
          question: 'Is Honeydew ready for blended and multi-home families?',
          answer:
            'That’s our specialty. You can create private spaces per household, automate hand-offs, and selectively share info so everyone stays aligned without oversharing.',
        },
      ]}
      proof={{
        src: '/blog-images/multi-family-coordination.jpg',
        alt: 'Honeydew automating a custody exchange checklist across two households',
        caption:
          'Honeydew automates multi-household routines with AI-built checklists, reminders, and selective sharing—FamilyWall still requires manual coordination.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsFamilyWallPage

