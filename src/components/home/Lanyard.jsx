import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { HiArrowUpRight, HiArrowUturnLeft } from 'react-icons/hi2';
import Me from '../../assets/me.jpg';
import Logo from '../../assets/logo.png';
import { site } from '../../assets/data/site';
import CopyEmail from '../utils/copy-email/CopyEmail';
import LocalTime from '../utils/local-time/LocalTime';
import styles from './lanyard.module.scss';

const CARD_H = 432;
const RAD = 180 / Math.PI;

// Size the card and strap so the card sits in the centre of the screen.
const measure = () => {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const narrow = vw <= 768;
  const scale = Math.max(0.5, Math.min(narrow ? 0.85 : 1, narrow ? (vh - 430) / 520 : (vh - 300) / 600));
  const centre = narrow ? 0.34 : 0.5;
  return { scale, strap: Math.round(vh * centre - (CARD_H * scale) / 2) };
};

const handle = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

/**
 * An ID card on a lanyard, hung in the centre of the hero. Drag it and it
 * swings back like a pendulum; the strap is an SVG path that follows the clip.
 */
const Lanyard = () => {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [{ scale, strap: STRAP }, setSize] = useState(measure);
  const x = useMotionValue(0);
  const y = useMotionValue(reduce ? 0 : -window.innerHeight);

  useEffect(() => {
    const onResize = () => setSize(measure());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // The card pivots around its clip, leaning away from the anchor.
  const rotate = useTransform([x, y], ([lx, ly]) => -Math.atan2(lx, STRAP + ly) * RAD * 0.9);
  // Strap from the anchor (0,0) to the clip point, with a little sag toward the middle.
  const strapPath = useTransform([x, y], ([lx, ly]) => {
    const ey = Math.max(0, STRAP + ly);
    return `M 60 -40 L 60 0 Q ${60 + lx * 0.35} ${ey * 0.55} ${60 + lx} ${ey}`;
  });

  // Drop in from above on first load, then settle with a small swing.
  useEffect(() => {
    if (reduce) return;
    const drop = animate(y, 0, { type: 'spring', stiffness: 80, damping: 10, mass: 1, delay: 0.5 });
    const sway = animate(x, [0, 30, -16, 7, 0], { duration: 2.4, delay: 0.9, ease: 'easeOut' });
    return () => {
      drop.stop();
      sway.stop();
    };
  }, [reduce, x, y]);

  return (
    <div className={styles.stage} style={{ '--strap': `${STRAP}px`, '--card-scale': scale }}>
      <svg className={styles.strap} aria-hidden="true">
        <defs>
          <motion.path id="strap-path" d={strapPath} />
        </defs>
        <motion.path d={strapPath} className={styles.band} />
        <text className={styles.bandText} dy="4">
          <textPath href="#strap-path" startOffset="52">
            devBammy ✦ devBammy ✦ devBammy ✦ devBammy ✦ devBammy ✦ devBammy ✦
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
          <section
            className={`${styles.face} ${styles.front}`}
            aria-label="ID card, front"
            aria-hidden={flipped}
          >
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
              <span>View contact</span>
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
          <section
            className={`${styles.face} ${styles.back}`}
            aria-label="ID card, contact details"
            aria-hidden={!flipped}
          >
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
    </div>
  );
};

export default Lanyard;
