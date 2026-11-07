import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import Me from '../../assets/me.jpg';
import { site } from '../../assets/data/site';
import { experiences } from '../../assets/data/experiences';
import ToolIcons from '../../components/utils/tool-icons/ToolIcons';
import Reveal from '../../components/utils/reveal/Reveal';
import styles from './about.module.scss';

const stack = [
  { group: 'Front end', items: ['React', 'Next.js', 'React Native', 'Expo', 'NativeWind', 'Tailwind CSS', 'SCSS'] },
  { group: 'Back end and data', items: ['Node.js', 'Express', 'Firebase', 'MongoDB', 'REST APIs', 'GraphQL'] },
  { group: 'Design and delivery', items: ['Figma', 'UI and UX design', 'Git and GitHub', 'Vercel', 'Render'] },
];

const About = () => (
  <>
    <section className={`wrap ${styles.intro}`}>
      <div className={styles.introText}>
        <h1>About me</h1>
        <p className={styles.lead}>
          I’m {site.name}, a software engineer and UI designer in {site.location}. I build mobile
          apps and web platforms, and connect them to AI tools like Google Gemini and OpenAI.
        </p>
        <p>
          Good software sits where clean code and deliberate design meet. Most of my work is
          cross-platform apps with React Native and Expo, and web products with React and
          Next.js, built so they stay quick and easy to change as they grow.
        </p>
        <p>
          I have worked as a product manager, a frontend developer and a tutor, so I am as
          comfortable planning a release with founders as I am writing the code or teaching it.
        </p>
        <div className="btn-row">
          <Link to="/contact" className="btn btn--primary">
            Book a call <HiArrowRight aria-hidden="true" />
          </Link>
          <Link to="/resume" className="btn">
            Read my resume
          </Link>
        </div>
      </div>
      <div className={styles.photo}>
        <img src={Me} alt={`Portrait of ${site.name}`} width="742" height="990" />
      </div>
    </section>

    <section className="section">
      <div className={`wrap ${styles.split}`}>
        <h2>Experience</h2>
        <ol className={styles.timeline}>
          {experiences.map((job, i) => (
            <Reveal as="li" key={job.company + job.period} delay={i * 0.08}>
              <p className={styles.period}>{job.period}</p>
              <div>
                <h3>{job.company}</h3>
                <p className={styles.role}>
                  {job.role}, {job.location}
                </p>
                <p className={styles.summary}>{job.points[0]}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    <section className={`section ${styles.toolsSection}`}>
      <div className={`wrap ${styles.split}`}>
        <h2>Tools I use</h2>
        <Reveal className={styles.tools}>
          <ToolIcons names={['React', 'Next.js', 'Expo', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'Figma', 'Vercel']} />
          <div className={styles.stack}>
            {stack.map((s) => (
              <div key={s.group}>
                <h3>{s.group}</h3>
                <p>{s.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

export default About;
