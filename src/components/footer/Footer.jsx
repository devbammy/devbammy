import { Link } from 'react-router-dom';
import Avatar from '../utils/avatar/Avatar';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';
import styles from './footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com', label: 'GitHub' },
    {
      icon: <FaLinkedin />,
      url: 'https://linkedin.com',
      label: 'LinkedIn',
    },
    { icon: <FaSquareXTwitter size={18} />, url: 'https://x.com', label: 'X' },
    {
      icon: <AiFillInstagram size={18} />,
      url: 'https://instagram.com',
      label: 'Instagram',
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.brandSide}>
          <Avatar />
        </div>
        <div className={styles.brandText}>
          <h4>Let's collaborate</h4>
          <p>Ready to bring your application ideas to life.</p>
        </div>

        {/* Social Dock: Same shape/size profile as the previous button */}
        <div className={styles.socialDock}>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.bottomSection}>
        <p className={styles.copyright}>
          &copy; {currentYear} bamidele.dev. All rights reserved.
        </p>

        <nav className={styles.footerNav}>
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
          <Link to="/resume">Resume</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
