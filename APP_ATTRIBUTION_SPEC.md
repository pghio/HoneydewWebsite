# Honeydew App Attribution Implementation Spec

**Version:** 1.0  
**Date:** December 2025  
**For:** App Development Team  
**Priority:** High (implement before/at App Store launch)

---

## Overview

This spec enables end-to-end funnel tracking from website visit → app download → signup → activation → subscription. Users arrive at the app via UTM-tagged URLs from the website. We need to capture these parameters and persist them for attribution reporting.

---

## Part 1: UTM Parameter Capture

### 1.1 URL Structure

Users arrive at the app via URLs like:
```
https://app.gethoneydew.app/?utm_source=website&utm_medium=blog_cta&utm_campaign=article_conversion&utm_content=skylight-vs-hearth-display
```

### 1.2 Parameters to Capture

| Parameter | Description | Example Values |
|-----------|-------------|----------------|
| `utm_source` | Traffic origin | `website`, `blog`, `email`, `social`, `ads` |
| `utm_medium` | Marketing medium | `hero`, `cta_section`, `blog_cta`, `footer`, `navbar` |
| `utm_campaign` | Campaign name | `primary_cta`, `article_conversion`, `vs_skylight` |
| `utm_content` | Content variant | Article slug, CTA variant, A/B test ID |
| `utm_term` | Search term (optional) | Paid search keywords |

### 1.3 Capture Logic (Pseudocode)

```typescript
// On app launch / deep link handler
function captureAttribution(url: string): AttributionData | null {
  const params = new URLSearchParams(new URL(url).search)
  
  // Only capture if UTM params present
  if (!params.has('utm_source') && !params.has('utm_medium')) {
    return null
  }
  
  return {
    source: params.get('utm_source') || 'direct',
    medium: params.get('utm_medium') || 'none',
    campaign: params.get('utm_campaign') || 'none',
    content: params.get('utm_content') || null,
    term: params.get('utm_term') || null,
    capturedAt: new Date().toISOString(),
    appVersion: APP_VERSION,
    platform: Platform.OS, // 'ios' | 'android' | 'web'
  }
}
```

### 1.4 Storage

Store attribution data in **secure local storage** immediately on capture:

```typescript
interface AttributionData {
  source: string
  medium: string
  campaign: string
  content: string | null
  term: string | null
  capturedAt: string // ISO timestamp
  appVersion: string
  platform: 'ios' | 'android' | 'web'
}

// Store in AsyncStorage / SecureStore / UserDefaults
await SecureStore.setItemAsync('attribution', JSON.stringify(attributionData))
```

**Important:** Capture on FIRST launch only. Don't overwrite existing attribution (first-touch model).

```typescript
async function saveAttributionIfNew(data: AttributionData) {
  const existing = await SecureStore.getItemAsync('attribution')
  if (!existing) {
    await SecureStore.setItemAsync('attribution', JSON.stringify(data))
  }
}
```

---

## Part 2: Analytics Integration

### 2.1 User Properties (Set on Signup)

When user creates account, set these as permanent user properties:

```typescript
// Firebase Analytics example
import analytics from '@react-native-firebase/analytics'

async function setAttributionProperties() {
  const stored = await SecureStore.getItemAsync('attribution')
  if (!stored) return
  
  const attribution: AttributionData = JSON.parse(stored)
  
  // Set user properties (persist across sessions)
  await analytics().setUserProperty('acquisition_source', attribution.source)
  await analytics().setUserProperty('acquisition_medium', attribution.medium)
  await analytics().setUserProperty('acquisition_campaign', attribution.campaign)
  await analytics().setUserProperty('acquisition_date', attribution.capturedAt.split('T')[0])
  await analytics().setUserProperty('acquisition_platform', attribution.platform)
  
  if (attribution.content) {
    await analytics().setUserProperty('acquisition_content', attribution.content)
  }
}
```

### 2.2 Events to Track

Implement these events at each funnel stage:

#### App Open (every launch)
```typescript
analytics().logEvent('app_open', {
  is_first_open: isFirstLaunch,
  attribution_source: attribution?.source || 'organic',
  attribution_medium: attribution?.medium || 'none',
  attribution_campaign: attribution?.campaign || 'none',
})
```

#### Sign Up
```typescript
analytics().logEvent('sign_up', {
  method: signupMethod, // 'email' | 'apple' | 'google'
  attribution_source: attribution?.source,
  attribution_campaign: attribution?.campaign,
})
```

#### Onboarding Complete
```typescript
analytics().logEvent('onboarding_complete', {
  steps_completed: stepsCount,
  time_to_complete_seconds: elapsedTime,
  skipped_steps: skippedSteps,
})
```

#### Family Created (= "Activated" user)
```typescript
analytics().logEvent('family_created', {
  family_size: memberCount,
  is_first_family: isFirstFamily,
  attribution_source: attribution?.source,
})
```

#### First List Created
```typescript
analytics().logEvent('first_list', {
  list_type: listType, // 'grocery' | 'todo' | 'packing' | 'custom'
  ai_generated: wasAIGenerated,
  items_count: itemsCount,
})
```

#### Calendar Connected
```typescript
analytics().logEvent('calendar_connected', {
  provider: provider, // 'google' | 'apple'
  calendars_count: calendarsSelected,
})
```

#### AI Feature Used
```typescript
analytics().logEvent('ai_agent_use', {
  tool_name: toolName, // 'create_list', 'plan_event', 'suggest_meal', etc.
  input_method: inputMethod, // 'text' | 'voice' | 'photo'
  success: wasSuccessful,
  response_time_ms: responseTime,
})
```

#### Voice Input Used
```typescript
analytics().logEvent('voice_input', {
  duration_seconds: duration,
  success: wasSuccessful,
  transcription_confidence: confidence,
})
```

#### Family Invite Sent
```typescript
analytics().logEvent('family_invite_sent', {
  invite_count: count,
  invite_method: method, // 'email' | 'sms' | 'share_link'
})
```

#### Paywall Viewed
```typescript
analytics().logEvent('paywall_view', {
  trigger: trigger, // 'ai_limit', 'feature_gate', 'settings', 'upgrade_prompt'
  variant: paywallVariant, // For A/B testing
  days_since_signup: daysSinceSignup,
  total_ai_uses: totalAIUses,
})
```

#### Trial Started
```typescript
analytics().logEvent('trial_start', {
  plan_type: planType, // 'premium' | 'family'
  trigger: trigger,
  attribution_source: attribution?.source,
  attribution_campaign: attribution?.campaign,
})
```

#### Purchase Complete
```typescript
analytics().logEvent('purchase', {
  transaction_id: transactionId,
  plan: plan, // 'premium_monthly' | 'premium_annual' | 'family_annual'
  price: price,
  currency: currency,
  is_trial_conversion: wasTrialConversion,
  days_as_free_user: daysAsFreeUser,
  attribution_source: attribution?.source,
  attribution_campaign: attribution?.campaign,
})
```

#### Subscription Renewed
```typescript
analytics().logEvent('subscription_renew', {
  plan: plan,
  tenure_months: tenureMonths,
  lifetime_value: ltv,
})
```

---

## Part 3: Backend Integration (Optional but Recommended)

### 3.1 Store Attribution in User Record

When user signs up, include attribution in user creation:

```typescript
// API request to create user
POST /api/users
{
  "email": "user@example.com",
  "name": "John Doe",
  "attribution": {
    "source": "website",
    "medium": "blog_cta", 
    "campaign": "article_conversion",
    "content": "skylight-vs-hearth-display",
    "capturedAt": "2025-12-10T15:30:00Z",
    "platform": "ios"
  }
}
```

### 3.2 Database Schema

```sql
-- Users table addition
ALTER TABLE users ADD COLUMN attribution JSONB;

-- Or separate attribution table for flexibility
CREATE TABLE user_attribution (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  source VARCHAR(50),
  medium VARCHAR(50),
  campaign VARCHAR(100),
  content VARCHAR(200),
  term VARCHAR(200),
  captured_at TIMESTAMP,
  platform VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for reporting
CREATE INDEX idx_attribution_source ON user_attribution(source);
CREATE INDEX idx_attribution_campaign ON user_attribution(campaign);
```

### 3.3 Reporting Queries

```sql
-- Signups by source (last 30 days)
SELECT 
  attribution->>'source' as source,
  COUNT(*) as signups
FROM users
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY attribution->>'source'
ORDER BY signups DESC;

-- Conversion rate by campaign
SELECT 
  ua.campaign,
  COUNT(DISTINCT ua.user_id) as signups,
  COUNT(DISTINCT s.user_id) as paid_conversions,
  ROUND(COUNT(DISTINCT s.user_id)::numeric / COUNT(DISTINCT ua.user_id) * 100, 2) as conversion_rate
FROM user_attribution ua
LEFT JOIN subscriptions s ON ua.user_id = s.user_id AND s.status = 'active'
GROUP BY ua.campaign
ORDER BY signups DESC;

-- Revenue by acquisition source
SELECT
  ua.source,
  ua.medium,
  COUNT(DISTINCT p.user_id) as customers,
  SUM(p.amount) as total_revenue,
  AVG(p.amount) as avg_order_value
FROM user_attribution ua
JOIN payments p ON ua.user_id = p.user_id
WHERE p.created_at > NOW() - INTERVAL '90 days'
GROUP BY ua.source, ua.medium
ORDER BY total_revenue DESC;
```

---

## Part 4: Deep Linking (iOS & Android)

### 4.1 Universal Links (iOS)

**apple-app-site-association** (host at `/.well-known/`):
```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAM_ID.app.gethoneydew.honeydew",
        "paths": ["*"]
      }
    ]
  }
}
```

### 4.2 App Links (Android)

**assetlinks.json** (host at `/.well-known/`):
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "app.gethoneydew.honeydew",
    "sha256_cert_fingerprints": ["YOUR_CERT_FINGERPRINT"]
  }
}]
```

### 4.3 Handle Deep Link in App

```typescript
// React Native example
import { Linking } from 'react-native'

useEffect(() => {
  // Handle app opened via link
  const handleDeepLink = (event: { url: string }) => {
    const attribution = captureAttribution(event.url)
    if (attribution) {
      saveAttributionIfNew(attribution)
    }
  }
  
  // Listen for incoming links
  const subscription = Linking.addEventListener('url', handleDeepLink)
  
  // Handle initial URL (app opened via link when closed)
  Linking.getInitialURL().then(url => {
    if (url) {
      handleDeepLink({ url })
    }
  })
  
  return () => subscription.remove()
}, [])
```

---

## Part 5: Testing Checklist

### 5.1 Manual Testing

- [ ] Open `https://app.gethoneydew.app/?utm_source=test&utm_medium=test&utm_campaign=test`
- [ ] Verify attribution captured in local storage
- [ ] Complete signup flow
- [ ] Verify user properties set in Firebase/analytics
- [ ] Verify attribution sent with signup API call
- [ ] Kill app, reopen, verify attribution NOT overwritten
- [ ] Test on iOS, Android, Web

### 5.2 Analytics Validation

- [ ] Check Firebase DebugView for events
- [ ] Verify user properties appear in Firebase User Properties
- [ ] Run test conversion and verify in Firebase Conversions report
- [ ] Check backend database for attribution data

### 5.3 Edge Cases

- [ ] User opens app without UTM params (should be 'organic')
- [ ] User clicks multiple UTM links (first-touch should persist)
- [ ] User signs up days after initial UTM capture (should still attribute)
- [ ] Universal link fails, falls back to App Store (attribution lost - acceptable)

---

## Part 6: Privacy & Compliance

### 6.1 Data Handling

- Attribution data is **first-party marketing data** (not PII)
- Store only the UTM parameters, not full URLs
- Do not capture or store IP addresses
- Retention: Keep indefinitely for LTV analysis

### 6.2 App Store Compliance

- Attribution tracking does NOT require ATT prompt (iOS)
- This is first-party data from our own website
- No third-party tracking SDKs involved

### 6.3 User Visibility

Consider adding to privacy policy:
> "We track how you discovered our app to improve our marketing. This includes the website page you visited before downloading. This data is not shared with third parties."

---

## Part 7: Quick Reference - Event Names

| Funnel Stage | Event Name | When to Fire |
|--------------|------------|--------------|
| Acquisition | `app_open` | Every app launch |
| Activation | `sign_up` | Account created |
| Activation | `onboarding_complete` | Finished onboarding |
| Activation | `family_created` | Created/joined first family |
| Engagement | `first_list` | Created first list |
| Engagement | `calendar_connected` | Connected Google/Apple |
| Engagement | `ai_agent_use` | Used AI feature |
| Engagement | `voice_input` | Used voice input |
| Viral | `family_invite_sent` | Sent invite |
| Revenue | `paywall_view` | Saw upgrade screen |
| Revenue | `trial_start` | Started free trial |
| Revenue | `purchase` | Completed purchase |
| Revenue | `subscription_renew` | Subscription renewed |

---

## Part 8: Success Metrics

Once implemented, we should be able to answer:

1. **Which blog articles drive the most signups?**
2. **What's the conversion rate from blog → signup → paid by campaign?**
3. **What's the LTV of users from different acquisition sources?**
4. **Which CTAs (hero vs. footer vs. blog) have highest conversion?**
5. **How long between first visit and signup?**

---

## Implementation Priority

| Priority | Task | Effort |
|----------|------|--------|
| **P0** | Capture UTM params on app open | 2 hours |
| **P0** | Store attribution in local storage | 1 hour |
| **P0** | Set user properties on signup | 2 hours |
| **P1** | Add attribution to signup API | 2 hours |
| **P1** | Implement all funnel events | 4 hours |
| **P2** | Backend reporting queries | 4 hours |
| **P2** | Deep linking setup | 4 hours |

**Total estimated effort:** 2-3 days

---

## Questions?

This spec aligns with the website's funnel tracking system (see `FUNNEL_STRATEGY.md` and `src/utils/funnelTracking.ts` in the website repo).

The website sends users with these UTM structures:
- Hero CTA: `utm_medium=hero&utm_campaign=primary_cta`
- Blog CTA: `utm_medium=blog_cta&utm_campaign=article_conversion&utm_content={slug}`
- Footer: `utm_medium=footer&utm_campaign=navigation`

Match these in your reporting to see the full funnel.












