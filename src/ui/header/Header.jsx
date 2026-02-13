import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/asstes';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../utils/ThemeToggle';
import styles from './header.module.scss';

const Header = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  // Add a scroll listener to change header appearance
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.left}>
          <img
            src={theme === 'dark' ? assets.logo : assets.logo2}
            alt="Company Logo"
            className={styles.logo}
          />
        </Link>

        <div className={styles.right}>
          <ThemeToggle />

          <button className={styles.menuBtn} aria-label="Open Menu">
            <img
              src={theme === 'dark' ? assets.menuLight : assets.menuDark}
              alt=""
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
