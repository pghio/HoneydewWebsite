import { test, expect, Page } from '@playwright/test'

const blogSlug = 'honeydew-vs-cozi-comparison-2025'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => unknown
  }
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const win = window as Window &
      typeof globalThis & {
        __analyticsEvents?: Array<unknown[]>
        __windowOpenCalls?: Array<Parameters<Window['open']>>
        dataLayer?: any[] & { push?: (...args: any[]) => number }
      }
    win.__analyticsEvents = []
    win.__windowOpenCalls = []
    const dataLayer = (win.dataLayer ?? []) as Array<unknown> & { push: (...args: any[]) => number }
    win.dataLayer = dataLayer

    const originalPush = dataLayer.push.bind(dataLayer)
    dataLayer.push = (...args: unknown[]) => {
      const [first] = args
      if (first) {
        const normalized = Array.isArray(first) ? first : Array.from(first as IArguments)
        win.__analyticsEvents?.push(normalized as unknown[])
      }
      return originalPush(...args)
    }

    win.open = (...args) => {
      win.__windowOpenCalls?.push(args)
      return null
    }
  })
})

const getEvents = (page: Page) =>
  page.evaluate(() => (window as typeof window & { __analyticsEvents?: Array<unknown[]> }).__analyticsEvents ?? [])


test('navbar CTA emits conversion event with source metadata', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.evaluate(() => {
    window.gtag?.('event', '__probe', { probe: true })
  })

  const probeEvents = await getEvents(page)
  expect(probeEvents.some(event => Array.isArray(event) && event[0] === 'event' && event[1] === '__probe')).toBeTruthy()

  const navCta = page.locator('nav a', { hasText: 'Try Honeydew' })
  await navCta.click()

  await page.waitForFunction(() => {
    const events = (window as typeof window & { __analyticsEvents?: Array<unknown[]> }).__analyticsEvents ?? []
    return events.some(event => Array.isArray(event) && event[0] === 'event' && event[1] === 'cta_click')
  })

  const events = await getEvents(page)
  const ctaEvent = events.find(event => Array.isArray(event) && event[0] === 'event' && event[1] === 'cta_click') as unknown[] | undefined
  const ctaParams = (ctaEvent?.[2] ?? {}) as Record<string, unknown>
  expect(ctaEvent).toBeTruthy()
  expect(ctaParams).toMatchObject({
    link_source: 'navbar',
    link_variant: 'desktop',
    link_medium: 'navigation',
  })
})

test('hero CTA records analytics event before navigation', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const heroSection = page.locator('section', { hasText: 'Just Tell Honeydew' })
  await heroSection.locator('a:has-text("Try Honeydew Free")').first().click()

  await page.waitForFunction(() => {
    const events = (window as typeof window & { __analyticsEvents?: Array<unknown[]> }).__analyticsEvents ?? []
    return events.some(event => Array.isArray(event) && event[0] === 'event' && event[1] === 'cta_click' && (event[2] as Record<string, unknown>).link_source === 'hero')
  })

  const events = await getEvents(page)
  const ctaEvent = events.find(
    event =>
      Array.isArray(event) &&
      event[0] === 'event' &&
      event[1] === 'cta_click' &&
      ((event[2] as Record<string, unknown>).link_source === 'hero'),
  ) as unknown[] | undefined

  const heroParams = (ctaEvent?.[2] ?? {}) as Record<string, unknown>
  expect(ctaEvent).toBeTruthy()
  expect(heroParams).toMatchObject({
    link_source: 'hero',
    link_medium: 'page_section',
  })
})

test('blog page emits page_view and footer CTA analytics events', async ({ page }) => {
  await page.goto(`/blog/${blogSlug}`, { waitUntil: 'networkidle' })

  await page.waitForFunction(expectedPath => {
    const events = (window as typeof window & { __analyticsEvents?: Array<unknown[]> }).__analyticsEvents ?? []
    return events.some(event => Array.isArray(event) && event[0] === 'event' && event[1] === 'page_view' && (event[2] as Record<string, unknown>).page_path === expectedPath)
  }, `/blog/${blogSlug}`)

  const events = await getEvents(page)
  const pageView = events.find(event => Array.isArray(event) && event[0] === 'event' && event[1] === 'page_view') as unknown[] | undefined
  const pageViewParams = (pageView?.[2] ?? {}) as Record<string, unknown>
  expect(pageView).toBeTruthy()
  expect(pageViewParams).toMatchObject({
    page_path: `/blog/${blogSlug}`,
  })

  const footerCta = page.locator('a[href*="utm_campaign=blog_cta"]')
  await footerCta.first().click()

  await page.waitForFunction(() => {
    const events = (window as typeof window & { __analyticsEvents?: Array<unknown[]> }).__analyticsEvents ?? []
    return events.some(event => Array.isArray(event) && event[0] === 'event' && event[1] === 'cta_click' && (event[2] as Record<string, unknown>).link_source === 'blog_post_footer')
  })

  const refreshedEvents = await getEvents(page)
  const footerEvent = refreshedEvents.find(
    event =>
      Array.isArray(event) &&
      event[0] === 'event' &&
      event[1] === 'cta_click' &&
      (event[2] as Record<string, unknown>).link_source === 'blog_post_footer',
  ) as unknown[] | undefined

  const footerParams = (footerEvent?.[2] ?? {}) as Record<string, unknown>
  expect(footerEvent).toBeTruthy()
  expect(footerParams).toMatchObject({
    link_source: 'blog_post_footer',
    blog_slug: blogSlug,
  })
})

test('case study expansion triggers engagement analytics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const caseStudies = page.locator('#case-studies .group').first()
  await caseStudies.click()

  await page.waitForFunction(() => {
    const events = (window as typeof window & { __analyticsEvents?: Array<unknown[]> }).__analyticsEvents ?? []
    return events.some(event => Array.isArray(event) && event[0] === 'event' && event[1] === 'case_study_expand')
  })

  const events = await getEvents(page)
  const expandEvent = events.find(event => Array.isArray(event) && event[0] === 'event' && event[1] === 'case_study_expand') as unknown[] | undefined
  const expandParams = (expandEvent?.[2] ?? {}) as Record<string, unknown>
  expect(expandEvent).toBeTruthy()
  expect(expandParams).toHaveProperty('case_study_id')
})

