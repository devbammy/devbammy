import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiArrowUpRight, HiChevronDown } from 'react-icons/hi2';
import { site } from '../../assets/data/site';
import { projects } from '../../assets/data/projects';
import { experiences } from '../../assets/data/experiences';
import { tools } from '../../assets/data/services';
import Lanyard from '../../components/home/Lanyard';
import WorksScreen from '../../components/home/WorksScreen';
import CopyEmail from '../../components/utils/copy-email/CopyEmail';
import CountUp from '../../components/utils/count-up/CountUp';
import Marquee from '../../components/utils/marquee/Marquee';
import Reveal from '../../components/utils/reveal/Reveal';
import ToolIcons from '../../components/utils/tool-icons/ToolIcons';
import styles from './home.module.scss';

const lines = ['Web and mobile', 'developer for', 'growing businesses'];
const ease = [0.2, 0.7, 0.2, 1];
const screens = ['Home', 'About', 'Work', 'Contact'];

const fadeUp = (i) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.35 + i * 0.08, ease },
});

const handle = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const scrollToScreen = (name) =>
  document.querySelector(`[data-screen="${name}"]`)?.scrollIntoView({ behavior: 'smooth' });

const Home = () => {
  const [current, setCurrent] = useState('Home');
  const years = new Date().getFullYear() - site.since;

  // Gentle snapping between the four screens (desktop only, see _base.scss).
  useEffect(() => {
    document.documentElement.classList.add('snap-screens');
    return () => document.documentElement.classList.remove('snap-screens');
  }, []);

  // Track which screen is in view for the side dots.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setCurrent(e.target.dataset.screen));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    document.querySelectorAll('[data-screen]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <nav className={styles.dots} aria-label="Sections on this page">
        {screens.map((s) => (
          <button
            key={s}
            type="button"
            className={s === current ? styles.dotActive : ''}
            aria-current={s === current ? 'true' : undefined}
            onClick={() => scrollToScreen(s)}
          >
            <span>{s}</span>
          </button>
        ))}
      </nav>

      {/* 1. Home: the ID card on its lanyard */}
      <section className={styles.hero} data-screen="Home">
        <div className={`wrap ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            {site.available && (
              <motion.p className="pill" {...fadeUp(0)}>
                <span className="dot" aria-hidden="true" /> Available for new projects
              </motion.p>
            )}
            <h1 className={styles.title} aria-label={lines.join(' ')}>
              {lines.map((line, i) => (
                <span key={line} className={styles.lineMask} aria-hidden="true">
                  <motion.span
                    className={styles.line}
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.9, delay: 0.08 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p className={styles.lead} {...fadeUp(1)}>
              I’m {site.name}. I design and build web apps, mobile apps and the back ends behind
              them, and add AI where it saves your team time.
            </motion.p>
            <motion.div className={`btn-row ${styles.actions}`} {...fadeUp(2)}>
              <Link to="/contact" className="btn btn--primary">
                Book a call <HiArrowRight aria-hidden="true" />
              </Link>
              <button type="button" className="btn" onClick={() => scrollToScreen('Work')}>
                See my work
              </button>
            </motion.div>
          </div>

          <div className={styles.heroStage}>
            <Lanyard />
          </div>
        </div>

        <button
          type="button"
          className={styles.peek}
          onClick={() => scrollToScreen('About')}
          aria-label="Go to About me"
        >
          <HiChevronDown aria-hidden="true" />
        </button>
      </section>

      {/* 2. About me */}
      <section className={styles.about} id="about" data-screen="About">
        <div className={`wrap ${styles.aboutGrid}`}>
          <Reveal className={styles.aboutText}>
            <h2>About me</h2>
            <p className={styles.aboutLead}>
              I’m a software engineer and UI designer in {site.location}. I build mobile apps and
              web platforms, and connect them to AI tools like Google Gemini and OpenAI.
            </p>
            <p>
              Most of my work is cross-platform apps with React Native and Expo, and web products
              with React and Next.js. I have worked as a product manager, a frontend developer and
              a tutor, so I am as comfortable planning a release with founders as I am writing the
              code.
            </p>
            <div className="btn-row">
              <Link to="/about" className="btn">
                More about me
              </Link>
              <Link to="/resume" className="link">
                Read my resume <HiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12} className={styles.aboutSide}>
            <dl className={styles.facts}>
              <div>
                <dd>
                  <CountUp to={projects.length} />
                </dd>
                <dt>Projects shipped</dt>
              </div>
              <div>
                <dd>
                  <CountUp to={years} />
                </dd>
                <dt>Years building for the web</dt>
              </div>
            </dl>

            <ol className={styles.jobs}>
              {experiences.map((job) => (
                <li key={job.company + job.period}>
                  <span className={styles.jobPeriod}>{job.period}</span>
                  <span>
                    <strong>{job.company}</strong>
                    <span className={styles.jobRole}>{job.role}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className={`wrap ${styles.toolStrip}`}>
          <Marquee label="Tools I use" speed={45}>
            <ToolIcons names={tools} />
          </Marquee>
        </div>
      </section>

      {/* 3. Selected work with the laptop */}
      <WorksScreen />

      {/* 4. Contact */}
      <section className={styles.contact} id="contact" data-screen="Contact">
        <div className={`wrap ${styles.contactGrid}`}>
          <Reveal className={styles.contactText}>
            <h2>Start a project</h2>
            <p>
              Tell me what you are building and when you need it. I reply within two working days.
            </p>
            <div className="btn-row">
              <Link to="/contact" className="btn btn--primary">
                Send a message <HiArrowRight aria-hidden="true" />
              </Link>
              <CopyEmail />
            </div>
          </Reveal>

          <Reveal delay={0.12} as="ul" className={styles.contactRows}>
            <li>
              <a href={`mailto:${site.email}`}>
                <span className={styles.k}>Email</span>
                <span className={styles.v}>{site.email}</span>
                <HiArrowUpRight aria-hidden="true" />
              </a>
            </li>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  <span className={styles.k}>{s.label}</span>
                  <span className={styles.v}>{handle(s.url)}</span>
                  <HiArrowUpRight aria-hidden="true" />
                </a>
              </li>
            ))}
            <li>
              <span className={styles.static}>
                <span className={styles.k}>Based in</span>
                <span className={styles.v}>{site.location}</span>
              </span>
            </li>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Home;
