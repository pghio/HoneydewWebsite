import ComparisonPage from './WhyHoneydewPage'

const VsSkylightPage = () => {
  return (
    <ComparisonPage
      competitor="Skylight Calendar"
      competitorPrice="$300 + $79/yr"
      competitorHardware='Requires wall-mounted display hardware'
      honeydewAdvantages={[
        "AI planning creates lists in seconds",
        "Voice input - speak while driving or cooking",
        "Photograph handwritten lists automatically",
        "Works on all your devices - no new hardware",
        "Two-way calendar sync with Google & Apple",
        "Multiple family groups (divorced parents, extended family)"
      ]}
      competitorAdvantages={[
        "Dedicated wall display for kitchen",
        "Visual presence everyone walks by",
        "Simple calendar viewing",
        "Physical touchscreen interface"
      ]}
      features={[
        { feature: "Family Calendar", competitor: true, honeydew: true },
        { feature: "Wall Display", competitor: true, honeydew: false },
        { feature: "Works on Your Devices", competitor: "Via app", honeydew: "All devices" },
        { feature: "AI Planning", competitor: false, honeydew: true },
        { feature: "Voice Input", competitor: false, honeydew: true },
        { feature: "Photo Recognition", competitor: false, honeydew: true },
        { feature: "Shopping Lists", competitor: false, honeydew: true },
        { feature: "Packing Lists", competitor: false, honeydew: true },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Multiple Family Groups", competitor: false, honeydew: true },
        { feature: "Calendar Sync", competitor: "One-way", honeydew: "Two-way" },
        { feature: "Works While Traveling", competitor: false, honeydew: true },
        { feature: "First Year Cost", competitor: "$379", honeydew: "$0-$99" }
      ]}
      bestFor={{
        honeydew: [
          "AI to do the planning work for you",
          "Voice and photo input for hands-free adding",
          "Save money - no hardware to buy",
          "Need lists and calendars together",
          "Manage multiple families",
          "Travel often and need organizer everywhere"
        ],
        competitor: [
          "Want a dedicated wall display in your kitchen",
          "Like the visual presence of calendar on wall",
          "Don't need planning help - just viewing",
          "Have the budget for hardware",
          "Only need calendar viewing"
        ]
      }}
    />
  )
}

export default VsSkylightPage

