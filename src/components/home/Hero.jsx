import { Phone } from 'lucide-react';
import Me from '../../assets/me.jpg';
import { AnimatedButton } from '../utils/animated-button/AnimatedButton';
import styles from './homeComps.module.scss';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.profile}>
        <div className={styles.profile_image}>
          <img src={Me} alt="my profile picture" />
        </div>
        <div className={styles.profile_details}>
          <h3>Emmanuel Bamidele</h3>
          <p>Full Stack Web/Mobile Engr.</p>
        </div>
      </div>

      <div className={styles.hero_text}>
        <h1>From Idea to Intelligent Digital Product</h1>
        <p>
          I design and develop full stack web and mobile applications with a
          focus on performance, usability, and scale. I also integrate AI into
          workflows and products to improve functionality, speed up development,
          and unlock smarter user experiences.
        </p>

        <div className={styles.hero_ctas}>
          <AnimatedButton
            href="/contact"
            text="Book a Call"
            variant="secondary"
            icon={<Phone />}
          />
          <AnimatedButton
            href="/contact"
            text="View My Works"
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
