import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToTarget(target: HTMLElement | number) {
  const l = getLenis();
  if (l) {
    l.scrollTo(target, { duration: 0.8 });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }
}
