/**
 * Funnel Tracking Utilities
 *
 * Provides standardized UTM link building and enhanced event tracking
 * for end-to-end funnel attribution.
 */

import { PLATFORMS, getEnabledStorePlatforms, getPrimaryStorePlatform, type PlatformKey, type StorePlatformKey } from '../config/platforms'
import { getLlmAttributionContext, trackEvent } from './analytics'

export type UTMParams = {
  source?: string
  medium: string
  campaign: string
  content?: string
  term?: string
}

type AppStoreCampaignParams = {
  providerToken?: string
  campaignToken: string
  mediaType?: string
  platform?: StorePlatformKey
}

export type DownloadStrategy = 'store_first' | 'device_aware'

export type DownloadDestination = {
  href: string
  platform: PlatformKey
  isStore: boolean
}

const APP_BASE_URL = PLATFORMS.web.url

export const APP_STORE_IOS_URL = PLATFORMS.ios.url

export const isIOSDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false
  return /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export const isAndroidDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false
  return /Android/i.test(navigator.userAgent)
}

export const getDetectedDevicePlatform = (): PlatformKey => {
  if (isIOSDevice()) return 'ios'
  if (isAndroidDevice()) return 'android'
  return 'web'
}

export const getPreferredStorePlatform = (): StorePlatformKey | null => {
  const detectedPlatform = getDetectedDevicePlatform()
  if (detectedPlatform !== 'web' && PLATFORMS[detectedPlatform].enabled) {
    return detectedPlatform
  }
  return getPrimaryStorePlatform()
}

const buildGooglePlayLink = (campaignToken: string): string => {
  const referrer = new URLSearchParams({
    utm_source: 'website',
    utm_medium: 'google_play',
    utm_campaign: campaignToken,
  }).toString()

  const params = new URLSearchParams({ referrer })
  return `${PLATFORMS.android.url}?${params.toString()}`
}

/**
 * Build a tracked store link.
 * Apple supports: pt (provider token), ct (campaign token), mt (media type).
 * Google Play accepts install referrers via the `referrer` query param.
 */
export const buildAppStoreLink = ({
  providerToken,
  campaignToken,
  mediaType = '8',
  platform = 'ios',
}: AppStoreCampaignParams): string => {
  if (platform === 'android') {
    return buildGooglePlayLink(campaignToken)
  }

  const params = new URLSearchParams({ ct: campaignToken, mt: mediaType })
  if (providerToken) params.set('pt', providerToken)
  return `${PLATFORMS.ios.url}?${params.toString()}`
}

/**
 * Build a properly attributed link to the Honeydew web app.
 */
export const buildAppLink = ({
  source = 'website',
  medium,
  campaign,
  content,
  term,
}: UTMParams): string => {
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
  })

  if (content) params.set('utm_content', content)
  if (term) params.set('utm_term', term)

  const llmContext = getLlmAttributionContext()
  if (llmContext.llm_referrer_host) {
    params.set('llm_referrer', llmContext.llm_referrer_host)
    params.set('llm_attribution', '1')
  } else if (llmContext.llm_utm_source) {
    params.set('llm_referrer', String(llmContext.llm_utm_source))
    params.set('llm_attribution', '1')
  }

  return `${APP_BASE_URL}?${params.toString()}`
}

export const getPrimaryDownloadDestination = (
  webParams: UTMParams,
  storeCampaign = 'primary_download',
  strategy: DownloadStrategy = 'store_first',
): DownloadDestination => {
  if (strategy === 'device_aware') {
    const detectedPlatform = getDetectedDevicePlatform()
    if (detectedPlatform !== 'web' && PLATFORMS[detectedPlatform].enabled) {
      return {
        href: buildAppStoreLink({ campaignToken: storeCampaign, platform: detectedPlatform }),
        platform: detectedPlatform,
        isStore: true,
      }
    }

    return {
      href: buildAppLink(webParams),
      platform: 'web',
      isStore: false,
    }
  }

  const storePlatform = getPreferredStorePlatform()
  if (storePlatform) {
    return {
      href: buildAppStoreLink({ campaignToken: storeCampaign, platform: storePlatform }),
      platform: storePlatform,
      isStore: true,
    }
  }

  return {
    href: buildAppLink(webParams),
    platform: 'web',
    isStore: false,
  }
}

/**
 * Return the best device-aware download link for the current visitor:
 * App Store / Google Play for matching devices, web app otherwise.
 */
export const getPrimaryDownloadLink = (
  webParams: UTMParams,
  appStoreCampaign?: string,
): string =>
  getPrimaryDownloadDestination(
    webParams,
    appStoreCampaign ?? 'primary_download',
    'device_aware',
  ).href

/**
 * Return the store-first download link used by marketing CTAs.
 */
export const getStoreFirstDownloadLink = (
  webParams: UTMParams,
  appStoreCampaign?: string,
): string =>
  getPrimaryDownloadDestination(
    webParams,
    appStoreCampaign ?? 'primary_download',
    'store_first',
  ).href

export const APP_LINKS = {
  hero: buildAppLink({ medium: 'hero', campaign: 'primary_cta' }),
  heroPrimary: buildAppLink({ medium: 'hero', campaign: 'primary_cta', content: 'try_free' }),
  ctaSection: buildAppLink({ medium: 'cta_section', campaign: 'primary_cta', content: 'start_trial' }),
  navbar: buildAppLink({ medium: 'navbar', campaign: 'navigation', content: 'try_honeydew' }),
  footer: buildAppLink({ medium: 'footer', campaign: 'navigation', content: 'get_started' }),
  vsSkylight: buildAppLink({ medium: 'comparison_page', campaign: 'vs_skylight', content: 'cta' }),
  vsCozi: buildAppLink({ medium: 'comparison_page', campaign: 'vs_cozi', content: 'cta' }),
  vsHearth: buildAppLink({ medium: 'comparison_page', campaign: 'vs_hearth', content: 'cta' }),
  pricing: buildAppLink({ medium: 'pricing_section', campaign: 'pricing', content: 'get_started' }),
  features: buildAppLink({ medium: 'features_section', campaign: 'features', content: 'try_now' }),
  appStoreIOS: PLATFORMS.ios.url,
  appStoreHero: buildAppStoreLink({ campaignToken: 'hero_primary', platform: 'ios' }),
  appStoreCta: buildAppStoreLink({ campaignToken: 'cta_section', platform: 'ios' }),
  appStoreFooter: buildAppStoreLink({ campaignToken: 'footer', platform: 'ios' }),
  appStoreBlog: buildAppStoreLink({ campaignToken: 'blog_cta', platform: 'ios' }),
  appStoreComparison: buildAppStoreLink({ campaignToken: 'comparison_page', platform: 'ios' }),
} as const

/**
 * Build a CTA link for blog posts with article attribution.
 * Blog CTAs are store-first so the App Store is always the primary conversion path.
 */
export const buildBlogCTALink = (
  articleSlug: string,
  ctaPosition: 'inline' | 'bottom' | 'sidebar' | 'sticky' = 'bottom',
): string =>
  getPrimaryDownloadDestination(
    {
      medium: 'blog_cta',
      campaign: 'blog_cta',
      content: `${articleSlug}_${ctaPosition}`,
    },
    `blog_cta_${articleSlug}_${ctaPosition}`,
    'store_first',
  ).href

export const trackScrollDepth = (depth: number, pageSlug?: string): void => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    depth_percentage: depth,
    page_slug: pageSlug || window.location.pathname,
  })
}

export const trackBlogEngagement = (
  slug: string,
  action: 'scroll_50' | 'scroll_100' | 'time_on_page' | 'share' | 'cta_visible' | 'app_store_view',
  value?: number,
): void => {
  trackEvent('blog_engagement', {
    event_category: 'content',
    blog_slug: slug,
    engagement_action: action,
    engagement_value: value,
  })
}

export const trackAppStoreClick = (
  source: string,
  campaign: string,
  platform: PlatformKey = 'web',
): void => {
  trackEvent('app_store_click', {
    event_category: 'conversion',
    platform,
    click_source: source,
    campaign,
  })

  if (source.includes('blog')) {
    trackEvent('blog_to_appstore_funnel', {
      event_category: 'conversion',
      blog_source: source,
      platform,
      campaign,
    })
  }

  if (typeof window !== 'undefined') {
    const maybeTracker = (window as Window & { trackAppClick?: (source: string) => void }).trackAppClick
    if (typeof maybeTracker === 'function') {
      maybeTracker(`${platform}_${source}_${campaign}`)
    }
  }
}

export const trackAppStoreView = (
  source: string,
  campaign: string,
  platform: PlatformKey,
): void => {
  trackEvent('app_store_view', {
    event_category: 'visibility',
    platform,
    view_source: source,
    campaign,
  })
}

export const trackCTAVisible = (ctaId: string, pageSource: string): void => {
  trackEvent('cta_impression', {
    event_category: 'visibility',
    cta_id: ctaId,
    page_source: pageSource,
  })
}

export const trackComparisonEngagement = (
  competitor: string,
  action: 'view' | 'scroll_table' | 'click_cta',
): void => {
  trackEvent('comparison_engagement', {
    event_category: 'comparison',
    competitor,
    action,
  })
}

export const trackPlatformDetected = (platform: PlatformKey = getDetectedDevicePlatform()): void => {
  trackEvent('platform_detected', {
    event_category: 'device',
    platform,
    primary_store_platform: getPrimaryStorePlatform() ?? 'web',
    enabled_store_platforms: getEnabledStorePlatforms().join(',') || 'none',
  })
}

export const trackPlatformDetectedOnce = (): void => {
  if (typeof window === 'undefined') return

  const key = 'hd_platform_detected_tracked'
  if (window.sessionStorage.getItem(key) === '1') return

  trackPlatformDetected()
  window.sessionStorage.setItem(key, '1')
}

/**
 * Creates a scroll tracking observer for blog pages.
 */
export const createScrollTracker = (
  slug: string,
  onMilestone: (depth: number) => void,
): (() => void) => {
  const milestones = new Set<number>()

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    const percentage = Math.round((scrolled / scrollHeight) * 100)

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
  return () => window.removeEventListener('scroll', handleScroll)
}

/**
 * Start tracking time on page.
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





