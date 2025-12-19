/**
 * Funnel Tracking Utilities
 * 
 * Provides standardized UTM link building and enhanced event tracking
 * for end-to-end funnel attribution.
 */

import { trackEvent } from './analytics'

// ============================================
// UTM Link Builder
// ============================================

type UTMParams = {
  source?: string
  medium: string
  campaign: string
  content?: string
  term?: string
}

const APP_BASE_URL = 'https://app.gethoneydew.app/'

/**
 * Build a properly attributed link to the Honeydew app
 * 
 * @example
 * buildAppLink({ medium: 'hero', campaign: 'primary_cta' })
 * // => https://app.gethoneydew.app/?utm_source=website&utm_medium=hero&utm_campaign=primary_cta
 */
export const buildAppLink = ({
  source = 'website',
  medium,
  campaign,
  content,
  term
}: UTMParams): string => {
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
  })
  
  if (content) params.set('utm_content', content)
  if (term) params.set('utm_term', term)
  
  return `${APP_BASE_URL}?${params.toString()}`
}

// ============================================
// Predefined Link Configurations
// ============================================

export const APP_LINKS = {
  // Homepage CTAs
  hero: buildAppLink({ medium: 'hero', campaign: 'primary_cta' }),
  heroPrimary: buildAppLink({ medium: 'hero', campaign: 'primary_cta', content: 'try_free' }),
  ctaSection: buildAppLink({ medium: 'cta_section', campaign: 'primary_cta', content: 'start_trial' }),
  
  // Navigation
  navbar: buildAppLink({ medium: 'navbar', campaign: 'navigation', content: 'try_honeydew' }),
  footer: buildAppLink({ medium: 'footer', campaign: 'navigation', content: 'get_started' }),
  
  // Comparison pages
  vsSkylight: buildAppLink({ medium: 'comparison_page', campaign: 'vs_skylight', content: 'cta' }),
  vsCozi: buildAppLink({ medium: 'comparison_page', campaign: 'vs_cozi', content: 'cta' }),
  vsHearth: buildAppLink({ medium: 'comparison_page', campaign: 'vs_hearth', content: 'cta' }),
  
  // Feature sections
  pricing: buildAppLink({ medium: 'pricing_section', campaign: 'pricing', content: 'get_started' }),
  features: buildAppLink({ medium: 'features_section', campaign: 'features', content: 'try_now' }),
  
  // Blog (dynamic - use buildBlogCTALink instead)
} as const

/**
 * Build a CTA link for blog posts with article attribution
 */
export const buildBlogCTALink = (
  articleSlug: string,
  ctaPosition: 'inline' | 'bottom' | 'sidebar' = 'bottom'
): string => {
  return buildAppLink({
    medium: 'blog_cta',
    // Keep utm_campaign stable for analytics + tests.
    campaign: 'blog_cta',
    content: `${articleSlug}_${ctaPosition}`
  })
}

// ============================================
// Enhanced Event Tracking
// ============================================

/**
 * Track scroll depth on any page
 */
export const trackScrollDepth = (depth: number, pageSlug?: string): void => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    depth_percentage: depth,
    page_slug: pageSlug || window.location.pathname,
  })
}

/**
 * Track blog-specific engagement
 */
export const trackBlogEngagement = (
  slug: string, 
  action: 'scroll_50' | 'scroll_100' | 'time_on_page' | 'share' | 'cta_visible',
  value?: number
): void => {
  trackEvent('blog_engagement', {
    event_category: 'content',
    blog_slug: slug,
    engagement_action: action,
    engagement_value: value,
  })
}

/**
 * Track when user clicks to app store/download
 * This is a KEY CONVERSION event
 */
export const trackAppStoreClick = (
  source: string,
  campaign: string,
  platform: 'ios' | 'android' | 'web' = 'web'
): void => {
  trackEvent('app_store_click', {
    event_category: 'conversion',
    platform,
    click_source: source,
    campaign,
  })
}

/**
 * Track CTA visibility (for funnel analysis)
 */
export const trackCTAVisible = (ctaId: string, pageSource: string): void => {
  trackEvent('cta_impression', {
    event_category: 'visibility',
    cta_id: ctaId,
    page_source: pageSource,
  })
}

/**
 * Track comparison page engagement
 */
export const trackComparisonEngagement = (
  competitor: string,
  action: 'view' | 'scroll_table' | 'click_cta'
): void => {
  trackEvent('comparison_engagement', {
    event_category: 'comparison',
    competitor,
    action,
  })
}

// ============================================
// Scroll Tracking Hook Helper
// ============================================

/**
 * Creates a scroll tracking observer for blog pages
 * Call this on mount in blog components
 */
export const createScrollTracker = (
  slug: string,
  onMilestone: (depth: number) => void
): (() => void) => {
  const milestones = new Set<number>()
  
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    const percentage = Math.round((scrolled / scrollHeight) * 100)
    
    // Track at 25%, 50%, 75%, 100%
    const checkpoints = [25, 50, 75, 100]
    checkpoints.forEach(checkpoint => {
      if (percentage >= checkpoint && !milestones.has(checkpoint)) {
        milestones.add(checkpoint)
        onMilestone(checkpoint)
        trackScrollDepth(checkpoint, slug)
        
        if (checkpoint === 50) {
          trackBlogEngagement(slug, 'scroll_50')
        } else if (checkpoint === 100) {
          trackBlogEngagement(slug, 'scroll_100')
        }
      }
    })
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Return cleanup function
  return () => window.removeEventListener('scroll', handleScroll)
}

// ============================================
// Time on Page Tracking
// ============================================

/**
 * Start tracking time on page
 * Returns cleanup function to call on unmount
 */
export const startTimeTracking = (slug: string): (() => void) => {
  const startTime = Date.now()
  let hasTracked30s = false
  let hasTracked60s = false
  let hasTracked120s = false
  
  const interval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000
    
    if (elapsed >= 30 && !hasTracked30s) {
      hasTracked30s = true
      trackBlogEngagement(slug, 'time_on_page', 30)
    }
    if (elapsed >= 60 && !hasTracked60s) {
      hasTracked60s = true
      trackBlogEngagement(slug, 'time_on_page', 60)
    }
    if (elapsed >= 120 && !hasTracked120s) {
      hasTracked120s = true
      trackBlogEngagement(slug, 'time_on_page', 120)
    }
  }, 5000)
  
  return () => clearInterval(interval)
}





