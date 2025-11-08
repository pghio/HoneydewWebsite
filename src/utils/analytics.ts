export type AnalyticsEventParams = Record<string, unknown>

const getWindow = (): (Window & { gtag?: (...args: unknown[]) => void }) | undefined => {
  if (typeof window === 'undefined') {
    return undefined
  }

  return window as Window & { gtag?: (...args: unknown[]) => void }
}

const buildBaseParams = (): Record<string, unknown> => {
  const win = getWindow()
  if (!win) {
    return {}
  }

  return {
    page_path: `${win.location.pathname}${win.location.search}`,
    page_location: win.location.href,
    page_title: document.title,
  }
}

export const trackEvent = (eventName: string, params: AnalyticsEventParams = {}): void => {
  const win = getWindow()
  const gtag = win?.gtag

  if (!gtag) {
    return
  }

  const eventParams = {
    ...buildBaseParams(),
    ...params,
  }

  gtag('event', eventName, eventParams)
}

type LinkClickOptions = {
  href: string
  source: string
  label?: string
  variant?: string
  medium?: string
  campaign?: string
  eventName?: string
  additionalParams?: AnalyticsEventParams
}

export const trackLinkClick = ({
  href,
  source,
  label,
  variant,
  medium,
  campaign,
  eventName,
  additionalParams = {},
}: LinkClickOptions): void => {
  trackEvent(eventName ?? 'cta_click', {
    event_category: 'conversion',
    event_label: label ?? source,
    link_url: href,
    link_source: source,
    link_variant: variant,
    link_medium: medium,
    link_campaign: campaign,
    ...additionalParams,
  })
}

export const trackPageView = (params: AnalyticsEventParams = {}): void => {
  trackEvent('page_view', params)
}

