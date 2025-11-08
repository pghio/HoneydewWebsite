import { test, expect } from '@playwright/test'
import postsData from '../src/data/blog/posts.json' assert { type: 'json' }

type BlogPost = {
  slug: string
}

const blogPosts: BlogPost[] = (postsData as { posts: BlogPost[] }).posts

const focusSlugs = [
  'honeydew-vs-cozi-comparison-2025',
  'best-voice-controlled-family-apps-2025',
]

test.describe('Blog visual audit', () => {
  for (const slug of focusSlugs) {
    test(`ensures table and list styling for ${slug}`, async ({ page }) => {
      await page.goto(`/blog/${slug}`, { waitUntil: 'networkidle' })

      await expect(page.locator('article')).toBeVisible()

      const firstTable = page.locator('article table').first()
      if (await firstTable.count()) {
        await expect(firstTable).toHaveAttribute('class', /divide-y/)

        const hasBorderStyling = await firstTable.evaluate(el => {
          const tableElement = el as HTMLTableElement
          const container = tableElement.parentElement?.parentElement
          if (!container) {
            return false
          }
          const styles = getComputedStyle(container as HTMLElement)
          return (
            container.className.includes('border') ||
            styles.borderTopWidth !== '0px' ||
            styles.boxShadow !== 'none'
          )
        })

        expect(
          hasBorderStyling,
          'Expected comparison table to retain visible border styling',
        ).toBeTruthy()
      }

      const firstList = page.locator('article ul').first()
      await expect(firstList).toBeVisible()
      const listStyle = await firstList.evaluate(el => getComputedStyle(el).listStyleType)
      expect(listStyle).not.toBe('none')
    })

    test(`captures visual snapshot for ${slug}`, async ({ page }, testInfo) => {
      await page.goto(`/blog/${slug}`, { waitUntil: 'networkidle' })
      await expect(page.locator('article')).toBeVisible()

      const screenshotPath = testInfo.outputPath(`blog-${slug}.png`)
      await page.screenshot({ path: screenshotPath, fullPage: true })
      testInfo.attachments.push({
        name: `blog-${slug}`,
        path: screenshotPath,
        contentType: 'image/png',
      })
    })
  }
})

test('All blog posts render without console errors', async ({ page }) => {
  const collectedErrors: string[] = []

  page.on('pageerror', error => {
    collectedErrors.push(`Page error: ${error.message}`)
  })

  page.on('console', message => {
    if (message.type() === 'error') {
      collectedErrors.push(`Console error: ${message.text()}`)
    }
  })

  for (const { slug } of blogPosts) {
    await page.goto(`/blog/${slug}`, { waitUntil: 'networkidle' })
    await expect(page.locator('article')).toBeVisible()
  }

  expect(
    collectedErrors,
    collectedErrors.length
      ? `Found console errors while loading blog posts:\n${collectedErrors.join('\n')}`
      : 'No console errors detected while loading blog posts',
  ).toHaveLength(0)
})

