import { Link } from 'react-router-dom';
import { allProjects } from '../../assets/data/projects';
import styles from './projects.module.scss';

const Projects = () => {
  return (
    <>
      <section className={styles.projectHeader}>
        <h1>Projects</h1>
        <p>
          Showcasing my latest projects crafted with creativity and precision.
        </p>
      </section>

      {/* Row Wrapper Layer */}
      <div className={styles.projectRow}>
        {allProjects?.map((project, index) => (
          <Link
            key={project.id || index}
            className={styles.projectCard}
            to={`/project/${project.slug}`}
          >
            <img src={project.img} alt="" />

            <div className={styles.projectTagName}>{project.name}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Projects;
