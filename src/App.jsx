import Header from './components/ui/header/Header';
import Footer from './components/ui/footer/Footer';
import Hero from './components/ui/home/Hero';
import About from './components/ui/home/About';
import styles from './styles/main.module.scss';
import Tools from './components/ui/home/Tools';
import Projects from './components/ui/home/Projects';
import Contact from './components/ui/home/Contact';
import Reviews from './components/ui/home/Reviews';

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <main className={styles.mainContainer}>
        <Hero />
        <About />
        <Tools />
        <Projects />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
