import { useState } from 'react';
import { assets } from '../../assets/asstes';
import { useTheme } from '../../context/ThemeContext';
import { AnimatedButton } from '../../ui/utils/AnimatedLink';
import Contact from '../../ui/contact/Contact';
import styles from './home.module.scss';

const Home = () => {
  const [showContact, setShowContact] = useState(false);
  const { theme } = useTheme();

  const handleShowContact = () => {
    setShowContact(true);
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.image}>
          <img src={assets.me} alt="my profile picture" />
        </div>
        <div className={styles.text}>
          <h1>
            Emmanuel{' '}
            <span style={{ color: theme === 'dark' ? '#fde500' : '#414244' }}>
              Bamidele
            </span>
          </h1>
          <p>Frontend Engineer Crafting Seamless Experiences</p>

          <div className={styles.socials}>
            <a href="https://github.com/devbammy" target="_blank">
              <img
                src={theme === 'dark' ? assets.githubWhite : assets.github}
                alt=""
              />
            </a>
            <a
              href="https://www.linkedin.com/in/emmanuel-olorunyomi"
              target="_blank"
            >
              <img
                src={theme === 'dark' ? assets.linkedinWhite : assets.linkedin}
                alt=""
              />
            </a>
            <a href="https://www.instagram.com/bamidele.dev/" target="_blank">
              <img
                src={
                  theme === 'dark' ? assets.instagramWhite : assets.instagram
                }
                alt=""
              />
            </a>
            <a href="https://x.com/bamideledotdev" target="_blank">
              <img src={theme === 'dark' ? assets.xWhite : assets.x} alt="" />
            </a>
          </div>

          <div className={styles.actions}>
            <AnimatedButton href="" text="Resume" />
            <AnimatedButton href="/projects" text="Projects" />
            <AnimatedButton text="Contact Me" onClick={handleShowContact} />
          </div>
        </div>

        <p className={styles.footerNote}>
          &copy; 2026 <a href="/">Emmanuel Bamidele</a>. All rights reserved.
        </p>

        {showContact && <Contact setShowContact={setShowContact} />}
      </main>
    </>
  );
};

export default Home;
