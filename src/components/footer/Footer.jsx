import { Link, useLocation } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import { site } from '../../assets/data/site';
import CopyEmail from '../utils/copy-email/CopyEmail';
import styles from './footer.module.scss';

const Footer = () => {
  const { pathname } = useLocation();
  const year = new Date().getFullYear();
  const onContact = pathname === '/contact';

  return (
    <footer className={`${styles.footer} ${onContact ? styles.compact : ""}`}>
      <div className="wrap">
        {!onContact && (
          <div className={styles.close}>
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
          </div>
        )}

        <p className={`${styles.name} ${onContact ? styles.nameOnly : ""}`} aria-hidden="true">
          {site.shortName}
        </p>

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
