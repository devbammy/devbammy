import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { HiArrowRight, HiArrowUpRight } from 'react-icons/hi2';
import { projects } from '../../assets/data/projects';
import { gsap, media, ScrollTrigger, useGsap } from '../../lib/gsap';
import styles from './worksScreen.module.scss';

const ease = [0.2, 0.7, 0.2, 1];
const VISIBLE = 7; // rows shown at once on desktop; the list slides to keep the active row in view
const ROW = 76; // desktop row height in px

/**
 * A laptop that shows the active project. On desktop the section pins and
 * scrolling steps through the list; pointing at a row also selects it.
 * On touch screens the laptop steps through the projects by itself.
 */
const WorksScreen = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const project = projects[active];
  const total = projects.length;

  useGsap(ref, (mm) => {
    mm.add(media.motion, () => {
      // The lid opens as the section scrolls into place.
      gsap.fromTo(
        '[data-lid]',
        { rotateX: -84 },
        {
          rotateX: 0,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'top 12%', scrub: true },
        },
      );
      gsap.from('[data-device]', {
        y: 80,
        scale: 0.92,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top 12%', scrub: true },
      });
      gsap.from('[data-head] > *', {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 55%' },
      });
      gsap.from('[data-item]', {
        x: 40,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.05,
        scrollTrigger: { trigger: ref.current, start: 'top 50%' },
      });
    });

    mm.add(media.desktop, () => {
      // Pinned: scroll progress picks the active project.
      let last = -1;
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: () => `+=${total * 130}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const i = Math.min(total - 1, Math.floor(self.progress * total));
          if (i !== last) {
            last = i;
            setActive(i);
          }
        },
      });
    });
  });

  // No hover on touch screens, so step through the projects while in view.
  useEffect(() => {
    const noHover = window.matchMedia('(hover: none)').matches;
    if (!noHover || !inView || reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % total), 3500);
    return () => clearInterval(id);
  }, [inView, reduce, total]);

  const offset = Math.max(0, Math.min(total - VISIBLE, active - Math.floor(VISIBLE / 2)));

  return (
    <section ref={ref} className={styles.screen} id="work" data-screen="Work">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.head} data-head>
          <h2>Selected work</h2>
          <p className={styles.count}>
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
        </div>

        <div className={styles.device} data-device>
          <div className={styles.laptop}>
            <div className={styles.lid} data-lid>
              <div className={styles.display}>
                <span className={styles.camera} aria-hidden="true" />
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={project.slug}
                    src={project.cover}
                    alt={`${project.name} screens`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                  />
                </AnimatePresence>
              </div>
            </div>
            <div className={styles.base} aria-hidden="true">
              <span />
            </div>
          </div>

          <div className={styles.info} aria-live="polite">
            <div>
              <p className={styles.infoName}>{project.name}</p>
              <p className={styles.infoMeta}>
                {[project.category, project.stack?.slice(0, 3).join(', ')]
                  .filter(Boolean)
                  .join(', built with ')}
              </p>
            </div>
            <div className={styles.infoActions}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="link">
                  Visit live site <HiArrowUpRight aria-hidden="true" />
                </a>
              )}
              <Link to={`/project/${project.slug}`} className="btn btn--sm">
                Open project <HiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div
          className={styles.listWindow}
          style={{ '--visible': Math.min(VISIBLE, total), '--row': `${ROW}px` }}
        >
          <ul className={styles.list} style={{ '--offset': offset }}>
            {projects.map((p, i) => (
              <li key={p.slug} data-item>
                <Link
                  to={`/project/${p.slug}`}
                  className={`${styles.item} ${i === active ? styles.itemActive : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className={styles.itemName}>
                    {p.name} <HiArrowUpRight aria-hidden="true" />
                  </span>
                  <span className={styles.itemSummary}>{p.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WorksScreen;
