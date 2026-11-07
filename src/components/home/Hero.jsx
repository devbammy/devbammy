import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import Me from '../../assets/me.jpg';
import Logo from '../../assets/logo.png';
import { site } from '../../assets/data/site';
import { projects } from '../../assets/data/projects';
import { tools } from '../../assets/data/services';
import CountUp from '../utils/count-up/CountUp';
import LocalTime from '../utils/local-time/LocalTime';
import Marquee from '../utils/marquee/Marquee';
import ToolIcons from '../utils/tool-icons/ToolIcons';
import styles from './hero.module.scss';

const lines = ['Web and mobile', 'developer for', 'growing businesses'];
const ease = [0.2, 0.7, 0.2, 1];

const fadeUp = (i) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.35 + i * 0.08, ease },
});

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const years = new Date().getFullYear() - site.since;

  return (
    <section ref={ref} className={styles.hero}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.text}>
          {site.available && (
            <motion.p className="pill" {...fadeUp(0)} transition={{ duration: 0.6, ease }}>
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
            <Link to="/projects" className="btn">
              See my work
            </Link>
          </motion.div>
        </div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease }}
        >
          {/* Duotone in the logo's colours: shadows become ink #16181C, highlights brand yellow #FDE500. */}
          <svg className={styles.filters} aria-hidden="true" focusable="false">
            <filter id="duotone-ink-signal" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0"
              />
              <feComponentTransfer>
                <feFuncR type="table" tableValues="0.086 0.992" />
                <feFuncG type="table" tableValues="0.094 0.898" />
                <feFuncB type="table" tableValues="0.110 0" />
              </feComponentTransfer>
              <feComponentTransfer>
                <feFuncR type="gamma" exponent="1.25" amplitude="1" offset="0" />
                <feFuncG type="gamma" exponent="1.25" amplitude="1" offset="0" />
                <feFuncB type="gamma" exponent="1.25" amplitude="1" offset="0" />
              </feComponentTransfer>
            </filter>
          </svg>
          <div className={styles.portrait}>
            <motion.div className={styles.portraitInner} style={{ y: photoY }}>
              <img className={styles.duo} src={Me} alt={`Portrait of ${site.name}`} width="742" height="990" />
              <img className={styles.colour} src={Me} alt="" aria-hidden="true" width="742" height="990" />
            </motion.div>
          </div>

          <Link to="/contact" className={styles.badge} aria-label="Book a call">
            <svg viewBox="0 0 100 100" className={styles.badgeText} aria-hidden="true">
              <defs>
                <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <text>
                <textPath href="#badge-circle" textLength="230">
                  Book a call ✦ Start a project ✦
                </textPath>
              </text>
            </svg>
            <img src={Logo} alt="" className={styles.badgeLogo} />
          </Link>

          <div className={styles.clock}>
            <span className="dot" aria-hidden="true" />
            <span>
              <LocalTime timeZone={site.timeZone} /> in {site.location.split(',')[0]}
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <dl className={styles.facts}>
          <div>
            <dt>Projects shipped</dt>
            <dd>
              <CountUp to={projects.length} />
            </dd>
          </div>
          <div>
            <dt>Years building for the web</dt>
            <dd>
              <CountUp to={years} />
            </dd>
          </div>
          <div className={styles.toolsFact}>
            <dt>Tools I use every week</dt>
            <dd>
              <Marquee label="Tools I use" speed={45}>
                <ToolIcons names={tools} />
              </Marquee>
            </dd>
          </div>
        </dl>
      </motion.div>
    </section>
  );
};

export default Hero;
