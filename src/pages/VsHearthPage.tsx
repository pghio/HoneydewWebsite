import ComparisonPage from './WhyHoneydewPage'

const VsHearthPage = () => {
  return (
    <ComparisonPage
      competitor="Hearth Display"
      competitorPrice="$500–$700+"
      competitorHardware='Requires premium 27" wall-mounted display'
      honeydewAdvantages={[
        "No hardware to buy - save $400-$600",
        "AI planning creates lists automatically",
        "Voice input for hands-free adding",
        "Photo recognition for handwritten lists",
        "Works everywhere you go, not just one room",
        "Multiple family groups for complex coordination"
      ]}
      competitorAdvantages={[
        "Gorgeous 27\" touchscreen display",
        "Premium build quality",
        "Smart home integrations (Nest, Ring, etc.)",
        "Beautiful design as home focal point"
      ]}
      features={[
        { feature: "Family Calendar", competitor: true, honeydew: true },
        { feature: "Wall Display", competitor: "27\" Premium", honeydew: "Can mount tablet" },
        { feature: "Upfront Cost", competitor: "$500-$700", honeydew: "$0" },
        { feature: "AI Planning", competitor: false, honeydew: true },
        { feature: "Voice Input", competitor: false, honeydew: true },
        { feature: "Photo Recognition", competitor: false, honeydew: true },
        { feature: "Shopping Lists", competitor: "Basic", honeydew: "AI Generated" },
        { feature: "Packing Lists", competitor: "Manual", honeydew: "AI Generated" },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Smart Home Hub", competitor: true, honeydew: false },
        { feature: "Works While Traveling", competitor: false, honeydew: true },
        { feature: "Multiple Family Groups", competitor: false, honeydew: true }
      ]}
      bestFor={{
        honeydew: [
          "Save $400-$600 on hardware",
          "Need AI to help you plan",
          "Want faster setup (2 min vs. 2 hours)",
          "Use voice frequently",
          "Want photo recognition",
          "Travel often - need organizer everywhere"
        ],
        competitor: [
          "Want premium hardware aesthetics",
          "Have budget for $500-$700+ display",
          "Need smart home integration hub",
          "Want large touchscreen focal point",
          "Design is top priority"
        ]
      }}
    />
  )
}

export default VsHearthPage

