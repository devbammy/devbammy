import { HiArrowDownTray } from 'react-icons/hi2';
import { site } from '../../assets/data/site';
import { certifications } from '../../assets/data/certifications';
import { experiences } from '../../assets/data/experiences';
import { skillGroups } from '../../assets/data/skillGroup';
import Reveal from '../../components/utils/reveal/Reveal';
import styles from './resume.module.scss';

const Resume = () => (
  <>
    <header className={`page-head wrap ${styles.head}`}>
      <div>
        <h1>Resume</h1>
        <p>
          Emmanuel Olorunyomi, full-stack engineer and UI/UX designer.{' '}
          <a className="link" href="mailto:olorunyomiemmanuelb@gmail.com">
            olorunyomiemmanuelb@gmail.com
          </a>
          , {site.location}.
        </p>
      </div>
      <a href={site.cv} download className="btn btn--primary">
        Download resume <HiArrowDownTray aria-hidden="true" />
      </a>
    </header>

    <div className={`wrap ${styles.sheet}`}>
      <Reveal as="section" className={styles.block}>
        <h2>Experience</h2>
        <ol className={styles.list}>
          {experiences.map((job) => (
            <li key={job.company + job.period}>
              <div className={styles.itemHead}>
                <div>
                  <h3>{job.company}</h3>
                  <p className={styles.role}>{job.role}</p>
                </div>
                <p className={styles.meta}>
                  {job.period}
                  <br />
                  {job.location}
                </p>
              </div>
              <ul className={styles.points}>
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal as="section" className={styles.block}>
        <h2>Skills</h2>
        <dl className={styles.skills}>
          {skillGroups.map((g) => (
            <div key={g.title}>
              <dt>{g.title}</dt>
              <dd>{g.skills}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal as="section" className={styles.block}>
        <h2>Education</h2>
        <div className={styles.itemHead}>
          <div>
            <h3>Kogi State University, Anyigba</h3>
            <p className={styles.role}>Bachelor of Science (Education) in Physics</p>
          </div>
          <p className={styles.meta}>Graduated August 2018</p>
        </div>
      </Reveal>

      <Reveal as="section" className={styles.block}>
        <h2>Certifications</h2>
        <ul className={styles.certs}>
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  </>
);

export default Resume;
