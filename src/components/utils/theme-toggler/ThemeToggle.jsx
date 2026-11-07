import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useTheme } from '../../../context/ThemeContext';
import styles from './themeToggle.module.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className={styles.icon} key={theme}>
        {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
      </span>
    </button>
  );
}
