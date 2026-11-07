import { useMemo, useState } from 'react';
import { projects } from '../../assets/data/projects';
import ProjectCard from '../../components/utils/project-card/ProjectCard';
import styles from './projects.module.scss';

const Projects = () => {
  const categories = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))],
    [],
  );
  const [active, setActive] = useState('All');
  const shown = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <header className="page-head wrap">
        <h1>Projects</h1>
        <p>
          {projects.length} products I designed and built, from HR dashboards to online stores and
          mobile apps.
        </p>
      </header>

      <section className={styles.section}>
        <div className="wrap">
          {categories.length > 2 && (
            <div className={styles.filters} role="group" aria-label="Filter projects by type">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active === c}
                  className={styles.filter}
                  onClick={() => setActive(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          <div className={styles.grid}>
            {shown.map((p, i) => (
              <ProjectCard key={p.slug} project={p} eager={i < 2} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
