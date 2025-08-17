#!/bin/bash

echo "🍯 Starting Honeydew Website for Replit..."
echo "🔧 Fixing any git issues..."

# Reset any git conflicts
git reset --hard HEAD 2>/dev/null || echo "No git reset needed"
git clean -fd 2>/dev/null || echo "No git clean needed"

echo "📦 Installing dependencies..."
npm install

echo "🚀 Starting development server on port 3000..."
echo "✨ Website will be available at your Replit URL"
echo "🌐 Look for the webview popup or check the 'Webview' tab"

# Kill any existing processes on ports 5173 or 3000
pkill -f vite 2>/dev/null || true
pkill -f node 2>/dev/null || true
sleep 2

npm run dev -- --port 3000
