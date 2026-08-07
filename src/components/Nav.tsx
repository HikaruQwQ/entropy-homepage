import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Toggle } from 'radix-ui';
import { Button } from './Button';
import { MoonIcon, SunIcon } from './icons';
import { getLenis } from '../lib/scroll';

export interface NavLinkItem {
  href: string;
  label: string;
  sectionId?: string;
}

export interface NavProps {
  logoHref: string;
  scrolled: boolean;
  links: NavLinkItem[];
  activeSection?: string;
  onLinkClick?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
  langLabel: string;
  onToggleLang: () => void;
  themePressed: boolean;
  themeLabel: string;
  onToggleTheme: () => void;
}

export function Nav({
  logoHref,
  scrolled,
  links,
  activeSection = '',
  onLinkClick,
  langLabel,
  onToggleLang,
  themePressed,
  themeLabel,
  onToggleTheme,
}: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (!e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // 菜单打开时锁定页面滚动（含 Lenis），并支持 Esc 关闭
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      getLenis()?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // 焦点管理：打开时聚焦首个链接，关闭时归还给汉堡按钮
  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true;
      const id = requestAnimationFrame(() => {
        overlayRef.current
          ?.querySelector<HTMLAnchorElement>('.nav-overlay-link')
          ?.focus({ preventScroll: true });
      });
      return () => cancelAnimationFrame(id);
    }
    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      burgerRef.current?.focus({ preventScroll: true });
    }
  }, [menuOpen]);

  // 点击链接前先解锁滚动，保证后续锚点滚动（Lenis）能立即生效
  const unlockScroll = () => {
    document.body.style.overflow = '';
    getLenis()?.start();
  };

  const handleLinkClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    unlockScroll();
    setMenuOpen(false);
    onLinkClick?.(href, event);
  };

  return (
    <>
      <header
        className={`nav${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}
        id="nav"
      >
        <div className="nav-inner">
          <a
            href={logoHref}
            className="nav-logo"
            aria-label="Entropy"
            onClick={() => setMenuOpen(false)}
          >
            <img src="assets/entropy_logo.svg" alt="Entropy" />
          </a>
          <nav className="nav-links" aria-label="主导航">
            {links.map((link) => {
              const active = Boolean(link.sectionId) && link.sectionId === activeSection;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link${active ? ' active' : ''}`}
                  aria-current={active ? 'location' : undefined}
                  onClick={handleLinkClick(link.href)}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <div className="nav-actions">
            <Button className="lang-toggle" aria-label={langLabel} onClick={onToggleLang}>
              中/EN
            </Button>
            <Toggle.Root
              className="theme-toggle"
              pressed={themePressed}
              onPressedChange={onToggleTheme}
              aria-label={themeLabel}
            >
              {themePressed ? <SunIcon /> : <MoonIcon />}
            </Toggle.Root>
            <button
              ref={burgerRef}
              type="button"
              className={`nav-burger${menuOpen ? ' open' : ''}`}
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={menuOpen}
              aria-controls="nav-overlay"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        id="nav-overlay"
        className={`nav-overlay${menuOpen ? ' open' : ''}`}
      >
        <nav className="nav-overlay-links" aria-label="移动端导航">
          {links.map((link) => {
            const active = Boolean(link.sectionId) && link.sectionId === activeSection;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-overlay-link${active ? ' active' : ''}`}
                aria-current={active ? 'location' : undefined}
                tabIndex={menuOpen ? 0 : -1}
                onClick={handleLinkClick(link.href)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        <div className="nav-overlay-footer">
          <Button
            className="lang-toggle"
            aria-label={langLabel}
            onClick={onToggleLang}
            tabIndex={menuOpen ? 0 : -1}
          >
            中/EN
          </Button>
          <Toggle.Root
            className="theme-toggle"
            pressed={themePressed}
            onPressedChange={onToggleTheme}
            aria-label={themeLabel}
            tabIndex={menuOpen ? 0 : -1}
          >
            {themePressed ? <SunIcon /> : <MoonIcon />}
          </Toggle.Root>
        </div>
      </div>
    </>
  );
}
