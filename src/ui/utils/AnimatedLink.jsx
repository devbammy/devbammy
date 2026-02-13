import { Link } from 'react-router-dom';
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

export const AnimatedButton = ({ href, text, onClick, target, active }) => {
  const className = `${style.animatedButton} ${active ? style.active : ''}`;

  // If href exists, render a Link or <a>
  if (href) {
    return (
      <Link to={href} className={className} target={target} onClick={onClick}>
        <ButtonContents text={text} />
      </Link>
    );
  }

  // Otherwise, render a semantic button
  return (
    <button type="button" onClick={onClick} className={className}>
      <ButtonContents text={text} />
    </button>
  );
};

// Move the spans into a sub-component to keep it DRY (Don't Repeat Yourself)
const ButtonContents = ({ text }) => (
  <>
    <div className={style.textBox}>
      <span className={style.text}>{text}</span>
      <span className={`${style.text} ${style.duplicate}`}>{text}</span>
    </div>
    <div className={style.arrowBox}>
      <div className={style.arrow}>
        <span>→</span>
      </div>
      <div className={`${style.arrow} ${style.duplicateArrow}`}>
        <span>→</span>
      </div>
    </div>
  </>
);
