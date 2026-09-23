import { inject as injectVercelAnalytics } from '@vercel/analytics';

const CONSENT_KEY = 'cookie-consent';
let injected = false;

/**
 * Called once at bootstrap: turns analytics on only if a previous
 * visit already recorded consent (localStorage persists across visits).
 */
export function enableAnalyticsIfConsented(): void {
  if (injected) return;
  if (localStorage.getItem(CONSENT_KEY) === 'accepted') {
    injectVercelAnalytics();
    injected = true;
  }
}

/** Called when the visitor accepts the cookie banner in the current session. */
export function enableAnalytics(): void {
  if (injected) return;
  injectVercelAnalytics();
  injected = true;
}
