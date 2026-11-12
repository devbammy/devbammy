import { useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import ProjectDetail from './pages/project-detail/ProjectDetail';
import NotFound from './pages/not-found/NotFound';

// The site is one page plus project detail pages. Old addresses land on their section.
const redirects = {
  '/about': '/#about',
  '/resume': '/#about',
  '/projects': '/#work',
  '/contact': '/#contact',
};

const Page = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      {!isHome && <Header />}
      {/* Opacity only: a transform here would break the pinned (fixed) sections. */}
      <motion.main
        id="main"
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          {Object.entries(redirects).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
      {!isHome && <Footer />}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <a className="sr-only skip" href="#main">
      Skip to content
    </a>
    <Page />
  </BrowserRouter>
);

export default App;
