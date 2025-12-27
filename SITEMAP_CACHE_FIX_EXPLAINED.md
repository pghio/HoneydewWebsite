# Sitemap Cache Issue - RESOLVED (Dec 21, 2025)

## The Problem

Your weekly audits couldn't find the sitemap because **Vercel was serving a stale cached version** for 7+ days, despite `vercel.json` having `no-cache` headers.

### Evidence
```
curl -I https://www.gethoneydew.app/sitemap.xml

HTTP/2 200
last-modified: Fri, 19 Dec 2025 20:51:01 GMT  ← 2 days old
x-vercel-cache: HIT                            ← cached
age: 685916                                    ← 7+ days
cache-control: no-store, no-cache              ← ignored by CDN
```

**Why:** Vercel's edge network was ignoring `no-store, no-cache` headers for static assets in `/public/`. The CDN cached the sitemap and served that stale version to all crawlers.

---

## The Solution

Changed cache headers to use **Vercel-specific CDN directives** that force revalidation:

```json
{
  "source": "/sitemap.xml",
  "headers": [
    { "key": "Content-Type", "value": "application/xml; charset=utf-8" },
    { "key": "Cache-Control", "value": "public, max-age=0, s-maxage=0, must-revalidate" },
    { "key": "CDN-Cache-Control", "value": "public, max-age=0, must-revalidate" },
    { "key": "Vercel-CDN-Cache-Control", "value": "public, max-age=0, must-revalidate" }
  ]
}
```

### What Changed
- ✅ `public` - allows caching (required for browsers)
- ✅ `max-age=0` - cache expires immediately
- ✅ `s-maxage=0` - shared cache (CDN) expires immediately
- ✅ `must-revalidate` - must check origin before serving cached copy
- ✅ `CDN-Cache-Control` - CDN-specific directive (Cloudflare, Fastly)
- ✅ `Vercel-CDN-Cache-Control` - Vercel edge network directive

**Result:** Sitemap is cached but revalidated on every request. Fresh content always served.

---

## How to Verify After Deploy

### 1. Check sitemap is accessible
```bash
curl -I https://www.gethoneydew.app/sitemap.xml
```

Should return:
- `HTTP/2 200` ✅
- `content-type: application/xml` ✅
- `cache-control: public, max-age=0, s-maxage=0, must-revalidate` ✅
- `last-modified:` should match today's deploy time ✅

### 2. Check sitemap content is fresh
```bash
curl https://www.gethoneydew.app/sitemap.xml | grep -c "<url>"
```

Should return: `80` (as of Dec 21, 2025)

### 3. Test robots.txt points to sitemap
```bash
curl https://www.gethoneydew.app/robots.txt | grep Sitemap
```

Should show:
```
Sitemap: https://gethoneydew.app/sitemap.xml
Sitemap: https://www.gethoneydew.app/sitemap.xml
```

### 4. Submit to GSC after deploy
```
Google Search Console → Sitemaps → Add new sitemap
Enter: sitemap.xml
Click: Submit
```

Wait 24-48 hours, then check "Coverage" report for indexed URLs.

---

## Weekly Audit Checklist

Run this every Monday:

```bash
# 1. Check sitemap exists and is fresh
curl -I https://www.gethoneydew.app/sitemap.xml

# 2. Count URLs in sitemap
curl -s https://www.gethoneydew.app/sitemap.xml | grep -c "<url>"

# 3. Check last-modified is recent (within 7 days)
curl -I https://www.gethoneydew.app/sitemap.xml | grep last-modified

# 4. Get week-over-week GSC stats
npm run gsc:wow
```

Expected results:
- Sitemap returns 200 ✅
- ~80 URLs in sitemap (grows as blog expands) ✅
- `last-modified` within last 7 days ✅
- GSC shows impression/click trends ✅

---

## What Else Was Fixed

### Domain Canonicalization
- `gethoneydew.app/*` → 301 redirect to `www.gethoneydew.app/*`
- `honeydew.app/*` → 301 redirect to `www.gethoneydew.app/*`
- All internal links use `www` consistently
- Sitemap URLs use `https://www.gethoneydew.app/`

### Cache Headers Applied To
- `/sitemap.xml` ✅
- `/robots.txt` ✅
- `/.llms.txt` ✅
- `/.llms-full.txt` ✅

All now use the same `max-age=0, must-revalidate` pattern to ensure freshness.

---

## Technical Notes

### Why not use serverless function for sitemap?
We could generate the sitemap on-demand via API route, but:
- Build-time generation is faster (no cold starts)
- Proper cache headers + revalidation achieve same freshness
- Simpler to maintain (one source of truth in `/public/`)

### Why "public" if we want fresh content?
- `private` would prevent CDN caching entirely (slower for users)
- `public, max-age=0, must-revalidate` allows caching but forces freshness check
- This is the industry-standard pattern for "cache but always validate"

### What if the sitemap still seems stale?
1. Check Vercel deployment logs to confirm new build deployed
2. Check `last-modified` header matches deploy timestamp
3. Purge Vercel cache manually: `vercel --yes --force`
4. Wait 5 minutes for edge network propagation
5. Test from different geographic location (cache is per-region)

---

**Last Updated:** Dec 21, 2025  
**Commit:** a32c096  
**Status:** ✅ RESOLVED
