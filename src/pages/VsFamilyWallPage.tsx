import ComparisonPage from './WhyHoneydewPage'

const VsFamilyWallPage = () => {
  return (
    <ComparisonPage
      competitor="FamilyWall"
      competitorPrice="Free–$60/yr"
      honeydewAdvantages={[
        "AI generates comprehensive lists in seconds",
        "Voice input for hands-free adding",
        "Photo recognition for handwritten content",
        "Two-way Apple Calendar sync",
        "Multiple family groups (critical for divorced parents)",
        "Lists attach to calendar events automatically"
      ]}
      competitorAdvantages={[
        "Built-in family chat messaging",
        "Location sharing to coordinate pickups",
        "Emergency contacts feature",
        "Lower cost - $60/yr vs $99/yr"
      ]}
      features={[
        { feature: "Family Calendar", competitor: true, honeydew: true },
        { feature: "AI List Generation", competitor: false, honeydew: true },
        { feature: "Voice Input", competitor: false, honeydew: true },
        { feature: "Photo Recognition", competitor: false, honeydew: true },
        { feature: "Chore Tracking", competitor: true, honeydew: true },
        { feature: "Family Messaging", competitor: true, honeydew: "Via list comments" },
        { feature: "Location Sharing", competitor: true, honeydew: "Coming soon" },
        { feature: "Google Calendar Sync", competitor: "One-way", honeydew: "Two-way" },
        { feature: "Apple Calendar Sync", competitor: "Limited", honeydew: "Two-way" },
        { feature: "Multiple Family Groups", competitor: false, honeydew: true },
        { feature: "Attach Lists to Events", competitor: false, honeydew: true },
        { feature: "Premium Cost", competitor: "$60/yr", honeydew: "$99/yr" }
      ]}
      bestFor={{
        honeydew: [
          "Save hours per month with AI list generation",
          "Use voice while driving or cooking",
          "Photograph school papers and lists",
          "Use Apple Calendar - need two-way sync",
          "Manage multiple families (divorced parents crucial)",
          "Want calendar + lists connected seamlessly"
        ],
        competitor: [
          "Want built-in family chat in one app",
          "Need location sharing for coordination",
          "Like the emergency contacts feature",
          "Lower cost is priority ($60 vs $99)",
          "Don't need AI or voice features"
        ]
      }}
    />
  )
}

export default VsFamilyWallPage

