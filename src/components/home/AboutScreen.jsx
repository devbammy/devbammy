import { useRef } from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';
import { site } from '../../assets/data/site';
import { projects } from '../../assets/data/projects';
import { experiences } from '../../assets/data/experiences';
import { tools } from '../../assets/data/services';
import { gsap, media, useGsap } from '../../lib/gsap';
import CountUp from '../utils/count-up/CountUp';
import Marquee from '../utils/marquee/Marquee';
import ToolIcons from '../utils/tool-icons/ToolIcons';
import styles from './aboutScreen.module.scss';

const statement = `I’m a full-stack software engineer building modern web and mobile experiences with React, React Native, and Node.js. I leverage AI tools like OpenAI, Claude Code, and Gemini  to build smarter digital solutions.`;

const AboutScreen = () => {
  const ref = useRef(null);
  const years = new Date().getFullYear() - site.since;

  useGsap(ref, (mm) => {
    mm.add(media.motion, () => {
      // The statement lights up word by word as it crosses the screen.
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: {
            trigger: '[data-statement]',
            start: 'top 82%',
            end: 'bottom 48%',
            scrub: true,
          },
        },
      );

      gsap.from('[data-rise]', {
        y: 48,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.09,
        scrollTrigger: { trigger: '[data-details]', start: 'top 82%' },
      });

      gsap.from('[data-job]', {
        y: 28,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: { trigger: '[data-jobs]', start: 'top 85%' },
      });

      // Hairlines draw from the left.
      gsap.from('[data-rule]', {
        scaleX: 0,
        transformOrigin: '0 50%',
        duration: 1.1,
        ease: 'power2.inOut',
        stagger: 0.1,
        scrollTrigger: { trigger: '[data-jobs]', start: 'top 85%' },
      });

      // Light parallax on the big numbers.
      gsap.fromTo(
        '[data-facts]',
        { yPercent: 14 },
        {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-details]',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });
  });

  return (
    <section ref={ref} className={styles.about} id="about" data-screen="About">
      <div className="wrap">
        <p className={styles.eyebrow}>
          <i aria-hidden="true" /> About me
        </p>

        <h2 className={styles.statement} data-statement aria-label={statement}>
          {statement.split(' ').map((word, i) => (
            <span key={i} data-word aria-hidden="true">
              {word}{' '}
            </span>
          ))}
        </h2>

        <div className={styles.details} data-details>
          <div className={styles.side}>
            <dl className={styles.facts} data-facts>
              <div data-rise>
                <dd>
                  <CountUp to={projects.length} />
                </dd>
                <dt>Projects shipped</dt>
              </div>
              <div data-rise>
                <dd>
                  <CountUp to={years} />
                </dd>
                <dt>Years building for the web</dt>
              </div>
            </dl>
            <p className={styles.note} data-rise>
              I have worked as a product manager, a frontend developer and a
              tutor, so I am as comfortable planning a release with founders as
              I am writing the code.
            </p>
            <a href={site.cv} target="_blank" rel="noopener noreferrer" className="btn" data-rise>
              View resume <HiArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <ol className={styles.jobs} data-jobs>
            {experiences.map((job) => (
              <li key={job.company + job.period}>
                <span className={styles.rule} data-rule aria-hidden="true" />
                <div className={styles.job} data-job>
                  <span className={styles.period}>{job.period}</span>
                  <div>
                    <h3>{job.company}</h3>
                    <p className={styles.role}>
                      {job.role}, {job.location}
                    </p>
                    <p className={styles.summary}>{job.points[0]}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className={`wrap ${styles.tools}`}>
        <Marquee label="Tools I use" speed={45}>
          <ToolIcons names={tools} />
        </Marquee>
      </div>
    </section>
  );
};

export default AboutScreen;
