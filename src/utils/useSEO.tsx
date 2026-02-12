import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  keywords?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

/**
 * Custom hook to manage SEO meta tags dynamically
 * Handles canonical URLs, meta descriptions, Open Graph, Twitter Cards
 */
export const useSEO = ({
  title,
  description,
  canonical,
  keywords,
  image,
  type = 'website',
  noindex = false,
}: SEOProps) => {
  useEffect(() => {
    const baseUrl = 'https://www.gethoneydew.app'
    const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl
    // Default to the share-friendly OG JPG for maximum social platform compatibility.
    const fullImage = image ? `${baseUrl}${image}` : `${baseUrl}/og-image-ai.jpg`

    // Update title
    if (title) {
      document.title = title
    }

    // Update or create canonical tag
    let canonicalTag = document.querySelector('link[rel="canonical"]')
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalTag)
    }
    canonicalTag.setAttribute('href', fullCanonical)

    // Meta tags to update
    const metaUpdates: Array<{ name?: string; property?: string; content: string }> = []

    if (description) {
      metaUpdates.push({ name: 'description', content: description })
    }
    if (keywords) {
      metaUpdates.push({ name: 'keywords', content: keywords })
    }

    // Open Graph tags
    if (title) {
      metaUpdates.push({ property: 'og:title', content: title })
    }
    if (description) {
      metaUpdates.push({ property: 'og:description', content: description })
    }
    metaUpdates.push({ property: 'og:type', content: type })
    metaUpdates.push({ property: 'og:url', content: fullCanonical })
    metaUpdates.push({ property: 'og:image', content: fullImage })

    // Twitter Card tags
    if (title) {
      metaUpdates.push({ name: 'twitter:title', content: title })
    }
    if (description) {
      metaUpdates.push({ name: 'twitter:description', content: description })
    }
    metaUpdates.push({ name: 'twitter:card', content: 'summary_large_image' })
    metaUpdates.push({ name: 'twitter:image', content: fullImage })

    // Robots tag
    if (noindex) {
      metaUpdates.push({ name: 'robots', content: 'noindex, nofollow' })
    }

    // Update or create meta tags
    metaUpdates.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
      let meta = document.querySelector(selector)
      
      if (!meta) {
        meta = document.createElement('meta')
        if (name) meta.setAttribute('name', name)
        if (property) meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    })

    // Cleanup function
    return () => {
      // Reset to default homepage values when component unmounts
      document.title = 'Honeydew Family App – AI Organizer with 27+ Tools'
      
      const canonicalReset = document.querySelector('link[rel="canonical"]')
      if (canonicalReset) {
        canonicalReset.setAttribute('href', baseUrl + '/')
      }
    }
  }, [title, description, canonical, keywords, image, type, noindex])
}

export default useSEO

