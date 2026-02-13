import { assets } from '../../assets/asstes';
import { useTheme } from '../../context/ThemeContext';
import styles from './utils.module.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggleBtn}
      data-theme={theme}
      aria-label="Toggle dark mode"
      aria-pressed={!isLight}
    >
      <span className={styles.thumb}>
        {isLight ? (
          <img src={assets.moon} alt="moon" />
        ) : (
          <img src={assets.sun} alt="sun" />
        )}
      </span>
    </button>
  );
}
