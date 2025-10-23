# Blog Preview System - Quick Guide

## 🎯 How to Access

**Main Preview Page:**
Visit: `http://localhost:5173/blog-preview`

This page shows all 5 completed articles with:
- Article titles and descriptions
- Publish dates
- Reading time estimates
- Keywords
- Category tags

**Individual Articles:**
Click any article to read it, or visit directly:
- `http://localhost:5173/blog-preview/best-ai-calendar-apps-for-families-2025`
- `http://localhost:5173/blog-preview/best-voice-controlled-family-apps-2025`
- `http://localhost:5173/blog-preview/honeydew-vs-cozi-comparison-2025`
- `http://localhost:5173/blog-preview/best-family-organization-apps-2025`
- `http://localhost:5173/blog-preview/best-apps-multi-family-coordination-2025`

---

## 🚀 To View Now

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Visit in browser:**
   ```
   http://localhost:5173/blog-preview
   ```

3. **Review and provide feedback on:**
   - Typography and text styling
   - Heading hierarchy (H1, H2, H3)
   - Table styling
   - Code block styling
   - Link colors and hover states
   - Spacing and padding
   - Color scheme (matches Honeydew branding?)
   - Mobile responsiveness
   - Reading experience

---

## 📁 File Locations

**React Components:**
- `/src/pages/BlogPreviewPage.tsx` - List of all articles
- `/src/pages/BlogPostPreviewPage.tsx` - Individual article viewer
- `/src/App.tsx` - Updated with new routes

**Article Files:**
- `/blog/*.md` - Original markdown files
- `/public/blog/*.md` - Copies for web access

**Libraries Added:**
- `react-markdown` - Renders markdown to React
- `remark-gfm` - GitHub Flavored Markdown support
- `rehype-raw` - Raw HTML support in markdown

---

## 🎨 Current Styling Features

### Typography
- Headers use gradient effect (matching Honeydew brand)
- Body text is highly readable (prose-lg)
- Code blocks styled with syntax highlighting colors
- Blockquotes have blue left border

### Tables
- Responsive (horizontal scroll on mobile)
- Alternating row colors for readability
- Border and padding for clean look

### Special Elements
- ✅ Checkmarks styled in green
- ❌ Crosses styled in red  
- ⚠️ Warnings styled in yellow
- Tables have hover states

### Layout
- Max-width container for readability
- Sticky header for navigation
- Smooth animations (Framer Motion)
- Matches Honeydew gradient theme (blue → purple → yellow)

---

## 🔧 To Customize Styling

All styling is in: `/src/pages/BlogPostPreviewPage.tsx`

Look for the `prose` classes section (around line 110):
```tsx
<div className="prose prose-lg prose-blue max-w-none
  prose-headings:font-bold
  prose-h1:text-4xl
  // ... etc
">
```

Modify these Tailwind classes to adjust:
- Font sizes: `prose-h1:text-4xl` → `prose-h1:text-5xl`
- Colors: `prose-a:text-blue-600` → `prose-a:text-purple-600`
- Spacing: `prose-p:mb-4` → `prose-p:mb-6`

---

## 🚨 Hidden from Production

The `/blog-preview` route is:
- ✅ Not linked in navigation
- ✅ Not in sitemap (when you create one)
- ✅ Should add `noindex` meta tag for production
- ✅ Only for internal review

To make it production-safe, you can add password protection or remove the routes before deploying.

---

## 📋 What to Review

### Content
- [ ] All 5 articles load correctly
- [ ] Frontmatter metadata displays properly
- [ ] Markdown renders correctly
- [ ] Tables are readable and styled well
- [ ] Links work (internal and external)
- [ ] Code blocks styled appropriately

### Design
- [ ] Matches Honeydew branding
- [ ] Typography is readable
- [ ] Headings have proper hierarchy
- [ ] Spacing feels balanced
- [ ] Colors are on-brand
- [ ] Animations are smooth (not distracting)

### Mobile
- [ ] Responsive on phone screens
- [ ] Tables scroll horizontally if needed
- [ ] Text is readable at small sizes
- [ ] Navigation works on mobile

### Performance
- [ ] Articles load quickly
- [ ] No lag when scrolling
- [ ] Images (when added) load properly

---

## 🎬 Next Steps After Review

Once you approve the styling:

1. **Film TikTok content** (62 scripts ready!)
2. **Write articles 6-20** (on demand)
3. **Set up automated publishing** (date-based filtering)
4. **Deploy to production**
5. **Monitor LLM citations**

---

## 💡 Pro Tips

### Quick Styling Changes

**Make headers bigger:**
```tsx
prose-h1:text-5xl  // instead of text-4xl
```

**Change link color:**
```tsx
prose-a:text-purple-600  // instead of blue-600
```

**Adjust spacing:**
```tsx
prose-p:mb-6  // instead of mb-4 for more space
```

**Different gradient:**
```tsx
// In BlogPreviewPage.tsx, change:
bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50
// To something else like:
bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50
```

---

## 🐛 Troubleshooting

**Articles not loading?**
- Check that files are in `/public/blog/`
- Check browser console for errors
- Verify dev server is running

**Styling looks broken?**
- Clear browser cache
- Check Tailwind is compiling correctly
- Restart dev server

**Markdown not rendering?**
- Check react-markdown is installed
- Verify markdown syntax in files
- Check browser console for errors

---

**Ready to review! Let me know what adjustments you'd like to make.** 🎨

