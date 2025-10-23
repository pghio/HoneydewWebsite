import ComparisonPage from './WhyHoneydewPage'

const VsGoogleCalendarPage = () => {
  return (
    <ComparisonPage
      competitor="Google Family Calendar"
      competitorPrice="Free"
      honeydewAdvantages={[
        "AI planning creates lists in seconds vs. manual",
        "Everything in one place (calendar + lists + meals)",
        "Voice input built-in for hands-free adding",
        "Photo recognition for handwritten content",
        "Lists attach directly to calendar events",
        "Purpose-built family features vs. general tools"
      ]}
      competitorAdvantages={[
        "Completely free forever",
        "Already part of Google ecosystem",
        "Familiar interface everyone knows",
        "Reliable and fast",
        "Integration with Gmail"
      ]}
      features={[
        { feature: "Family Calendar", competitor: true, honeydew: true },
        { feature: "Cost", competitor: "Free", honeydew: "Free or $99/yr" },
        { feature: "AI Planning", competitor: false, honeydew: true },
        { feature: "Voice Input", competitor: "Hey Google only", honeydew: "Built-in everywhere" },
        { feature: "Photo Recognition", competitor: "Separate (Lens)", honeydew: "Integrated" },
        { feature: "Shopping Lists", competitor: "Keep (separate)", honeydew: "Built-in" },
        { feature: "To-Do Lists", competitor: "Tasks (separate)", honeydew: "Built-in" },
        { feature: "Packing Lists", competitor: "Manual in Keep", honeydew: "AI generated" },
        { feature: "Meal Planning", competitor: false, honeydew: true },
        { feature: "Attach Lists to Events", competitor: "Manual linking", honeydew: "Automatic" },
        { feature: "Task Assignment", competitor: false, honeydew: true },
        { feature: "Family-Specific Features", competitor: "Basic sharing", honeydew: "Purpose-built" }
      ]}
      bestFor={{
        honeydew: [
          "Want AI to help you plan vs. just display",
          "Need everything integrated (calendar + lists + meals)",
          "Use voice frequently while busy",
          "Want photo recognition for school papers",
          "Need lists attached to events (packing for trips)",
          "Want purpose-built family features"
        ],
        competitor: [
          "Only need schedule coordination",
          "Want completely free forever",
          "Already use Google for everything",
          "Comfortable with multiple Google apps",
          "Simple needs that basic calendar covers"
        ]
      }}
    />
  )
}

export default VsGoogleCalendarPage

