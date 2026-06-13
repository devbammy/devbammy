import Hero from '../../components/home/Hero';
import Works from '../../components/home/Works';
import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <Works />
    </div>
  );
};

export default Home;
