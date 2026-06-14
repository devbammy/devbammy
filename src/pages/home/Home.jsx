import Hero from '../../components/home/Hero';
import Services from '../../components/home/Services';
import Works from '../../components/home/Works';
import ScrollVelocity from '../../components/utils/scroll text/ScrollVelocity';
import { services } from '../../assets/data/services';
import styles from './home.module.scss';

const Home = () => {
  return (
    <>
      <Hero />
      <ScrollVelocity
        texts={['Full Stack Web/Mobile Developer']}
        velocity={25}
        className="custom-scroll-text"
        numCopies={12}
        damping={80}
        stiffness={400}
      />
      <Works />
      <Services services={services} />
    </>
  );
};

export default Home;
