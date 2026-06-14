import Hero from '../../components/home/Hero';
import Services from '../../components/home/Services';
import Works from '../../components/home/Works';
import ScrollVelocity from '../../components/utils/scroll text/ScrollVelocity';
import { services } from '../../assets/data/services';
import styles from './home.module.scss';
import FAQs from '../../components/home/FAQs';
import { AnimatedLink } from '../../components/utils/animated-link/AnimatedLink';
import { AnimatedButton } from '../../components/utils/animated-button/AnimatedButton';

const Home = () => {
  return (
    <>
      <Hero />
      <Works />
      <Services services={services} />
      <FAQs />
      <div className={styles.cta}>
        <AnimatedButton
          variant="secondary"
          href={'/contact'}
          text="Book a Call"
        />
      </div>
    </>
  );
};

export default Home;
