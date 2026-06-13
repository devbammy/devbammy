import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

// Configuration for hover states: keeps code clean and modular
const HOVER_MODES = {
  slowDown: { speedMultiplier: 2, scale: 1 },
  speedUp: { speedMultiplier: 0.25, scale: 1 },
  pause: { speedMultiplier: 0, scale: 1 },
  goBonkers: { speedMultiplier: 0.05, scale: 0.8 },
  none: { speedMultiplier: 1, scale: 1 },
};

const CircularText = ({
  text = '',
  spinDuration = 10,
  onHover = 'speedUp',
  className = '',
  radius = 80, // Easily adjust the size of the text circle
}) => {
  const letters = Array.from(text);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  // Determine current speed and scale configuration based on hover state
  const currentMode = isHovered
    ? HOVER_MODES[onHover] || HOVER_MODES.none
    : HOVER_MODES.none;

  // Calculate dynamic duration. If speedMultiplier is 0 (paused), we give it a massive number
  // to effectively stop it, bypassing Framer Motion's inability to dynamically "pause" an active infinity loop.
  const dynamicDuration =
    currentMode.speedMultiplier === 0
      ? 999999
      : spinDuration * currentMode.speedMultiplier;

  return (
    <motion.div
      className={`circular-text-container ${className}`}
      style={{
        position: 'relative',
        width: `${radius * 2.5}px`,
        height: `${radius * 2.5}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
      animate={{
        rotate: 360,
        scale: currentMode.scale,
      }}
      transition={{
        rotate: {
          repeat: Infinity,
          ease: 'linear',
          duration: dynamicDuration,
        },
        scale: {
          type: 'spring',
          damping: 20,
          stiffness: 300,
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;

        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              fontFamily: 'sans-serif',
              fontSize: '20px',
              fontWeight: 900,
              color: theme === 'dark' ? '#f1f1f1' : '#0e1b29',
              // Rotate each letter to its slice of the pie, then push it outward by the radius
              transform: `rotate(${rotationDeg}deg) translateY(-${radius}px)`,
              transformOrigin: 'center center',
              transition: 'color 0.3s ease',
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
