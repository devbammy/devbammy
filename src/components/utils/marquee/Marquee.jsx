import styles from './marquee.module.scss';

// Seamless horizontal loop. Pauses on hover and stops under reduced motion.
const Marquee = ({ children, label, speed = 40 }) => (
  <div className={styles.marquee} style={{ '--speed': `${speed}s` }} role="region" aria-label={label}>
    <div className={styles.track}>
      <div className={styles.group}>{children}</div>
      <div className={styles.group} aria-hidden="true">
        {children}
      </div>
    </div>
  </div>
);

export default Marquee;
