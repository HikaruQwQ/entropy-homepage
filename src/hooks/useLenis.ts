import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, setLenis } from '../lib/scroll';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(instance);

    instance.on('scroll', () => ScrollTrigger.update());
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setReady(true);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const refresh = useCallback(() => ScrollTrigger.refresh(), []);
  return { ready, refresh };
}
