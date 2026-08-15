import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { ScrollTop } from '../components/ScrollTop';
import { CookieConsent } from '../components/CookieConsent';
import { SegmentFaultLogo } from '../components/icons';
import { useToast } from '../components/Toast';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../hooks/useTheme';
import { useLenis } from '../hooks/useLenis';
import { useScrollState } from '../hooks/useScrollState';
import { usePolarisAnimations, useSponsorGridReveal } from '../hooks/useRevealAnimations';
import { polarisI18n } from '../i18n/polaris';
import { useEffect, useState } from 'react';

interface Sponsor {
  name: string;
  url?: string;
  logo: { dark: string; light: string };
}

interface SponsorCategory {
  category: { zh: string; en: string };
  sponsors: Sponsor[];
}

export function Polaris() {
  const { t, toggleLang, langLabel, lang, getLangSwitchMessage } = useI18n(polarisI18n);
  const { isLight, toggleTheme, toggleLabel } = useTheme();
  const { showToast } = useToast();
  useLenis();
  const { scrolled, showScrollTop } = useScrollState(false);
  usePolarisAnimations();

  const [sponsorCategories, setSponsorCategories] = useState<SponsorCategory[]>([]);
  useEffect(() => {
    let cancelled = false;
    fetch('sponsor.json')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: SponsorCategory[]) => {
        if (!cancelled && Array.isArray(data)) setSponsorCategories(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  const hasSponsors = sponsorCategories.some((category) => category.sponsors.length > 0);
  useSponsorGridReveal(hasSponsors);

  const handleToggleLang = () => {
    toggleLang();
    showToast(getLangSwitchMessage());
  };

  return (
    <div className="polaris-page">
      <Nav
        logoHref="index.html"
        scrolled={scrolled}
        activeSection="polaris"
        links={[
          { href: 'index.html', label: t('home') },
          { href: 'team.html', label: t('team') },
          { href: 'polaris.html', label: t('polaris'), sectionId: 'polaris' },
        ]}
        langLabel={langLabel}
        onToggleLang={handleToggleLang}
        themePressed={isLight}
        themeLabel={toggleLabel}
        onToggleTheme={toggleTheme}
      />

      <div className="polaris-banner">
        <span className="polaris-banner-text">{t('previewBanner')}</span>
      </div>

      <main>
        <section className="polaris-hero">
          <div className="container">
            <div className="polaris-hero-card reveal">
              <img
                className="polaris-hero-bg"
                src="https://webp.entropy.asia/public/polaris.png"
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
                {...({ fetchpriority: 'high' } as Record<string, string>)}
              />
              <img className="polaris-hero-logo" src="assets/polaris27.svg" alt="polaris.27" />
            </div>
            <p className="eyebrow reveal">{t('heroEyebrow')}</p>
            <h1 className="polaris-hero-title reveal">{t('heroIntro')}</h1>
          </div>
        </section>

        <div className="polaris-main">
          <section className="polaris-overview">
            <div className="container">
              <p className="eyebrow reveal">{t('overviewEyebrow')}</p>
              <h2 className="polaris-overview-title reveal">
                <span className="polaris-overview-title-en">{t('overviewTitle')}</span>
                <span className="polaris-overview-title-sub">{t('overviewSub')}</span>
              </h2>
              <div className="polaris-stats">
                <div className="polaris-stat-card">
                  <p className="polaris-stat-label">{t('statPeopleLabel')}</p>
                  <p className="polaris-stat-value">{t('statPeopleValue')}</p>
                </div>
                <div className="polaris-stat-card">
                  <p className="polaris-stat-label">{t('statTimeLabel')}</p>
                  <p className="polaris-stat-value">{t('statTimeValue')}</p>
                </div>
                <div className="polaris-stat-card">
                  <p className="polaris-stat-label">
                    <span>{t('statPrizeLabel')}</span>
                    <span className="polaris-stat-unit">{t('statPrizeUnit')}</span>
                  </p>
                  <p className="polaris-stat-value">{t('statPrizeValue')}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="polaris-origin">
            <div className="polaris-origin-glow" aria-hidden="true" />
            <div className="container">
              <p className="eyebrow reveal">{t('originEyebrow')}</p>
              <h2 className="polaris-origin-title reveal">
                <span>{t('originTitlePre')}</span>
                <span className="polaris-origin-title-em">{t('originTitleEm')}</span>
              </h2>
              <div className="polaris-origin-content">
                <p className="polaris-origin-body">{t('originSpark')}</p>
                <p className="polaris-origin-body">
                  <span>{t('originP0')}</span>{' '}
                  <img src="assets/tc-lockup-hp.svg" className="inline-logo" alt="TechCrunch" />{' '}
                  <span>{t('originP0Post')}</span>
                </p>
                <p className="polaris-origin-body">
                  <span>{t('originP05Pre')}</span>
                  <SegmentFaultLogo />
                  <span>{t('originP05Post')}</span>
                </p>
                <p className="polaris-origin-body">
                  <span>{t('originP1Pre')}</span>
                  <img src="assets/adventure-x.svg" className="inline-logo" alt="AdventureX" />{' '}
                  <span>{t('originP1Post')}</span>
                </p>
                <p className="polaris-origin-em">{t('originQuote')}</p>
                <p className="polaris-origin-body">
                  <span>{t('originP2Pre')}</span>
                  <strong>{t('originP2Em')}</strong>
                  <span>{t('originP2Post')}</span>
                </p>
                <p className="polaris-origin-em">{t('originQuote2')}</p>
              </div>
            </div>
          </section>

          <section className="polaris-welcome">
            <div className="container">
              <p className="eyebrow reveal">{t('welcomeEyebrow')}</p>
              <h2 className="polaris-welcome-title reveal">
                <span>{t('welcomeTitlePre')}</span>
                <img src="assets/polaris27.svg" className="inline-logo polaris-title-logo" alt="polaris.27" />
                <span>{t('welcomeTitlePost')}</span>
              </h2>
              <div className="polaris-welcome-content">
                <p className="polaris-welcome-body">
                  <span>{t('welcomeP1Pre')}</span>{' '}
                  <img src="assets/polaris27.svg" className="inline-logo" alt="polaris.27" />{' '}
                  <span>{t('welcomeP1Post')}</span>
                </p>
                <p className="polaris-welcome-body">{t('welcomeP2')}</p>
                <div className="polaris-benefits">
                  <div className="polaris-benefit-card">
                    <img
                      className="polaris-benefit-bg"
                      src="https://webp.entropy.asia/public/hotel.png"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="polaris-benefit-text">
                      <p className="polaris-benefit-small">{t('benefitHotelSmall')}</p>
                      <p className="polaris-benefit-big">{t('benefitHotelBig')}</p>
                    </div>
                  </div>
                  <div className="polaris-benefit-card">
                    <img
                      className="polaris-benefit-bg"
                      src="https://webp.entropy.asia/public/train.png"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="polaris-benefit-text">
                      <p className="polaris-benefit-small">{t('benefitTrainSmall')}</p>
                      <p className="polaris-benefit-big">{t('benefitTrainBig')}</p>
                    </div>
                  </div>
                  <div className="polaris-benefit-card">
                    <img
                      className="polaris-benefit-bg"
                      src="https://webp.entropy.asia/public/food.png"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="polaris-benefit-text">
                      <p className="polaris-benefit-big">{t('benefitFoodBig')}</p>
                    </div>
                  </div>
                </div>
                <p className="polaris-welcome-body">{t('welcomeClosing')}</p>
              </div>
            </div>
          </section>

          <section className="polaris-partners">
            <div className="container">
              <p className="eyebrow reveal">{t('partnersEyebrow')}</p>
              <h2 className="polaris-partners-title reveal">{t('partnersTitle')}</h2>
              <p className="polaris-partners-body reveal">{t('partnersP1')}</p>
              <p className="polaris-partners-body reveal">
                <span>{t('partnersP2Pre')}</span>{' '}
                <img src="assets/polaris27.svg" className="inline-logo" alt="polaris.27" />{' '}
                <span>{t('partnersP2Post')}</span>
              </p>
              {hasSponsors && (
                <div className="polaris-sponsors">
                  {sponsorCategories.map((category) => (
                    <div className="polaris-sponsor-group" key={category.category.zh}>
                      <h3 className="polaris-sponsor-group-title">{category.category[lang]}</h3>
                      <div className="polaris-sponsor-grid">
                        {category.sponsors.map((sponsor) => {
                          const logo = (
                            <img
                              className="polaris-sponsor-logo"
                              src={isLight ? sponsor.logo.light : sponsor.logo.dark}
                              alt={sponsor.name}
                              loading="lazy"
                              decoding="async"
                            />
                          );
                          return sponsor.url ? (
                            <a
                              key={sponsor.name}
                              className="polaris-sponsor-card"
                              href={sponsor.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={sponsor.name}
                            >
                              {logo}
                            </a>
                          ) : (
                            <div key={sponsor.name} className="polaris-sponsor-card" aria-label={sponsor.name}>
                              {logo}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <p className="polaris-partners-body polaris-partners-cta reveal">
                <span>{t('partnersCtaPre')}</span>{' '}
                <a className="polaris-partners-mail" href="mailto:support@entropy.asia">support@entropy.asia</a>{' '}
                <span>{t('partnersCtaPost')}</span>
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer disclaimer={t('disclaimer')} cookieSettingsLabel={t('cookieSettings')} />
      <ScrollTop visible={showScrollTop} />
      <CookieConsent lang={lang} />
    </div>
  );
}
