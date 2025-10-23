import ComparisonPage from './WhyHoneydewPage'

const VsCoziPage = () => {
  return (
    <ComparisonPage
      competitor="Cozi"
      competitorPrice="Free–$30/yr"
      honeydewAdvantages={[
        "AI generates lists automatically in seconds",
        "Voice input - speak items hands-free",
        "Photograph handwritten lists",
        "Two-way Apple Calendar sync (not just Google)",
        "Multiple family groups for divorced parents",
        "Lists attach to calendar events automatically"
      ]}
      competitorAdvantages={[
        "Simple, familiar interface",
        "Lower cost - $30/year vs $99/year",
        "Proven tool used for years",
        "Free version works for basic needs"
      ]}
      features={[
        { feature: "Family Calendar", competitor: true, honeydew: true },
        { feature: "AI List Generation", competitor: false, honeydew: true },
        { feature: "Voice Input", competitor: false, honeydew: true },
        { feature: "Photo Recognition", competitor: false, honeydew: true },
        { feature: "Shopping Lists", competitor: "Manual", honeydew: "AI or Manual" },
        { feature: "Packing Lists", competitor: "Manual", honeydew: "AI Generated" },
        { feature: "Meal Planning", competitor: "Manual", honeydew: "AI + Auto Grocery" },
        { feature: "Google Calendar Sync", competitor: "One-way", honeydew: "Two-way" },
        { feature: "Apple Calendar Sync", competitor: false, honeydew: true },
        { feature: "Multiple Family Groups", competitor: false, honeydew: true },
        { feature: "Attach Lists to Events", competitor: false, honeydew: true },
        { feature: "Premium Cost", competitor: "$30/yr", honeydew: "$99/yr" }
      ]}
      bestFor={{
        honeydew: [
          "Save hours per month with AI planning",
          "Use voice often while driving or cooking",
          "Take photos of lists and school papers",
          "Use Apple Calendar and need two-way sync",
          "Manage multiple families (divorced parents)",
          "Want calendar + lists connected"
        ],
        competitor: [
          "Want simple and familiar tools",
          "Don't mind manual entry for everything",
          "Have a tight budget ($30/yr is cheaper)",
          "Only manage one household",
          "Prefer basic tools without AI"
        ]
      }}
    />
  )
}

export default VsCoziPage

