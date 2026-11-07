import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import Me from '../../assets/me.jpg';
import { site } from '../../assets/data/site';
import { featuredProjects } from '../../assets/data/projects';
import { services, tools } from '../../assets/data/services';
import { faqData } from '../../assets/data/faqData';
import ProjectCard from '../../components/utils/project-card/ProjectCard';
import ToolIcons from '../../components/utils/tool-icons/ToolIcons';
import styles from './home.module.scss';

const Home = () => (
  <>
    <section className={styles.hero}>
      <div className={`wrap ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          {site.available && (
            <p className={`pill ${styles.rise}`} style={{ '--d': 0 }}>
              <span className="dot" aria-hidden="true" /> Available for new projects
            </p>
          )}
          <h1 className={styles.rise} style={{ '--d': 1 }}>
            Web and mobile developer for growing businesses
          </h1>
          <p className={`${styles.lead} ${styles.rise}`} style={{ '--d': 2 }}>
            I’m {site.name}. I design and build web apps, mobile apps and the back ends behind
            them, and add AI where it saves your team time.
          </p>
          <div className={`btn-row ${styles.rise}`} style={{ '--d': 3 }}>
            <Link to="/contact" className="btn btn--primary">
              Book a call <HiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/projects" className="btn">
              See my work
            </Link>
          </div>
          <p className={`${styles.fact} ${styles.rise}`} style={{ '--d': 4 }}>
            Based in {site.location}. Building for the web since {site.since}.
          </p>
        </div>

        <div className={styles.portrait}>
          <img src={Me} alt={`Portrait of ${site.name}`} width="742" height="990" />
        </div>
      </div>
    </section>

    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Selected work</h2>
            <p>Recent web apps, mobile apps and online stores, designed and built end to end.</p>
          </div>
          <Link to="/projects" className="link">
            See all projects <HiArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.workGrid}>
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>

    <section className={`section ${styles.services}`}>
      <div className={`wrap ${styles.split}`}>
        <div className={styles.splitHead}>
          <h2>What I build</h2>
          <p>
            One developer from first sketch to launch, so nothing gets lost between design, front
            end and back end.
          </p>
          <ToolIcons names={tools} />
        </div>
        <ul className={styles.rows}>
          {services.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="section">
      <div className={`wrap ${styles.split}`}>
        <div className={styles.splitHead}>
          <h2>Questions before we start</h2>
          <p>
            Something else on your mind? <Link to="/contact" className="link">Send me a message</Link>
          </p>
        </div>
        <dl className={styles.faq}>
          {faqData.map((f) => (
            <div key={f.question}>
              <dt>{f.question}</dt>
              <dd>{f.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  </>
);

export default Home;
