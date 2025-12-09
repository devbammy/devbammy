import { useTheme } from '../../../context/ThemeContext';
import { assets, navItems } from '../../../assets/asstes';
import AnimatedLink from '../../utils/AnimatedLink';
import ThemeToggle from '../../utils/ThemeToggle';
import styles from './header.module.scss';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { theme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  // Slide-down variant for mobile menu
  const menuVariants = {
    hidden: { y: '-100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Staggered animation for nav links
  const linkVariants = {
    hidden: { opacity: 0, y: -70 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section
      className={styles.header}
      style={{
        borderBottom:
          theme === 'light' ? '2px solid #ffffff' : '2px solid #1e1e1e',
      }}
    >
      <a href="/" className={styles.logo}>
        <img src={theme === 'dark' ? assets.logo1 : assets.logo2} alt="logo" />
      </a>

      {/* Desktop nav */}
      <nav className={styles.headerNav}>
        {navItems.map((nav) => (
          <AnimatedLink key={nav.label} href={nav.link} text={nav.label} />
        ))}
        <AnimatedLink href="#contact" text="Contact" />
      </nav>

      <div className={styles.contact}>
        <AnimatedLink href="#contact" text="Contact" />
        <ThemeToggle />
      </div>

      {/* Mobile Hamburger */}
      <div className={styles.hamburger} onClick={() => setShowMenu(true)}>
        <img
          src={theme === 'dark' ? assets.menuLight : assets.menuDark}
          alt="menu"
        />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.nav
            className={styles.headerNav + ' ' + styles.showMenu}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            {navItems.map((nav) => (
              <motion.div
                key={nav.label}
                variants={linkVariants}
                onClick={() => setShowMenu(false)}
              >
                <AnimatedLink href={nav.link} text={nav.label} />
              </motion.div>
            ))}

            <motion.div
              variants={linkVariants}
              onClick={() => setShowMenu(false)}
            >
              <AnimatedLink href="#contact" text="Contact" />
            </motion.div>

            <div className={styles.close} onClick={() => setShowMenu(false)}>
              <img
                src={theme === 'dark' ? assets.menuLight : assets.menuDark}
                alt="menu"
              />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Header;
