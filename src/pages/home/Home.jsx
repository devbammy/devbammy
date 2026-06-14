import Hero from '../../components/home/Hero';
import Works from '../../components/home/Works';
import ScrollVelocity from '../../components/utils/scroll text/ScrollVelocity';
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
    </>
  );
};

export default Home;
