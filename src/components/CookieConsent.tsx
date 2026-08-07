import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { getConsent, saveConsent, initConsentMode, grantAnalyticsConsent, revokeAnalyticsConsent, COOKIE_SETTINGS_EVENT } from '../lib/consent';
import type { ConsentChoice } from '../lib/consent';
import type { Lang } from '../hooks/useI18n';
import { cookieI18n } from '../i18n/cookie';

export function CookieConsent({ lang }: { lang: Lang }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(() => getConsent());
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef(0);

  useEffect(() => {
    initConsentMode();
    if (choice === 'accepted') grantAnalyticsConsent();
    return () => window.clearTimeout(timerRef.current);
  }, [choice]);

  const showBanner = choice === null || visible;

  useEffect(() => {
    if (showBanner) bannerRef.current?.focus({ preventScroll: true });
  }, [showBanner]);

  useEffect(() => {
    const onOpen = () => {
      window.clearTimeout(timerRef.current);
      setClosing(false);
      setVisible(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, onOpen);
  }, []);

  if (!showBanner) return null;

  const t = cookieI18n[lang];

  const decide = (next: ConsentChoice) => {
    saveConsent(next);
    if (next === 'declined' && choice === 'accepted') revokeAnalyticsConsent();
    setClosing(true);
    timerRef.current = window.setTimeout(() => {
      setClosing(false);
      setVisible(false);
      setChoice(next);
    }, 320);
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
