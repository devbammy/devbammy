import { assets, projects } from '../../../assets/asstes';
import { useTheme } from '../../../context/ThemeContext';
import styles from './home.module.scss';
import { motion } from 'framer-motion';

const Projects = () => {
  const { theme } = useTheme();

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className={styles.projects} id="projects">
      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        These are some of the projects I've built, highlighting my work in
        creating clean, interactive, and user-friendly web interfaces using
        modern frontend technologies.
      </motion.p>

      <div className={styles.projects_box}>
        {projects.map((project, i) => (
          <motion.div
            className={styles.project}
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <div className={styles.image}>
              <img src={project.imgSrc} alt={project.title} loading="lazy" />
            </div>

            <div className={styles.text}>
              <div className={styles.left}>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className={styles.tech}>
                  {project.tags.map((tag, idx) => (
                    <span key={idx}>{tag}</span>
                  ))}
                </div>
              </div>

              <div
                className={styles.right}
                style={{ background: theme === 'dark' ? '#E0E2DE' : '#19263B' }}
              >
                <a href={project.projectLink} target="_blank">
                  <img
                    src={theme === 'dark' ? assets.arrowDark : assets.arror}
                    alt="View Project"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
