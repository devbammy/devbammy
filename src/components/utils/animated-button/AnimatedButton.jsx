import { Link } from 'react-router-dom';
import style from './animatedButton.module.scss';

const RollingText = ({ text }) => (
  <>
    <span className={style.text}>{text}</span>
    <span className={`${style.text} ${style.duplicate}`}>{text}</span>
  </>
);

export const AnimatedButton = ({
  href,
  target,
  text,
  active,
  onClick,
  icon = '→',
  variant = 'primary',
  isFull = true,
}) => {
  const className = `${style.animatedButton} ${style[variant]} ${isFull && style.fullWidth}  ${active ? style.active : ''}`;

  const renderContent = () => (
    <>
      <div className={style.textBox}>
        <RollingText text={text} />
      </div>
      <div className={style.arrowBox}>
        <div className={style.arrow}>
          {typeof icon === 'string' && icon.startsWith('/') ? (
            <img src={icon} alt="" />
          ) : (
            <span>{icon}</span>
          )}
        </div>
        <div className={`${style.arrow} ${style.duplicateArrow}`}>
          {typeof icon === 'string' && icon.startsWith('/') ? (
            <img src={icon} alt="" />
          ) : (
            <span>{icon}</span>
          )}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        to={href}
        target={target}
        onClick={onClick}
        className={className}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {renderContent()}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {renderContent()}
    </button>
  );
};
