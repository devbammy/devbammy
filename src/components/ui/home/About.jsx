import styles from './home.module.scss';
import { motion } from 'framer-motion';

const About = () => {
  // Variant for paragraphs and stats
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Container variant to stagger children
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.section
      className={styles.about}
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // animate when 30% of section is in view
      variants={container}
    >
      <motion.p variants={fadeUp}>
        I’m Emmanuel Bamidele, a Frontend Developer focused on crafting clean,
        responsive, and intuitive digital experiences. I build modern web
        interfaces with tools like HTML, CSS, JavaScript, React, and React
        Native, creating products that feel smooth, fast, and purposeful.
      </motion.p>

      <motion.p variants={fadeUp}>
        I also run{' '}
        <a href="https://codedistrictng.vercel.app/" target="_blank">
          CodeDistrict NG
        </a>
        , a web development learning initiative designed to help beginners and
        aspiring developers grow through practical lessons, real projects, and a
        community-focused learning style. I make use of AI tools across my
        workflow to speed up development, improve productivity, and enhance
        learning for students. The goal is to make tech education accessible,
        hands-on, and progress-driven for anyone eager to build a career in web
        development.
      </motion.p>

      <motion.p variants={fadeUp}>
        Every project I create reflects my dedication to growth, clarity, and
        solving real user needs. I’m always exploring new ideas, refining my
        craft, and building tools that make people’s digital lives easier.
      </motion.p>

      <motion.div className={styles.stats} variants={container}>
        <motion.div className={styles.stat} variants={fadeUp}>
          <h2>
            30<span>+</span>
          </h2>
          <p>Projects Completed</p>
        </motion.div>
        <motion.div className={styles.stat} variants={fadeUp}>
          <h2>
            4<span>+</span>
          </h2>
          <p>Years of experience</p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;
