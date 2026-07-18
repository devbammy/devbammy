import { Link } from 'react-router-dom';
import Avatar from '../utils/avatar/Avatar';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';
import styles from './footer.module.scss';
import { AnimatedButton } from '../utils/animated-button/AnimatedButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/devbammy', label: 'GitHub' },
    {
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/emmanuel-olorunyomi',
      label: 'LinkedIn',
    },
    {
      icon: <FaSquareXTwitter />,
      url: 'https://x.com/bamideledotdev',
      label: 'X',
    },
    {
      icon: <AiFillInstagram />,
      url: 'https://www.instagram.com/bamidele.dev',
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
      </div>

      <div className={styles.socialDock}>
        {socialLinks.map((link, index) => (
          <AnimatedButton
            href={link.url}
            target="_blank"
            icon={link.icon}
            text={link.label}
          />
        ))}
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
