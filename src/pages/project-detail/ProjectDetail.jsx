import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { HiExternalLink } from 'react-icons/hi';
import { getProjectBySlug, getNextProject } from '../../assets/data/projects';
import { useTheme } from '../../context/ThemeContext';

// Social icons - light/dark variants
import GithubLight from '../../assets/github.png';
import GithubDark from '../../assets/githubWhite.png';
import LinkedinLight from '../../assets/linkedin.png';
import LinkedinDark from '../../assets/linkedinWhite.png';
import InstagramLight from '../../assets/instagram.png';
import InstagramDark from '../../assets/instagramWhite.png';
import XLight from '../../assets/x.png';
import XDark from '../../assets/xWhite.png';

import styles from './projectDetail.module.scss';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const { theme } = useTheme();
  const project = getProjectBySlug(slug);
  const nextProject = getNextProject(slug);

  const isDark = theme === 'dark';

  // Scroll to top on slug/page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!project) {
    return (
      <div className={styles.projectDetail}>
        <div className={styles.contentSection}>
          <Link to="/" className={styles.backLink}>
            <HiArrowLeft /> Back to Home
          </Link>
          <h2>Project not found</h2>
          <p>The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const socials = [
    {
      name: 'Twitter / X',
      icon: isDark ? XDark : XLight,
      href: 'https://x.com/',
    },
    {
      name: 'Instagram',
      icon: isDark ? InstagramDark : InstagramLight,
      href: 'https://instagram.com/',
    },
    {
      name: 'LinkedIn',
      icon: isDark ? LinkedinDark : LinkedinLight,
      href: 'https://linkedin.com/',
    },
    {
      name: 'GitHub',
      icon: isDark ? GithubDark : GithubLight,
      href: 'https://github.com/',
    },
  ];

  return (
    <motion.div
      className={styles.projectDetail}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Back Button */}
      <motion.div variants={itemVariants}>
        <Link to="/" className={styles.backLink}>
          <HiArrowLeft /> Back to Home
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.div className={styles.hero} variants={itemVariants}>
        <img
          src={project.img}
          alt={project.name}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>{project.name}</h1>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroCta}
            >
              View Project <HiExternalLink />
            </a>
          )}
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div className={styles.contentSection} variants={itemVariants}>
        <h2>About the Project</h2>
        {project.description.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </motion.div>

      {/* Gallery Section */}
      {project.screenshots && project.screenshots.length > 0 && (
        <motion.div className={styles.contentSection} variants={itemVariants}>
          <h2>Gallery</h2>
          <div className={styles.galleryGrid}>
            {project.screenshots.map((screenshot, index) => (
              <div key={index} className={styles.galleryItem}>
                <img
                  src={screenshot}
                  alt={`${project.name} Screenshot ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tech Stack Section */}
      {project.techStack && project.techStack.length > 0 && (
        <motion.div className={styles.contentSection} variants={itemVariants}>
          <h2>Tech Stack</h2>
          <div className={styles.techStack}>
            {project.techStack.map((tech, index) => (
              <span key={index} className={styles.techBadge}>
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Next Project Card */}
      {nextProject && (
        <motion.div variants={itemVariants}>
          <Link
            to={`/work/${nextProject.slug}`}
            className={styles.nextProjectCard}
          >
            <div className={styles.nextProjectImage}>
              <img src={nextProject.img} alt={nextProject.name} />
            </div>
            <div className={styles.nextProjectMeta}>
              <span className={styles.nextLabel}>Next Project</span>
              <h3 className={styles.nextTitle}>{nextProject.name}</h3>
            </div>
            <div className={styles.nextProjectArrow}>
              <HiArrowRight />
            </div>
          </Link>
        </motion.div>
      )}

      {/* Social Links Section */}
      <motion.div className={styles.socialSection} variants={itemVariants}>
        <span className={styles.socialLabel}>Connect with me</span>
        <div className={styles.socialLinks}>
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title={social.name}
            >
              <img src={social.icon} alt={social.name} />
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
