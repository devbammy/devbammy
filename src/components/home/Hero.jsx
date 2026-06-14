import { HiOutlinePhone } from 'react-icons/hi';
import { HiArrowRight } from 'react-icons/hi2'; // Added a nice accent icon for the primary CTA

import { AnimatedButton } from '../utils/animated-button/AnimatedButton';
import styles from './homeComps.module.scss';
import Avatar from '../utils/avatar/Avatar';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Avatar />
      <div className={styles.hero_text}>
        <h1>
          From Vision to <br /> Intelligent Digital Products
        </h1>
        <p>
          I design and develop full stack web and mobile applications with a
          focus on performance, usability, and scale. I also integrate AI into
          workflows and products to improve functionality, speed up development,
          and unlock smarter user experiences.
        </p>

        <div className={styles.hero_ctas}>
          <AnimatedButton
            href="/projects"
            text="View My Works"
            variant="primary"
            icon={<HiArrowRight />}
          />
          <AnimatedButton
            href="/contact"
            text="Book a Call"
            variant="secondary"
            icon={<HiOutlinePhone />}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
