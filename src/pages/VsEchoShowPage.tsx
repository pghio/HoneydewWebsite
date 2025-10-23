import ComparisonPage from './WhyHoneydewPage'

const VsEchoShowPage = () => {
  return (
    <ComparisonPage
      competitor="Echo Show Calendar"
      competitorPrice="$90–$270"
      competitorHardware='Requires Echo Show device (multi-purpose smart display)'
      honeydewAdvantages={[
        "Purpose-built for family organization",
        "AI creates comprehensive lists automatically",
        "Voice input built into app everywhere",
        "Photo recognition for handwritten lists",
        "Works on all devices, not just at home",
        "Multiple family groups for divorced parents"
      ]}
      competitorAdvantages={[
        "Multi-purpose device (music, videos, smart home)",
        "Alexa voice control for smart home",
        "Uses device you may already own",
        "No subscription required"
      ]}
      features={[
        { feature: "Display Calendar", competitor: "Basic", honeydew: "Full-featured" },
        { feature: "AI Planning", competitor: false, honeydew: true },
        { feature: "Voice Input", competitor: "Alexa only", honeydew: "Built-in everywhere" },
        { feature: "Photo Recognition", competitor: false, honeydew: true },
        { feature: "Shopping Lists", competitor: "Basic Alexa lists", honeydew: "AI + organized" },
        { feature: "Packing Lists", competitor: "Basic to-do", honeydew: "AI generated" },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Task Assignment", competitor: false, honeydew: true },
        { feature: "Multiple Family Groups", competitor: "One household", honeydew: "Unlimited" },
        { feature: "Works Away from Home", competitor: false, honeydew: true },
        { feature: "Smart Home Control", competitor: true, honeydew: false },
        { feature: "Purpose", competitor: "Multi-purpose", honeydew: "Family organization" }
      ]}
      bestFor={{
        honeydew: [
          "Comprehensive family organization tools",
          "AI planning that creates lists automatically",
          "Mobile access throughout the day everywhere",
          "Photo recognition for school papers",
          "Multiple family coordination (divorced parents)",
          "Lists attached to calendar events"
        ],
        competitor: [
          "Already own an Echo Show",
          "Love Alexa ecosystem for smart home",
          "Want multi-purpose device (music, videos, calendar)",
          "Only need basic calendar viewing",
          "Prefer voice-first interaction with Alexa"
        ]
      }}
    />
  )
}

export default VsEchoShowPage

