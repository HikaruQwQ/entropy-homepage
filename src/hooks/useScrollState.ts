import { useEffect, useState } from 'react';

export interface ScrollState {
  scrolled: boolean;
  showScrollTop: boolean;
  activeSection: string;
}

export function useScrollState(trackSections: boolean): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrolled: false,
    showScrollTop: false,
    activeSection: '',
  });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const scrolled = y > 60;
      const showScrollTop = y > 400;

      let activeSection = '';
      if (trackSections) {
        document.querySelectorAll<HTMLElement>('main section[id]').forEach((sec) => {
          if (sec.getBoundingClientRect().top <= 120) {
            activeSection = sec.id;
          }
        });
      }

      setState((prev) =>
        prev.scrolled === scrolled &&
        prev.showScrollTop === showScrollTop &&
        prev.activeSection === activeSection
          ? prev
          : { scrolled, showScrollTop, activeSection }
      );
    };

    update();

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [trackSections]);

  return state;
}
