import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Projects from './pages/projects/Projects';
import ProjectDetail from './pages/project-detail/ProjectDetail';
import Resume from './pages/resume/Resume';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Loader from './components/utils/loader/Loader';
import Antigravity from './components/antigravity/Antigravity';
import styles from './App.module.scss';
import { useTheme } from './context/ThemeContext';

const App = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.appStage}>
          <div className={styles.backgroundCanvas}>
            <Antigravity
              count={2500}
              magnetRadius={12}
              ringRadius={7}
              waveSpeed={0.1}
              waveAmplitude={1}
              particleSize={0.6}
              lerpSpeed={0.05}
              color={theme === 'dark' ? '#737272' : '#d7c9c9'}
              autoAnimate={true}
              particleVariance={1}
              rotationSpeed={0}
              depthFactor={1.8}
              pulseSpeed={0.5}
              particleShape="capsule"
              fieldStrength={10}
            />
          </div>

          <div className={styles.container}>
            <Header />

            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
                <Route path="/resume" element={<Resume />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
