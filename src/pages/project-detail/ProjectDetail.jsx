import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiArrowRight, HiArrowUpRight } from 'react-icons/hi2';
import { getNextProject, getProjectBySlug } from '../../assets/data/projects';
import NotFound from '../not-found/NotFound';
import Reveal from '../../components/utils/reveal/Reveal';
import styles from './projectDetail.module.scss';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  if (!project) return <NotFound />;

  const next = getNextProject(slug);
  const gallery = [...new Set(project.gallery || [])];
  const facts = [
    ['Type', project.category],
    ['Year', project.year],
    ['Role', project.role],
  ].filter(([, v]) => v);

  return (
    <article>
      <header className={`wrap ${styles.head}`}>
        <Link to="/#work" className={`link ${styles.back}`}>
          <HiArrowLeft aria-hidden="true" /> All projects
        </Link>

        <div className={styles.titleRow}>
          <div>
            <h1>{project.name}</h1>
            <p className={styles.summary}>{project.summary}</p>
          </div>
          {(project.liveUrl || project.repoUrl) && (
            <div className="btn-row">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn--primary">
                  Visit live site <HiArrowUpRight aria-hidden="true" />
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn">
                  View source code
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="wrap">
        <motion.div
          className={styles.cover}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <img src={project.cover} alt={`${project.name} screens`} />
        </motion.div>
      </div>

      <Reveal as="section" className={`wrap ${styles.body}`}>
        <aside className={styles.facts}>
          {facts.length > 0 && (
            <dl>
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}
          {project.stack?.length > 0 && (
            <div>
              <h2 className={styles.factTitle}>Built with</h2>
              <ul className="tags">
                {project.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <div className={styles.text}>
          <h2>About the project</h2>
          {project.description?.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      </Reveal>

      {gallery.length > 0 && (
        <section className={`wrap ${styles.gallery}`} aria-label={`${project.name} screenshots`}>
          {gallery.map((img, i) => (
            <div key={i} className={styles.shot}>
              <img src={img} alt={`${project.name} screenshot ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </section>
      )}

      {next && next.slug !== project.slug && (
        <Reveal className="wrap">
          <Link to={`/project/${next.slug}`} className={styles.next}>
            <div className={styles.nextThumb}>
              <img src={next.cover} alt="" loading="lazy" />
            </div>
            <div className={styles.nextText}>
              <span>Next project</span>
              <h2>{next.name}</h2>
            </div>
            <HiArrowRight className={styles.nextArrow} aria-hidden="true" />
          </Link>
        </Reveal>
      )}
    </article>
  );
};

export default ProjectDetail;
