import { useState } from 'react';
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
import { useTeamAnimations } from '../hooks/useRevealAnimations';
import { teamI18n, type TeamI18nKey } from '../i18n/team';

interface TeamMember {
  nameKey: TeamI18nKey;
  tagKey: TeamI18nKey;
  src: string;
  alt: string;
}

interface TeamGroup {
  label: string;
  titleKey: TeamI18nKey;
  descKey: TeamI18nKey;
  alt: boolean;
  members: TeamMember[];
}

const groups: TeamGroup[] = [
  {
    label: '/Core Team',
    titleKey: 'group1Title',
    descKey: 'group1Desc',
    alt: true,
    members: [
      { nameKey: 'm1Name', tagKey: 'm1Tag', src: 'assets/team/IMG_0026.JPEG', alt: '许白' },
      { nameKey: 'm6Name', tagKey: 'm6Tag', src: 'assets/team/F6UvP_Lk.jpg', alt: '踪天朔' },
      { nameKey: 'm7Name', tagKey: 'm7Tag', src: 'assets/team/mmexport1783774558948.jpg', alt: '比尔' },
    ],
  },
  {
    label: '/Tech & Design Team',
    titleKey: 'group2Title',
    descKey: 'group2Desc',
    alt: false,
    members: [
      { nameKey: 'm2Name', tagKey: 'm2Tag', src: 'assets/team/1786002194999.jpeg', alt: 'Lonely' },
      { nameKey: 'm3Name', tagKey: 'm3Tag', src: 'assets/team/1755440975063.jpeg', alt: 'Cherry Zhu' },
      { nameKey: 'm5Name', tagKey: 'm5Tag', src: 'assets/team/mmexport1786004098313.jpg', alt: 'Evan Tee' },
      { nameKey: 'm12Name', tagKey: 'm12Tag', src: 'assets/team/ar.jpg', alt: 'Ariakage' },
      { nameKey: 'm9Name', tagKey: 'm9Tag', src: 'assets/team/1786007031670.jpg', alt: 'Rechrd' },
    ],
  },
  {
    label: '/Biz & Legal Team',
    titleKey: 'group3Title',
    descKey: 'group3Desc',
    alt: true,
    members: [
      { nameKey: 'm4Name', tagKey: 'm4Tag', src: 'assets/team/mmexport1717774465091.jpg', alt: '杨景铄' },
      { nameKey: 'm8Name', tagKey: 'm8Tag', src: 'assets/team/1786006726932.jpg', alt: '流萤' },
    ],
  },
  {
    label: '/Consultants',
    titleKey: 'group5Title',
    descKey: 'group5Desc',
    alt: true,
    members: [
      { nameKey: 'm10Name', tagKey: 'm10Tag', src: 'assets/team/mmexport1786006880805.jpg', alt: '天街下小雨' },
      { nameKey: 'm11Name', tagKey: 'm11Tag', src: 'assets/team/OIP.gr3vp5KBMf9wj6DhLdCupQAAAA.jpg', alt: 'Xydia' },
    ],
  },
];

function TeamCard({
  member,
  t,
  active,
  onToggle,
}: {
  member: TeamMember;
  t: (key: TeamI18nKey) => string;
  active: boolean;
  onToggle: (src: string | null) => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const tagline = t(member.tagKey);
  const interactive = tagline !== '';

  return (
    <div
      className={`team-card reveal${active ? ' is-active' : ''}${interactive ? ' has-sign' : ''}`}
      onClick={interactive ? () => onToggle(active ? null : member.src) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggle(active ? null : member.src);
              }
            }
          : undefined
      }
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-expanded={interactive ? active : undefined}
    >
      <div className={`team-card-avatar${imgFailed ? ' avatar-empty' : ''}`}>
        {!imgFailed && (
          <img
            src={member.src}
            alt={member.alt}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <div className="team-card-info">
        <h3 className="team-card-name">{t(member.nameKey)}</h3>
      </div>
      {interactive && (
        <div className="team-card-sign" aria-hidden={!active}>
          <p className="team-card-sign-text">{tagline}</p>
        </div>
      )}
    </div>
  );
}

export function Team() {
  const { t, toggleLang, langLabel, lang, getLangSwitchMessage } = useI18n(teamI18n);
  const { isLight, toggleTheme, toggleLabel } = useTheme();
  const { showToast } = useToast();
  useLenis();
  const { scrolled, showScrollTop } = useScrollState(false);
  useTeamAnimations();
  const [activeMember, setActiveMember] = useState<string | null>(null);

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
          { href: 'index.html#home', label: t('home') },
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
        <section className="team-hero">
          <div className="container">
            <p className="eyebrow reveal">{t('teamLabel')}</p>
            <h1 className="team-hero-title reveal">{t('teamTitle')}</h1>
            <p className="team-hero-body reveal">{t('teamBody')}</p>
          </div>
        </section>

        {groups.map((group) => (
          <section key={group.label} className={`team-group${group.alt ? ' section-alt' : ''}`}>
            <div className="container">
              <div className="team-group-header reveal">
                <p className="team-group-label">{group.label}</p>
                <h2 className="team-group-title">{t(group.titleKey)}</h2>
                <p className="team-group-desc">{t(group.descKey)}</p>
              </div>
              <div className="team-grid">
                {group.members.map((member) => (
                  <TeamCard
                    key={member.src}
                    member={member}
                    t={t}
                    active={activeMember === member.src}
                    onToggle={setActiveMember}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="team-back">
          <div className="container">
            <Button asChild className="team-back-link reveal">
              <a href="index.html">{t('backHome')}</a>
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
