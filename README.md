# Honeydew Marketing Website

A beautiful, animated React website for the Honeydew family management app with blue-to-yellow gradient theme and smooth Framer Motion animations.

## 🚀 Running in Replit

### Option 1: Use the Run Button
Simply click the **Run** button in Replit. The website will start automatically and be available at the provided URL.

### Option 2: Manual Commands
If the run button doesn't work, try these commands in the Replit shell:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Option 3: Alternative Start Methods
```bash
# Using the start script
npm start

# Using the replit script
npm run replit

# Using the shell script
./run.sh
```

## 🌐 Access the Website

Once running, the website will be available at:
- **Replit**: Your Replit's provided URL (usually on port 80)
- **Local Development**: http://localhost:5173

## 🎨 Features

- ✨ **Animated Use Case Showcase** - Auto-rotating content
- 🌈 **Blue-to-Yellow Gradient Theme** - Beautiful Honeydew branding
- 🎭 **Framer Motion Animations** - Smooth transitions and interactions
- 📱 **Responsive Design** - Works on all devices
- 🚀 **Fast Performance** - Built with Vite and React

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons

## 🤖 Automation & CLI

- CLI integrations map: `CLI_INTEGRATIONS.md`
- Google Ads setup: `GOOGLE_ADS_SETUP.md`
- $5/day ads plan: `GOOGLE_ADS_5_DOLLAR_CAMPAIGN.md`
- End-to-end analytics: `ANALYTICS_END_TO_END.md`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx      # Navigation bar
│   ├── Hero.tsx        # Hero section with gradient
│   ├── UseCaseShowcase.tsx  # Animated use cases
│   ├── Features.tsx    # Feature grid
│   ├── HowItWorks.tsx  # Step-by-step process
│   ├── CallToAction.tsx # CTA with testimonials
│   └── Footer.tsx      # Footer with links
├── App.tsx             # Main app component
├── main.tsx           # React entry point
└── index.css          # Global styles and Tailwind
```

## 🎯 Key Components

1. **Hero Section** - Animated gradient background with floating elements
2. **Use Case Showcase** - Auto-rotating scenarios (Family, Friends, Travel, etc.)
3. **Features Grid** - Interactive feature cards with hover effects
4. **How It Works** - 4-step process with animations
5. **Testimonials** - Customer reviews with star ratings
6. **App Integration** - Demo view with iframe placeholder

## 🔧 Troubleshooting

### If you see "nix environment failed to build":

1. **Click "Recover original configuration files"** in the error dialog
2. **Or manually run these commands in the shell:**
   ```bash
   npm install
   npm run dev
   ```
3. **Alternative startup script:**
   ```bash
   ./start.sh
   ```

### Other common issues:

1. **Check the Console** - Look for any error messages
2. **Try Manual Install** - Run `npm install` in the shell
3. **Clear Cache** - Restart the Repl
4. **Check Port** - Ensure port 5173 is available
5. **Use Alternative Scripts** - Try `npm start` or `./run.sh`

### Quick Fix Commands:
```bash
# If run button fails, try these in order:
npm install && npm run dev
# or
./start.sh
# or
npm start
```

## 📝 Notes

- The website is optimized for both local development and Replit
- All animations and interactions work without JavaScript enabled
- The design is fully responsive and accessible
- Custom gradients and colors are defined in `src/index.css`

---

Made with ❤️ for families everywhere.
