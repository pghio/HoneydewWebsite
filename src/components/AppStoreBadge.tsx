import { trackLinkClick } from '../utils/analytics'
import { APP_LINKS, buildAppStoreLink, trackAppStoreClick } from '../utils/funnelTracking'

type BadgeSize = 'sm' | 'md' | 'lg'

interface AppStoreBadgeProps {
  size?: BadgeSize
  source: string
  campaign?: string
  className?: string
}

const SIZE_MAP: Record<BadgeSize, { width: number; height: number }> = {
  sm: { width: 120, height: 40 },
  md: { width: 150, height: 50 },
  lg: { width: 180, height: 60 },
}

export default function AppStoreBadge({
  size = 'md',
  source,
  campaign = 'app_store_badge',
  className = '',
}: AppStoreBadgeProps) {
  const { width, height } = SIZE_MAP[size]
  const href = buildAppStoreLink({ campaignToken: `${source}_${campaign}` })

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block ${className}`}
      onClick={() => {
        trackLinkClick({ href, source, medium: 'app_store_badge', campaign })
        trackAppStoreClick(source, campaign, 'ios')
      }}
      aria-label="Download Honeydew on the App Store"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 40"
        width={width}
        height={height}
        role="img"
        aria-hidden="true"
      >
        <title>Download on the App Store</title>
        <defs>
          <linearGradient id="appStoreBg" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
        </defs>
        <rect width="120" height="40" rx="6" fill="url(#appStoreBg)" stroke="#a6a6a6" strokeWidth=".5" />
        <text x="42.5" y="12" fill="#fff" fontSize="5.5" fontFamily="system-ui,-apple-system,sans-serif" letterSpacing=".04em">Download on the</text>
        <text x="42.5" y="27" fill="#fff" fontSize="11" fontFamily="system-ui,-apple-system,sans-serif" fontWeight="600" letterSpacing="-.02em">App Store</text>
        {/* Apple logo glyph */}
        <g transform="translate(14, 7.5)" fill="#fff">
          <path d="M12.37 12.63c-.02 2.37 1.96 3.53 2.05 3.58-.02.06-.32 1.11-1.06 2.2-.64.94-1.3 1.87-2.35 1.89-1.03.02-1.36-.62-2.53-.62s-1.54.6-2.52.64c-1.01.04-1.78-1.02-2.43-1.96C2.21 16.35 1.25 13.1 2.6 10.88c.67-1.1 1.86-1.8 3.15-1.82 1-.02 1.93.68 2.54.68.61 0 1.75-.84 2.95-.72.5.02 1.91.21 2.82 1.55-.07.05-1.68 1-1.67 2.96m-1.94-5.78c.54-.66.9-1.57.8-2.48-.78.03-1.71.53-2.27 1.18-.5.58-.94 1.51-.82 2.4.86.07 1.74-.45 2.29-1.1" />
        </g>
      </svg>
    </a>
  )
}

/**
 * Minimal text-style link for tight spaces (e.g. sticky bars).
 */
export function AppStoreTextLink({
  source,
  campaign = 'app_store_text',
  className = '',
}: Omit<AppStoreBadgeProps, 'size'>) {
  const href = buildAppStoreLink({ campaignToken: `${source}_${campaign}` })

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-xs font-medium underline underline-offset-2 decoration-current/40 hover:decoration-current transition-colors ${className}`}
      onClick={() => {
        trackLinkClick({ href, source, medium: 'app_store_text', campaign })
        trackAppStoreClick(source, campaign, 'ios')
      }}
    >
      <AppleIcon className="w-3 h-3" />
      Available on the App Store
    </a>
  )
}

function AppleIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12.37 12.63c-.02 2.37 1.96 3.53 2.05 3.58-.02.06-.32 1.11-1.06 2.2-.64.94-1.3 1.87-2.35 1.89-1.03.02-1.36-.62-2.53-.62s-1.54.6-2.52.64c-1.01.04-1.78-1.02-2.43-1.96C2.21 16.35 1.25 13.1 2.6 10.88c.67-1.1 1.86-1.8 3.15-1.82 1-.02 1.93.68 2.54.68.61 0 1.75-.84 2.95-.72.5.02 1.91.21 2.82 1.55-.07.05-1.68 1-1.67 2.96m-1.94-5.78c.54-.66.9-1.57.8-2.48-.78.03-1.71.53-2.27 1.18-.5.58-.94 1.51-.82 2.4.86.07 1.74-.45 2.29-1.1" transform="translate(-1.5,-4.37)" />
    </svg>
  )
}

export { APP_LINKS }
