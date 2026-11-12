import { useRef } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { site } from '../../assets/data/site';
import { gsap, media, useGsap } from '../../lib/gsap';
import Lanyard from './Lanyard';
import styles from './heroScreen.module.scss';

const HeroScreen = ({ onNext }) => {
  const ref = useRef(null);

  useGsap(ref, (mm) => {
    mm.add(media.motion, () => {
      // Entrance: headline lines and the big name rise out of their masks.
      const intro = gsap.timeline({ delay: 0.1 });
      intro
        .from('[data-line]', { yPercent: 110, duration: 1.1, stagger: 0.09, ease: 'power4.out' })
        .from('[data-letter]', { yPercent: 105, duration: 1.2, stagger: 0.028, ease: 'power4.out' }, 0.15)
        .from('[data-fade]', { autoAlpha: 0, y: 14, duration: 0.8, stagger: 0.1 }, 0.55);

      // Exit: the hero stays pinned while the next screen slides over it.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
          defaults: { ease: 'none' },
        })
        .to('[data-stage]', { yPercent: -14, scale: 0.9, rotate: -5 }, 0)
        .to('[data-mark]', { yPercent: -55, scale: 1.06 }, 0)
        .to('[data-corner]', { autoAlpha: 0, y: -50 }, 0)
        .to('[data-shade]', { opacity: 0.55 }, 0);
    });
  });

  return (
    <section ref={ref} className={styles.hero} data-screen="Home">
      <div className={styles.topLeft} data-corner>
        <p className={styles.eyebrow} data-fade>
          <i aria-hidden="true" /> {site.name}, {site.location}
        </p>
        <h1 className={styles.title}>
          <span className={styles.mask}>
            <span data-line>Web and mobile apps,</span>
          </span>
          <span className={styles.mask}>
            <span data-line className={styles.soft}>
              built end to end.
            </span>
          </span>
        </h1>
      </div>

      <div className={styles.topRight} data-corner>
        <p data-fade>
          I’m {site.name}, a full-stack developer. I design and build web apps, mobile apps and the
          back ends behind them, and add AI where it saves your team time.
        </p>
      </div>

      <div className={styles.stage} data-stage>
        <Lanyard />
      </div>

      {site.available && (
        <p className={styles.available} data-corner>
          <span data-fade>
            <span className="dot" aria-hidden="true" /> Available for new projects
          </span>
        </p>
      )}

      <p className={styles.mark} data-mark aria-hidden="true">
        {site.name.split('').map((ch, i) => (
          <span key={i} className={styles.letterMask}>
            <span data-letter>{ch === ' ' ? ' ' : ch}</span>
          </span>
        ))}
      </p>

      <button type="button" className={styles.peek} onClick={onNext} aria-label="Go to About me">
        <HiChevronDown aria-hidden="true" />
        <HiChevronDown aria-hidden="true" />
      </button>

      <span className={styles.shade} data-shade aria-hidden="true" />
    </section>
  );
};

export default HeroScreen;
