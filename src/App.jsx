import Footer from './components/ui/footer/Footer';
import Hero from './components/ui/home/Hero';
import About from './components/ui/home/About';
import Tools from './components/ui/home/Tools';
import Projects from './components/ui/home/Projects';
import Contact from './components/ui/home/Contact';
import Reviews from './components/ui/home/Reviews';

const App = () => {
  return (
    <>
      <main>
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
