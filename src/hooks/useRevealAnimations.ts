import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { prefersReducedMotion } from '../lib/scroll';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function applyReducedMotion() {
  gsap.globalTimeline.timeScale(0);
  gsap.set('.reveal', { opacity: 1, y: 0 });
}

export function useHomeAnimations() {
  useEffect(() => {
    if (prefersReducedMotion) {
      applyReducedMotion();
      return;
    }

    const ctx = gsap.context(() => {
      const heroEls = document.querySelectorAll('.hero-content .reveal');
      gsap
        .timeline({ delay: 0.2 })
        .fromTo(
          heroEls,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06 }
        );

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        if (el.closest('.hero-content')) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.origin-content').forEach((wrap) => {
        gsap.fromTo(
          wrap.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.06,
            scrollTrigger: { trigger: wrap, start: 'top 80%', once: true },
          }
        );
      });

      gsap.to('.hero-image-wrap img', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 },
      });

      gsap.to('.hero-doing', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '30% top', scrub: true },
      });

      gsap.to('.hero-logo', {
        yPercent: 20,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.to('.scroll-hint', {
        y: 10,
        duration: 1.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);
}

export function useTeamAnimations() {
  useEffect(() => {
    if (prefersReducedMotion) {
      applyReducedMotion();
      return;
    }

    const ctx = gsap.context(() => {
      const heroEls = document.querySelectorAll('.team-hero .reveal');
      gsap
        .timeline({ delay: 0.2 })
        .fromTo(
          heroEls,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06 }
        );

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        if (el.closest('.team-hero') || el.classList.contains('team-card')) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.team-grid').forEach((grid) => {
        gsap.fromTo(
          grid.children,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power3.out',
            stagger: 0.055,
            scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}
