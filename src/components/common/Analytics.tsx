import { useEffect, useState } from 'react';
import { analyticsId, grantAnalyticsConsent, hasAnalyticsConsent } from '../../lib/analytics';

export default function Analytics() {
  const [consented, setConsented] = useState(hasAnalyticsConsent);
  useEffect(() => { const update = () => setConsented(hasAnalyticsConsent()); window.addEventListener('fokal-analytics-consent', update); return () => window.removeEventListener('fokal-analytics-consent', update); }, []);
  if (!analyticsId) return null;
  if (!consented) return <aside className="analytics-consent" role="dialog" aria-label="Analytics preference"><span>We use analytics to improve our website.</span><button onClick={() => { grantAnalyticsConsent(); setConsented(true); }}>Accept analytics</button></aside>;
  return <script async src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} onLoad={() => { window.gtag = (...args) => { window.dataLayer = window.dataLayer || []; window.dataLayer.push(args); }; window.gtag('js', new Date()); window.gtag('config', analyticsId); }} />;
}
