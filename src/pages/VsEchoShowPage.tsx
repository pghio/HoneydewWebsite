import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsEchoShowPage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-echoshow')

  return (
    <ComparisonPage
      competitor="Echo Show Calendar"
      competitorPrice="$89–$269 device only"
      competitorHardware="Requires Echo Show device (multi-purpose smart display)"
      honeydewAdvantages={[
        'Purpose-built AI for family coordination—not a general gadget',
        'Automations create lists, routines, and reminders instantly',
        'Voice + camera capture works on phones, tablets, laptops',
        'Two-way calendar sync and intelligent notifications',
        'Supports multi-home families with granular permissions',
        'Use anywhere—carpool line, office, or while traveling',
      ]}
      competitorAdvantages={[
        'Multi-purpose device (music, video, recipes, smart home)',
        'Alexa voice control for home automation',
        'Many households already own an Echo Show',
        'No subscription required for basic calendar display',
      ]}
      features={[
        { feature: 'Display Calendar', competitor: 'Basic agenda view', honeydew: 'Full AI-enhanced interface' },
        { feature: 'AI Planning', competitor: false, honeydew: true },
        { feature: 'Voice Input', competitor: 'Alexa only at the device', honeydew: 'Everywhere you are' },
        { feature: 'Photo Recognition', competitor: false, honeydew: true },
        { feature: 'Shopping & Packing Lists', competitor: 'Simple Alexa lists', honeydew: 'AI generated & event-attached' },
        { feature: 'Meal Planning', competitor: 'Recipe suggestions only', honeydew: 'End-to-end plan + groceries' },
        { feature: 'Task Assignment', competitor: false, honeydew: true },
        { feature: 'Multiple Family Groups', competitor: 'One household only', honeydew: 'Unlimited with granular access' },
        { feature: 'Works Away from Home', competitor: 'Stays on counter', honeydew: 'Cloud-first, any device' },
        { feature: 'Smart Home Control', competitor: true, honeydew: 'Integrates with existing automations' },
        { feature: 'Cost Over 3 Years', competitor: '$89–$269 (hardware only)', honeydew: '$0–$297 with full AI suite' },
      ]}
      bestFor={{
        honeydew: [
          'Families needing real coordination intelligence, not just a display',
          'Parents who capture tasks while mobile or in the car',
          'Households that juggle multiple calendars, lists, and routines',
          'Co-parents or extended families that share responsibilities',
          'People who already use Alexa but need deeper planning support',
        ],
        competitor: [
          'Want a kitchen smart display for media and smart home control',
          'Only need a basic now/next view of the calendar',
          'Prefer a one-time hardware purchase with no subscription',
          'Stay mostly in one room and don’t need mobile automation',
        ],
      }}
      seo={{
        title: 'Honeydew vs Echo Show Calendar – AI Planner vs Smart Display',
        description:
          'Echo Show is a smart display with a basic calendar. Honeydew is an AI planner that automates lists, routines, and multi-home coordination across every device.',
        keywords:
          'honeydew vs echo show, echo show calendar alternative, alexa family organizer, smart display vs ai planner, family coordination app',
        image: '/blog-images/honeydew-voice-hero.jpg',
        heroCopy:
          'Alexa can display your day. Honeydew plans it—automations, lists, travel logistics, and custody workflows that live on every screen you touch.',
      }}
      stickyCta={{
        headline: 'Already own an Echo Show?',
        subhead: 'Keep the device for Alexa—but let Honeydew handle coordination on every screen you use',
        ctaLabel: 'Layer Honeydew on top of Alexa',
      }}
      taskModules={[
        {
          title: 'Alexa + Honeydew hybrid',
          description:
            'Keep Alexa for quick commands. Honeydew listens too, turning “We’re out of snacks” into list updates, owner assignments, and reminders.',
          example: 'Two-way automation',
        },
        {
          title: 'Travel-ready planning',
          description:
            'Use Honeydew’s AI on phones during travel. It continues automating lists, itineraries, and reminders even when you’re far from the Echo Show.',
          stat: 'Works wherever you are',
        },
        {
          title: 'Household workflows beyond the kitchen',
          description:
            'Chores, sports logistics, meal plans, and school paperwork stay synced across all caregivers—Echo Show can’t follow you to drop-off or the office.',
        },
      ]}
      faq={[
        {
          question: 'Can Honeydew integrate with Alexa?',
          answer:
            'Yes. Use Alexa voice commands to trigger Honeydew workflows. Honeydew handles the business logic—assigning owners, updating lists, and syncing calendars automatically.',
        },
        {
          question: 'Do we need to stop using Echo Show?',
          answer:
            'Keep it for entertainment and smart home controls. Honeydew complements Echo Show by adding serious coordination intelligence that Alexa’s basic calendar doesn’t provide.',
        },
        {
          question: 'Is Honeydew more expensive?',
          answer:
            'Honeydew offers a free tier and $99/year premium plan. Families typically recover the cost through saved time, avoided mistakes, and replacing multiple single-purpose apps.',
        },
        {
          question: 'Does Honeydew work offline or outside the house?',
          answer:
            'Yes. Honeydew is software-first, so automations keep running wherever you are. Echo Show’s calendar is tied to the device sitting on your counter.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-voice-hero.jpg',
        alt: 'Honeydew AI voice workflow creating a family plan while Echo Show displays a basic calendar',
        caption:
          'Echo Show displays a static agenda. Honeydew acts on every command—drafting lists, syncing calendars, and coordinating families automatically.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsEchoShowPage

