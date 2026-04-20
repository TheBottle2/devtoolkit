'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useSectionReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('is-visible');
      return;
    }

    const children = el.querySelectorAll('.section-reveal');
    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin: '0px 0px -40px 0px',
    });

    children.forEach((child) => observer.observe(child));
    if (el.classList.contains('section-reveal')) observer.observe(el);

    return () => observer.disconnect();
  }, [handleIntersect, threshold]);

  return ref;
}
