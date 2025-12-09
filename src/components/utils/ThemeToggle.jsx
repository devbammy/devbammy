import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        width: '60px',
        height: '30px',
        borderRadius: '30px',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        background: isLight ? 'var(--grayAlt)' : 'var(--bright)',
        transition: 'background 0.3s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <span
        style={{
          content: '',
          position: 'absolute',
          top: '3px',
          left: isLight ? '3px' : '33px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'var(--card)',
          transition: 'left 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
        }}
      >
        {isLight ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
