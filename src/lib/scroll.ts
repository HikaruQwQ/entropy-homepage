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

export function scrollToTarget(target: HTMLElement | number, offset = 0, refresh = false) {
  const l = getLenis();
  if (l) {
    // 内容高度刚变化时，Lenis 的尺寸更新有 250ms 防抖，limit 可能滞后，
    // 需先强制刷新尺寸，否则目标位置会被旧的 limit 截断
    if (refresh) l.resize();
    l.scrollTo(target, { offset, duration: 0.8 });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }
}
