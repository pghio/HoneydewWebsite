# Alt Text Policy for Honeydew Website

## Purpose
This policy ensures all images on the Honeydew website have descriptive, accessible alt text that improves SEO and user experience for screen readers and search engines.

## Alt Text Guidelines

### ✅ What to Include
- **Describe the content and function**: What does the image show? What purpose does it serve?
- **Be specific and descriptive**: Include relevant details about people, objects, actions, and context
- **Consider the context**: How does this image relate to the surrounding content?
- **Keep it concise**: 125 characters or less, but comprehensive
- **Include Honeydew branding** when relevant: Mention "Honeydew" for product screenshots

### ❌ What to Avoid
- Generic descriptions like "image" or "photo"
- Starting with "Image of..." or "Photo of..."
- Keyword stuffing (unnatural repetition of keywords)
- Copyrighted text reproduction in alt text
- Emojis or special characters

### 📝 Examples

#### Good Alt Text
```
Honeydew AI family assistant interface showing natural language meal planning request and instant response with organized shopping list
```

```
Family calendar view in Honeydew app displaying soccer practice, grocery shopping, and meal planning events
```

```
Screenshot of Honeydew voice input feature with Whisper AI transcription for "plan camping trip" request
```

#### Bad Alt Text
```
Image
Photo
Screenshot
Family app
```

## Implementation Checklist

### For New Images
- [ ] Does the image convey important information?
- [ ] Is the alt text descriptive of the image content?
- [ ] Does it include Honeydew branding where relevant?
- [ ] Is it under 125 characters?
- [ ] Does it avoid generic terms?

### For Existing Images
- [ ] Review all `<img>` tags in components
- [ ] Check blog post images in markdown files
- [ ] Verify social media meta tags (og:image, twitter:image)
- [ ] Test with screen reader tools

## Technical Implementation

### React Components
```tsx
<img
  src="/path/to/image.jpg"
  alt="Honeydew AI family assistant interface showing natural language meal planning request and instant response with organized shopping list"
  className="..."
/>
```

### Markdown Files
```markdown
![Honeydew AI family assistant interface showing natural language meal planning request and instant response with organized shopping list](/path/to/image.jpg)
```

### Schema.org Integration
Alt text automatically enhances image SEO when included in Article structured data.

## Priority Levels

### 🔴 High Priority (Fix Immediately)
- Hero images and main CTAs
- Product screenshots and demos
- Social media meta images (og-image, twitter-card)
- Images in blog posts and case studies

### 🟡 Medium Priority (Fix Soon)
- Icon images and decorative elements
- Background images with text overlay
- Images in comparison pages

### 🟢 Low Priority (Fix When Possible)
- Purely decorative images
- Images that don't convey information

## Tools for Testing

### Automated
- WAVE Web Accessibility Evaluation Tool
- axe DevTools browser extension
- Lighthouse accessibility audit

### Manual
- Browser developer tools (disable images, check alt text)
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard navigation testing

## SEO Benefits

- **Improved search rankings**: Search engines use alt text to understand image content
- **Better accessibility**: Screen readers can describe images to visually impaired users
- **Enhanced user experience**: Users with slow connections see descriptive text
- **Social media optimization**: Alt text appears when images fail to load on social platforms

## Review Process

### Before Publishing
- [ ] Run accessibility audit
- [ ] Check all images have alt text
- [ ] Test page with images disabled
- [ ] Verify alt text is descriptive, not generic

### Monthly Review
- [ ] Audit random sample of pages
- [ ] Check for missing alt text
- [ ] Update policy based on new image types

## Contact
For questions about alt text implementation, contact the development team.

---

**Last Updated:** November 2025
**Version:** 1.0
