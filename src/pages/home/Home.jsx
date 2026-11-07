import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import { featuredProjects } from '../../assets/data/projects';
import { services, tools } from '../../assets/data/services';
import { faqData } from '../../assets/data/faqData';
import Hero from '../../components/home/Hero';
import ProjectCard from '../../components/utils/project-card/ProjectCard';
import ToolIcons from '../../components/utils/tool-icons/ToolIcons';
import Reveal from '../../components/utils/reveal/Reveal';
import styles from './home.module.scss';

// Alternating wide/narrow rows: 7+5, then 5+7. A last odd card spans the full row.
const spanFor = (i, total) => {
  if (total % 2 === 1 && i === total - 1) return styles.full;
  return i % 4 === 0 || i % 4 === 3 ? styles.wide : styles.narrow;
};

const Home = () => (
  <>
    <Hero />

    <section className="section" id="work">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <h2>Selected work</h2>
            <p>Recent web apps, mobile apps and online stores, designed and built end to end.</p>
          </div>
          <Link to="/projects" className="link">
            See all projects <HiArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
        <div className={styles.workGrid}>
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.12} className={spanFor(i, featuredProjects.length)}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className={`section ${styles.services}`}>
      <div className={`wrap ${styles.split}`}>
        <Reveal className={styles.splitHead}>
          <h2>What I build</h2>
          <p>
            One developer from first sketch to launch, so nothing gets lost between design, front
            end and back end.
          </p>
          <ToolIcons names={tools} />
        </Reveal>
        <ul className={styles.rows}>
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05} y={16}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>

    <section className="section">
      <div className={`wrap ${styles.split}`}>
        <Reveal className={styles.splitHead}>
          <h2>Questions before we start</h2>
          <p>
            Something else on your mind?{' '}
            <Link to="/contact" className="link">
              Send me a message
            </Link>
          </p>
        </Reveal>
        <dl className={styles.faq}>
          {faqData.map((f, i) => (
            <Reveal key={f.question} delay={i * 0.05} y={16}>
              <dt>{f.question}</dt>
              <dd>{f.answer}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  </>
);

export default Home;
