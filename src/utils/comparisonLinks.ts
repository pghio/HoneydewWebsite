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
  { slug: 'vs-dakboard', label: 'Honeydew vs DAKboard', href: '/why-honeydew/vs-dakboard' },
  { slug: 'vs-2houses', label: 'Honeydew vs 2houses', href: '/why-honeydew/vs-2houses' },
  { slug: 'vs-ourfamilywizard', label: 'Honeydew vs OurFamilyWizard', href: '/why-honeydew/vs-ourfamilywizard' },
  { slug: 'vs-appclose', label: 'Honeydew vs AppClose', href: '/why-honeydew/vs-appclose' },
  { slug: 'vs-fantastical', label: 'Honeydew vs Fantastical', href: '/why-honeydew/vs-fantastical' },
  { slug: 'vs-picniic', label: 'Honeydew vs Picniic', href: '/why-honeydew/vs-picniic' },
  { slug: 'vs-magicmirror', label: 'Honeydew vs MagicMirror', href: '/why-honeydew/vs-magicmirror' },
]

export const buildRelatedComparisonLinks = (excludeSlug: string, limit = 4): ComparisonLink[] => {
  const filtered = comparisonLinks.filter(link => link.slug !== excludeSlug)
  return filtered.slice(0, limit)
}

export default comparisonLinks






