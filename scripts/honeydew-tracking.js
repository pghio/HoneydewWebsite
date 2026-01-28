/**
 * Honeydew Conversion Tracking SDK
 * 
 * Drop-in tracking for app.gethoneydew.app
 * Tracks full funnel from ad click → signup → activation → purchase
 * 
 * Installation:
 *   <script src="https://gethoneydew.app/tracking/honeydew-tracking.js"></script>
 *   <script>
 *     HoneydewTracking.init({
 *       ga4MeasurementId: 'G-4X6LYQ296G',
 *       googleAdsId: 'AW-XXXXXXXXX',
 *       debug: false
 *     });
 *   </script>
 * 
 * Usage:
 *   HoneydewTracking.track('signup_complete', { method: 'email' });
 *   HoneydewTracking.trackPurchase({ value: 7.99, currency: 'USD', plan: 'monthly' });
 */

(function(window) {
  'use strict';

  // ===========================================
  // Configuration
  // ===========================================
  
  const DEFAULT_CONFIG = {
    ga4MeasurementId: 'G-4X6LYQ296G',
    googleAdsId: null, // Set this when you have your Google Ads account
    debug: false,
    cookieDomain: 'gethoneydew.app',
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
  };

  // ===========================================
  // Conversion Event Definitions
  // ===========================================
  
  const CONVERSION_EVENTS = {
    // Acquisition (from marketing site)
    page_view: { category: 'acquisition', value: 0 },
    cta_click: { category: 'acquisition', value: 0 },
    app_store_click: { category: 'acquisition', value: 0.50 },
    
    // Signup Flow
    signup_started: { category: 'activation', value: 0.25, googleAdsAction: 'signup_started' },
    signup_complete: { category: 'activation', value: 2.00, googleAdsAction: 'signup', isPrimary: true },
    
    // Onboarding Milestones
    onboarding_started: { category: 'activation', value: 0.25 },
    onboarding_step_complete: { category: 'activation', value: 0.10 },
    onboarding_complete: { category: 'activation', value: 0.50 },
    
    // Activation Events
    family_created: { category: 'activation', value: 1.00, googleAdsAction: 'lead' },
    family_joined: { category: 'activation', value: 0.75 },
    first_list_created: { category: 'activation', value: 1.00 },
    first_event_created: { category: 'activation', value: 0.50 },
    calendar_connected: { category: 'activation', value: 1.50 },
    
    // Engagement / AI Features
    first_ai_use: { category: 'engagement', value: 1.50, googleAdsAction: 'key_page_view' },
    voice_input_used: { category: 'engagement', value: 0.50 },
    ai_list_generated: { category: 'engagement', value: 0.75 },
    ai_suggestion_accepted: { category: 'engagement', value: 0.25 },
    
    // Revenue Events
    paywall_view: { category: 'revenue', value: 0 },
    trial_started: { category: 'revenue', value: 5.00, googleAdsAction: 'start_trial', isPrimary: true },
    purchase_complete: { category: 'revenue', value: null, googleAdsAction: 'purchase', isPrimary: true, dynamic: true },
    subscription_renewed: { category: 'revenue', value: null, dynamic: true },
    
    // Retention Events
    d1_return: { category: 'retention', value: 0.25, googleAdsAction: 'd1_return', isPrimary: true },
    d7_return: { category: 'retention', value: 0.50 },
    d30_return: { category: 'retention', value: 1.00 },
    
    // Viral / Referral
    family_invite_sent: { category: 'referral', value: 0.50 },
    family_invite_accepted: { category: 'referral', value: 1.00, googleAdsAction: 'lead' },
    app_shared: { category: 'referral', value: 0.25 },
    review_prompt_shown: { category: 'referral', value: 0 },
    review_submitted: { category: 'referral', value: 2.00 },
  };

  // ===========================================
  // Main Tracking Class
  // ===========================================
  
  class HoneydewTracking {
    constructor() {
      this.config = { ...DEFAULT_CONFIG };
      this.initialized = false;
      this.userId = null;
      this.sessionId = null;
      this.utmParams = {};
      this.userProperties = {};
      this.eventQueue = [];
    }

    // Initialize tracking
    init(options = {}) {
      this.config = { ...this.config, ...options };
      
      // Parse UTM parameters from URL
      this.utmParams = this._parseUtmParams();
      
      // Get or create session
      this.sessionId = this._getOrCreateSession();
      
      // Initialize GA4
      this._initGA4();
      
      // Initialize Google Ads conversion tracking
      if (this.config.googleAdsId) {
        this._initGoogleAds();
      }
      
      // Process queued events
      this._processQueue();
      
      // Set up automatic tracking
      this._setupAutoTracking();
      
      this.initialized = true;
      this._log('Honeydew Tracking initialized', this.config);
      
      return this;
    }

    // Main tracking method
    track(eventName, params = {}) {
      if (!this.initialized) {
        this.eventQueue.push({ eventName, params });
        return;
      }

      const eventDef = CONVERSION_EVENTS[eventName] || { category: 'custom', value: 0 };
      
      const eventData = {
        event_name: eventName,
        event_category: eventDef.category,
        timestamp: new Date().toISOString(),
        session_id: this.sessionId,
        user_id: this.userId,
        ...this.utmParams,
        ...params,
      };

      // Send to GA4
      this._sendToGA4(eventName, eventData);

      // Send to Google Ads if it's a conversion event
      if (eventDef.googleAdsAction && this.config.googleAdsId) {
        const value = eventDef.dynamic ? params.value : eventDef.value;
        this._sendToGoogleAds(eventDef.googleAdsAction, value, params.currency || 'USD');
      }

      this._log(`Tracked: ${eventName}`, eventData);
      
      return this;
    }

    // Convenience method for purchase tracking
    trackPurchase(params) {
      const { value, currency = 'USD', plan, transactionId } = params;
      
      return this.track('purchase_complete', {
        value,
        currency,
        plan,
        transaction_id: transactionId,
        items: [{
          item_id: `honeydew_${plan}`,
          item_name: `Honeydew ${plan} Plan`,
          price: value,
          quantity: 1
        }]
      });
    }

    // Convenience method for signup tracking
    trackSignup(params = {}) {
      const { method = 'email', referralCode } = params;
      
      this.track('signup_complete', {
        method,
        referral_code: referralCode,
      });
      
      // Store signup timestamp for retention milestones.
      this._setStoredValue('honeydew_signup_date', new Date().toISOString());

      // Also set user properties
      this.setUserProperties({
        signup_date: new Date().toISOString(),
        signup_method: method,
        acquisition_source: this.utmParams.utm_source,
        acquisition_medium: this.utmParams.utm_medium,
        acquisition_campaign: this.utmParams.utm_campaign,
      });
      
      return this;
    }

    // Track onboarding progress
    trackOnboarding(step, totalSteps, completed = false) {
      if (step === 1) {
        this.track('onboarding_started');
      }
      
      this.track('onboarding_step_complete', {
        step,
        total_steps: totalSteps,
        progress_percent: Math.round((step / totalSteps) * 100)
      });
      
      if (completed) {
        this.track('onboarding_complete', {
          steps_completed: step
        });
      }
      
      return this;
    }

    // Track retention milestones
    trackRetention() {
      const signupDate = this._getStoredValue('honeydew_signup_date');
      if (!signupDate) return this;
      
      const daysSinceSignup = Math.floor(
        (Date.now() - new Date(signupDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      const milestones = [
        { days: 1, event: 'd1_return' },
        { days: 7, event: 'd7_return' },
        { days: 30, event: 'd30_return' },
      ];
      
      for (const milestone of milestones) {
        if (daysSinceSignup >= milestone.days) {
          const tracked = this._getStoredValue(`honeydew_${milestone.event}_tracked`);
          if (!tracked) {
            this.track(milestone.event, { days_since_signup: daysSinceSignup });
            this._setStoredValue(`honeydew_${milestone.event}_tracked`, 'true');
          }
        }
      }
      
      return this;
    }

    // Set user ID (after signup)
    setUserId(userId) {
      this.userId = userId;
      this._setStoredValue('honeydew_user_id', userId);
      
      if (window.gtag) {
        window.gtag('set', { user_id: userId });
      }
      
      this._log('User ID set:', userId);
      return this;
    }

    // Set user properties for segmentation
    setUserProperties(properties) {
      this.userProperties = { ...this.userProperties, ...properties };
      
      if (window.gtag) {
        window.gtag('set', 'user_properties', properties);
      }
      
      this._log('User properties set:', properties);
      return this;
    }

    // ===========================================
    // Post-Conversion Behavior Tracking
    // ===========================================

    // Track feature usage patterns
    trackFeatureUse(feature, params = {}) {
      const featureEvents = {
        ai_agent: 'ai_agent_use',
        voice_input: 'voice_input_used',
        calendar_sync: 'calendar_sync_used',
        list_share: 'list_shared',
        family_chat: 'family_chat_used',
      };
      
      const eventName = featureEvents[feature] || `feature_${feature}_used`;
      return this.track(eventName, { feature, ...params });
    }

    // Track user engagement depth
    trackEngagement(action, value) {
      return this.track('engagement', {
        action,
        value,
        engagement_time: Date.now() - this._getSessionStart()
      });
    }

    // Track list/task behavior
    trackListActivity(action, params = {}) {
      const activityEvents = {
        create: 'list_created',
        complete: 'list_completed',
        share: 'list_shared',
        delete: 'list_deleted',
        item_add: 'list_item_added',
        item_complete: 'list_item_completed',
      };
      
      return this.track(activityEvents[action] || 'list_activity', {
        action,
        ...params
      });
    }

    // Track family activity
    trackFamilyActivity(action, params = {}) {
      const familyEvents = {
        create: 'family_created',
        join: 'family_joined',
        invite: 'family_invite_sent',
        invite_accept: 'family_invite_accepted',
        member_add: 'family_member_added',
      };
      
      return this.track(familyEvents[action] || 'family_activity', {
        action,
        ...params
      });
    }

    // ===========================================
    // Internal Methods
    // ===========================================

    _initGA4() {
      // Load gtag if not present
      if (!window.gtag) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.ga4MeasurementId}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
      }
      
      window.gtag('config', this.config.ga4MeasurementId, {
        send_page_view: false,
        cookie_domain: this.config.cookieDomain,
        user_id: this.userId,
      });
    }

    _initGoogleAds() {
      window.gtag('config', this.config.googleAdsId);
    }

    _sendToGA4(eventName, eventData) {
      if (!window.gtag) return;
      
      window.gtag('event', eventName, eventData);
    }

    _sendToGoogleAds(conversionAction, value, currency) {
      if (!window.gtag || !this.config.googleAdsId) return;
      
      window.gtag('event', 'conversion', {
        send_to: `${this.config.googleAdsId}/${conversionAction}`,
        value: value,
        currency: currency,
        transaction_id: this._generateTransactionId()
      });
    }

    _parseUtmParams() {
      const params = new URLSearchParams(window.location.search);
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
      const utmParams = {};
      
      utmKeys.forEach(key => {
        const value = params.get(key);
        if (value) {
          utmParams[key] = value;
          // Store in session for later attribution
          this._setStoredValue(key, value);
        } else {
          // Check for stored value
          const stored = this._getStoredValue(key);
          if (stored) utmParams[key] = stored;
        }
      });
      
      // Also capture gclid for Google Ads
      const gclid = params.get('gclid');
      if (gclid) {
        utmParams.gclid = gclid;
        this._setStoredValue('gclid', gclid);
      }
      
      return utmParams;
    }

    _getOrCreateSession() {
      let sessionId = this._getStoredValue('honeydew_session');
      const sessionStart = this._getStoredValue('honeydew_session_start');
      
      const now = Date.now();
      const expired = !sessionStart || (now - parseInt(sessionStart)) > this.config.sessionTimeout;
      
      if (!sessionId || expired) {
        sessionId = this._generateSessionId();
        this._setStoredValue('honeydew_session', sessionId);
        this._setStoredValue('honeydew_session_start', now.toString());
      }
      
      return sessionId;
    }

    _getSessionStart() {
      return parseInt(this._getStoredValue('honeydew_session_start')) || Date.now();
    }

    _setupAutoTracking() {
      // Track page views
      this.track('page_view', {
        page_path: window.location.pathname,
        page_title: document.title,
        page_location: window.location.href
      });
      
      // Check retention milestones on each page view
      this.trackRetention();
      
      // Track visibility changes (engagement)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.trackEngagement('session_end', Date.now() - this._getSessionStart());
        }
      });
    }

    _processQueue() {
      while (this.eventQueue.length > 0) {
        const { eventName, params } = this.eventQueue.shift();
        this.track(eventName, params);
      }
    }

    _generateSessionId() {
      return 'sess_' + Math.random().toString(36).substring(2, 15);
    }

    _generateTransactionId() {
      return 'txn_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    }

    _setStoredValue(key, value) {
      try {
        sessionStorage.setItem(key, value);
        // Also set in localStorage for cross-session attribution
        if (key.startsWith('utm_') || key === 'gclid' || key.includes('signup')) {
          localStorage.setItem(key, value);
        }
      } catch (e) {
        this._log('Storage error:', e);
      }
    }

    _getStoredValue(key) {
      try {
        return sessionStorage.getItem(key) || localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    }

    _log(...args) {
      if (this.config.debug) {
        console.log('[HoneydewTracking]', ...args);
      }
    }
  }

  // ===========================================
  // Export
  // ===========================================
  
  // Create singleton instance
  const instance = new HoneydewTracking();
  
  // Expose to window
  window.HoneydewTracking = instance;
  
  // Also expose the class for advanced usage
  window.HoneydewTrackingClass = HoneydewTracking;

})(window);

// ===========================================
// Usage Examples (for documentation)
// ===========================================

/*

// Initialize on app load
HoneydewTracking.init({
  ga4MeasurementId: 'G-4X6LYQ296G',
  googleAdsId: 'AW-XXXXXXXXX', // Add when you have Google Ads account
  debug: true // Set to false in production
});

// After user signs up
HoneydewTracking.setUserId('user_123');
HoneydewTracking.trackSignup({ method: 'google', referralCode: 'FRIEND10' });

// Track onboarding steps
HoneydewTracking.trackOnboarding(1, 5);  // Step 1 of 5
HoneydewTracking.trackOnboarding(2, 5);  // Step 2 of 5
HoneydewTracking.trackOnboarding(5, 5, true);  // Completed

// Track key milestones
HoneydewTracking.track('family_created', { family_size: 4, family_name: 'Smith Family' });
HoneydewTracking.track('first_list_created', { list_type: 'packing', ai_generated: true });
HoneydewTracking.track('calendar_connected', { provider: 'google' });
HoneydewTracking.track('first_ai_use', { tool: 'list_generator', prompt: 'camping trip' });

// Track feature usage
HoneydewTracking.trackFeatureUse('voice_input', { duration_seconds: 5 });
HoneydewTracking.trackFeatureUse('ai_agent', { tool_count: 3 });

// Track purchase
HoneydewTracking.trackPurchase({
  value: 7.99,
  currency: 'USD',
  plan: 'monthly',
  transactionId: 'txn_abc123'
});

// Track list activity
HoneydewTracking.trackListActivity('create', { list_type: 'grocery', items_count: 12 });
HoneydewTracking.trackListActivity('item_complete', { list_id: 'list_123' });

// Track family activity
HoneydewTracking.trackFamilyActivity('invite', { invite_method: 'email' });
HoneydewTracking.trackFamilyActivity('invite_accept', { inviter_id: 'user_456' });

*/
