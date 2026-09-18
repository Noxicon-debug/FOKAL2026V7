type AnalyticsEvent = 'contact_submit' | 'quote_start' | 'quote_submit' | 'phone_click' | 'email_click' | 'whatsapp_click' | 'view_our_work';

declare global { interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[][]; } }

export const analyticsId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function hasAnalyticsConsent() { return typeof window !== 'undefined' && localStorage.getItem('fokal-analytics-consent') === 'granted'; }
export function grantAnalyticsConsent() { localStorage.setItem('fokal-analytics-consent', 'granted'); window.dispatchEvent(new Event('fokal-analytics-consent')); }
export function trackEvent(name: AnalyticsEvent, params: Record<string, string | number> = {}) { window.gtag?.('event', name, params); }
