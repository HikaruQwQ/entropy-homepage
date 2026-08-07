import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { DropdownMenu, Toggle } from 'radix-ui';
import { Button } from './Button';

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

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (!e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleLinkClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    onLinkClick?.(href, event);
  };

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="nav-inner">
        <a href={logoHref} className="nav-logo" aria-label="Entropy">
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
          />
          <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className={`nav-burger${menuOpen ? ' open' : ''}`}
                aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="nav-menu" side="bottom" align="start" sideOffset={0}>
                {links.map((link) => (
                  <DropdownMenu.Item key={link.href} asChild>
                    <a href={link.href} className="nav-link" onClick={handleLinkClick(link.href)}>
                      {link.label}
                    </a>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
}
