import { ArrowRight } from 'lucide-react'
import { getEnabledStorePlatforms } from '../config/platforms'
import { trackLinkClick } from '../utils/analytics'
import { buildAppLink, getPrimaryDownloadDestination, trackAppStoreClick, type UTMParams } from '../utils/funnelTracking'
import AppStoreBadge from './AppStoreBadge'

type BadgeSize = 'sm' | 'md' | 'lg'
type Layout = 'stacked' | 'inline'
type Align = 'left' | 'center'

type DownloadCTAProps = {
  source: string
  medium: string
  campaign: string
  content?: string
  term?: string
  storeCampaign?: string
  additionalParams?: Record<string, unknown>
  primaryLabel?: string
  secondaryLabel?: string
  size?: BadgeSize
  layout?: Layout
  align?: Align
  className?: string
  buttonClassName?: string
  secondaryClassName?: string
  badgesClassName?: string
  showArrow?: boolean
}

export default function DownloadCTA({
  source,
  medium,
  campaign,
  content,
  term,
  storeCampaign,
  additionalParams = {},
  primaryLabel = 'Download on the App Store',
  secondaryLabel = 'Or try the web app. No download required.',
  size = 'md',
  layout = 'stacked',
  align = 'center',
  className = '',
  buttonClassName = '',
  secondaryClassName = '',
  badgesClassName = '',
  showArrow = true,
}: DownloadCTAProps) {
  const webParams: UTMParams = { medium, campaign, content, term }
  const primaryDestination = getPrimaryDownloadDestination(
    webParams,
    storeCampaign ?? `${source}_${campaign}`,
    'store_first',
  )
  const webHref = buildAppLink(webParams)
  const enabledStorePlatforms = getEnabledStorePlatforms()
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center'
  const flexLayout = layout === 'inline'
    ? 'flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'
    : 'flex-col gap-3'

  return (
    <div className={`flex ${flexLayout} ${alignment} ${className}`}>
      <a
        href={primaryDestination.href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClassName}
        onClick={() => {
          trackLinkClick({
            href: primaryDestination.href,
            source,
            medium,
            campaign,
            label: primaryLabel,
            additionalParams,
          })
          trackAppStoreClick(source, campaign, primaryDestination.platform)
        }}
      >
        <span className="inline-flex items-center gap-2">
          {primaryLabel}
          {showArrow && <ArrowRight className="h-4 w-4" />}
        </span>
      </a>

      {enabledStorePlatforms.length > 0 && (
        <div className={`flex flex-wrap gap-3 ${badgesClassName}`}>
          {enabledStorePlatforms.map(platform => (
            <AppStoreBadge
              key={platform}
              size={size}
              source={source}
              campaign={campaign}
              platform={platform}
            />
          ))}
        </div>
      )}

      <a
        href={webHref}
        target="_blank"
        rel="noopener noreferrer"
        className={secondaryClassName}
        onClick={() => {
          trackLinkClick({
            href: webHref,
            source: `${source}_web_secondary`,
            medium,
            campaign,
            label: 'Try the web app',
            additionalParams,
          })
          trackAppStoreClick(`${source}_web_secondary`, campaign, 'web')
        }}
      >
        {secondaryLabel}
      </a>
    </div>
  )
}
