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
      const targets = el.querySelectorAll('.section-reveal');
      targets.forEach((target) => target.classList.add('is-visible'));
      if (el.classList.contains('section-reveal')) {
        el.classList.add('is-visible');
      }
      return;
    }

    const children = el.querySelectorAll('.section-reveal');
    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin: '0px 0px -40px 0px',
    });

    children.forEach((child) => observer.observe(child));
    if (el.classList.contains('section-reveal')) observer.observe(el);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.classList.contains('section-reveal')) {
            observer.observe(node);
          }
          node.querySelectorAll('.section-reveal').forEach((child) => observer.observe(child));
        });
      });
    });

    mutationObserver.observe(el, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [handleIntersect, threshold]);

  return ref;
}
