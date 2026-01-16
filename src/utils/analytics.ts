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

type LlmAttributionParams = {
  llm_referrer?: string
  llm_referrer_host?: string
  llm_utm_source?: string | null
  llm_utm_medium?: string | null
  llm_utm_campaign?: string | null
}

const getLlmAttributionParams = (): LlmAttributionParams => {
  const win = getWindow()
  if (!win) return {}

  const referrer = win.sessionStorage.getItem('hd_llm_referrer') || undefined
  const referrerHost = win.sessionStorage.getItem('hd_llm_referrer_host') || undefined
  const utmSource = win.sessionStorage.getItem('hd_llm_utm_source')
  const utmMedium = win.sessionStorage.getItem('hd_llm_utm_medium')
  const utmCampaign = win.sessionStorage.getItem('hd_llm_utm_campaign')

  if (!referrer && !referrerHost && !utmSource && !utmMedium && !utmCampaign) {
    return {}
  }

  return {
    llm_referrer: referrer,
    llm_referrer_host: referrerHost,
    llm_utm_source: utmSource || undefined,
    llm_utm_medium: utmMedium || undefined,
    llm_utm_campaign: utmCampaign || undefined,
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
    ...getLlmAttributionParams(),
    ...params,
  }

  gtag('event', eventName, eventParams)
}

const LLM_REFERRER_HOSTS = [
  'chat.openai.com',
  'chatgpt.com',
  'perplexity.ai',
  'claude.ai',
  'poe.com',
  'you.com',
  'phind.com',
  'gemini.google.com',
  'copilot.microsoft.com',
]

const isLlmHost = (host: string): boolean => {
  const normalized = host.toLowerCase()
  return LLM_REFERRER_HOSTS.some(domain => normalized === domain || normalized.endsWith(`.${domain}`))
}

const getReferrerHost = (referrer: string): string => {
  try {
    return new URL(referrer).hostname
  } catch {
    return ''
  }
}

const getUtmValue = (name: string): string | null => {
  const win = getWindow()
  if (!win) return null
  const params = new URLSearchParams(win.location.search)
  return params.get(name)
}

export const trackLlmReferralOnce = (): void => {
  const win = getWindow()
  if (!win) return

  const storageKey = 'hd_llm_referral_tracked'
  if (win.sessionStorage.getItem(storageKey) === '1') {
    return
  }

  const referrer = document.referrer || ''
  const referrerHost = getReferrerHost(referrer)
  const utmSource = getUtmValue('utm_source')
  const utmMedium = getUtmValue('utm_medium')
  const utmCampaign = getUtmValue('utm_campaign')

  const isLlmReferrer = referrerHost ? isLlmHost(referrerHost) : false
  const isLlmUtm =
    (utmSource && /llm|ai|chatgpt|openai|perplexity|claude|gemini|copilot|you\.com|poe/i.test(utmSource)) ||
    (utmMedium && /llm|ai/i.test(utmMedium))

  if (!isLlmReferrer && !isLlmUtm) {
    return
  }

  win.sessionStorage.setItem('hd_llm_referrer', referrer)
  win.sessionStorage.setItem('hd_llm_referrer_host', referrerHost)
  if (utmSource) win.sessionStorage.setItem('hd_llm_utm_source', utmSource)
  if (utmMedium) win.sessionStorage.setItem('hd_llm_utm_medium', utmMedium)
  if (utmCampaign) win.sessionStorage.setItem('hd_llm_utm_campaign', utmCampaign)

  trackEvent('llm_referral', {
    event_category: 'acquisition',
    referrer,
    referrer_host: referrerHost,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
  })

  win.sessionStorage.setItem(storageKey, '1')
}

export const getLlmAttributionContext = (): LlmAttributionParams => getLlmAttributionParams()

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

