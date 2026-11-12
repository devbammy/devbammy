import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'power3.out' });

// Media conditions shared by every section's animations.
export const media = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
  touch: '(max-width: 1024px) and (prefers-reduced-motion: no-preference)',
};

/**
 * Runs GSAP setup scoped to a ref, inside gsap.matchMedia so animations are
 * created and reverted per breakpoint and removed on unmount.
 *   useGsap(ref, (mm) => { mm.add(media.desktop, () => { ... }); });
 */
export const useGsap = (scope, setup, deps = []) => {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);
    setup(mm);
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export { gsap, ScrollTrigger };
