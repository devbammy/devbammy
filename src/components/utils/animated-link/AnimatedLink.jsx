import style from './animatedLink.module.scss';

export const AnimatedLink = ({
  href,
  target,
  styles,
  active,
  onClick,
  isOpen,
}) => {
  // 1. Determine what text displays when the mouse is NOT hovering
  const idleText = isOpen ? 'Close' : 'Menu';

  // 2. Determine what text rolls into view on hover
  const hoverText = isOpen ? 'Close' : 'Open';

  return (
    <a
      href={href}
      onClick={onClick}
      className={`${style.animatedLink} ${active ? style.active : ''}`}
      style={styles}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      {/* The text visible by default */}
      <span className={style.text}>{idleText}</span>

      {/* The text that rolls up from the bottom on hover */}
      <span className={`${style.text} ${style.duplicate}`}>{hoverText}</span>
    </a>
  );
};
