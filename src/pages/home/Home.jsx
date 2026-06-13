import Hero from '../../components/home/Hero';
import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
    </div>
  );
};

export default Home;
