#!/usr/bin/env node

/**
 * Generate a Google Ads refresh token via local OAuth flow.
 *
 * Requirements:
 * - GOOGLE_ADS_CLIENT_ID
 * - GOOGLE_ADS_CLIENT_SECRET
 *
 * Optional:
 * - OAUTH_REDIRECT_URI (default: http://localhost:8080)
 */

import http from 'http'
import { google } from 'googleapis'

const sanitizeEnvValue = value => value?.trim().replace(/\\n/g, '')

const CLIENT_ID = sanitizeEnvValue(process.env.GOOGLE_ADS_CLIENT_ID)
const CLIENT_SECRET = sanitizeEnvValue(process.env.GOOGLE_ADS_CLIENT_SECRET)
const DEFAULT_PORT = process.env.OAUTH_REDIRECT_PORT?.trim() || '8080'
const REDIRECT_URI =
  process.env.OAUTH_REDIRECT_URI?.trim() || `http://localhost:${DEFAULT_PORT}`

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing GOOGLE_ADS_CLIENT_ID or GOOGLE_ADS_CLIENT_SECRET.')
  console.error('Set them in your shell, then re-run this script.')
  process.exit(1)
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
const scopes = ['https://www.googleapis.com/auth/adwords']

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: scopes,
})

console.log('\n1) Open this URL in your browser:\n')
console.log(authUrl + '\n')
console.log(`2) After approving, you will be redirected to:\n   ${REDIRECT_URI}`)
console.log('3) The URL will include ?code=... — this script will capture it.\n')

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', REDIRECT_URI)
    const code = url.searchParams.get('code')
    const error = url.searchParams.get('error')

    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/plain' })
      res.end(`OAuth error: ${error}`)
      server.close()
      return
    }

    if (!code) {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('Waiting for OAuth code...')
      return
    }

    const { tokens } = await oauth2Client.getToken(code)
    const refreshToken = tokens.refresh_token

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Success! You can close this tab and return to the terminal.')

    console.log('\n✅ OAuth completed.')
    if (!refreshToken) {
      console.log('⚠️  No refresh token returned. Make sure you used prompt=consent.')
    } else {
      console.log('\nYour refresh token (store it securely):\n')
      console.log(refreshToken + '\n')
    }
  } catch (err) {
    console.error('Failed to exchange code for tokens:', err.message)
  } finally {
    server.close()
  }
})

server.listen(Number(new URL(REDIRECT_URI).port || DEFAULT_PORT), () => {
  console.log(`Listening on ${REDIRECT_URI} ...`)
})

server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port already in use for ${REDIRECT_URI}.`)
    console.error('Set OAUTH_REDIRECT_PORT=8081 (or another free port) and re-run.')
    return
  }
  console.error('Server error:', error.message)
})






