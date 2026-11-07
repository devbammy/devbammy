import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

// Counts from 0 to `to` when it scrolls into view. The final number is in the markup,
// so it reads correctly without JavaScript or with reduced motion.
const CountUp = ({ to, duration = 1.4, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration, suffix]);

  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  );
};

export default CountUp;
