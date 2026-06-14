import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import DP from '../../assets/dp.png';
import { AnimatedLink } from '../utils/animated-link/AnimatedLink';
import ThemeToggle from '../utils/theme-toggler/ThemeToggle';
import styles from './header.module.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (e) => {
    e.preventDefault();
    setIsMenuOpen((prev) => !prev);
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.05, // Cascades the link entry animations
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.2,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.03,
        staggerDirection: -1, // Reverses cascade order on close
      },
    },
  };

  // 2. Define standard subtle reveal parameters for each individual link element
  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: { opacity: 0, y: 5, transition: { duration: 0.15 } },
  };

  return (
    <header className={styles.header}>
      {/* Left side actions and branding */}
      <div className={styles.left}>
        <Link
          to="/"
          className={styles.logo}
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={DP} alt="Bamidele profile" />

          {/* Stacked Identity Column */}
          <div className={styles.identityStack}>
            <span className={styles.brandName}>devBammy</span>

            {/* Repositioned Status Badge */}
            <div className={styles.availableBadge}>
              <span className={styles.statusDot}>
                <span className={styles.pulseRing}></span>
              </span>
              <span className={styles.badgeText}>Available for work</span>
            </div>
          </div>
        </Link>

        <div className={styles.toggleWrapper}>
          <ThemeToggle />
        </div>
      </div>

      {/* Right side navigation trigger */}
      <div className={styles.right}>
        <AnimatedLink
          href="#menu"
          onClick={handleMenuToggle}
          isOpen={isMenuOpen}
        />
      </div>

      {/* Overlay Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.menuOverlay}
          >
            <nav className={styles.overlayNav}>
              {[
                { to: '/', label: 'Home' },
                { to: '/projects', label: 'Projects' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((item) => (
                <motion.div key={item.to} variants={linkVariants}>
                  <Link to={item.to} onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
