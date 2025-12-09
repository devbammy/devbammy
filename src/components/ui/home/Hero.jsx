import { assets } from '../../../assets/asstes';
import { useTheme } from '../../../context/ThemeContext';
import AnimatedLink from '../../utils/AnimatedLink.jsx';
import Header from '../header/Header.jsx';
import styles from './home.module.scss';
import { motion } from 'framer-motion';

const Hero = () => {
  const { theme } = useTheme();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const highlightStyle = { color: theme === 'dark' ? '#fde500' : '#665151ff' };

  return (
    <div className={styles.top_hero}>
      <Header />
      <section className={styles.hero} id="home">
        {/* Text Column */}
        <motion.div
          className={styles.text}
          initial="hidden"
          reduceMotion="never"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.h1 variants={fadeUp}>
            Hi, I'm <br />
            Emmanuel Bamidele
          </motion.h1>
          <motion.h2 variants={fadeUp}>Frontend Developer</motion.h2>
          <motion.p variants={fadeUp}>
            I’m a passionate{' '}
            <span style={highlightStyle}>Front-End Web Developer</span>{' '}
            dedicated to creating <span style={highlightStyle}>engaging</span>{' '}
            and visually appealing{' '}
            <span style={highlightStyle}>user interfaces</span> that deliver
            seamless and{' '}
            <span style={highlightStyle}>memorable digital experiences.</span>
          </motion.p>
          <motion.div className={styles.controls} variants={fadeUp}>
            <AnimatedLink
              href="../../../../src/assets/OLORUNYOMI EMMANUEL.pdf"
              text="Download CV"
              target="_blank"
            />
            <AnimatedLink href="#contact" text="Contact Me" />
          </motion.div>
        </motion.div>

        {/* Image Column */}
        <motion.div
          className={styles.imageBox}
          initial={{ opacity: 0, x: 800 }}
          animate={{ opacity: 1, x: 0 }}
          reduceMotion="never"
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <div className={styles.image}>
            <img src={assets.me} alt="Emmanuel Bamidele" />
          </div>

          <div className={styles.lines}>
            <img src={assets.lines} alt="" />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
