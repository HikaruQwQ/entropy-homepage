import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { ScrollTop } from '../components/ScrollTop';
import { CookieConsent } from '../components/CookieConsent';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../hooks/useTheme';
import { useLenis } from '../hooks/useLenis';
import { useScrollState } from '../hooks/useScrollState';
import { polarisI18n } from '../i18n/polaris';

export function Polaris() {
  const { t, toggleLang, langLabel, lang, getLangSwitchMessage } = useI18n(polarisI18n);
  const { isLight, toggleTheme, toggleLabel } = useTheme();
  const { showToast } = useToast();
  useLenis();
  const { scrolled, showScrollTop } = useScrollState(false);

  const handleToggleLang = () => {
    toggleLang();
    showToast(getLangSwitchMessage());
  };

  return (
    <>
      <Nav
        logoHref="index.html"
        scrolled={scrolled}
        links={[
          { href: 'index.html', label: t('home') },
          { href: 'team.html', label: t('team') },
          { href: 'polaris.html', label: t('polaris') },
        ]}
        langLabel={langLabel}
        onToggleLang={handleToggleLang}
        themePressed={isLight}
        themeLabel={toggleLabel}
        onToggleTheme={toggleTheme}
      />

      <main>
        <section className="polaris-hero">
          <div className="container">
            <p className="eyebrow reveal">{t('polaris')}</p>
            <h1 className="polaris-hero-title reveal">{t('pageTitle')}</h1>
            <p className="polaris-hero-body reveal">{t('pageBody')}</p>
            <Button asChild className="polaris-back-link reveal">
              <a href="index.html">← {t('backHome')}</a>
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
