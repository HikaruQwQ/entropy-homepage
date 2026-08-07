import type { MouseEvent } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { ScrollTop } from '../components/ScrollTop';
import { CookieConsent } from '../components/CookieConsent';
import { Button } from '../components/Button';
import { ScrollHintIcon, SegmentFaultLogo } from '../components/icons';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../hooks/useTheme';
import { useLenis } from '../hooks/useLenis';
import { useScrollState } from '../hooks/useScrollState';
import { useHomeAnimations } from '../hooks/useRevealAnimations';
import { scrollToTarget } from '../lib/scroll';
import { homeI18n } from '../i18n/home';

const entryAvatars = [
  { src: 'assets/team/mmexport1717774465091.jpg', alt: '杨景铄' },
  { src: 'assets/team/IMG_0026.JPEG', alt: '许白' },
  { src: 'assets/team/1786002194999.jpeg', alt: 'Lonely' },
  { src: 'assets/team/1755440975063.jpeg', alt: 'Cherry Zhu' },
  { src: 'assets/team/mmexport1786004098313.jpg', alt: 'Evan Tee' },
];

export function Home() {
  const { t, toggleLang, langLabel, lang } = useI18n(homeI18n);
  const { isLight, toggleTheme, toggleLabel } = useTheme();
  useLenis();
  const { scrolled, showScrollTop, activeSection } = useScrollState(true);
  useHomeAnimations();

  const handleNavClick = (href: string, event: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#') && href.length > 1) {
      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        event.preventDefault();
        scrollToTarget(target);
      }
    }
  };

  return (
    <>
      <Nav
        logoHref="#home"
        scrolled={scrolled}
        activeSection={activeSection}
        onLinkClick={handleNavClick}
        links={[
          { href: '#home', label: t('home'), sectionId: 'home' },
          { href: '#about', label: t('about'), sectionId: 'about' },
        ]}
        langLabel={langLabel}
        onToggleLang={toggleLang}
        themePressed={isLight}
        themeLabel={toggleLabel}
        onToggleTheme={toggleTheme}
      />

      <main>
        <section id="home" className="hero">
          <div className="hero-image-wrap">
            <img
              src="assets/hero_bg.png"
              alt="极星黑客松主视觉"
              width={916}
              height={307}
              loading="eager"
              decoding="async"
              {...({ fetchpriority: 'high' } as Record<string, string>)}
            />
            <span className="hero-doing">{t('heroDoing')}</span>
            <div className="hero-logo">
              <img src="assets/polaris_logo.svg" alt="POLARIS" />
            </div>
          </div>
          <div className="container hero-content">
            <p className="hero-eyebrow reveal">{t('heroLabel')}</p>
            <h1 className="hero-title reveal">{t('heroTitle')}</h1>
            <Button asChild className="cta-btn reveal">
              <a href="mailto:hr@entropy.asia">{t('heroCta')}</a>
            </Button>
            <div className="scroll-hint reveal">
              <ScrollHintIcon />
            </div>
          </div>
        </section>

        <section id="about" className="section-alt">
          <div className="container">
            <div className="team-section">
              <div className="team-block reveal">
                <p className="eyebrow">{t('entropy')}</p>
                <p className="team-block-body">{t('entropyBody')}</p>
              </div>
              <div className="team-block reveal">
                <p className="eyebrow">{t('tech')}</p>
                <h3 className="team-block-title">
                  <img src="assets/entropy_logo.svg" className="tech-logo" alt="_entropy" />{' '}
                  <span>{t('techTitleText')}</span>
                </h3>
              </div>
              <div className="team-block reveal">
                <p className="eyebrow">{t('art')}</p>
                <p className="team-block-body">
                  <img src="assets/entropy_logo.svg" className="tech-logo art-logo" alt="_entropy" />{' '}
                  <span>{t('artBodyText')}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="origin" className="section-alt">
          <div className="container">
            <p className="eyebrow reveal">{t('origin')}</p>
            <h2 className="section-title reveal">{t('originTitle')}</h2>
            <div className="origin-content">
              <p className="origin-body">{t('originSpark')}</p>
              <p className="origin-body">
                <span>{t('originP0')}</span>{' '}
                <img src="assets/tc-lockup-hp.svg" className="inline-logo" alt="TechCrunch" />{' '}
                <span>{t('originP0Post')}</span>
              </p>
              <p className="origin-body">
                <span>{t('originP05Pre')}</span>
                <SegmentFaultLogo />
                <span>{t('originP05Post')}</span>
              </p>
              <p className="origin-body">
                <span>{t('originP1Pre')}</span>
                <img src="assets/adventure-x.svg" className="inline-logo" alt="AdventureX" />
                <span>{t('originP1Post')}</span>
              </p>
              <p className="origin-quote">{t('originQuote')}</p>
              <p className="origin-body">{t('originP2')}</p>
              <p className="origin-quote">{t('originQuote2')}</p>
            </div>
          </div>
        </section>

        <section id="welcome" className="welcome-section">
          <div className="container">
            <p className="eyebrow reveal">{t('welcome')}</p>
            <h2 className="welcome-title reveal">{t('welcomeTitle')}</h2>
            <p className="welcome-body reveal">{t('welcomeBody')}</p>
          </div>
        </section>

        <section id="team-entry" className="team-entry-section">
          <div className="container">
            <Button asChild className="team-entry reveal">
              <a href="team.html" aria-label="团队成员">
                <div className="avatar-group">
                  {entryAvatars.map((avatar) => (
                    <img
                      key={avatar.src}
                      src={avatar.src}
                      alt={avatar.alt}
                      className="avatar-group-item"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                  <span className="avatar-group-more" aria-hidden="true">
                    _
                  </span>
                </div>
                <span className="team-entry-text">{t('teamEntryText')}</span>
              </a>
            </Button>
          </div>
        </section>

        <section id="join" className="join-section section-alt">
          <div className="container">
            <Button asChild className="join-card reveal">
              <a href="mailto:hr@entropy.asia" id="joinCard" aria-label="加入我们">
                <img src="assets/join_bg.png" alt="JOIN US" width={918} height={308} loading="lazy" decoding="async" />
                <div className="join-overlay">
                  <div>
                    <p className="join-title">JOIN</p>
                    <p className="join-title">US.</p>
                  </div>
                </div>
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer disclaimer={t('disclaimer')} cookieSettingsLabel={t('cookieSettings')} />
      <ScrollTop visible={showScrollTop} />
      <CookieConsent lang={lang} />
    </>
  );
}
