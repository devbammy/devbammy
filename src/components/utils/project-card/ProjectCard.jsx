import { Link } from 'react-router-dom';
import { HiArrowUpRight } from 'react-icons/hi2';
import styles from './projectCard.module.scss';

const ProjectCard = ({ project, eager = false }) => (
  <Link to={`/project/${project.slug}`} className={styles.card}>
    <div className={styles.frame}>
      <img
        src={project.cover}
        alt={`${project.name} screens`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
    <div className={styles.body}>
      <div className={styles.titleRow}>
        <h3>{project.name}</h3>
        <span className={styles.go} aria-hidden="true">
          <HiArrowUpRight />
        </span>
      </div>
      <p>{project.summary}</p>
      {(project.category || project.year) && (
        <p className={styles.meta}>
          {[project.category, project.year].filter(Boolean).join(', ')}
        </p>
      )}
    </div>
  </Link>
);

export default ProjectCard;
