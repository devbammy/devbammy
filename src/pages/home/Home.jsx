import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../../lib/gsap';
import HeroScreen from '../../components/home/HeroScreen';
import AboutScreen from '../../components/home/AboutScreen';
import WorksScreen from '../../components/home/WorksScreen';
import ContactScreen from '../../components/home/ContactScreen';
import ThemeToggle from '../../components/utils/theme-toggler/ThemeToggle';
import styles from './home.module.scss';

const screens = ['Home', 'About', 'Work', 'Contact'];

const Home = () => {
  const [current, setCurrent] = useState('Home');
  const { hash } = useLocation();
  const marks = useRef({}); // screen name -> its ScrollTrigger, used to find scroll positions

  // One trigger per screen: tells the dots which screen is in view and where each starts.
  // Runs after the screens' own effects, so pinned sections are already accounted for.
  useLayoutEffect(() => {
    const triggers = screens.map((name) => {
      const st = ScrollTrigger.create({
        trigger: `[data-screen="${name}"]`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => self.isActive && setCurrent(name),
      });
      marks.current[name] = st;
      return st;
    });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => triggers.forEach((t) => t.kill());
  }, []);

  const goTo = useCallback((name, smooth = true) => {
    const st = marks.current[name];
    if (!st) return;
    const top = name === 'Home' ? 0 : Math.ceil(st.start + window.innerHeight / 2);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: smooth && !reduce ? 'smooth' : 'instant' });
  }, []);

  // Links such as /#work from a project page land on the right screen.
  useEffect(() => {
    const name = screens.find((s) => `#${s.toLowerCase()}` === hash);
    if (!name || name === 'Home') return;
    const id = setTimeout(() => {
      ScrollTrigger.refresh();
      goTo(name, false);
    }, 120);
    return () => clearTimeout(id);
  }, [hash, goTo]);

  return (
    <>
      <nav className={styles.dots} aria-label="Sections">
        {screens.map((s) => (
          <button
            key={s}
            type="button"
            className={s === current ? styles.dotActive : ''}
            aria-current={s === current ? 'true' : undefined}
            onClick={() => goTo(s)}
          >
            <span>{s}</span>
          </button>
        ))}
      </nav>

      {/* Floating menu: theme switch everywhere, section links on smaller screens */}
      <div className={styles.dock}>
        <div className={styles.dockLinks}>
          {screens.slice(1).map((s) => (
            <button
              key={s}
              type="button"
              className={s === current ? styles.dockActive : ''}
              onClick={() => goTo(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <ThemeToggle />
      </div>

      <HeroScreen onNext={() => goTo('About')} />
      <AboutScreen />
      <WorksScreen />
      <ContactScreen />
    </>
  );
};

export default Home;
