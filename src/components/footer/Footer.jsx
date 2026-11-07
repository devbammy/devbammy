import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import { site } from '../../assets/data/site';
import CopyEmail from '../utils/copy-email/CopyEmail';
import Reveal from '../utils/reveal/Reveal';
import styles from './footer.module.scss';

const Footer = () => {
  const { pathname } = useLocation();
  const year = new Date().getFullYear();
  const onContact = pathname === '/contact';

  return (
    <footer className={`${styles.footer} ${onContact ? styles.compact : ''}`}>
      <div className="wrap">
        {!onContact && (
          <Reveal className={styles.close}>
            <div>
              <h2>Start a project</h2>
              <p>
                Tell me what you are building and when you need it. I reply within two working days.
              </p>
            </div>
            <div className={styles.closeActions}>
              <Link to="/contact" className="btn btn--primary">
                Book a call <HiArrowRight aria-hidden="true" />
              </Link>
              <CopyEmail />
            </div>
          </Reveal>
        )}

        {/* The name rises letter by letter as it scrolls into view. */}
        <motion.p
          key={pathname}
          className={`${styles.name} ${onContact ? styles.nameOnly : ''}`}
          aria-hidden="true"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.045 } } }}
        >
          {site.shortName.split('').map((ch, i) => (
            <span key={i} className={styles.letterMask}>
              <motion.span
                className={styles.letter}
                variants={{ hidden: { y: '100%' }, shown: { y: '0%' } }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </motion.p>

        <div className={styles.bottom}>
          <p className={styles.legal}>
            © {year} {site.name}. {site.location}.
          </p>
          <ul className={styles.links}>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a className="link" href={s.url} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
