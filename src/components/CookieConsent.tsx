import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { getConsent, saveConsent, initConsentMode, grantAnalyticsConsent } from '../lib/consent';
import type { ConsentChoice } from '../lib/consent';
import type { Lang } from '../hooks/useI18n';
import { cookieI18n } from '../i18n/cookie';

export function CookieConsent({ lang }: { lang: Lang }) {
  const [status, setStatus] = useState<ConsentChoice | null>(() => getConsent());
  const [closing, setClosing] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef(0);

  useEffect(() => {
    initConsentMode();
    if (status === 'accepted') grantAnalyticsConsent();
    return () => window.clearTimeout(timerRef.current);
  }, [status]);

  useEffect(() => {
    if (status === null) bannerRef.current?.focus({ preventScroll: true });
  }, [status]);

  if (status !== null) return null;

  const t = cookieI18n[lang];

  const decide = (choice: ConsentChoice) => {
    saveConsent(choice);
    setClosing(true);
    timerRef.current = window.setTimeout(() => setStatus(choice), 320);
  };

  return (
    <div
      ref={bannerRef}
      className={`cookie-banner${closing ? ' closing' : ''}`}
      role="dialog"
      aria-label={t.ariaLabel}
      aria-describedby="cookie-banner-text"
      tabIndex={-1}
    >
      <div className="cookie-banner-inner">
        <div className="cookie-banner-body">
          <p className="cookie-banner-title">{t.title}</p>
          <p className="cookie-banner-text" id="cookie-banner-text">
            {t.message}
          </p>
        </div>
        <div className="cookie-banner-actions">
          <Button className="cookie-banner-btn cookie-banner-decline" onClick={() => decide('declined')}>
            {t.decline}
          </Button>
          <Button className="cookie-banner-btn cookie-banner-accept" onClick={() => decide('accepted')}>
            {t.accept}
          </Button>
        </div>
      </div>
    </div>
  );
}
