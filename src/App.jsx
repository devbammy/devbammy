import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Projects from './pages/projects/Projects';
import Resume from './pages/resume/Resume';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Loader from './components/utils/loader/Loader';
import styles from './App.module.scss';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <Header />

          {/* Wrap your pages inside a layout main section */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </main>

          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
