import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsMangoPage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-mango')

  return (
    <ComparisonPage
      competitor="Mango Display"
      competitorPrice="$399 hardware + subscription"
      competitorHardware="Requires custom dashboard display hardware"
      honeydewAdvantages={[
        'Software-first hub—no $400+ hardware to mount',
        'Setup in minutes; use phones, tablets, or TVs you already own',
        'AI planning builds lists, routines, and reminders instantly',
        'Voice + photo capture works wherever you are',
        'Automations keep multi-home families aligned without extra effort',
        'Updates ship weekly without swapping devices',
      ]}
      competitorAdvantages={[
        'Highly customizable layouts and design flexibility',
        'Beautiful wall displays with multiple orientations',
        'Control over dashboard widgets and styling',
        'Focal point for the kitchen or family room',
      ]}
      features={[
        { feature: 'Family Calendar', competitor: true, honeydew: true },
        { feature: 'Upfront Cost', competitor: '$399–$599 hardware', honeydew: '$0 (uses existing devices)' },
        { feature: 'Setup Time', competitor: '2–4 hours mounting & configuring', honeydew: 'Under 5 minutes' },
        { feature: 'Customization', competitor: 'Fully custom dashboard builder', honeydew: 'Curated layouts with automations' },
        { feature: 'AI Planning', competitor: false, honeydew: true },
        { feature: 'Voice Input', competitor: false, honeydew: true },
        { feature: 'Photo Recognition / OCR', competitor: false, honeydew: true },
        { feature: 'Meal Planning + Grocery Automation', competitor: false, honeydew: true },
        { feature: 'Multi-Family Support', competitor: 'Single household focus', honeydew: 'Unlimited households with permissions' },
        { feature: 'Works Away From Home', competitor: 'Display stays on wall', honeydew: 'Cloud-first—available everywhere' },
        { feature: 'Ongoing Updates', competitor: 'Hardware dependent', honeydew: 'Continuous software releases' },
      ]}
      bestFor={{
        honeydew: [
          'Want automation over manual dashboard curation',
          'Prefer using devices you already own (tablets, TVs, phones)',
          'Need AI to prep lists, routines, and reminders automatically',
          'Care about multi-home workflows and travel readiness',
          'Want software that keeps improving without hardware swaps',
        ],
        competitor: [
          'Enjoy designing custom dashboards and widgets',
          'Have budget and time for mounting specialty hardware',
          'Want a static wall centerpiece more than mobile access',
          'Prefer manual control over visual layouts vs AI automation',
        ],
      }}
      seo={{
        title: 'Honeydew Family App vs Mango Display – AI Software vs Custom Hardware',
        description:
          'Mango Display offers customizable dashboards on premium hardware. Honeydew delivers AI automations on every screen you already own. Compare cost, setup, and real coordination power.',
        keywords:
          'honeydew vs mango display, mango display alternative, family dashboard software, digital command center app, ai family organizer',
        image: '/blog-images/honeydew-calendar-hero.jpg',
        heroCopy:
          'If you love Mango’s design flexibility but need automation, Honeydew brings AI planning to any screen—no $400 wall display or installation marathon required.',
      }}
      stickyCta={{
        headline: 'Command center without hardware',
        subhead: 'Use Honeydew on tablets, TVs, and phones you already have—AI handles the rest',
        ctaLabel: 'Launch Honeydew command center',
      }}
      taskModules={[
        {
          title: 'Tablet-as-command-center',
          description:
            'Mount an inexpensive tablet with Honeydew’s live board. Automations keep it current—packing lists, chore status, and alerts update themselves.',
          stat: 'Hardware cost: $0–$150',
        },
        {
          title: 'Weekend reset automations',
          description:
            'Honeydew rebuilds weekly planners, assigns chores, and preps grocery lists automatically. No need to design a new dashboard every Sunday night.',
        },
        {
          title: 'Photo-to-workflow intelligence',
          description:
            'Snap a school flyer or camp checklist. Honeydew parses it, creates tasks, and syncs key dates—Mango still needs manual entry.',
        },
      ]}
      faq={[
        {
          question: 'Can I still create a wall display with Honeydew?',
          answer:
            'Yes. Pin Honeydew’s live dashboard to any tablet or smart TV. You get the focal point without expensive proprietary hardware, and automations keep it updated.',
        },
        {
          question: 'Is Mango Display cheaper over time?',
          answer:
            'Not usually. Mango requires hardware plus subscription. Honeydew offers a free tier and $99/year premium, with no hardware to maintain or replace.',
        },
        {
          question: 'Do I lose customization with Honeydew?',
          answer:
            'Honeydew prioritizes automation over infinite customization. Layouts are curated for clarity, while automations keep content up-to-date without manual editing.',
        },
        {
          question: 'How does Honeydew handle multi-home or travel scenarios?',
          answer:
            'Honeydew is optimized for multi-household sharing, mobile access, and offline capture. Mango’s dashboards stay on the wall, making coordination hard once you leave the house.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-calendar-hero.jpg',
        alt: 'Honeydew command center running on multiple household devices',
        caption:
          'Honeydew transforms any existing device into a living command center with AI automations that Mango’s hardware-first approach simply can’t deliver.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsMangoPage

