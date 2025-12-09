import { sitemap, socials } from '../../../assets/asstes';
import styles from './footer.module.scss';
import { motion } from 'framer-motion';

const Footer = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <motion.footer
      className={styles.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className={styles.row}>
        <motion.div className={styles.col} variants={fadeUp}>
          <h2>Let's work together today!</h2>
        </motion.div>

        <motion.div className={styles.col} variants={fadeUp}>
          <h3>Sitemap</h3>
          {sitemap.map((a, i) => (
            <motion.a href={a.href} key={i} variants={fadeUp}>
              {a.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.div className={styles.col} variants={fadeUp}>
          <h3>Socials</h3>
          {socials.map((a, i) => (
            <motion.a href={a.href} key={i} target="_blank" variants={fadeUp}>
              {a.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
