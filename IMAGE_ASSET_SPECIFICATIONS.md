# Honeydew - Missing Image Asset Specifications

**Created:** October 23, 2025  
**Priority:** CRITICAL - Required for social sharing and SEO

---

## 🚨 REQUIRED IMAGES

### 1. Open Graph Image (Facebook/LinkedIn)
**Filename:** `og-image-ai.jpg`  
**Location:** `/public/og-image-ai.jpg`  
**Dimensions:** 1200 × 630 pixels  
**Format:** JPG (optimized for web, ~200KB max)  
**Referenced in:** `index.html` line 56

#### Design Requirements:
- **Background:** Gradient from purple (#8B5CF6) to blue (#3B82F6)
- **Main Text:** "Honeydew - Your AI-Powered Family Assistant"
- **Subtext:** "Just Tell It What You Need • Type, Speak, or Photograph"
- **Visual Elements:** 
  - AI robot icon (🤖)
  - Voice waves icon (🎙️)
  - Calendar icon (📅)
  - Camera/photo icon (📸)
- **Logo:** Honeydew heart icon (top left or centered)
- **Color Scheme:** Match website brand colors (purple/blue gradient)
- **Font:** Clean, modern sans-serif (Poppins, Inter, or similar)

#### Content Hierarchy:
```
[Logo: Honeydew Heart]

Honeydew
Your AI-Powered Family Assistant

🤖 Natural Language AI  •  🎙️ Voice Commands  •  📸 Image Processing

"Just Tell It What You Need"
```

#### Why This Matters:
When someone shares honeydew.app on Facebook, LinkedIn, or Slack, this is the image that appears. It's your first impression for social traffic.

---

### 2. Twitter Card Image
**Filename:** `twitter-card-ai.jpg`  
**Location:** `/public/twitter-card-ai.jpg`  
**Dimensions:** 1200 × 600 pixels (Twitter's optimal ratio)  
**Format:** JPG (optimized for web, ~200KB max)  
**Referenced in:** `index.html` line 63

#### Design Requirements:
Similar to OG image but optimized for Twitter's 2:1 aspect ratio:
- **Background:** Same gradient (purple to blue)
- **Main Text:** "AI-Powered Family Assistant"
- **Subtext:** "Natural Language • Voice • Images"
- **Visual:** More horizontal layout to fit 2:1 ratio
- **Emoji:** 🤖 prominently featured

#### Layout Suggestion:
```
[Left side: Honeydew Logo + AI Robot Icon]
[Right side: 
  Honeydew
  AI-Powered Family Assistant
  
  ✓ Natural Language Understanding
  ✓ Voice Commands
  ✓ Image Processing
]
```

#### Why This Matters:
Twitter/X card images have different dimensions than OG images. Without this, Twitter will crop og-image-ai.jpg awkwardly.

---

### 3. Company Logo (High-Res)
**Filename:** `logo.png`  
**Location:** `/public/logo.png`  
**Dimensions:** 512 × 512 pixels (square)  
**Format:** PNG with transparent background  
**Referenced in:** `index.html` line 149 (Organization schema)

#### Design Requirements:
- **Visual:** Honeydew heart icon (from navbar)
- **Background:** TRANSPARENT (PNG)
- **Colors:** Use the gradient effect from the site
- **Resolution:** High-DPI ready (512×512 minimum, 1024×1024 ideal)
- **Padding:** Include ~10% padding around the icon so it doesn't feel cramped

#### Why This Matters:
- Used in search engine knowledge panels
- Shows up in Google Business Profile (if you create one)
- Used by LLMs when displaying information about Honeydew
- Required for proper structured data implementation

---

### 4. Favicon (Website Icon)
**Filename:** `favicon.ico`  
**Location:** `/public/favicon.ico`  
**Dimensions:** Multiple sizes in one file (16×16, 32×32, 48×48)  
**Format:** ICO (multi-resolution icon file)  
**Currently:** Using default Vite logo (`/vite.svg`)

#### Design Requirements:
- **Visual:** Simplified Honeydew heart icon
- **Colors:** Recognizable even at 16×16 pixels
- **Simplification:** May need to simplify gradient to solid color at small sizes
- **Backup formats:** Also create `favicon-16x16.png`, `favicon-32x32.png`, and `apple-touch-icon.png` (180×180)

#### Why This Matters:
The favicon appears in:
- Browser tabs
- Bookmark lists
- Browser history
- Mobile home screen shortcuts
- Professional appearance indicator

---

## 🎨 DESIGN TOOLS & RESOURCES

### Option 1: Use Canva (Easiest)
1. Go to [canva.com](https://canva.com)
2. Use these templates:
   - "Facebook Post" → Resize to 1200×630
   - "Twitter Post" → Resize to 1200×600
   - "Logo" → 512×512 square
3. Use Honeydew brand colors:
   - Purple: #8B5CF6
   - Blue: #3B82F6
   - Gradient: from-purple-500 to-blue-500

### Option 2: Use Figma (Professional)
Template dimensions:
- Frame 1: 1200×630 (OG Image)
- Frame 2: 1200×600 (Twitter Card)
- Frame 3: 512×512 (Logo)

### Option 3: Hire on Fiverr
Search: "social media image design" or "OG image design"
Budget: $15-50 for all 4 images
Turnaround: 24-48 hours

### Option 4: AI Generation (Fast but less polished)
Use DALL-E, Midjourney, or Stable Diffusion with this prompt:

```
Professional social media banner for AI family assistant app called Honeydew, 
purple to blue gradient background, modern clean design, 
featuring AI robot emoji, microphone icon, calendar icon, camera icon, 
text "Honeydew - Your AI-Powered Family Assistant", 
minimalist tech aesthetic, high quality, 1200x630 pixels
```

---

## 📋 IMPLEMENTATION CHECKLIST

### After Creating Images:

1. **Upload to `/public/` directory:**
   ```
   /public/og-image-ai.jpg
   /public/twitter-card-ai.jpg
   /public/logo.png
   /public/favicon.ico
   ```

2. **Verify references in `index.html`:**
   ```html
   <!-- Line 5 -->
   <link rel="icon" type="image/x-icon" href="/favicon.ico" />
   
   <!-- Line 56 -->
   <meta property="og:image" content="/og-image-ai.jpg">
   
   <!-- Line 63 -->
   <meta name="twitter:image" content="/twitter-card-ai.jpg">
   
   <!-- Line 149 -->
   "logo": "https://www.honeydew.app/logo.png"
   ```

3. **Test with validators:**
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

4. **Clear cache:**
   - Social platforms cache images for 7+ days
   - Use `?v=2` query parameter if you update images later
   - Example: `/og-image-ai.jpg?v=2`

---

## 🚀 QUICK START (If You Need Help)

### Can't Design?
**Quick Solution:** Use existing screenshots of your app interface as OG images:
1. Take a clean screenshot of the hero section
2. Add text overlay: "Honeydew - AI Family Assistant"
3. Save at 1200×630
4. Not perfect, but better than broken images

### Need Logo Fast?
**Temporary Solution:** Use a simple SVG with Honeydew colors:
```svg
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#grad)" rx="128"/>
  <text x="256" y="320" font-size="280" text-anchor="middle" fill="white">🤍</text>
</svg>
```
Save this as PNG at 512×512.

---

## 📊 EXPECTED IMPACT

**Before (Current State):**
- ❌ Social shares show broken image icon
- ❌ No visual brand recognition
- ❌ Looks unprofessional/incomplete
- ❌ Lower click-through rates on shares

**After (With Proper Images):**
- ✅ Professional social media presence
- ✅ 2-3× higher CTR on social shares
- ✅ Better brand recognition
- ✅ Improved trust signals
- ✅ Proper search engine indexing
- ✅ LLMs can display your logo

---

## 🎯 PRIORITY ORDER

1. **CRITICAL (Do First):** 
   - `og-image-ai.jpg` - Most important for social sharing
   - `logo.png` - Needed for search engines

2. **HIGH (Do This Week):**
   - `twitter-card-ai.jpg` - Platform-specific optimization
   - `favicon.ico` - Browser branding

3. **NICE TO HAVE:**
   - Apple touch icon (180×180)
   - Multiple favicon sizes
   - Blog post specific OG images

---

## 💡 PRO TIPS

1. **Test Images Before Upload:**
   - View at actual size (1200×630) - does text look crisp?
   - View at thumbnail size (200×100) - is it still readable?
   - Check on mobile - does it make sense at small size?

2. **Optimize File Size:**
   - Use [TinyPNG](https://tinypng.com/) to compress images
   - Target: <200KB per image
   - Faster loading = better SEO

3. **Keep Source Files:**
   - Save Canva/Figma projects for future updates
   - Easy to iterate when you add new features

4. **Version Control:**
   - When updating images, change filename or add `?v=2` to URL
   - Social platforms aggressively cache OG images

---

## 🆘 NEED HELP?

I can:
1. ✅ Generate the HTML to update `index.html` with proper favicon references
2. ✅ Provide more detailed design specifications
3. ✅ Review your designed images before upload
4. ✅ Help debug if images aren't showing correctly

Just ask and I'll help implement!

