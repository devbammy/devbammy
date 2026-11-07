import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import styles from './projectCard.module.scss';

const spring = { stiffness: 380, damping: 32, mass: 0.6 };

const ProjectCard = ({ project, eager = false, className = '' }) => {
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const move = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const enter = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    // Jump to the pointer first so the badge doesn't fly in from a corner.
    x.jump(e.clientX - r.left);
    y.jump(e.clientY - r.top);
    sx.jump(e.clientX - r.left);
    sy.jump(e.clientY - r.top);
    setHover(true);
  };

  return (
    <Link to={`/project/${project.slug}`} className={`${styles.card} ${className}`}>
      <div
        className={styles.frame}
        onPointerMove={move}
        onPointerEnter={enter}
        onPointerLeave={() => setHover(false)}
      >
        <img
          src={project.cover}
          alt={`${project.name} screens`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        {project.category && <span className={styles.category}>{project.category}</span>}

        <AnimatePresence>
          {hover && (
            <motion.span
              className={styles.cursor}
              style={{ x: sx, y: sy }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
              aria-hidden="true"
            >
              View project
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3>{project.name}</h3>
          <HiArrowUpRight className={styles.arrow} aria-hidden="true" />
        </div>
        <p className={styles.summary}>{project.summary}</p>
        {project.stack?.length > 0 && (
          <ul className={`tags ${styles.stack}`}>
            {project.stack.slice(0, 4).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
};

export default ProjectCard;
