import { skillItem } from '../../../assets/asstes';
import styles from './home.module.scss';
import { motion } from 'framer-motion';

const Tools = () => {
  // Fade-up variant for each element
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Container variant for staggering children
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <motion.section
      className={styles.tools}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <motion.h2 variants={fadeUp}>Essential Tools I Use</motion.h2>
      <motion.p variants={fadeUp}>
        Over the years, I’ve refined a toolkit that enables me to design,
        develop, and deliver high-quality digital products efficiently. These
        tools form the foundation of my workflow, ensuring performance,
        scalability, and exceptional user experiences across every project.
      </motion.p>

      <motion.div className={styles.tools_box} variants={container}>
        {skillItem.map((skill, i) => (
          <motion.div className={styles.tool} key={i} variants={fadeUp}>
            <div className={styles.img}>
              <img src={skill.imgSrc} alt={skill.label} />
            </div>
            <div className={styles.text}>
              <h3>{skill.label}</h3>
              <p>{skill.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Tools;
