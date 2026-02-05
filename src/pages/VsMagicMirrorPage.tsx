import ComparisonPage from './WhyHoneydewPage'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

const VsMagicMirrorPage = () => {
  const relatedLinks = buildRelatedComparisonLinks('vs-magicmirror')

  return (
    <ComparisonPage
      competitor="MagicMirror"
      competitorPrice="Free software + $100-500 DIY hardware"
      competitorHardware='Requires DIY smart mirror build with Raspberry Pi'
      honeydewAdvantages={[
        "Zero technical setup - works in minutes",
        "AI agent with 27+ tools does planning for you",
        "Voice control at 96.3% accuracy",
        "Mobile app works everywhere you go",
        "Multiple family groups (divorced parents, extended family)",
        "Professional support included"
      ]}
      competitorAdvantages={[
        "Completely free and open-source",
        "Highly customizable with modules",
        "Active developer community",
        "Works behind two-way mirrors for sleek look",
        "Full control over data and privacy"
      ]}
      features={[
        { feature: "Family Calendar", competitor: "Via modules", honeydew: true },
        { feature: "Smart Display", competitor: true, honeydew: "Any device" },
        { feature: "AI Planning", competitor: false, honeydew: true },
        { feature: "Voice Input", competitor: false, honeydew: "96.3% accurate" },
        { feature: "Photo Recognition", competitor: false, honeydew: true },
        { feature: "Mobile App", competitor: false, honeydew: true },
        { feature: "Shopping Lists", competitor: false, honeydew: true },
        { feature: "Packing Lists", competitor: false, honeydew: true },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Multiple Family Groups", competitor: false, honeydew: true },
        { feature: "Two-Way Calendar Sync", competitor: false, honeydew: true },
        { feature: "Setup Time", competitor: "Hours/days", honeydew: "Minutes" },
        { feature: "Technical Skill Required", competitor: "Coding needed", honeydew: "None" },
        { feature: "Support", competitor: "Community only", honeydew: "Professional" },
        { feature: "First Year Cost", competitor: "$100-500 hardware", honeydew: "$0-$99" }
      ]}
      bestFor={{
        honeydew: [
          "Want AI to do the planning work for you",
          "Need voice and photo input for hands-free adding",
          "Don't want to spend weeks on DIY projects",
          "Need a mobile app that travels with you",
          "Manage multiple families or co-parenting",
          "Prefer professional support over forums"
        ],
        competitor: [
          "Love DIY projects and have coding skills",
          "Want a sleek mirror display in your home",
          "Need complete data privacy and control",
          "Enjoy customizing every aspect",
          "Have time to maintain and troubleshoot",
          "Only need a stationary display"
        ]
      }}
      seo={{
        title: 'Honeydew Family App vs MagicMirror – AI Family OS vs DIY Smart Mirror',
        description:
          'MagicMirror requires coding and DIY hardware. Honeydew is the AI-first family OS that works instantly on all your devices. Compare automation, setup time, and how Honeydew handles voice, AI planning, and multi-family coordination.',
        keywords:
          'honeydew vs magicmirror, magicmirror alternative, ai family calendar, smart mirror alternative, voice-controlled family app, no-code family organizer, diy smart mirror vs app',
        image: '/blog-images/honeydew-ai-agent.jpg',
        heroCopy:
          'MagicMirror is a cool DIY project. Honeydew is a family command center. Skip the soldering iron—get AI that plans trips, meals, and schedules while you focus on your family.',
      }}
      stickyCta={{
        headline: 'Skip the DIY',
        subhead: 'Get AI-powered family organization in minutes, not weeks',
        ctaLabel: 'Try Honeydew free',
      }}
      taskModules={[
        {
          title: 'AI planning vs static displays',
          description:
            'MagicMirror shows you information. Honeydew actively plans for you—say "Plan next week\'s dinners" and get a meal plan, shopping list, and calendar events automatically created.',
          stat: '27+ AI tools included',
        },
        {
          title: 'Zero setup vs weekend project',
          description:
            'MagicMirror requires buying a Raspberry Pi, monitor, two-way mirror, coding modules, and troubleshooting. Honeydew works the moment you download it—on the devices you already own.',
          example: 'Works in 2 minutes vs 2 weekends',
        },
        {
          title: 'Voice control that actually works',
          description:
            'Honeydew\'s Whisper-powered voice recognition captures tasks at 96.3% accuracy while cooking or driving. MagicMirror has no native voice input—you\'d need to hack together additional hardware and code.',
        },
      ]}
      faq={[
        {
          question: 'I love DIY projects—why would I choose Honeydew?',
          answer:
            'If you enjoy the build process, MagicMirror is fun. But if you want family organization that actually works, Honeydew gives you AI planning, voice input, and mobile access—features MagicMirror simply cannot match even with extensive customization.',
        },
        {
          question: 'Can Honeydew work on a wall display like MagicMirror?',
          answer:
            'Yes. Pin Honeydew to an iPad, old tablet, or smart TV and mount it anywhere. You get the visual dashboard plus AI automation, voice control, and the ability to access everything from your phone when you\'re away.',
        },
        {
          question: 'What about MagicMirror\'s customization and privacy?',
          answer:
            'MagicMirror offers more customization if you can code. For privacy-conscious families, Honeydew uses enterprise-grade encryption and never sells your data. Most families prefer working features over theoretical flexibility.',
        },
        {
          question: 'How does the total cost compare?',
          answer:
            'MagicMirror software is free, but hardware costs $100-500 plus your time (easily 10-20 hours). Honeydew is free to start, $99/year for premium. Factor in your time and Honeydew costs less while doing infinitely more.',
        },
        {
          question: 'What if my MagicMirror breaks or needs updating?',
          answer:
            'MagicMirror relies on community support—updates can break modules, and troubleshooting is on you. Honeydew is professionally maintained with automatic updates and real customer support when you need help.',
        },
      ]}
      proof={{
        src: '/blog-images/honeydew-calendar-hero.jpg',
        alt: 'Honeydew AI family app on multiple devices compared to MagicMirror DIY smart mirror',
        caption:
          'Honeydew works on every device you own—phones, tablets, laptops—with AI that plans for you. MagicMirror is a single DIY display with no intelligence built in.',
      }}
      relatedLinks={relatedLinks}
    />
  )
}

export default VsMagicMirrorPage
