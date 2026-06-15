import Avatar from '../../components/utils/avatar/Avatar';
import Dp from '../../assets/me.jpg';
import Picture from '../../components/utils/picture/Picture';
import styles from './about.module.scss';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  const coreStack = [
    {
      category: 'Frontend',
      tools: ['React', 'React Native', 'Expo', 'NativeWind', 'Next.js'],
    },
    {
      category: 'Backend & DB',
      tools: ['Node.js', 'Express', 'Firebase', 'MongoDB'],
    },
    {
      category: 'Architecture',
      tools: [
        'REST APIs',
        'GraphQL',
        'UI/UX Design',
        'Git',
        'SaaS Systems',
        'Tailwind',
        'Native Wind',
      ],
    },
  ];

  return (
    <div className={styles.aboutWrapper}>
      {/* Header Profile Section */}
      <section className={styles.introHeader}>
        <Avatar />
        <div className={styles.introText}>
          <h1>Bamidele &mdash; Software Engineer & UI Designer</h1>
          <p className={styles.leadParagraph}>
            Building high-fidelity mobile workflows and responsive web platforms
            with a strong focus on minimalist enterprise aesthetics and
            integrated AI systems.
          </p>
        </div>
      </section>

      {/* High-Fidelity Feature Image Row */}
      <div className={styles.imageFrame}>
        <Picture img={Dp} alt="Bamidele profile presentation" name="devBammy" />
      </div>

      {/* Structural Biography Grid */}
      <section className={styles.philosophy}>
        <h3>The Philosophy</h3>
        <p>
          I believe that great software is the perfect intersection of clean
          code and intentional design. Specializing in cross-platform systems
          using Expo and React Native, I focus on building high-performance
          applications optimized for dark mode systems and polished fluid
          interactions.
        </p>
      </section>

      <section className={styles.approach}>
        <h3>The Approach</h3>
        <p>
          From automating full travel planning lifecycles to structuring
          scalable multi-role employee metrics, I prioritize clean, predictable
          architectures. By utilizing Google Gemini and modern vector branding
          assets, I build software designed to scale effortlessly.
        </p>
      </section>

      <section className={styles.stackSection}>
        <h2 className={styles.sectionTitle}>Capabilities & Tooling</h2>
        <div className={styles.stackGrid}>
          {coreStack.map((group, index) => (
            <div key={index} className={styles.stackGroup}>
              <h4>{group.category}</h4>
              <div className={styles.tagCloud}>
                {group.tools.map((tool, tIdx) => (
                  <span key={tIdx} className={styles.techTag}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
