import { useEffect } from 'react';
import { certifications } from '../../assets/data/certifications';
import { experiences } from '../../assets/data/experiences';
import { skillGroups } from '../../assets/data/skillGroup';
import styles from './resume.module.scss';

const Resume = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <section className={styles.resumeHeader}>
        <div className={styles.titleArea}>
          <h1>Emmanuel Olorunyomi</h1>
          <p>Full Stack Engineer & UI/UX Designer</p>
        </div>
        <div className={styles.contactDetails}>
          <a href="mailto:olorunyomiemmanuelb@gmail.com">
            olorunyomiemmanuelb@gmail.com
          </a>
          <span className={styles.dot}>•</span>
          <span>+234 811 100 6160</span>
          <span className={styles.dot}>•</span>
          <span>Abuja, Nigeria</span>
        </div>
        <div className={styles.linksArea}>
          <a
            href="https://devbammy.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            Portfolio
          </a>
          <a
            href="https://linkedin.com/in/emmanuel-olorunyomi"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </section>

      <section className={styles.resumeSection}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <div className={styles.skillsGrid}>
          {skillGroups.map((group, index) => (
            <div key={index} className={styles.skillBlock}>
              <h4>{group.title}</h4>
              <p>{group.skills}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.resumeSection}>
        <h2 className={styles.sectionTitle}>Work Experience</h2>
        <div className={styles.experienceTimeline}>
          {experiences.map((job, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.itemHeader}>
                <div>
                  <h3>{job.company}</h3>
                  <p className={styles.roleTitle}>{job.role}</p>
                </div>
                <div className={styles.metaInfo}>
                  <span className={styles.period}>{job.period}</span>
                  <span className={styles.location}>{job.location}</span>
                </div>
              </div>
              <ul className={styles.bulletList}>
                {job.points.map((point, pIdx) => (
                  <li key={pIdx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Education Grid Block */}
      <section className={styles.resumeSection}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={styles.eduBlock}>
          <div className={styles.eduHeader}>
            <h3>Kogi State University, Anyigba</h3>
            <span className={styles.period}>Graduated Aug, 2018</span>
          </div>
          <p>Bachelor of Science (Education) in Physics</p>
        </div>
      </section>

      {/* SECTION 5: Verified Credentials */}
      <section className={styles.resumeSection}>
        <h2 className={styles.sectionTitle}>Certifications</h2>
        <ul className={styles.certsList}>
          {certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Resume;
