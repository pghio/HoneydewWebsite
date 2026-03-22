export type PlatformKey = 'ios' | 'android' | 'web'
export type StorePlatformKey = Exclude<PlatformKey, 'web'>

type PlatformConfig = {
  enabled: boolean
  name: string
  url: string
  ctaText: string
  ctaTextShort: string
  badgeAlt: string
}

export const PLATFORMS: Record<PlatformKey, PlatformConfig> = {
  ios: {
    enabled: true,
    name: 'App Store',
    url: 'https://apps.apple.com/us/app/honeydew-family-calendar/id6752225362',
    ctaText: 'Download on the App Store',
    ctaTextShort: 'Get it on iPhone',
    badgeAlt: 'Download on the App Store',
  },
  android: {
    enabled: false,
    name: 'Google Play',
    url: 'https://play.google.com/store/apps/details?id=app.gethoneydew.honeydew',
    ctaText: 'Get it on Google Play',
    ctaTextShort: 'Get it on Android',
    badgeAlt: 'Get it on Google Play',
  },
  web: {
    enabled: true,
    name: 'Web App',
    url: 'https://app.gethoneydew.app/',
    ctaText: 'Try on the web',
    ctaTextShort: 'Web app',
    badgeAlt: 'Try Honeydew on the web',
  },
}

export const STORE_PLATFORMS: StorePlatformKey[] = ['ios', 'android']

export const getEnabledStorePlatforms = (): StorePlatformKey[] =>
  STORE_PLATFORMS.filter(platform => PLATFORMS[platform].enabled)

export const getPrimaryStorePlatform = (): StorePlatformKey | null => {
  const enabledStores = getEnabledStorePlatforms()
  return enabledStores[0] ?? null
}
