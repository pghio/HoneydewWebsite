#!/bin/bash

echo "🍯 Starting Honeydew Website for Replit..."
echo "🔧 Fixing any git issues..."

# Reset any git conflicts
git reset --hard HEAD 2>/dev/null || echo "No git reset needed"
git clean -fd 2>/dev/null || echo "No git clean needed"

echo "📦 Installing dependencies..."
npm install

echo "🚀 Starting development server..."
echo "✨ Website will be available at your Replit URL"
echo "🌐 Look for the webview popup or check the 'Webview' tab"

npm run dev
