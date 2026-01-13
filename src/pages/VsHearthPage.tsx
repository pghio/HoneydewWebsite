import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsHearthPage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-hearth')

  return (
    <ComparisonPage
      competitor="Hearth Display"
      competitorPrice="$499 hardware + $39/mo"
      competitorHardware='Requires premium 27" wall-mounted display'
      honeydewAdvantages={[
        'Software-first hub—no $500+ hardware to mount',
        'AI planning handles lists, reminders, and routines automatically',
        'Voice capture + OCR to log updates in seconds',
        'Works across every device you already own',
        'Designed for blended families and multiple households',
        'Setup takes minutes, not an afternoon with a drill',
      ]}
      competitorAdvantages={[
        'Gorgeous 27" touchscreen as a design centerpiece',
        'Integrated smart home dashboard for Nest, Ring, etc.',
        'High-end hardware feel that impresses in the kitchen',
        'Large visual presence to grab attention at a glance',
      ]}
      features={[
        { feature: 'Family Calendar', competitor: true, honeydew: true },
        { feature: 'Hardware Requirement', competitor: '27" wall mount', honeydew: 'Any device, optional tablet mount' },
        { feature: 'Total Cost of Ownership (3 years)', competitor: '$1,900+', honeydew: '$0–$297' },
        { feature: 'AI Planning & Automations', competitor: false, honeydew: true },
        { feature: 'Voice Capture', competitor: false, honeydew: true },
        { feature: 'Photo Recognition', competitor: false, honeydew: true },
        { feature: 'Shopping & Packing Lists', competitor: 'Manual or basic', honeydew: 'AI generated & synced to events' },
        { feature: 'Meal Planning', competitor: false, honeydew: true },
        { feature: 'Smart Home Hub', competitor: true, honeydew: 'Integrates with existing devices (optional)' },
        { feature: 'Travel & Mobile Use', competitor: 'Static on wall', honeydew: 'Works everywhere you go' },
        { feature: 'Multi-Family Support', competitor: false, honeydew: true },
      ]}
      bestFor={{
        honeydew: [
          'Prefer software flexibility over expensive hardware',
          'Want AI to manage the work around each schedule item',
          'Need tools for multi-household or co-parenting workflows',
          'Capture tasks by voice or with quick photos',
          'Want the command center to travel with you',
          'Care about rapid setup and ongoing automation',
        ],
        competitor: [
          'Value a premium wall-mounted touchscreen aesthetic',
          'Need a smart home dashboard more than automation',
          'Have the budget for high-end hardware plus subscription',
          'Prefer a large focal point for the family in one room',
          'Don’t mind entering tasks manually',
        ],
      }}
      seo={{
        title: 'Honeydew Family App vs Hearth Display – Software AI vs Wall Hardware (2025)',
        description:
          'Hearth is a $500 wall display. Honeydew is software that automates planning across every device. Compare costs, setup, and real family workflows before choosing a command center.',
        keywords:
          'honeydew vs hearth display, hearth display alternative, hearth display alternatives, hearth display competitors, family command center app, smart family dashboard, ai family organizer vs hardware',
        image: '/blog-images/honeydew-app-screenshot.jpg',
        heroCopy:
          'Hearth sells premium hardware. Honeydew removes the hardware requirement—use any screen while AI handles the coordination work Hearth still leaves manual.',
      }}
      stickyCta={{
        headline: 'Skip the installation day',
        subhead: 'Spin up Honeydew’s AI hub on any device in under 5 minutes',
        ctaLabel: 'See Honeydew in my home',
      }}
      taskModules={[
        {
          title: 'AI-generated command center',
          description:
            'Honeydew compiles calendar, routines, automations, and alerts into a live board you can pin to tablets, TVs, or laptops—no mounting kit required.',
          stat: 'Live across every device',
        },
        {
          title: 'Maintenance and chore orchestration',
          description:
            'Teach Honeydew seasonal maintenance once. Automations remind the right person, attach checklists, and log completion for accountability.',
          stat: '92% on-time completion',
        },
        {
          title: 'Co-parenting & multi-home visibility',
          description:
            'Share only what matters with each household, keep custody schedules accurate, and automate hand-offs with smart reminders and packing prompts.',
          example: 'Built for complex families',
        },
      ]}
      faq={[
        {
          question: 'What are the best Hearth Display alternatives in 2026?',
          answer:
            'If you’re evaluating Hearth Display alternatives, the top path is usually “tablet + family app.” You get the same kitchen focal point (mount a tablet) plus automation, portability, and multi-household sharing—without committing to proprietary hardware and subscriptions.',
        },
        {
          question: 'Can Honeydew run on a wall display like Hearth?',
          answer:
            'Yes. Mount an iPad or inexpensive tablet and load Honeydew’s dashboard. You get the same focal point without committing to proprietary hardware.',
        },
        {
          question: 'How does total cost compare over time?',
          answer:
            'Hearth runs $500+ upfront plus $39/month. Honeydew offers a free tier and $99/year premium plan. Over three years, families save ~$1,600 with Honeydew.',
        },
        {
          question: 'If I care about smart home controls (Nest/Ring), is Honeydew still a fit?',
          answer:
            'Often yes—use your existing smart home setup for controls, and use Honeydew for the coordination layer (calendar + lists + reminders + multi-household sharing). Hearth’s smart home dashboard is a real advantage; Honeydew wins when you want planning automation and portability.',
        },
        {
          question: 'Does Honeydew integrate with smart home devices?',
          answer:
            'Honeydew focuses on coordination intelligence and plays nicely with existing smart home setups. You keep Alexa/Google broadcasts while letting Honeydew orchestrate the plan.',
        },
        {
          question: 'What about aesthetics and household buy-in?',
          answer:
            'Honeydew’s dashboards can match your aesthetic on any screen size. Families love that the system follows them—kitchen, living room, minivan—instead of staying stuck on one wall.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-app-screenshot.jpg',
        alt: 'Honeydew AI interface running on multiple devices compared to a single hearth display',
        caption:
          'Honeydew operates on every screen you already own, with AI-powered automations that Hearth’s hardware simply cannot offer.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsHearthPage

