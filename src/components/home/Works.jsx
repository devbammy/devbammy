import { Link } from 'react-router-dom';
import { topRowWorks, bottomRowWorks } from '../../assets/data/projects';
import styles from './homeComps.module.scss';

const Works = () => {
  const infiniteTopRow = [...topRowWorks, ...topRowWorks];
  const infiniteBottomRow = [...bottomRowWorks, ...bottomRowWorks];

  const renderCard = (work, keyPrefix, index) => {
    return (
      <Link
        key={`${keyPrefix}-${work.id}-${index}`}
        className={styles.mCard}
        to={`/work/${work.slug}`}
      >
        <span className={styles.viewTag}>View Project</span>
        <img src={work.img} alt={work.name} loading="lazy" />
      </Link>
    );
  };

  return (
    <section className={styles.marqueeSection}>
      {/* Top Row: Forward Scrolling */}
      <div className={styles.marqueeRow}>
        <div className={styles.marquee}>
          {infiniteTopRow.map((work, index) => renderCard(work, 'top', index))}
        </div>
      </div>

      {/* Bottom Row: Reverse Scrolling */}
      <div className={styles.marqueeRow}>
        <div className={`${styles.marquee} ${styles.reverse}`}>
          {infiniteBottomRow.map((work, index) =>
            renderCard(work, 'bottom', index),
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
