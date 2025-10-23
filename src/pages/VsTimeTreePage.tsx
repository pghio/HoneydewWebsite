import ComparisonPage from './WhyHoneydewPage'

const VsTimeTreePage = () => {
  return (
    <ComparisonPage
      competitor="TimeTree"
      competitorPrice="Free–$5/mo"
      honeydewAdvantages={[
        "Complete family organizer - not just calendar",
        "AI creates shopping, packing, and meal lists",
        "Voice input for hands-free adding",
        "Photo recognition for handwritten content",
        "Task assignment with notifications",
        "Lists attach directly to calendar events"
      ]}
      competitorAdvantages={[
        "Beautiful, intuitive calendar interface",
        "Strong mobile experience",
        "Popular internationally",
        "Free tier includes most features",
        "Simple, focused on calendars only"
      ]}
      features={[
        { feature: "Shared Calendar", competitor: true, honeydew: true },
        { feature: "Calendar Sync", competitor: "Two-way", honeydew: "Two-way" },
        { feature: "To-Do Lists", competitor: false, honeydew: true },
        { feature: "Shopping Lists", competitor: false, honeydew: true },
        { feature: "Packing Lists", competitor: false, honeydew: true },
        { feature: "AI List Generation", competitor: false, honeydew: true },
        { feature: "Voice Input", competitor: false, honeydew: true },
        { feature: "Photo Recognition", competitor: false, honeydew: true },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Task Assignment", competitor: false, honeydew: true },
        { feature: "Chore Tracking", competitor: false, honeydew: true },
        { feature: "Multiple Family Groups", competitor: "Separate calendars", honeydew: "Seamless switching" }
      ]}
      bestFor={{
        honeydew: [
          "Want AI to help you plan, not just view schedules",
          "Need everything in one place (calendar + lists)",
          "Use voice often while busy",
          "Want photo recognition for school papers",
          "Need lists attached to events (packing for trips)",
          "Want purpose-built family features"
        ],
        competitor: [
          "Only need calendar sharing",
          "Like minimal, focused apps",
          "Happy with manual entry",
          "Use other apps for lists already",
          "Prefer TimeTree's beautiful design"
        ]
      }}
    />
  )
}

export default VsTimeTreePage

