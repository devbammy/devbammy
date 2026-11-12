import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Logo from '../../assets/logo.png';
import { site } from '../../assets/data/site';
import ThemeToggle from '../utils/theme-toggler/ThemeToggle';
import styles from './header.module.scss';

const links = [
  { to: '/#work', label: 'Work' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
];

const Header = () => {
  const { pathname } = useLocation();
  // The menu remembers which page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState(null);
  const open = openOn === pathname;
  const setOpen = (value) => setOpenOn(value ? pathname : null);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpenOn(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.bar}`}>
        <Link to="/" className={styles.brand} aria-label={`${site.brand}, home`}>
          <img src={Logo} alt="" width="32" height="32" />
          <span>{site.brand}</span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <Link to="/#contact" className={`btn btn--primary btn--sm ${styles.cta}`}>
            Book a call
          </Link>
          <button
            className={styles.menuBtn}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className={open ? styles.barsOpen : styles.bars} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.sheet}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <nav className="wrap" aria-label="Mobile">
              {[{ to: '/', label: 'Home' }, ...links].map((l) => (
                <NavLink key={l.to} to={l.to} end className={styles.sheetLink}>
                  {l.label}
                </NavLink>
              ))}
              <Link to="/#contact" className={`btn btn--primary ${styles.sheetCta}`}>
                Book a call
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
