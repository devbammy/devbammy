import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { HiArrowRight, HiArrowUpRight } from 'react-icons/hi2';
import { projects } from '../../assets/data/projects';
import styles from './worksScreen.module.scss';

const ease = [0.2, 0.7, 0.2, 1];
// The list shows the first 8 projects in projects.js; the rest are on the Projects page.
const shown = projects.slice(0, 8);

/**
 * A laptop that shows the project you point at in the list.
 * On touch screens (no hover) it steps through the projects by itself.
 */
const WorksScreen = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });
  const opened = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const project = shown[active];

  useEffect(() => {
    const noHover = window.matchMedia('(hover: none)').matches;
    if (!noHover || !inView || reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % shown.length), 3500);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <section ref={ref} className={styles.screen} id="work" data-screen="Work">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.device}>
          <div className={styles.laptop}>
            <motion.div
              className={styles.lid}
              initial={reduce ? false : { rotateX: -82 }}
              animate={opened || reduce ? { rotateX: 0 } : { rotateX: -82 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
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
            </motion.div>
            <div className={styles.base} aria-hidden="true">
              <span />
            </div>
          </div>

          <div className={styles.info} aria-live="polite">
            <div>
              <p className={styles.infoName}>{project.name}</p>
              <p className={styles.infoMeta}>
                {[project.category, project.stack?.slice(0, 3).join(', ')].filter(Boolean).join(', built with ')}
              </p>
            </div>
            <Link to={`/project/${project.slug}`} className="btn btn--sm">
              Open project <HiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.head}>
            <h2>Selected work</h2>
            <Link to="/projects" className="link">
              See all projects <HiArrowRight aria-hidden="true" />
            </Link>
          </div>

        <ul className={styles.list}>
            {shown.map((p, i) => (
              <li key={p.slug}>
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
    </section>
  );
};

export default WorksScreen;
