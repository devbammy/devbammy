import { motion } from 'framer-motion';

// Fades and lifts its content once, the first time it scrolls into view.
// Respects reduced motion through the app-level <MotionConfig reducedMotion="user">.
const Reveal = ({ as = 'div', delay = 0, y = 24, className, children, ...rest }) => {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
