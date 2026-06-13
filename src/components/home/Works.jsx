import { topRowWorks, bottomRowWorks } from '../../assets/data/projects';
import styles from './homeComps.module.scss';

const Works = () => {
  const infiniteTopRow = [...topRowWorks, ...topRowWorks];
  const infiniteBottomRow = [...bottomRowWorks, ...bottomRowWorks];

  return (
    <section className={styles.marqueeSection}>
      {/* Top Row: Forward Scrolling */}
      <div className={styles.marqueeRow}>
        <div className={styles.marquee}>
          {infiniteTopRow.map((work, index) => (
            <a
              key={`top-${work.id}-${index}`}
              className={styles.mCard}
              href={work.href}
            >
              <span className={styles.viewTag}>View Project</span>
              <img src={work.img} alt={work.name} loading="lazy" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Row: Reverse Scrolling */}
      <div className={styles.marqueeRow}>
        <div className={`${styles.marquee} ${styles.reverse}`}>
          {infiniteBottomRow.map((work, index) => (
            <a
              key={`bottom-${work.id}-${index}`}
              className={styles.mCard}
              href={work.href}
            >
              <span className={styles.viewTag}>View Project</span>
              <img src={work.img} alt={work.name} loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
