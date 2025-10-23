import ComparisonPage from './WhyHoneydewPage'

const VsMangoPage = () => {
  return (
    <ComparisonPage
      competitor="Mango Display"
      competitorPrice="$400–$600+"
      competitorHardware='Requires custom dashboard display hardware'
      honeydewAdvantages={[
        "No hardware to buy - save $400-$600",
        "Instant setup (2 min vs. 2-4 hours)",
        "AI planning creates lists automatically",
        "Voice input for hands-free adding",
        "Photo recognition for handwritten lists",
        "Works everywhere you go, not just one room"
      ]}
      competitorAdvantages={[
        "Highly customizable layouts and designs",
        "Beautiful displays in multiple sizes",
        "Design your own dashboard exactly how you want",
        "Multiple display options (vertical, horizontal)"
      ]}
      features={[
        { feature: "Family Calendar", competitor: true, honeydew: true },
        { feature: "Upfront Cost", competitor: "$400-$600", honeydew: "$0" },
        { feature: "Setup Time", competitor: "2-4 hours", honeydew: "2 minutes" },
        { feature: "Customizable Layouts", competitor: true, honeydew: "Standard app" },
        { feature: "AI Planning", competitor: false, honeydew: true },
        { feature: "Voice Input", competitor: false, honeydew: true },
        { feature: "Photo Recognition", competitor: false, honeydew: true },
        { feature: "Shopping Lists", competitor: "Display only", honeydew: "AI + Manual" },
        { feature: "Packing Lists", competitor: "Manual", honeydew: "AI Generated" },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Works While Traveling", competitor: false, honeydew: true },
        { feature: "Software Updates", competitor: "Hardware limited", honeydew: "Auto-updates" }
      ]}
      bestFor={{
        honeydew: [
          "Save $400-$600 on hardware costs",
          "Need AI to help you plan",
          "Want immediate start (2 min setup)",
          "Use voice frequently",
          "Want photo recognition",
          "Travel often - need organizer everywhere",
          "Prefer software that improves over time"
        ],
        competitor: [
          "Want custom dashboard design",
          "Have budget for $400-$600+ hardware",
          "Enjoy configuration and setup projects",
          "Want visual focal point in home",
          "Like designing your own layouts"
        ]
      }}
    />
  )
}

export default VsMangoPage

