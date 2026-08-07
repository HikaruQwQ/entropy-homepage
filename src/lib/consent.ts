export type ConsentChoice = 'accepted' | 'declined';

const STORAGE_KEY = 'cookieConsent';
const GA_ID = 'G-K6QV35TQT9';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getConsent(): ConsentChoice | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'accepted' || saved === 'declined' ? saved : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
  }
}

let consentModeReady = false;
let analyticsLoaded = false;

export function initConsentMode(): void {
  if (consentModeReady) return;
  consentModeReady = true;

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag = gtag;
  gtag('consent', 'default', {
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    ad_storage: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });
  gtag('js', new Date());
  gtag('config', GA_ID);
}

export function grantAnalyticsConsent(): void {
  initConsentMode();
  window.gtag?.('consent', 'update', {
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    ad_storage: 'granted',
    analytics_storage: 'granted',
  });

  if (analyticsLoaded) return;
  analyticsLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode?.insertBefore(script, firstScript);
}
