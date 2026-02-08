#!/usr/bin/env node
/**
 * Blog-to-List Cross-Linking Script
 * 
 * Injects outbound links from blog articles (www.gethoneydew.app/blog/*)
 * to public list pages (app.gethoneydew.app/lists/*).
 * 
 * This completes the bidirectional crawl path:
 *   app.gethoneydew.app/lists → www.gethoneydew.app/blog (done in app codebase)
 *   www.gethoneydew.app/blog → app.gethoneydew.app/lists (THIS SCRIPT)
 * 
 * Run: node scripts/inject-blog-list-crosslinks.js
 */

const fs = require('fs');
const path = require('path');

const LIST_BASE_URL = 'https://app.gethoneydew.app/lists';

// ============================================================================
// COMPLETE BLOG → LIST MAPPING
// Each blog slug maps to 3-5 relevant list pages with titles and slugs
// ============================================================================

const BLOG_TO_LISTS = {

  // ─── CO-PARENTING & CUSTODY ────────────────────────────────────────────

  'best-co-parenting-apps-2026-complete-guide-for-divorced-parents-tested-ranked': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Co-Parent Information Sharing Checklist', slug: 'co-parent-information-sharing-checklist' },
    { title: 'Custody Agreement Checklist', slug: 'custody-agreement-checklist' },
    { title: 'Week-On Week-Off Custody Packing List', slug: 'week-on-week-off-custody-packing-list' },
    { title: 'Shared Custody Christmas Checklist', slug: 'shared-custody-christmas-checklist' },
  ],

  'best-apps-for-divorced-parents-2026-complete-guide-by-category': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Co-Parent Information Sharing Checklist', slug: 'co-parent-information-sharing-checklist' },
    { title: 'Divorce Preparation Checklist with Kids', slug: 'divorce-preparation-checklist-with-kids' },
    { title: 'Medication Tracking Between Houses', slug: 'medication-tracking-between-houses' },
    { title: 'Back to School Co-Parent Checklist', slug: 'back-to-school-co-parent-checklist' },
  ],

  'best-custody-schedule-apps-2025': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Week-On Week-Off Custody Packing List', slug: 'week-on-week-off-custody-packing-list' },
    { title: 'Custody Schedule Modification Checklist', slug: 'custody-schedule-modification-checklist' },
    { title: 'Summer Vacation Custody Checklist', slug: 'summer-vacation-custody-checklist' },
    { title: 'Shared Custody Christmas Checklist', slug: 'shared-custody-christmas-checklist' },
  ],

  'best-family-apps-divorced-parents-2025': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Co-Parent Information Sharing Checklist', slug: 'co-parent-information-sharing-checklist' },
    { title: 'School Information Co-Parent Checklist', slug: 'school-information-co-parent-checklist' },
    { title: 'Medical Information Sharing Checklist', slug: 'medical-information-sharing-checklist' },
    { title: 'Birthday Party Coordination for Co-Parents', slug: 'birthday-party-coordination-co-parents' },
  ],

  'co-parenting-schedule-changes-without-conflict-2025-templates-rules-and-app-setup': [
    { title: 'Custody Schedule Modification Checklist', slug: 'custody-schedule-modification-checklist' },
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Co-Parenting Meeting Agenda Checklist', slug: 'co-parenting-meeting-agenda-checklist' },
    { title: 'Parallel Parenting Communication Guide', slug: 'parallel-parenting-communication-guide' },
  ],

  'honeydew-vs-2houses-co-parenting-apps-for-divorced-families-2026': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Co-Parent Information Sharing Checklist', slug: 'co-parent-information-sharing-checklist' },
    { title: 'Child Support Expense Tracking List', slug: 'child-support-expense-tracking-list' },
    { title: 'Custody Agreement Checklist', slug: 'custody-agreement-checklist' },
  ],

  'honeydew-vs-appclose-comparison-2026': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Custody Documentation Checklist', slug: 'custody-documentation-checklist' },
    { title: 'Child Support Expense Tracking List', slug: 'child-support-expense-tracking-list' },
    { title: 'Co-Parent Information Sharing Checklist', slug: 'co-parent-information-sharing-checklist' },
  ],

  'honeydew-vs-ourfamilywizard-comparison-2025': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Custody Documentation Checklist', slug: 'custody-documentation-checklist' },
    { title: 'Co-Parenting Meeting Agenda Checklist', slug: 'co-parenting-meeting-agenda-checklist' },
    { title: 'Medical Information Sharing Checklist', slug: 'medical-information-sharing-checklist' },
  ],

  'honeydew-vs-ourfamilywizard-comparison-2026': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Custody Documentation Checklist', slug: 'custody-documentation-checklist' },
    { title: 'Co-Parenting Meeting Agenda Checklist', slug: 'co-parenting-meeting-agenda-checklist' },
    { title: 'Shared Custody Christmas Checklist', slug: 'shared-custody-christmas-checklist' },
  ],

  'honeydew-vs-talking-parents-comparison-2025': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Parallel Parenting Communication Guide', slug: 'parallel-parenting-communication-guide' },
    { title: 'Custody Documentation Checklist', slug: 'custody-documentation-checklist' },
    { title: 'Emergency Contact Coordination List', slug: 'emergency-contact-coordination-list' },
  ],

  'honeydew-vs-talking-parents-co-parenting-communication-2026': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Parallel Parenting Communication Guide', slug: 'parallel-parenting-communication-guide' },
    { title: 'Co-Parent Information Sharing Checklist', slug: 'co-parent-information-sharing-checklist' },
    { title: 'Emergency Contact Coordination List', slug: 'emergency-contact-coordination-list' },
  ],

  'ourfamilywizard-vs-appclose-vs-honeydew-co-parenting-app-showdown-2026': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Custody Documentation Checklist', slug: 'custody-documentation-checklist' },
    { title: 'Child Support Expense Tracking List', slug: 'child-support-expense-tracking-list' },
    { title: 'Co-Parent Information Sharing Checklist', slug: 'co-parent-information-sharing-checklist' },
    { title: 'Custody Agreement Checklist', slug: 'custody-agreement-checklist' },
  ],

  'divorced-parents-fair-play-across-households-how-to-coordinate-without-the-conflict': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Co-Parent Information Sharing Checklist', slug: 'co-parent-information-sharing-checklist' },
    { title: 'School Information Co-Parent Checklist', slug: 'school-information-co-parent-checklist' },
  ],

  // ─── FAMILY ORGANIZATION (GENERAL) ────────────────────────────────────

  'best-family-organization-apps-2025': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Household Essentials Shopping List', slug: 'household-essentials-shopping-list' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
  ],

  'best-family-organization-apps-2026-the-complete-guide-20-apps-tested-ranked': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Kids Age-Appropriate Chores', slug: 'kids-age-appropriate-chores' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
  ],

  'best-free-family-organization-apps-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
  ],

  'complete-guide-family-organization-apps': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
    { title: 'Household Essentials Shopping List', slug: 'household-essentials-shopping-list' },
  ],

  '7-signs-family-needs-organization-system': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
  ],

  'hidden-cost-family-disorganization': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Monthly Budget Checklist', slug: 'monthly-budget-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
  ],

  'the-overwhelmed-parent-s-guide-to-family-organization-2025': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
    { title: 'Self-Care Sunday Checklist', slug: 'self-care-sunday-checklist' },
  ],

  'gtd-for-families-how-to-apply-getting-things-done-to-family-organization-in-2025': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'Morning Routine Checklist', slug: 'morning-routine-checklist-adults' },
    { title: 'Before Bed Routine Checklist', slug: 'before-bed-routine-checklist' },
  ],

  'family-command-center-app-digital-alternative-2025': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
  ],

  'digital-family-command-center-app-vs-wall-display-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
  ],

  'family-coordination-vs-calendar-apps-why-lists-attached-to-events-changes-everything': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
    { title: 'Family Road Trip Packing List', slug: 'family-road-trip-packing-list' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
  ],

  'household-management': [
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'Deep Cleaning Checklist Room by Room', slug: 'deep-cleaning-checklist-room-by-room' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
    { title: 'Household Essentials Shopping List', slug: 'household-essentials-shopping-list' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
  ],

  // ─── AI & CALENDAR ARTICLES ────────────────────────────────────────────

  'best-ai-calendar-apps-for-families-2025': [
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Family Road Trip Packing List', slug: 'family-road-trip-packing-list' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
    { title: 'First Day of School Checklist', slug: 'first-day-of-school-checklist' },
  ],

  'best-ai-family-planner-apps-2026': [
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Ultimate Beach Vacation Packing List 2026', slug: 'ultimate-beach-vacation-packing-list-2026' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  'best-family-calendar-apps-with-ai-in-2026-ranked-tested': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'First Day of School Checklist', slug: 'first-day-of-school-checklist' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
  ],

  'honeydew-vs-google-calendar-families': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  'honeydew-vs-google-calendar-complete-family-comparison-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'First Day of School Checklist', slug: 'first-day-of-school-checklist' },
  ],

  'honeydew-vs-apple-calendar-family-calendar-comparison-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
  ],

  'honeydew-vs-fantastical-family-calendar-showdown-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
    { title: 'First Day of School Checklist', slug: 'first-day-of-school-checklist' },
  ],

  'fantastical-vs-google-calendar-vs-honeydew-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  'why-apple-google-calendar-ai-won-t-replace-family-apps-in-2025': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
  ],

  'how-ai-transforms-family-organization': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Family Road Trip Packing List', slug: 'family-road-trip-packing-list' },
  ],

  'how-honeydew-ai-agent-works': [
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Ultimate Beach Vacation Packing List 2026', slug: 'ultimate-beach-vacation-packing-list-2026' },
  ],

  'how-ai-family-assistants-actually-work-real-examples-that-ll-make-you-say-wait-what': [
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  'the-family-app-that-actually-remembers-your-conversations-finally': [
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Family Road Trip Packing List', slug: 'family-road-trip-packing-list' },
  ],

  // ─── VOICE & INPUT ARTICLES ────────────────────────────────────────────

  'best-voice-controlled-family-organization-apps-2025': [
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Household Essentials Shopping List', slug: 'household-essentials-shopping-list' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
  ],

  'best-voice-controlled-family-apps-2025': [
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Household Essentials Shopping List', slug: 'household-essentials-shopping-list' },
    { title: 'Pantry Staples Checklist', slug: 'pantry-staples-checklist' },
  ],

  'best-family-apps-with-voice-control-2026-tested-ranked': [
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Household Essentials Shopping List', slug: 'household-essentials-shopping-list' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Pantry Staples Checklist', slug: 'pantry-staples-checklist' },
  ],

  'best-voice-input-grocery-list-apps-2026': [
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Grocery List by Aisle', slug: 'grocery-list-by-aisle' },
    { title: 'Pantry Staples Checklist', slug: 'pantry-staples-checklist' },
    { title: 'Household Essentials Shopping List', slug: 'household-essentials-shopping-list' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
  ],

  'voice-first-family-parenting': [
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
  ],

  'voice-input-whisper-ai-guide': [
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Household Essentials Shopping List', slug: 'household-essentials-shopping-list' },
  ],

  // ─── GROCERY & MEAL PLANNING ───────────────────────────────────────────

  'best-family-meal-planning-apps-2025': [
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Family Meal Planning Checklist', slug: 'family-meal-planning-checklist' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Budget Meal Planning List', slug: 'budget-meal-planning-list' },
    { title: 'Quick Weeknight Dinners List', slug: 'quick-weeknight-dinners-list' },
  ],

  'family-meal-planner-app-with-ai-2026': [
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Family Meal Planning Checklist', slug: 'family-meal-planning-checklist' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Picky Eater Meal Ideas', slug: 'picky-eater-meal-ideas' },
    { title: '30-Minute Meals List', slug: '30-minute-meals-list' },
  ],

  'best-shared-grocery-list-apps-families-2025': [
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Grocery List by Aisle', slug: 'grocery-list-by-aisle' },
    { title: 'Pantry Staples Checklist', slug: 'pantry-staples-checklist' },
    { title: 'Costco Shopping List', slug: 'costco-shopping-list' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
  ],

  'meal-planning': [
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Family Meal Planning Checklist', slug: 'family-meal-planning-checklist' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Budget Meal Planning List', slug: 'budget-meal-planning-list' },
    { title: 'Healthy Meal Plan Checklist', slug: 'healthy-meal-plan-checklist' },
  ],

  // ─── VACATION & TRAVEL ─────────────────────────────────────────────────

  'best-family-trip-planning-apps-2025': [
    { title: 'Ultimate Beach Vacation Packing List 2026', slug: 'ultimate-beach-vacation-packing-list-2026' },
    { title: 'Family Road Trip Packing List', slug: 'family-road-trip-packing-list' },
    { title: 'Family Camping Checklist', slug: 'family-camping-checklist' },
    { title: 'International Travel Checklist', slug: 'international-travel-checklist' },
    { title: 'Disney World Packing List', slug: 'disney-world-packing-list' },
  ],

  'best-family-vacation-planner-apps-ai-2026': [
    { title: 'Ultimate Beach Vacation Packing List 2026', slug: 'ultimate-beach-vacation-packing-list-2026' },
    { title: 'Family Road Trip Packing List', slug: 'family-road-trip-packing-list' },
    { title: 'Family Camping Checklist', slug: 'family-camping-checklist' },
    { title: 'Hawaii Vacation Packing List', slug: 'hawaii-vacation-packing-list' },
    { title: 'Cruise Packing List', slug: 'cruise-packing-list' },
  ],

  // ─── DISPLAY & HARDWARE COMPARISONS ────────────────────────────────────

  '7-best-skylight-calendar-alternatives-2025-cheaper-smarter-family-organizers': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
  ],

  'best-smart-display-alternatives-for-family-calendar-2025-echo-show-nest-hub-and-better-options': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
    { title: 'First Day of School Checklist', slug: 'first-day-of-school-checklist' },
  ],

  'best-smart-home-family-calendars-2026-ai-powered-options-ranked': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
  ],

  'best-wall-mounted-family-calendars-2026-smart-displays-vs-ai-apps-tested-ranked': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
  ],

  'calendar-like-skylight-without-subscription-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
  ],

  'cheaper-alternatives-to-skylight-calendar-under-100-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
  ],

  'dakboard-vs-skylight-vs-honeydew-comparison-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
  ],

  'echo-show-15-vs-skylight-vs-honeydew-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
  ],

  'honeydew-vs-dakboard-ai-family-app-vs-diy-wall-display-in-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
  ],

  'honeydew-vs-echo-show-15-family-organization-compared-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
  ],

  'honeydew-vs-hearth-display-premium-family-calendars-compared-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
  ],

  'honeydew-vs-magicmirror-ai-family-app-vs-diy-smart-mirror-in-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
  ],

  'honeydew-vs-mango-display-family-calendar-showdown-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
  ],

  'honeydew-vs-skylight-calendar': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
  ],

  'honeydew-vs-skylight-calendar-complete-comparison-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
  ],

  'hearth-display-alternatives-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
  ],

  'mango-display-alternatives-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
  ],

  'skylight-vs-hearth-display-vs-honeydew-which-family-calendar-is-best-in-2025': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Monthly Home Maintenance Checklist', slug: 'monthly-home-maintenance-checklist' },
  ],

  'skylight-vs-cozi-vs-honeydew-comparison-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
  ],

  // ─── COZI & COMPETITOR COMPARISONS ─────────────────────────────────────

  'apps-like-cozi-2026-better-alternatives': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  'cozi-gold-price-2025-is-it-worth-29-99-year-honest-review': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
  ],

  'cozi-gold-price-2026-worth-it-honest-review': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  'cozi-vs-ourhome-vs-honeydew-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Kids Age-Appropriate Chores', slug: 'kids-age-appropriate-chores' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
  ],

  'honeydew-vs-cozi-comparison-2025': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Household Essentials Shopping List', slug: 'household-essentials-shopping-list' },
  ],

  'honeydew-vs-cozi-complete-comparison-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Household Essentials Shopping List', slug: 'household-essentials-shopping-list' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  'honeydew-vs-familywall-deep-dive-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
  ],

  'honeydew-vs-maple-comparison': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
  ],

  'honeydew-vs-maple-ai-family-apps-compared-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  'honeydew-vs-maple-mango-which-ai-family-app-is-better-in-2025': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
  ],

  'honeydew-vs-ourhome-deep-dive-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Kids Age-Appropriate Chores', slug: 'kids-age-appropriate-chores' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
  ],

  'ourhome-vs-honeydew-comparison-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Kids Age-Appropriate Chores', slug: 'kids-age-appropriate-chores' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
  ],

  'honeydew-vs-picniic-family-organization-apps-compared-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Family Road Trip Packing List', slug: 'family-road-trip-packing-list' },
  ],

  'honeydew-vs-timetree-comparison': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  'honeydew-vs-timetree-complete-comparison-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
    { title: 'First Day of School Checklist', slug: 'first-day-of-school-checklist' },
  ],

  'timetree-vs-cozi-vs-honeydew-free-vs-premium-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  'timetree-vs-honeydew-complete-comparison-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  // ─── TASK MANAGEMENT ───────────────────────────────────────────────────

  'best-task-management-apps-for-families-2026-tested-ranked': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Kids Age-Appropriate Chores', slug: 'kids-age-appropriate-chores' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Weekend Chore Checklist', slug: 'weekend-chore-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
  ],

  'best-chore-chart-apps-kids-2025': [
    { title: 'Kids Age-Appropriate Chores', slug: 'kids-age-appropriate-chores' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Weekend Chore Checklist', slug: 'weekend-chore-checklist' },
    { title: 'Before Bed Routine Checklist', slug: 'before-bed-routine-checklist' },
  ],

  'honeydew-vs-anydo-comparison-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
  ],

  'honeydew-vs-todoist-comparison-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
  ],

  'todoist-vs-anydo-vs-honeydew-2026': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'Morning Routine Checklist', slug: 'morning-routine-checklist-adults' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
  ],

  // ─── MENTAL LOAD & FAIR PLAY ───────────────────────────────────────────

  'how-to-reduce-mental-load-with-ai-a-parent-s-guide-for-2025': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Kids Age-Appropriate Chores', slug: 'kids-age-appropriate-chores' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Self-Care Sunday Checklist', slug: 'self-care-sunday-checklist' },
  ],

  'mental-load': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Self-Care Sunday Checklist', slug: 'self-care-sunday-checklist' },
    { title: 'Morning Routine Checklist', slug: 'morning-routine-checklist-adults' },
  ],

  'mental-load-vs-fair-play-what-s-the-difference-and-why-you-need-both': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Kids Age-Appropriate Chores', slug: 'kids-age-appropriate-chores' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Self-Care Sunday Checklist', slug: 'self-care-sunday-checklist' },
  ],

  'digital-fair-play-cards-interactive-implementation-browse-customize-and-implement-all-100-cards-onli': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Kids Age-Appropriate Chores', slug: 'kids-age-appropriate-chores' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
  ],

  'fair-play-for-busy-working-parents-how-to-implement-when-you-barely-have-time-to-breathe': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Working Parent Daily Checklist', slug: 'working-parent-daily-checklist' },
    { title: 'Self-Care Sunday Checklist', slug: 'self-care-sunday-checklist' },
  ],

  'the-ultimate-fair-play-implementation-guide-how-to-digitally-transform-your-household-coordination': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Kids Age-Appropriate Chores', slug: 'kids-age-appropriate-chores' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Weekly House Cleaning Checklist', slug: 'weekly-house-cleaning-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
  ],

  'the-cpe-framework-fair-play-s-secret-weapon-how-digital-tools-automate-conception-planning-and-execu': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  'real-fair-play-results-couple-transformations-what-actually-happens-when-you-implement-digital-fair-': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Kids Age-Appropriate Chores', slug: 'kids-age-appropriate-chores' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Self-Care Sunday Checklist', slug: 'self-care-sunday-checklist' },
  ],

  'unicorn-space-reclaiming-your-right-to-be-interesting-how-digital-tools-make-personal-time-actually-': [
    { title: 'Self-Care Sunday Checklist', slug: 'self-care-sunday-checklist' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Evening Wind-Down Routine', slug: 'evening-wind-down-routine' },
  ],

  // ─── BLENDED / MULTI-FAMILY ────────────────────────────────────────────

  'best-apps-for-blended-families-2026-organization-tools-that-actually-get-it': [
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Blending Families Checklist', slug: 'blending-families-checklist' },
    { title: 'School Information Co-Parent Checklist', slug: 'school-information-co-parent-checklist' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
  ],

  'best-apps-for-coordinating-multi-family-groups-2025': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
    { title: 'Carpool Coordination Checklist', slug: 'soccer-season-checklist' },
    { title: 'Family Road Trip Packing List', slug: 'family-road-trip-packing-list' },
  ],

  'best-apps-multi-family-coordination-2025': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
    { title: 'Soccer Season Checklist', slug: 'soccer-season-checklist' },
    { title: 'Family Road Trip Packing List', slug: 'family-road-trip-packing-list' },
  ],

  'carpool-sports-coordination-across-multiple-families-2025-the-no-drama-system': [
    { title: 'Soccer Season Checklist', slug: 'soccer-season-checklist' },
    { title: 'Baseball/Softball Season Checklist', slug: 'baseball-softball-season-checklist' },
    { title: 'Basketball Season Checklist', slug: 'basketball-season-checklist' },
    { title: 'Swim Team Checklist', slug: 'swim-team-checklist' },
    { title: 'Dance Class Checklist', slug: 'dance-class-checklist' },
  ],

  'activity-coordination': [
    { title: 'Soccer Season Checklist', slug: 'soccer-season-checklist' },
    { title: 'Kids Birthday Party Planning Checklist', slug: 'kids-birthday-party-planning-checklist' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Summer Activities Bucket List', slug: 'summer-activities-bucket-list' },
  ],

  'multi-generational': [
    { title: 'Grandparent Visit Preparation', slug: 'grandparent-visit-preparation' },
    { title: 'Grandparent Emergency Information', slug: 'grandparent-emergency-information' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Caring for Aging Parents Checklist', slug: 'caring-for-aging-parents-checklist' },
  ],

  // ─── SPECIAL AUDIENCE ARTICLES ─────────────────────────────────────────

  'best-family-apps-military-families-2025': [
    { title: 'PCS Move Checklist', slug: 'pcs-move-checklist' },
    { title: 'Deployment Preparation Checklist', slug: 'deployment-preparation-checklist' },
    { title: 'Military Family Homecoming Checklist', slug: 'military-family-homecoming-checklist' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
  ],

  'best-family-apps-special-needs-families-2025': [
    { title: 'IEP Meeting Preparation Checklist', slug: 'iep-meeting-preparation-checklist' },
    { title: 'ADHD Family Organization Checklist', slug: 'adhd-family-organization-checklist' },
    { title: 'Sensory-Friendly Packing List', slug: 'sensory-friendly-packing-list' },
    { title: 'Therapy Appointment Tracker', slug: 'therapy-appointment-tracker' },
    { title: '504 Plan Checklist', slug: '504-plan-checklist' },
  ],

  'best-family-organization-apps-adhd-parents-2025': [
    { title: 'ADHD Family Organization Checklist', slug: 'adhd-family-organization-checklist' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Before Bed Routine Checklist', slug: 'before-bed-routine-checklist' },
  ],

  'best-family-apps-stay-at-home-parents-2025': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Daily Household Tasks Checklist', slug: 'daily-household-tasks-checklist' },
    { title: 'Rainy Day Activities for Kids', slug: 'rainy-day-activities-for-kids' },
    { title: 'Self-Care Sunday Checklist', slug: 'self-care-sunday-checklist' },
  ],

  'best-family-apps-working-parents-2025': [
    { title: 'Working Parent Daily Checklist', slug: 'working-parent-daily-checklist' },
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'School Morning Routine Checklist', slug: 'school-morning-routine-checklist' },
    { title: 'After School Routine Checklist', slug: 'after-school-routine-checklist' },
  ],

  // ─── APP REVIEW & PRODUCT ARTICLES ─────────────────────────────────────

  'honeydew-app-review-2025-honest-assessment-is-it-worth-7-99-month': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Family Road Trip Packing List', slug: 'family-road-trip-packing-list' },
    { title: 'Custody Exchange Checklist', slug: 'custody-exchange-checklist' },
  ],

  'free-vs-paid-family-apps-comparison': [
    { title: 'Family Chore Chart Checklist', slug: 'family-chore-chart-checklist' },
    { title: 'Weekly Meal Plan Template', slug: 'weekly-meal-plan-template' },
    { title: 'Master Grocery List Template', slug: 'master-grocery-list-template' },
    { title: 'Household Essentials Shopping List', slug: 'household-essentials-shopping-list' },
  ],
};

// ============================================================================
// CROSS-LINK SECTION TEMPLATE
// ============================================================================

const CROSSLINK_MARKER = '<!-- HONEYDEW-LIST-CROSSLINKS -->';

function buildCrossLinkSection(lists) {
  // Each link on its own line (no bullet lists) — the blog renderer
  // detects app.gethoneydew.app/lists/ URLs and renders them as
  // rich interactive cards with UTM tracking.
  const links = lists.map(l =>
    `[${l.title}](${LIST_BASE_URL}/${l.slug})`
  ).join('\n\n');

  return `
---

${CROSSLINK_MARKER}
## Browse Related Checklists & Templates

Looking for ready-to-use lists you can customize and share with your family? Honeydew has hundreds of free, interactive checklists — tap any to open in the app:

${links}

**[Browse All Lists & Templates →](${LIST_BASE_URL})**
${CROSSLINK_MARKER}
`;
}

// ============================================================================
// INJECTION LOGIC
// ============================================================================

function findInsertionPoint(content) {
  // Priority 1: Before TikTok Script Ideas section
  const tiktokMatch = content.match(/\n(---\s*\n+)?## TikTok Script Ideas/);
  if (tiktokMatch) {
    return content.indexOf(tiktokMatch[0]);
  }

  // Priority 2: Before "Article complete!" or "End of extended section"
  const endMarkers = [
    /\n\*\*Article complete!\*\*/,
    /\n\*\*End of extended section/,
  ];
  for (const marker of endMarkers) {
    const match = content.match(marker);
    if (match) {
      // Go back to find the preceding ---
      const idx = content.indexOf(match[0]);
      const preceding = content.lastIndexOf('\n---', idx);
      if (preceding > idx - 20 && preceding !== -1) return preceding;
      return idx;
    }
  }

  // Priority 3: Before final CTA link at very end
  const finalCtaMatch = content.match(/\n\*\*Final CTA:\*\*/);
  if (finalCtaMatch) {
    const idx = content.indexOf(finalCtaMatch[0]);
    const preceding = content.lastIndexOf('\n---', idx);
    if (preceding > idx - 20 && preceding !== -1) return preceding;
    return idx;
  }

  // Priority 4: Append before the last --- at end of file
  const lastDash = content.lastIndexOf('\n---');
  if (lastDash !== -1 && lastDash > content.length - 200) {
    return lastDash;
  }

  // Priority 5: Append at end
  return content.length;
}

function stripExistingCrossLinks(content) {
  // Remove everything between the two CROSSLINK_MARKER comments (inclusive)
  // Also remove the preceding --- separator that was part of the section
  const pattern = new RegExp(
    `\\n---\\n\\n${CROSSLINK_MARKER}[\\s\\S]*?${CROSSLINK_MARKER}\\n`,
    'g'
  );
  return content.replace(pattern, '\n');
}

function injectCrossLinks(content, lists, forceReplace = false) {
  // If already injected, skip unless force mode
  if (content.includes(CROSSLINK_MARKER)) {
    if (!forceReplace) {
      return { content, skipped: true };
    }
    // Strip existing and re-inject
    content = stripExistingCrossLinks(content);
  }

  const section = buildCrossLinkSection(lists);
  const insertAt = findInsertionPoint(content);
  
  const newContent = content.slice(0, insertAt) + section + content.slice(insertAt);
  return { content: newContent, skipped: false };
}

// ============================================================================
// INLINE EMBED INJECTION
// Places a {{HONEYDEW_EMBED:slug}} marker mid-article for the primary list.
// The blog renderer detects this and renders an interactive iframe preview.
// ============================================================================

const EMBED_MARKER_PREFIX = '{{HONEYDEW_EMBED:';
const EMBED_MARKER_SUFFIX = '}}';

function buildEmbedMarker(slug) {
  return `${EMBED_MARKER_PREFIX}${slug}${EMBED_MARKER_SUFFIX}`;
}

function stripExistingEmbeds(content) {
  // Remove any existing embed markers (full line)
  return content.replace(/\n\{\{HONEYDEW_EMBED:[a-z0-9-]+\}\}\n/g, '\n');
}

/**
 * Find the best insertion point for an inline embed.
 * Strategy: After the 3rd H2 heading (deep enough for context, not too far down).
 * Falls back to after 2nd H2, then after 1st H2.
 */
function findEmbedInsertionPoint(content) {
  const h2Pattern = /\n## [^\n]+/g;
  const matches = [];
  let match;
  while ((match = h2Pattern.exec(content)) !== null) {
    matches.push({ index: match.index, length: match[0].length });
  }

  if (matches.length === 0) return -1;

  // Target: after the 3rd H2, fallback to 2nd, then 1st
  const targetH2 = matches[Math.min(2, matches.length - 1)];

  // Find the end of the paragraph/section after this H2
  // Look for the next blank line after some content
  const afterH2 = targetH2.index + targetH2.length;
  
  // Find the next H2 or --- to know the section boundary
  const nextSectionStart = content.indexOf('\n## ', afterH2 + 1);
  const nextHr = content.indexOf('\n---', afterH2 + 1);
  
  let sectionEnd;
  if (nextSectionStart !== -1 && nextHr !== -1) {
    sectionEnd = Math.min(nextSectionStart, nextHr);
  } else {
    sectionEnd = nextSectionStart !== -1 ? nextSectionStart : (nextHr !== -1 ? nextHr : content.length);
  }

  // Find a good paragraph break within this section (after first 1-2 paragraphs)
  const sectionContent = content.slice(afterH2, sectionEnd);
  // Look for double newline (paragraph break) at least 200 chars into the section
  const paragraphBreaks = [];
  let searchStart = 0;
  while (true) {
    const idx = sectionContent.indexOf('\n\n', searchStart);
    if (idx === -1 || idx >= sectionContent.length) break;
    paragraphBreaks.push(afterH2 + idx);
    searchStart = idx + 2;
  }

  // Pick a paragraph break that's at least 200 chars into the section
  for (const breakIdx of paragraphBreaks) {
    if (breakIdx - afterH2 >= 200) {
      return breakIdx;
    }
  }

  // Fallback: end of section
  return paragraphBreaks.length > 0 ? paragraphBreaks[paragraphBreaks.length - 1] : sectionEnd;
}

function injectInlineEmbed(content, primaryListSlug, forceReplace = false) {
  const marker = buildEmbedMarker(primaryListSlug);

  // Already has an embed?
  if (content.includes(EMBED_MARKER_PREFIX)) {
    if (!forceReplace) return content;
    content = stripExistingEmbeds(content);
  }

  const insertAt = findEmbedInsertionPoint(content);
  if (insertAt === -1) return content;

  // Insert the embed marker on its own line (blank lines around it for paragraph separation)
  return content.slice(0, insertAt) + '\n\n' + marker + '\n' + content.slice(insertAt);
}

// ============================================================================
// FILE PROCESSING
// ============================================================================

function getSlugFromFilename(filename) {
  return filename.replace(/\.md$/, '');
}

function processDirectory(dirPath, stats, forceReplace = false) {
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') && f !== 'CONTENT_STATUS.md');

  for (const file of files) {
    const slug = getSlugFromFilename(file);
    const lists = BLOG_TO_LISTS[slug];

    if (!lists) {
      stats.unmapped.push(slug);
      continue;
    }

    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Step 1: Inject inline embed (primary list, mid-article)
    const primaryListSlug = lists[0].slug;
    content = injectInlineEmbed(content, primaryListSlug, forceReplace);

    // Step 2: Inject bottom cross-link section
    const { content: newContent, skipped } = injectCrossLinks(content, lists, forceReplace);

    if (skipped) {
      stats.skippedAlreadyDone.push(slug);
      continue;
    }

    fs.writeFileSync(filePath, newContent, 'utf-8');
    stats.injected.push(slug);
  }
}

function main() {
  const publicBlogDir = path.join(__dirname, '..', 'public', 'blog');
  const scheduledDir = path.join(__dirname, '..', 'blog', 'scheduled');
  const forceReplace = process.argv.includes('--force');

  const stats = {
    injected: [],
    skippedAlreadyDone: [],
    unmapped: [],
  };

  console.log('=== Blog-to-List Cross-Linking Script ===\n');
  console.log(`Mapped blog articles: ${Object.keys(BLOG_TO_LISTS).length}`);
  console.log(`List base URL: ${LIST_BASE_URL}`);
  if (forceReplace) console.log('Mode: FORCE REPLACE (stripping & re-injecting all)');
  console.log('');

  // Process public/blog/
  console.log('Processing public/blog/...');
  processDirectory(publicBlogDir, stats, forceReplace);

  // Reset stats for scheduled (track separately but inject same way)
  const scheduledStats = {
    injected: [],
    skippedAlreadyDone: [],
    unmapped: [],
  };

  // Process blog/scheduled/
  if (fs.existsSync(scheduledDir)) {
    console.log('Processing blog/scheduled/...');
    processDirectory(scheduledDir, scheduledStats, forceReplace);
  }

  // Report
  console.log('\n=== Results ===\n');
  console.log(`PUBLIC/BLOG:`);
  console.log(`  Injected: ${stats.injected.length} articles`);
  console.log(`  Already done: ${stats.skippedAlreadyDone.length} articles`);
  console.log(`  No mapping: ${stats.unmapped.length} articles`);

  if (fs.existsSync(scheduledDir)) {
    console.log(`\nBLOG/SCHEDULED:`);
    console.log(`  Injected: ${scheduledStats.injected.length} articles`);
    console.log(`  Already done: ${scheduledStats.skippedAlreadyDone.length} articles`);
    console.log(`  No mapping: ${scheduledStats.unmapped.length} articles`);
  }

  if (stats.unmapped.length > 0) {
    console.log(`\nUnmapped articles (add to BLOG_TO_LISTS to include):`);
    stats.unmapped.forEach(s => console.log(`  - ${s}`));
  }

  console.log(`\nTotal cross-links created: ${stats.injected.length + scheduledStats.injected.length}`);
  console.log('Done!');
}

main();
