import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import style from './themeToggle.module.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      className={`${style.toggleBtn} ${isLight ? style.lightMode : style.darkMode}`}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
    >
      <motion.span 
        layout 
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className={style.thumb}
      >
      
      </motion.span>
    </button>
  );
}