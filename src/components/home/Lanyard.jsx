import { useEffect, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { HiArrowUpRight, HiArrowUturnLeft } from 'react-icons/hi2';
import Me from '../../assets/me.jpg';
import Logo from '../../assets/logo.png';
import { site } from '../../assets/data/site';
import CopyEmail from '../utils/copy-email/CopyEmail';
import LocalTime from '../utils/local-time/LocalTime';
import styles from './lanyard.module.scss';

// Resting strap length in px; the card's clip hangs this far below the anchor.
const strapLength = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches ? 150 : 260;
const RAD = 180 / Math.PI;

const handle = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

/**
 * An ID card on a lanyard. Drag it and it swings back like a pendulum;
 * the strap is an SVG path that follows the card's clip point.
 */
const Lanyard = () => {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [STRAP] = useState(strapLength);
  const x = useMotionValue(0);
  const y = useMotionValue(reduce ? 0 : -STRAP - 260);

  // The card pivots around its clip, leaning away from the anchor.
  const rotate = useTransform([x, y], ([lx, ly]) => -Math.atan2(lx, STRAP + ly) * RAD * 0.9);
  // Strap from the anchor (0,0) to the clip point, with a little sag toward the middle.
  const strap = useTransform([x, y], ([lx, ly]) => {
    const ex = 60 + lx;
    const ey = STRAP + ly;
    return `M 60 0 Q ${60 + lx * 0.35} ${ey * 0.55} ${ex} ${ey}`;
  });

  // Drop in from above on first load, then settle with a small swing.
  useEffect(() => {
    if (reduce) return;
    const drop = animate(y, 0, { type: 'spring', stiffness: 90, damping: 9, mass: 1, delay: 0.25 });
    const sway = animate(x, [0, 26, -14, 6, 0], { duration: 2.2, delay: 0.55, ease: 'easeOut' });
    return () => {
      drop.stop();
      sway.stop();
    };
  }, [reduce, x, y, STRAP]);

  return (
    <div className={styles.stage} style={{ '--strap': `${STRAP}px` }}>
      <svg className={styles.strap} viewBox={`0 0 120 ${STRAP + 400}`} aria-hidden="true">
        <defs>
          <motion.path id="strap-path" d={strap} />
        </defs>
        <motion.path d={strap} className={styles.band} />
        <text className={styles.bandText} dy="4">
          <textPath href="#strap-path" startOffset="8">
            devBammy ✦ devBammy ✦ devBammy ✦ devBammy ✦
          </textPath>
        </text>
      </svg>

      <motion.div
        className={styles.hang}
        style={{ x, y, rotate }}
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        dragTransition={{ bounceStiffness: 140, bounceDamping: 7 }}
        whileDrag={{ cursor: 'grabbing' }}
      >
        <span className={styles.clip} aria-hidden="true">
          <span className={styles.ring} />
          <span className={styles.clasp} />
        </span>

        <motion.div
          className={styles.card}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 110, damping: 16 }}
        >
          {/* Front */}
          <section className={`${styles.face} ${styles.front}`} aria-label="ID card, front" aria-hidden={flipped}>
            <span className={styles.slot} aria-hidden="true" />
            <div className={styles.row}>
              <span className={styles.brand}>
                <img src={Logo} alt="" width="20" height="20" /> {site.brand}
              </span>
              <span>Since {site.since}</span>
            </div>
            <div className={styles.photo}>
              <img src={Me} alt={`Portrait of ${site.name}`} draggable="false" />
            </div>
            <p className={styles.name}>{site.name}</p>
            <p className={styles.role}>Full-stack web and mobile developer</p>
            <div className={styles.foot}>
              <span>
                {site.available ? (
                  <>
                    <span className="dot" aria-hidden="true" /> Available for work
                  </>
                ) : (
                  site.location
                )}
              </span>
              <button
                type="button"
                className={styles.go}
                onClick={() => setFlipped(true)}
                onPointerDownCapture={(e) => e.stopPropagation()}
                tabIndex={flipped ? -1 : 0}
                aria-label="Show contact details"
              >
                <HiArrowUpRight />
              </button>
            </div>
          </section>

          {/* Back */}
          <section className={`${styles.face} ${styles.back}`} aria-label="ID card, contact details" aria-hidden={!flipped}>
            <span className={styles.slot} aria-hidden="true" />
            <div className={styles.row}>
              <span>Contact</span>
              <span>
                <LocalTime timeZone={site.timeZone} /> {site.location.split(',')[0]}
              </span>
            </div>
            <p className={styles.backName}>{site.shortName}</p>
            <p className={styles.backRole}>Let’s build your product</p>

            <ul className={styles.rows} onPointerDownCapture={(e) => e.stopPropagation()}>
              {site.socials.slice(0, 3).map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer" tabIndex={flipped ? 0 : -1}>
                    <span className={styles.k}>{s.label}</span>
                    <span className={styles.v}>{handle(s.url)}</span>
                    <HiArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.backFoot} onPointerDownCapture={(e) => e.stopPropagation()}>
              <CopyEmail className={`btn--sm ${styles.copy}`} />
              <button
                type="button"
                className={styles.go}
                onClick={() => setFlipped(false)}
                tabIndex={flipped ? 0 : -1}
                aria-label="Show front of card"
              >
                <HiArrowUturnLeft />
              </button>
            </div>
          </section>
        </motion.div>
      </motion.div>

      <p className={styles.hint} aria-hidden="true">
        Drag the card
      </p>
    </div>
  );
};

export default Lanyard;
