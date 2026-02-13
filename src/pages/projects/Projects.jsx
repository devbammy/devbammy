import { useEffect, useRef, useState } from 'react';
import { projects } from '../../assets/asstes';
import styles from './projects.module.scss';

const ProjectRow = ({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef(null);
  const isEven = index % 2 === 0;
  const projectNum = (index + 1).toString().padStart(2, '0');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 },
    );

    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rowRef}
      className={`
        ${styles.projectRow} 
        ${!isEven ? styles.rowReverse : ''} 
        ${isVisible ? styles.animateIn : ''}
      `}
    >
      <span className={styles.bgNumber}>{projectNum}</span>

      <div className={styles.imageContainer}>
        <a href={item.projectLink} target="_blank" rel="noreferrer">
          <div className={styles.browserFrame}>
            <div className={styles.dots}>
              <span />
              <span />
              <span />
            </div>
            <img src={item.imgSrc} alt={item.title} loading="lazy" />
          </div>
        </a>
      </div>

      <div className={styles.detailsContent}>
        <div className={styles.tagLine}>
          <span className={styles.tabName}>{item.tab}</span>
          <div className={styles.line}></div>
        </div>

        <h2 className={styles.projectTitle}>{item.title}</h2>
        <p className={styles.shortDesc}>{item.desc}</p>

        <div className={styles.techStack}>
          {item.tags.map((tag, i) => (
            <span key={i} className={styles.techPill}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.actionArea}>
          <a
            href={item.projectLink}
            target="_blank"
            rel="noreferrer"
            className={styles.mainBtn}
          >
            Explore Project
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <div className={styles.projectWrapper}>
      {projects.map((item, index) => (
        <ProjectRow key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default Projects;
