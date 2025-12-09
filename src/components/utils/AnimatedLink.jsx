import style from './utils.module.scss';

const AnimatedLink = ({ href, target, text, styles, active, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${style.animatedLink} ${active ? style.active : ''}`}
      style={{ ...styles }}
      target={target}
    >
      <span className={style.text}>{text}</span>
      <span className={`${style.text} ${style.duplicate}`}>{text}</span>
    </a>
  );
};

export default AnimatedLink;

export const AnimatedButton = ({
  href,
  target,
  text,
  styles,
  active,
  onClick,
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${style.animatedButton} ${active ? style.active : ''}`}
      style={{ ...styles }}
      target={target}
    >
      <span className={style.text}>{text}</span>
      <span className={`${style.text} ${style.duplicate}`}>{text}</span>
    </a>
  );
};
