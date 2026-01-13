type ComparisonLink = {
  slug: string
  label: string
  href: string
}

const comparisonLinks: ComparisonLink[] = [
  { slug: 'vs-skylight', label: 'Honeydew vs Skylight Calendar', href: '/why-honeydew/vs-skylight' },
  { slug: 'vs-cozi', label: 'Honeydew vs Cozi', href: '/why-honeydew/vs-cozi' },
  { slug: 'vs-timetree', label: 'Honeydew vs TimeTree', href: '/why-honeydew/vs-timetree' },
  { slug: 'vs-hearth', label: 'Honeydew vs Hearth Display', href: '/why-honeydew/vs-hearth' },
  { slug: 'vs-familywall', label: 'Honeydew vs FamilyWall', href: '/why-honeydew/vs-familywall' },
  { slug: 'vs-echoshow', label: 'Honeydew vs Echo Show', href: '/why-honeydew/vs-echoshow' },
  { slug: 'vs-google', label: 'Honeydew vs Google Calendar', href: '/why-honeydew/vs-google' },
  { slug: 'vs-mango', label: 'Honeydew vs Mango Display', href: '/why-honeydew/vs-mango' },
]

export const buildRelatedComparisonLinks = (excludeSlug: string, limit = 4): ComparisonLink[] => {
  const filtered = comparisonLinks.filter(link => link.slug !== excludeSlug)
  return filtered.slice(0, limit)
}

export default comparisonLinks






